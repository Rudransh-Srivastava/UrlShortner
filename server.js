const express = require("express");
urlRoutes = require('./src/routes/urlRoutes')
const connection = require('./config/db.config')
const app = express();

// loading environment variables
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded());

connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))
const port = process.env.PORT || 5000;

//Routing the requests;
app.use("/", urlRoutes);
app.listen(port, () => console.log(`Listening on port ${port}`));