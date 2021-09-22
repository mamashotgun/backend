const express = require("express");
const DB = require("./data/DBActions.js");
const {
    port,
    host
} = require("./config/appConfig");
const reservationsMiddleware = require("./middleware/reservations/getReservations");
const { port, host } = require("./config/appConfig");
const reservationRouter = require("./routers/reservationRouter");
const coursesRouter = require("./routers/coursesRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const placesRouter = require("./routers/placesRouter");


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

app.use(
    "/places",
    placesRouter.createPlacesRouter(dbConnection)
);

app.listen(port, host, () => console.log(`listening on port ` + port));

app.use(
  "/categories",
  categoriesRouter.createCourseRouter(dbConnection)
);

app.listen(port, host, () => console.log(`listening on port ` + port));
app.use(
  "/categories",
  categoriesRouter.createCourseRouter(dbConnection)
);
app.listen(port, host, () => console.log(`listening on port ` + port));
