const { Pool, Client } = require("pg");
// const pool = new Pool({
//   user: "daryakutovaya",
//   host: "localhost", //127.0.0.1
//   database: "climate_change",
//   password: "password",
//   port: 5432,
// });

const client = new Client({
  user: "daryakutovaya",
  host: "localhost",
  database: "climate_change",
  password: "password",
  port: 5432,
});

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
      //console.log('receiving data from posgre db:');
      //console.log(results.rows)
      callback(null, results.rows);
        }
      })
};

module.exports = {getCounty}