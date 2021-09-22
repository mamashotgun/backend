const { Pool, Client } = require('pg');
const config = require('../config/sqlConfig');

module.exports = class DatabaseActions {
    constructor() {
        this.client = new Client(config.conn_params);
        this.client.connect(err => {
            if (err) {
              console.error('connection error', err.stack)
            } else {
              console.log('connected')
            }
          })
    }

    async QueryData(query) {
        let data;
        await this.client.query(query)
            .then((res) => {
                console.log(res.rows);
                data = res.rows;
            });
        return data;
    }
}