//import required modules
const express = require("express");
const {Client} = require('pg');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const crypto = require('crypto');
const SESSION_COOKIE_NAME = 'my-session-cookie';
const SESSION_EXPIRATION_TIME_MS = 3600000; // 1 hour in milliseconds



//body parsing mw to handle incoming JSON data
const bodyParser = require('body-parser');

//create instance of Express.js app
const app = express();
let path = require("path");
app.use(express.static("public"));
const http = require('http');
const { MemoryStore } = require("express-session");
const { AsyncLocalStorage } = require("async_hooks");



//const { getUserById, authenticateUser} = require('./database');

// Connect to PostgreSQL
//TODO check back with actual values
//login data for my local database - may differ
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    // create_login


    database: 'moviedb',
    password: '****',


    port: 5432,
});


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//session middleware
app.use(session({
    store: new pgSession({
        pool: client,
        tableName: 'sessions',
    }),
    secret: 'Jf8gZw$6c%hVpTqA', //secret key
    resave: false,
    saveUninitialized: false,
    cookie: { 
        name: process.env.SESSION_COOKIE_NAME || 'sessionId',
        maxAge: process.env.SESSION_EXPIRATION_TIME_MS || 86400000, // 1 day
        httpOnly: true,
        secure: false } //true falls https
}));

  /*const session = await client.query(
    'SELECT * FROM sessions WHERE sid = $1 AND expire > $2',
    [sessionId, new Date()]
  );*/
  

app.get("/", function (req, res) {
  res.sendStatus(200).send("Test successful!");
});

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);


// Connect to PostgreSQL
//TODO check back with actual values
//login data for my local database - may differ
/*const client = new Client({
    user: 'postgres',
    host: 'localhost',
    // create_login
    database: 'moviedb2',
    password: 'Benjamin89',
    port: 5432,
});*/


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

//authenticate Function
async function authenticateUser(email, password) {
  try {
    const result = await client.query('SELECT * FROM customer WHERE email = $1 AND password = $2', [email, password]);
    const user = result.rows[0] || null;
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
    return user;
  } catch (err) {
    console.error('Error authenticating user:', err);
    return null;
  }
}
  
function generateSessionId() {
    // Create a random session ID
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return sessionId;
}

function getUserById(userId){
  return client.query('SELECT * FROM customer WHERE id = $1', [userId])
    .then(result => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.error('Error retrieving user:', err);
      return null;
    });
}

