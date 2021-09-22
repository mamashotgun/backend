const express = require("express");
const { getCoursesQuery, getCourseQuery } = require("../config/sqlConfig");
const { createCourseRouter } = require("./coursesRouter");

createCourseRouter(DBConnection) = (dbConnection) => {
    const router = express.router;
}

module.exports = {
    createCourseRouter,
  };