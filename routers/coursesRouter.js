const express = require("express");
const {
    getCourseQuery,
    createCourseQuery
} = require("../config/sqlConfig");

const createCourseRouter = (dbConnection) => {
    const router = express.Router();

    router.get("/", async (req, res) => {
        const course_id = req.query.course_id;
        const courses = await dbConnection.QueryData(
            getCourseQuery(course_id)
        );
        res.json(courses)
    });

    router.post("/", async (req, res) => {
        const {
            name,
            password,
            is_admin, 
            display_name
        } = req.body;
        await dbConnection.QueryData(
            createCourseQuery(name, password, is_admin ,display_name)
        );
        res.status(201).send();
    });

    return router;
};

module.exports = {
    createCourseRouter,
};