const { Pool, Client } = require("pg");
require("dotenv").config();


//another option:
// const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}:${process.env.PG_HOST}:${process.env.PG_PORT}:${process.env.PG_DATABASE}`;

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
}

//for heroku addon
const proConfig = {
  connectionString: process.env.DATABASE_URL,
}

const client = new Client(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

client.connect();

//1. find county from zipcode (zip_ca)
//2. find results by county from propublica


const getCounty = (zipObj, callback) => {
  var zipcode = zipObj.zipcode;
  console.log(zipcode);
  var countyQuery = `SELECT * FROM propublica WHERE county_name = (SELECT county_name FROM zips_ca WHERE zipcode = '${zipcode}');`
  client.query(countyQuery, (err, results) => {
    if (err) {
      console.log(`${err} : unable to retrieve products from the database`);
    } else {
      console.log('receiving data from posgre db:');
      console.log(results.rows)
      callback(null, results.rows);
        }
      })
};

module.exports = {getCounty}