const {
    Pool,
    Client
} = require('pg');
const config = require('../config/sqlConfig');

module.exports = class DatabaseActions {
    constructor() {
        this.pool = new Pool();
        this.client = new Client(config.conn_params);
        this.client.connect();
    }

    GetConnection() {
        return this.client.connect();
    }

    async QueryData(query) {
        // let conn = this.GetConnection();
        let data;
        await this.client.query(query)
            .then((res) => {
                console.log(res.rows);
                data = res.rows;
            });
        return data;
    }
}