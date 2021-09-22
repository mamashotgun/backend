const conn_params = {
    user: "postgres",
    password: "Password1",
    host: "172.20.10.4",
    port: "5432",
    database: "Shotgun",
};
const getReservationsQuery = (place_id) =>
  `SELECT reservation_id, c.course_id, is_admin, start_time, end_time, display_name FROM reservations r JOIN courses c ON r.course_id = c.course_id WHERE r.place_id = ${place_id}`;

const createReservationQuery = (place_id, course_id, start_time, end_time) =>
    `INSERT INTO reservations(place_id, course_id, start_time, end_time) VALUES (${place_id}, ${course_id}, '${start_time}', '${end_time}') RETURNING *`;

const getCourseQuery = (course_id) =>
    `SELECT * FROM courses where course_id=${course_id}`;

const createPlacesQuery = (name, location_id, category_id, description) =>
    `INSERT INTO places(name, location_id, category_id, description) VALUES ('${name}', ${location_id}, ${category_id}, '${description}') RETURNING *`;

const removePlacesQuery = (place_id) =>
    `DELETE FROM places WHERE place_id = ${place_id};`;

const createCourseQuery = (name, password, is_admin, display_name) =>
    `INSERT INTO courses(name, password ,is_admin, display_name) VALUES ('${name}', '${password}', ${is_admin}, '${display_name}')`;

const getPlacesQuery = (location_id, category_id) =>
    `SELECT * FROM places where location_id=${location_id} and category_id=${category_id}`;

const getAllCategoriesQuery = () => `SELECT * FROM categories`;

const createCategoryQuery = (name) =>
    `INSERT INTO categories(name) VALUES ('${name}')`;

module.exports = {
    conn_params,
    getReservationsQuery,
    getCourseQuery,
    createReservationQuery,
    createPlacesQuery,
    removePlacesQuery,
    getPlacesQuery,
    getPlacesQuery,
    createCourseQuery,
    createCategoryQuery,
    getAllCategoriesQuery,
};
