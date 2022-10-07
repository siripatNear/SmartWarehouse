const Pool = require('pg').Pool;

const pool = new Pool({
    
    user: "postgres",
    password: "Slth_1811",
    host: "localhost",
    port: 5432,
    database: "smartwarehouse"

});

module.exports = {
    query:(text, params) => pool.query(text, params),
};