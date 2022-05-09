import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Images from "./Images.jsx";
import SearchBar from "./SearchBar.jsx";
import Modal from "./Modal.jsx";

const App = () => {
  //useState for display of information from api call
  const [searched, showModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  //default/placeholder
  const [results, setResults] = useState({
    county: "",
    heat: '',
    wet_bulb: '',
    farm_crop_yields: '',
    sea_level_rise: "",
    large_fires: "",
    economic_damage: "",
  });
  //update in listing
  const [property, setProperty] = useState({
    lat: "",
    lng: "",
    state: "",
    city: "",
    streetName: "",
    streetNumber: "",
    unitNumber: "",
    zipCode: "",
    zpid: "",
    zestimate: "Not yet evaluated",
    listed_price: "No price listed",
    squarefoot: "",
    bathrooms: "",
    bedrooms: "",
  });
  const [zpid, setZpid] = useState("");


  // official zillow api has been shut down in february 2021 and was not announced on their website (twitter only)
  // const searchZillowAPI = (addressInput) => {
  //   axios
  //     .get("/official-zillow-api", {
  //       params: {
  //         address: `${addressInput.address}`,
  //         citystatezip: `${addressInput.citystate}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  //RAPID API - Zillow Alternative
  // 1. use input address get zpid that it is listed under on zillow
  // 2. use zpid from first call to request property info


  //result from rapid api 1st call
  // "city": "San Francisco",
  // "country": "US",
  // "lat": 37.766056,
  // "lng": -122.426926,
  // "maloneId": 2082846611,
  // "state": "CA",
  // "streetName": "Dolores St",
  // "streetNumber": "200",
  // "unitNumber": "8",
  // "zipCode": "94103",
  // "zpid": 122064067

//results from second api call:
//   aamgnrc1: "200 Dolores St #8"
// aamgnrc2: "8"
// bd: "3"
// city: "San_Francisco"
// cnty: "San_Francisco"
// dma: "37"
// fsbid: "127"
// guid: "228c10d4-706a-440c-8d3c-4a33ec9e691d"
// listtp: "buy_agent"
// lot: "2"
// mlat: "37.766056"
// mlong: "-122.426926"
// oh: "yes"
// pid: "122064067"
// prange: "2_5-2_999m"
// premieragent: "no"
// price: "2950000"
// price_band: "z2m"
// proptp: "cnd"
// sqft: "2248"
// sqftrange: "2000-2499"
// ssid: "127"
// state: "CA"
// yrblt: "2010-2019"
// zestibuck: "2_5-2_999m"
// zestimate: "2987900"
// zip: "94103"
// zusr: "true"

  const searchZpid = (addressInput) => {
    var queryString = `${addressInput.address}, ${addressInput.citystate} ${addressInput.zipcode} `;
    console.log(queryString);
    axios
      .get("/zpid", { params: { searchString: `${queryString}` } })
      .then((res) => {
        console.log(res.data.metaData.zpid);
        var metaData = res.data.metaData;
        var propertyZpid = res.data.metaData.zpid;
        var house = metaData.unitNumber === undefined ? '' : metaData.unitNumber;
        setZpid(propertyZpid);
        setProperty((prevState) => ({
          ...prevState,
          streetNumber: `${metaData.streetNumber}`,
          streetName: `${metaData.streetName}`,
          unitNumber: `${house}`,
          city: `${metaData.city}`,
          state: `${metaData.state}`,
          zipCode: `${metaData.zipCode}`,
          lat: `${metaData.lat}`,
          lng: `${metaData.lng}`,
        }));
        getPropertyData(propertyZpid);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //Api does not support multiple calls per second, cannot execute second call
  const getPropertyData = (propertyZpid) => {
    axios
      .get("/getproperty", { params: { zpid: `${propertyZpid}` } })
      .then((res) => {
        console.log(res.data);
        var property = res.data.adTargets;
        var listedPrice = property.price === undefined ? "No price listed" : property.price;
        var zestimate = property.zestimate === undefined ? "Have not been evaluated" : property.zestimate;
        var squarefoot = property.sqft;
        setProperty((prevState) => ({
          ...prevState,
          listed_price: `$${listedPrice}`,
          zestimate: `${zestimate}` ,
          squarefoot: `${squarefoot}`,
          bedrooms: `${res.data.bedrooms}`,
          bathrooms: `${res.data.bathrooms}`,
        }));
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //  look up county by zipcode
  const searchByZip = (zip) => {
    axios
      .get("/county", { params: { zipcode: `${zip}` } })
      .then((res) => {
        //console.log(res.data);
        var results = res.data[0];
        setResults({
          county: `${results.county_name}`,
          heat: `${results.heat}`,
          wet_bulb: `${results.wet_bulb}`,
          farm_crop_yields: `${results.farm_crop_fields}`,
          sea_level_rise: `${results.sea_level_rise}`,
          large_fires: `${results.large_fires}`,
          economic_damage: `${results.economic_damage}`,
        });
        showModal(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    //flex rows
    <div className="main">
      <Header />
      <SearchBar
        searchByZip={searchByZip}
        // searchZillowAPI={searchZillowAPI}
        showModal={showModal}
        searchZpid={searchZpid}
        isLoading={isLoading}
        setLoading ={setLoading}
      />
      {searched ? <Modal isLoading ={isLoading} results={results} property={property} /> : null}
      <Images />
      <p className="note">
        Credit for all climate data listed above: Wet bulb, sea level rise, crop yield and economic damage data represent ranges of median probabilities for each county modeled by the
        Rhodium Group for each climate scenario between 2040 and 2060. Sources:
        Chi Xu, School of Life Sciences, Nanjing University (global human
        climate niche), Rhodium Group/Climate Impact Lab (wet bulb, heat, crop
        yields and economic damages), John Abatzoglou, University of California,
        Merced (very large fires). Noun Project icons by Adrien Coquet, Laymik
        and ProSymbols
      </p>
    </div>
  );
};

export default App;
