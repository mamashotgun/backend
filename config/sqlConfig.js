const conn_params = {
    user: 'postgres',
    password: 'Password1',
    host: '172.20.10.4',
    port: '5432',
    database: 'Shotgun'
}
const getReservationsQuery = (place_id) =>
    `SELECT * FROM reservations where place_id=${place_id}`;

const createReservationQuery = (place_id, course_id, start_time, end_time) =>
    `INSERT INTO reservations(place_id, course_id, start_time, end_time) VALUES (${place_id}, ${course_id}, '${start_time}', '${end_time}') RETURNING *`;

const getCourseQuery = (course_id) =>
    `SELECT * FROM courses where course_id=${course_id}`;

const createPlacesQuery = (name, location_id, category_id) =>
    `INSERT INTO places(name, location_id, category_id) VALUES('${name}', ${location_id}, ${category_id})`;

const createPlacesQuery = (location_id) =>
    `SELECT * FROM places where location_id=${location_id}`;

const removePlacesQuery = (place_id) =>
    `DELETE FROM places WHERE place_id = ${place_id};`


module.exports = {
    conn_params,
    getReservationsQuery,
    getCourseQuery,
    createReservationQuery,
    createPlacesQuery,
    removePlacesQuery
};