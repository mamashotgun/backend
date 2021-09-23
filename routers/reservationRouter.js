const express = require("express");
const {
  getReservationsQuery,
  createReservationQuery,
} = require("../config/sqlConfig");

const createReservationRouter = (dbConnection) => {
  const router = express.Router();

  const getReservationsByPlace = async (place_id) => {
    return dbConnection.QueryData(getReservationsQuery(place_id));
  };

  router.get("/", async (req, res) => {
    const place_id = req.query.place_id;

    if (!place_id || isNaN(place_id)) {
      res
        .status(400)
        .json({ message: "No place id given or was not a number!" });
    } else {
      const reservations = await getReservationsByPlace(place_id);
      res.json(reservations);
    }
  });

  const isBetween = (date, from, to) => {
    return date >= from && date <= to;
  };

  const isTimeAvailable = async (
    place_id,
    start_time,
    end_time,
    reservation_id
  ) => {
    let reservations = await getReservationsByPlace(place_id);
    const start_date = new Date(start_time);
    const end_date = new Date(end_time);

    if (reservation_id) {
      reservations = reservations.filter(
        (reservation) => reservation.reservation_id != reservation_id
      );
    }

    const result = reservations.every((reservation) => {
      return !(
        isBetween(start_date, reservation.start_time, reservation.end_time) ||
        isBetween(end_date, reservation.start_time, reservation.end_time)
      );
    });
    return result;
  };

  router.post("/", async (req, res) => {
    const { place_id, course_id, start_time, end_time } = req.body;

    if (await isTimeAvailable(place_id, start_time, end_time)) {
      const rows = await dbConnection.QueryData(
        createReservationQuery(place_id, course_id, start_time, end_time)
      );

      const id = rows[0].reservation_id;

      res.status(201).json({ id });
    } else {
      res.status(400).json({ message: "Time is not available" });
    }
  });

  router.post("/is_available", async (req, res) => {
    const { reservation_id, place_id, start_time, end_time } = req.body;

    if (!place_id || !reservation_id) {
      res.status(400).json({ error: "No place id provided!" });
    }

    res.send(
      await isTimeAvailable(place_id, start_time, end_time, reservation_id)
    );
  });

  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await dbConnection.QueryData(
      `DELETE FROM reservations WHERE reservation_id=${id}`
    );
    res.status(204).send();
  });

  return router;
};

module.exports = {
  createReservationRouter,
};
