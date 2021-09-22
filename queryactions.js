const { Pool, Client } = require('pg');

class QueryActions {
    constructor() {
        const pool = new Pool();
        const client = new Client({
            user: 'postgres',
            password: 'Password1',
            host: '172.20.10.4:',
            port: '5432',
            database: 'Shotgun'
        })
    }

    GetConnection() {
        return client.connect();
    }

    QueryData(query) {
        let data = pool.query(query, (err, res) => {
            console.log(err, res);
            pool.end();
        })
        console.log(data);
    }
}