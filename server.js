// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;
app
  .listen(port, process.env.port || 3000, () =>
    console.log(`Server running on port ${port}`)
  )
  .on('error', err => console.log(`Error: ${err.message}`));

// Callback to debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Initialize all route with a callback function
app.get('/', (req, res) => {
  res.send(projectData);
});

// Callback function to complete GET '/all'
app.get('/all', async (req, res) => {
  console.log(projectData);
  res.send(projectData);
});
// Post Route

app.post('/add', async (req, res) => {
  const body = await req.body;
  projectData = body;
  console.log(projectData);
  res.status(200).send(projectData);
});
