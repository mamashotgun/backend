const express = require("express");
const cors = require("cors");
const DB = require("./data/DBActions");
const { port, host } = require("./config/appConfig");
const reservationRouter = require("./routers/reservationRouter");
const coursesRouter = require("./routers/coursesRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const placesRouter = require("./routers/placesRouter");
const locationRouter = require("./routers/locationRouter");
const logMiddleWare = require("./middleware/logger");

const app = express();
const dbConnection = new DB();

app.use(express.json());
app.use(cors());
app.use(logMiddleWare);

app.use(
  "/reservations",
  reservationRouter.createReservationRouter(dbConnection)
);

app.use("/courses", coursesRouter.createCourseRouter(dbConnection));

app.use("/places", placesRouter.createPlacesRouter(dbConnection));

app.use("/categories", categoriesRouter.createCourseRouter(dbConnection));

app.use("/locations", locationRouter.createLocationRouter(dbConnection));

app.listen(port, host, () => console.log(`listening on port ` + port));
