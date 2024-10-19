const {Client} = require('pg')

const pool = new Client({
    user:'postgres',
    password:'dheerajprasad',
    host:'localhost',
    database :'React Project'
})

module.exports = pool;  