const express = require("express");
const {
  createCategoryQuery,
  getAllCategoriesQuery,
} = require("../config/sqlConfig");

const createCourseRouter = (dbConnection) => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const courses = await dbConnection.QueryData(getAllCategoriesQuery());
    res.json(courses);
  });

  router.post("/", async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name not given!" });
    } else {
      await dbConnection.QueryData(createCategoryQuery(name));
      res.status(201).send();
    }
  });

  return router;
};

module.exports = {
  createCourseRouter,
};
