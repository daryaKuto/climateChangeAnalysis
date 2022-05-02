const axios = require("axios").default;

const getZpid = (searchAddress, callback) => {
  //console.log(req.query)
  var queryString = searchAddress;
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
      console.log("should give metadata with zpid");
      console.log(response.data.results[0]);
      var metaData = response.data.results[0];
      callback(metaData);
    })
    .catch(error => {
      console.error(error);
    });
};

const getProperty = (inputPropertyZpid, callback) => {
  const options = {
    method: "GET",
    url: "https://zillow-zestimate.p.rapidapi.com/get-property",
    params: { zpid: `${inputPropertyZpid}` },
    headers: {
      "x-rapidapi-host": "zillow-zestimate.p.rapidapi.com",
      "x-rapidapi-key": "3f67dd59b8msh0bf1aa122e11ed2p1f34fdjsn22bc97f6840e",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log("should give property data");
      console.log(response.data);
      var propertyData = response.data;
      callback(propertyData);
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = { getZpid, getProperty };
