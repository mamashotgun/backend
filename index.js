const express = require("express");
const DB = require("./DBActions.js");
const { port, host } = require("./config/appConfig");

const app = express();

app.use(express.json());
app.listen(port, host, () => console.log(`listening on port ` + port));
