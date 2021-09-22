const express = require("express");
const DB = require("./data/DBActions.js");
const { port, host} = require("./config/appConfig");

const app = express();
const port = 3000;
const host = '0.0.0.0';

app.use(express.json());
app.listen(port, host, () => console.log(`listening on port ` + port));