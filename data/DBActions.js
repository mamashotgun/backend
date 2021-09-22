const { Pool, Client } = require("pg");

module.exports = class DatabaseActions {
  constructor() {
    this.client = new Client({
      user: "postgres",
      password: "Password1",
      host: "172.20.10.4",
      port: "5432",
      database: "Shotgun",
    });
    this.client.connect();
  }

  GetConnection() {
    return this.client.connect();
  }

  async QueryData(query) {
    let data;
    await this.client.query(query).then((res) => {
      console.log(res.rows);
      data = res.rows;
    });
    return data;
  }
};
