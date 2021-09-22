const express = require("express");
const DB = require("./data/DBActions.js");
const { port, host } = require("./config/appConfig");
const middleware = require("./middleware/reservations/getReservations");
const reservationRouter = require("./routers/reservationRouter");

const app = express();
const dbConnection = new DB();

app.use(express.json());
app.use(
  "/reservations",
  reservationRouter.createReservationRouter(
    middleware.createGetReservationsMiddleWare(dbConnection)
  )
);
app.listen(port, host, () => console.log(`listening on port ` + port));
