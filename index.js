const express = require("express");
const DB = require("./data/DBActions.js");
const { port, host } = require("./config/appConfig");
const reservationRouter = require("./routers/reservationRouter");
const coursesRouter = require("./routers/coursesRouter");


const app = express();
const dbConnection = new DB();

app.use(express.json());
app.use(
  "/reservations",
  reservationRouter.createReservationRouter(
    dbConnection,
  )
);
app.use(
  "/courses",
  coursesRouter.createCourseRouter(dbConnection)
);
app.listen(port, host, () => console.log(`listening on port ` + port));
