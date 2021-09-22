const express = require("express");
const { getReservationsQuery, createReservationQuery } = require("../config/sqlConfig");

const createReservationRouter = (dbConnection) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        const place_id = req.query.place_id;
        const reservations = await dbConnection.QueryData(
            getReservationsQuery(place_id)
        );
        res.json(reservations);
    });

    router.post("/", async (req, res) => {
        const { place_id, course_id, start_time, end_time } = req.body;
        await dbConnection.QueryData(
            createReservationQuery(place_id, course_id, start_time, end_time)
        );
        res.status(201).send();
    });

    router.delete("/:id", async (req, res) => {
        const id = req.params.id;
        await dbConnection.QueryData(`DELETE FROM reservations WHERE reservation_id=${id}`);
        res.status(204).send();
    });

    return router;
};

module.exports = {
    createReservationRouter,
};
