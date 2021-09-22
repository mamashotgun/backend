const express = require("express");

const createReservationRouter = (getReservationsMiddleware) => {
  const router = express.Router();

  router.get("/", getReservationsMiddleware, (req, res) => {
    res.json(res.reservations);
  });

  return router;
};

module.exports = {
  createReservationRouter,
};
