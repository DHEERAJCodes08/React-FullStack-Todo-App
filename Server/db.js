const {Client} = require('pg')

const pool = new Client({
    user:'process.env.DB_USER',
    password:'process.env.DB_PASS',
    host:'process.env.DB_HOST',
    database :'process.env.DB_DATABASE',
})

module.exports = pool;  