app.get('/api/account', async (req, res) => {
  // Check if user is logged in
  if (!req.session.userId) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  try {
    // Fetch user data from database
    const userId = req.session.userId;
    const user = await getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Verify user credentials
  const user = await authenticateUser(email, password);

  if (user) {
    // Save user ID to session
    req.session.userId = user.id;

    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// protected endpoint - requires authentication
app.get('/api/mytickets', async (req, res) => {
  // Check if user is logged in
  if (!req.session.userId) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  try {
    // Fetch user data from database
    const userId = req.session.userId;
    const user = await getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//logout endpoint
app.post('/api/logout', (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } 
    res.redirect('/login');
    }
  );
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

/*client.connect()
    .then(()=> console.log('Connected to database'))
    .catch(err => console.log('Error connecting to database', err.stack));*/


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

app.get('/api/movies/:movieId/duration', (req, res) => {
  const movieId = req.params.movieId;

  db.query('SELECT duration FROM movie WHERE id = ?', [movieId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: `Movie with id ${movieId} not found` });
      } else {
        const duration = results[0].duration;
        res.json({ duration });
      }
    }
  });
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

  app.get('/api/theater', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM theater');
      res.send(rows);
      
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.get('/api/theater/:id', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM theater WHERE id = $1', [req.params.id]);
      if (rows.length > 0) {
        res.send(rows[0]);
        
      } else {
        res.status(404).send('Theater not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  app.post('/api/check-availability', async (req, res) => {
    const { query, values } = req.body;
    console.log('checkAvailability called with', query, values);
    try {
        const { rows } = await client.query(query, values);
        const count = parseInt(rows[0].count);
        console.log('checkAvailability response', count);
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});


  app.post('/api/theater/add', async (req, res) => {
    // Validate and sanitize the input
    const { name, capacity, features } = req.body;
    const errors = [];
    if (!name) {
      errors.push('Name is required');
    }
    if (!capacity) {
      errors.push('Capacity is required');
    }
    if (!Array.isArray(features)) {
      errors.push('Features must be an array');
    } else {
      features.forEach((feature, i) => {
        if (typeof feature !== 'string' || !feature.trim()) {
          errors.push(`Feature ${i + 1} is invalid`);
        }
      });
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const sanitizedFeatures = features.map(feature => feature.trim());
  
    // Insert the theater into the database
    try {
      const result = await client.query(
        'INSERT INTO theater (name, capacity, features) VALUES ($1, $2, $3) RETURNING id',
        [name, capacity, sanitizedFeatures]
      );
      const newTheaterId = result.rows[0].id;
      return res.status(201).json({ id: newTheaterId });
    } catch (error) {
      console.error('Error inserting theater:', error);
      return res.sendStatus(500);
    }
  });



  app.put('/api/theater/:id', async (req, res) => {
    const theaterId = parseInt(req.params.id);
    const updatedTheater = req.body;
    let found = false;
    
    try {
      const { rows } = await client.query('SELECT * FROM theater WHERE id = $1', [theaterId]);
      if (rows.length > 0) {
        const theater = rows[0];
        await client.query('UPDATE theater SET name = $1, capacity = $2, features = $3 WHERE id = $4',
          [updatedTheater.name, updatedTheater.capacity, updatedTheater.features, theaterId]);
        found = true;
        res.status(200).json(updatedTheater);
      } else {
        res.status(404).send('Theater not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  
  
  app.delete('/api/theater/:id', async (req, res) => {
    const theaterId = parseInt(req.params.id);
    
    try {
      const { rows } = await client.query('SELECT * FROM theater WHERE id = $1', [theaterId]);
      if (rows.length > 0) {
        const theaterShows = await client.query('SELECT * FROM showtimes WHERE theater_id = $1', [theaterId]);
        
        if (theaterShows.rows.length > 0) {
          res.status(409).send('Theater has associated shows and cannot be deleted');
        } else {
          await client.query('DELETE FROM theater WHERE id = $1', [theaterId]);
          res.status(204).send(); // 204 means "No Content"
        }
      } else {
        res.status(404).send('Theater not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
 
app.delete('api/showtimes/:id', (req, res) => {
  const id = req.params.id;
  Showtime.findByIdAndDelete(id, (err, showtime) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else if (!showtime) {
      res.status(404).send(`Showtime with ID ${id} not found`);
    } else {
      res.sendStatus(204); // Successful deletion - no content to send
    }
  });
});
  
  
  

  app.get('/api/rating', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM rating');
      res.send(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.get('/api/theater', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM theater');
      res.send(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.get('/api/ticket', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM ticket');
      res.send(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  app.get('/api/seat', async (req, res) => {
    try {
      const { rows } = await client.query('SELECT * FROM seat');
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

app.post('/api/movies', async (req, res) => {
  try {
    const { title, release_date, duration, age_restriction, genre, description } = req.body;
    console.log(req.body);

    // Insert the movie data into the "movie" table
    const query = 'INSERT INTO movie(title, release_date, duration, genre, description, age_restriction) VALUES($1, $2, $3, $4, $5, $6)';
    const values = [title, release_date, duration, genre, description, age_restriction];
    console.log(values);

    await client.query(query, values);
    
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/showtimes', (req, res) => {
  const { movie_id, theater_id, start_time, date } = req.body;
  if (!movie_id || !theater_id || !start_time || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query = `INSERT INTO showtimes (movie_id, theater_id, start_time, date) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`;
  const values = [movie_id, theater_id, start_time, date];
  console.log(values);

  client.query(query, values, (err, result) => {
    if (err) {
      console.log(err.message);
      console.log(err.stack);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Showtime added successfully!'});
    }
  });
});


app.post('/api/ticket', async (req, res) => {
  try {
    const { id, price, show_id, seat_id, customer_id } = req.body;
    console.log(req.body);

    // Insert the movie data into the "movie" table
    const query = 'INSERT INTO ticket(id, price, show_id, seat_id, customer_id) VALUES($1, $2, $3, $4, $5)';
    const values = [id, price, show_id, seat_id, customer_id];
    console.log(values);


    await client.query(query, values);
    
    res.status(201).json({ message: 'Ticket added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/deleteTicket', (req, res) => {
  const id = req.body.id;
  

  client.query('DELETE FROM ticket WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.send(`Deleted ${result.rowCount} record(s)`);
  });
});


app.post('/api/deleteShowtime', (req, res) => {
  const id = req.body.id;
  

  client.query('DELETE FROM showtimes WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.send(`Deleted ${result.rowCount} record(s)`);
  });
});

  

app.post('/api/deleteMovie', (req, res) => {

  const id = req.body.id;
  

  client.query('DELETE FROM movie WHERE id = $1', [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.send(`Deleted ${result.rowCount} record(s)`);
  });
});



// Edit customer endpoint
/*app.put('/api/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address, city, zipCode, country } = req.body;

    // Update the customer in the database
    const result = await db.query(
      'UPDATE customers SET first_name=$1, last_name=$2, email=$3, phone=$4, address=$5, city=$6, zip_code=$7, country=$8 WHERE id=$9 RETURNING *',
      [firstName, lastName, email, phone, address, city, zipCode, country, id]
    );

    // Send the updated customer data back to the client
    const updatedCustomer = result.rows[0];
    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/






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