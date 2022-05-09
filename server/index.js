const path = require("path");
const psql = require("./database/queries.js");
const express = require("express");
const axios = require("axios").default;
const app = express();

const rapidApi = require('./rapidApi.js')
//process.env.PORT
const PORT = process.env.PORT || 3000;
//../../client/dist
//const staticPath = path.join(__dirname, "..", "/client/dist/")
const staticPath = path.join(__dirname, "..","/client/dist/");
//uncomment to see locally
//app.use(express.static(staticPath));

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(staticPath));

}


// get property overview params: zipcode
app.get("/county", (req, res) => {
  //console.log(req.query);
  var zipObj = req.query;
  psql.getCounty(zipObj, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//test properties
// 200 Dolores St #8, San Francisco, CA 94103
// 588 Minna St #501, San Francisco, CA 94103
//1095 Natoma St #1, San Francisco, CA 94103
//4040 Mantova Dr, Los Angeles, CA 90008

//works in postman
app.get("/zpid", (req, res) => {
  var queryString = req.query.searchString;
  var options = {
    method: "GET",
    url: "https://zillow-zestimate.p.rapidapi.com/search",
    params: { query: `${queryString}` },
    headers: {
      "x-rapidapi-host": "zillow-zestimate.p.rapidapi.com",
      "x-rapidapi-key": "3f67dd59b8msh0bf1aa122e11ed2p1f34fdjsn22bc97f6840e",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      // console.log("should give metadata with zpid");
      // console.log(response.data.results[0]);
      var metaData = response.data.results[0];
      res.status(200).send(metaData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(err);
    });
});

app.get("/getproperty", (req, res) => {
  var queryZpid = req.query.zpid;

  const options = {
    method: "GET",
    url: "https://zillow-zestimate.p.rapidapi.com/get-property",
    params: { zpid: `${queryZpid}` },
    headers: {
      "x-rapidapi-host": "zillow-zestimate.p.rapidapi.com",
      "x-rapidapi-key": "3f67dd59b8msh0bf1aa122e11ed2p1f34fdjsn22bc97f6840e",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      // console.log("should give property bathrooms and bedrooms");
      // console.log(response.data.property.bathrooms);
      // console.log(response.data.property.bedrooms);
      var propertyData = response.data.property;
      res.status(200).send(propertyData);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("*", (req, res) => {
  res.sendFile(staticPath)
});

app.listen(PORT, () => {
  console.log("Listening at http://localhost:3000 or " + PORT);
});
