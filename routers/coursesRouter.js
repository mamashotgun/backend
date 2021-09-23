const express = require("express");
const { getCourseQuery, createCourseQuery } = require("../config/sqlConfig");

const createCourseRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const course_id = req.query.course_id;
    const courses = await dbConnection.QueryData(getCourseQuery(course_id));
    res.json(courses);
  });

  router.post("/", async (req, res) => {
    const { name, password, is_admin, display_name } = req.body;
    const rows = await dbConnection.QueryData(
      createCourseQuery(name, password, is_admin, display_name)
    );
    res.status(201).json(rows[0]);
  });

  router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).send("Invalid request");
    } else {
      const rows = await dbConnection.QueryData(
        `SELECT * FROM courses WHERE name='${name}'`
      );
      if (rows.length > 0) {
        const course = rows[0];

        if (course.password === password) {
          res.json(course);
        } else {
          res.status(403).send();
        }
      } else {
        res.status(404).send();
      }
    }
  });

  return router;
};

module.exports = {
  createCourseRouter,
};
