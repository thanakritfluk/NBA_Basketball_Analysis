const { Pool } = require('pg')
const pool = new Pool({
  user: 'nba',
  host: 'localhost',
  database: 'nba',
  password: 'nba',
  port: 5432,
});

const db = {
  query: async (text, params) => {
    return pool.query(text, params);
  }
}

module.exports = db;
