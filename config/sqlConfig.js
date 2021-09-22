const getReservationsQuery = (place_id) =>
  `SELECT * FROM reservations where place_id=${place_id}`;

module.exports = {
  getReservationsQuery,
};
