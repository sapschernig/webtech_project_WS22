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
client.connect();

// Check if the movie table already exists
client.query('SELECT * FROM information_schema.tables WHERE table_name = $1', ['movie'], (err, result) => {
    if (err) {
        console.log(err);
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
//return a json object containing a list of movies
app.get('/movies', (req, res) => {
    client.query('SELECT * FROM movie', (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json(result.rows);
    });
});

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


