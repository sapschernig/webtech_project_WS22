let express = require("express");
const app = express();
let path = require("path");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendStatus(200);
});

app.get("/:customText", (req, res) => {
  res

    .status(200)
    .send(`This is a simple application receiving${req.params.customText}`);
});

// TODO: provide the code to handle a route parameter

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);

const { Client } = require('pg');

// Connect to PostgreSQL
const client = new Client({
    user: 'your_username',
    host: 'your_host',
    database: 'movie_db',
    password: 'your_password',
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
                genre VARCHAR(255) NOT NULL,
                rating DECIMAL(3,1) NOT NULL
            );
        `)
    }
});
