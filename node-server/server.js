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