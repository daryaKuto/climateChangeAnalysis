const { Pool, Client } = require("pg");
require("dotenv").config();

//PREV VERSION
// const devConfig = {
//   user: 'daryakutovaya' || process.env.PG_USER,
//   host: 'localhost' || process.env.PG_HOST,
//   database: 'climate_change' || process.env.PG_DATABASE,
//   password: 'password' || process.env.PG_PASSWORD,
//   port: process.env.PG_PORT || 5432,
// }

// const client = new Client(
//   process.env.NODE_ENV === "production" ? proConfig : devConfig
// );

// client.connect();
/*
// "start": "nodemon server/index.js",
    // "heroku-postbuild": "npm install && npm run react-dev",
    // "react-dev": "webpack --config ./webpack.config.js  -w"
*/

//HEROKU VERSION


const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const client = new Client(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

client.connect();

//1. find county from zipcode (zip_ca)
//2. find results by county from propublica


const getCounty = (zipObj, callback) => {
  var zipcode = zipObj.zipcode;
  console.log(zipcode);
  var countyQuery = `SELECT * FROM propublica_full WHERE county_name = (SELECT county_name FROM zips_full WHERE zipcode = '${zipcode}');`
  client.query(countyQuery, (err, results) => {
    if (err) {
      console.log(`${err} : unable to retrieve results from the database`);
    } else {
      console.log('receiving data from posgre db:');
      console.log(results.rows)
      callback(null, results.rows);
        }
      })
};

module.exports = {getCounty}