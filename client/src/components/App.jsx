import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Images from "./Images.jsx";
import SearchBar from "./SearchBar.jsx";
import Modal from "./Modal.jsx";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import About from "./About.jsx";

const App = () => {
  //useState for display of information from api call
  const [searched, showModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [images, setImages] = useState([]);
  //default/placeholder
  const [results, setResults] = useState({
    county: "",
    heat: "",
    wet_bulb: "",
    farm_crop_yields: "",
    sea_level_rise: "",
    large_fires: "",
    economic_damage: "",
  });
  //update in listing
  const [property, setProperty] = useState({
    state: "",
    city: "",
    streetAddress: "",
    zipCode: "",
    zpid: "",
  });
  const [zpid, setZpid] = useState("");

  const searchZpid = (addressInput) => {
    axios
      .get("/zpid", { params: { searchString: `${addressInput}` } })
      .then((res) => {
        console.log(res.data);
        var propertyZpid = res.data.zpid;
        setZpid(propertyZpid);
        getPropertyData(propertyZpid);
        setTimeout(() => {
          getPropertyImages(propertyZpid);
          showModal(true);
        }, 1000);
      })
      .catch(function (error) {
        console.error(error);
      });
    
  };

  const getPropertyImages = (zpid) => {
    axios
      .get("/getimages", { params: { zpid: `${zpid}` } })
      .then((res) => {
        console.log(res.data);
        setImages(res.data.images);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const getPropertyData = (propertyZpid) => {
    axios
      .get("/getproperty", { params: { zpid: `${propertyZpid}` } })
      .then((res) => {
        console.log(res.data);
        var resultProperty = res.data;
        setProperty({
        state: `${resultProperty.address.state}`,
        city: `${resultProperty.address.city}`,
        streetAddress: `${resultProperty.address.streetAddress}`,
        zipCode: `${resultProperty.address.zipcode}`,
        zpid: `${zpid}`,
       })
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
        // showModal(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    //flex rows
    <div className="main">
      <Header />
      <Nav />
      <SearchBar
        searchByZip={searchByZip}
        showModal={showModal}
        searched={searched}
        searchZpid={searchZpid}
        isLoading={isLoading}
        setLoading={setLoading}
      />
      {searched ?<Modal isLoading={isLoading} results={results} property={property} images = {images} /> : null}
      {/* <Modal isLoading={isLoading} results={results} property={property} images = {images} /> */}
      {/* <Images images={images} /> */}
      <About />
      <Footer />
    </div>
  );
};

export default App;
