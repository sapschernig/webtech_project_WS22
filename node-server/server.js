let express = require("express");
const app = express();
let path = require("path");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendStatus(200).send("Test successful!");
});
create_login

/*app.get("/:customText", (req, res) => {

/*
app.get("/:customText", (req, res) => {

  res

    .status(200)
    .send(`This is a simple application receiving${req.params.customText}`);

});*/


// TODO: provide the code to handle a route parameter

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);

const { Client } = require('pg');

// Connect to PostgreSQL
//TODO check back with actual values
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

//return a json object containing a list of movies
app.get('/movies', (req, res) => {
    client.query('SELECT * FROM movie', (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(result.rows);
    });
});

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
app.get('/movies/:id/ratings', (req, res) => {
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
});

//trying to handle specific errors

client.query('SELECT * FROM movie', (err, result) => {
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
});

//define a error-handling middleware function
//function logs error message and stack trace to the console, sends responce with status code 500
const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (err.stack){
        console.error(err.stack);
    }
    res.status(500).send("An error occured");
};

app.use(errorHandler);