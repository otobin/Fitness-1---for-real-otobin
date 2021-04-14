// A static server using Node and Express
const express = require("express");
const app = express();

// make all the files in 'public' available on the Web
app.use(express.static("public"));


// when there is nothing following the slash in the url, return the main page of the app.
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/examples.html");
});

// a module to use instead of older body-parser; not needed yet, but very useful!
app.use(express.json());

// POST handler for /pastActivity
app.post('/pastActivity', function(request, response, next) {
  responseMessage = {message: "I received your POST request at /pastActivity"};
  response.send(JSON.stringify(responseMessage));
});

// POST handler for /futureActivity
app.post('/futureActivity', function(request, response, next) {
  responseMessage = {message: "I received your POST request at /futureActivity"};
  response.send(JSON.stringify(responseMessage));
});


// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});
