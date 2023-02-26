//import required modules
const express = require("express");
const {Client} = require('pg');
const cors = require('cors');

//body parsing mw to handle incoming JSON data
const bodyParser = require('body-parser');


//create instance of Express.js app
const app = express();
let path = require("path");
app.use(express.static("public"));
const http = require('http');


app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false}
}));

app.get("/", function (req, res) {
  res.sendStatus(200).send("Test successful!");
});

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);

// Connect to PostgreSQL
//TODO check back with actual values
//login data for my local database - may differ
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    // create_login
    database: 'movie_db',
    password: 'Kavo.zada2',
    port: 5432,
});

//middleware function to handle error that may occur in routes
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Oops..something went wrong');
});


//try and catch for error handling when connecting to the database
try {
client.connect();

// Check if the movie table already exists
client.query('SELECT * FROM information_schema.tables WHERE table_name = $1', ['movie'], (err, result) => {
    if (err) {
        throw(err);
    }
    if (!result.rows[0]) {
        // If the table does not exist, create it
        client.query(`
            CREATE TABLE movie (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                release_date DATE NOT NULL,
                duration INTEGER NOT NULL,
                genre VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                age_restriction INTEGER NOT NULL
            );
        `)
    }
});
}
catch(err){
    console.error(err);
    res.status(500).send("An error occurred while connecting to the database.")
}

//login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // verify user credentials
    const user = authenticateUser(email, password);
  
    if (user) {
      // create session
      req.session.userId = user.id;
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });

//protected endpoint - requires authentication
app.get('/user', (req, res) => {
    const { userId } = req.session;
  
    if (userId) {
      // retrieve user data from session store
      const user = getUserById(userId);
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });

//logout endpoint
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
  });


//return a json object containing a list of movies
app.get('/api/movies', (req, res) => {
    client.query('SELECT * FROM movie', (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(result.rows);
    });
});

client.connect()
    .then(()=> console.log('Connected to database'))
    .catch(err => console.log('Error connecting to database', err.stack));


//route to retrieve movie data from the database
app.get('api/movies', (req,res)=> {
    client.query('SELECT * FROM movie')
    .then(result => {
      // Convert the result to JSON format
      const movies = result.rows;
      const movieData = JSON.stringify(movies);

      // Send the JSON data back to the client as an HTTP response
      res.send(movieData);
    })
    .catch(err => console.error('Error querying the database', err.stack));
});

app.get('/api/showtimes', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM showtimes');
      res.send(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

app.get('/api/checkUserExists/:email', (req, res) => {
    const email = req.params.email;
    client.query('SELECT password FROM customer WHERE email = $1', [email], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error querying the database' });
        }
        if (result.rows.length > 0) {
          const password = result.rows[0].password;
          return res.status(200).json({ exists: true, password: password });
        }
        return res.status(200).json({ exists: false });
      });
  });

//route to handle user registration
app.post('/api/register', (req, res) => {
    const { email, password, first_name, last_name, phone, address, zipcode, city, country } = req.body;
  

    // perform validation on the incoming data
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }
  
    // insert the new user into the database
    const query ='INSERT INTO customer (email, password, first_name, last_name, phone, address, zipcode, city, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT DO NOTHING';
    const values = [email, password, first_name, last_name, phone, address, zipcode, city, country];
    client.query(query, values, (err, result) => {
        console.log(result);
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error3 inserting user into the database' });
      }
      if (result.rowCount === 0 && result.command === 'INSERT') {
        return res.status(400).json({ message: 'User already exists' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });

app.get('/api/getCustomerData/:email', (req, res) => {
    const email = req.params.email;

    client.query('SELECT * FROM customer WHERE email = $1', [email], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error querying the database' });
        }
        if (result.rows.length > 0) {
          const customerData = result.rows[0];
          return res.status(200).json({ customerData });
        }
        return res.status(404).json({ message: 'Customer not found' });
      });

});




//---
app.get("/movies/:id", (req, res, next) => {
    if (!req.params.id){
        const error = new Error("Missing id parameter");
        error.status = 400;
        return next(error);
    }
    //get movie by id
    client.query("SELECT * FROM  movies WHERE id= $1", [req.params.id], (err, result) => {
        if (err) {
            return next(err);
        }
        //if it doesn't find a movie, new error oject
        if (result.rows.length === 0){
            const error = new Error("Movie not found");
            error.status = 404;
            return next(error);
        }
        res.json(result.rows[0]);
    })

})

//handle a GET request to the given path, return json object
//join movie table with rating table
//should return the rating and review for movie  
/*app.get('/movies/:id/ratings', (req, res) => {
    client.query(`
    SELECT rating.rating, rating.review
    FROM movie
    JOIN rating ON movie.id = rating.movie_id
    WHERE movie.id = $1
    `, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(result.rows);
    });
});*/

/*
//trying to handle specific errors

/*client.query('SELECT * FROM movie', (err, result) => {
    if(err){
        if(err.code === 'ECONNREFUSED'){
        console.error('Connection to the database refused');
        res.status(500).send("An error occurred while connecting to the database");
        } else if (err.code === '42P01'){ //42P01 = undefined table in postgres error
        console.error('Table not found');
        res.status(500).send("Table not found in the database");
        } else { //general error
        console.error(err);
        res.status(500).send("An error occurred while processing your request");
        }
    } else { //if query was successful 
        res.json(result.rows);
    }
});*/

//define a error-handling middleware function
//function logs error message and stack trace to the console, sends responce with status code 500
/*const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (err.stack){
        console.error(err.stack);
    }
    res.status(500).send("An error occured");
};

app.use(errorHandler);*/