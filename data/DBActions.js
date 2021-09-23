const { Client } = require("pg");

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
    try {
      const result = await this.client.query(query);
      return result.rows;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
};
