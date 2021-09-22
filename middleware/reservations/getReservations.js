const { getReservationsQuery } = require("../../config/sqlConfig");

const createGetReservationsMiddleWare = (dbConnection) => {
  return async (req, res, next) => {
    const place_id = req.query.place_id;
    res.reservations = await dbConnection.QueryData(
      getReservationsQuery(place_id)
    );
    next();
  };
};

module.exports = {
  createGetReservationsMiddleWare,
};
