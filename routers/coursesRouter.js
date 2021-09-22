const express = require("express");
const { getCoursesQuery, getCourseQuery } = require("../config/sqlConfig");

const createCourseRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async(req, res) => {
    const course_id = req.query.course_id;
    const courses = await dbConnection.QueryData(
      getCourseQuery(course_id)
    );
    res.json(courses)
  });

  router.post("/:id", (req, res) => {
    res.json(res.courses);
  });

  return router;
};

module.exports = {
  createCourseRouter,
};
