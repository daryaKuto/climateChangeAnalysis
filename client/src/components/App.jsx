import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import Images from "./Images.jsx";
import SearchBar from "./SearchBar.jsx";
import Modal from "./Modal.jsx";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import About from "./About.jsx";
import Multi from "./Multi.jsx";

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
    zestimate: "",
    livingAreaSqft: "",
    price: "",
    bathrooms: "",
    bedrooms: "",
    year: "",
    type: "",
    taxRate: "",
    hoinsurance: "",
    desc: "",
  });

  //tax history
  const [taxHist, setTaxHist] = useState([]);
  //price history
  const [priceHist, setPriceHist] = useState([]);
  //near by Homes
  const [nearByHomes, setNearByHomes] = useState([]);
  //near by schools
  const [nearBySchools, setNearBySchools] = useState([]);
  //resofacts (facts and features of interior)
  const [resoFacts, setResoFacts] = useState({});

  //zillow id
  const [zpid, setZpid] = useState("");

  //will re-render the component when searchbar is cleared
  const [rerender, setRerender] = useState(false);

  //flag if multiple listings under the same address
  const [multi, setMulti] = useState(false)
  const [properties, setProperties] = useState([]);

  

  //check for error input 
  const [addressError, setError] = useState(false)

  const searchZpid = (addressInput) => {
    axios
      .get("/zpid", { params: { searchString: `${addressInput}` } })
      .then((res) => {
        // for multiple listings under one address use: 184 7th St,San Francisco CA 94103 
        if (Array.isArray(res.data)) {
          console.log(res.data);
          showModal(false)
          setMulti(true)
          setProperties(res.data)
        } else if (Object.keys(res.data).length === 0) {
          showModal(false)
          console.log(res.data);
          //show error on input
          setError(true);
        } else {
          var propertyZpid = res.data.zpid;
          setZpid(propertyZpid);
          getPropertyData(propertyZpid);
        }
        //console.log(res.data);
        //need to set up flag for multiple address, call getPropertyData on each to get addresses
       
      })
      .catch(function (error) {
        console.error(error);
        setError(true)
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
        setError(true)
      });
  };

  //pass down to the stats to be able to reload with new address
  //add useEffect to reload upon change of zpid or address
  const getPropertyData = (propertyZpid) => {
    axios
      .get("/getproperty", { params: { zpid: `${propertyZpid}` } })
      .then((res) => {
        console.log(res.data);
        var resultProperty = res.data;
        //   "Not Listed"
        setProperty({
          state: `${
            resultProperty.address.state
              ? resultProperty.address.state
              : "Not Provided"
          }`,
          city: `${
            resultProperty.address.city
              ? resultProperty.address.city
              : "Not Provided"
          }`,
          streetAddress: `${
            resultProperty.address.streetAddress
              ? resultProperty.address.streetAddress
              : "Not Provided"
          }`,
          zipCode: `${
            resultProperty.address.zipcode
              ? resultProperty.address.zipcode
              : "Not Provided"
          }`,
          zpid: `${resultProperty.zpid ? resultProperty.zpid : "Not Provided"}`,
          zestimate: `${
            resultProperty.zestimate ? resultProperty.zestimate : "Not Provided"
          }`,
          livingAreaSqft: `${
            resultProperty.livingArea
              ? resultProperty.livingArea
              : "Not Provided"
          }`,
          price: `${
            resultProperty.price ? resultProperty.price : "Not Provided"
          }`,
          bathrooms: `${
            resultProperty.bathrooms ? resultProperty.bathrooms : "Not Provided"
          }`,
          bedrooms: `${
            resultProperty.bedrooms ? resultProperty.bedrooms : "Not Provided"
          }`,
          year: `${
            resultProperty.yearBuilt ? resultProperty.yearBuilt : "Not Provided"
          }`,
          type: `${
            resultProperty.homeType ? resultProperty.homeType : "Not Provided"
          }`,
          taxRate: `${
            resultProperty.propertyTaxRate
              ? resultProperty.propertyTaxRate
              : "Not Provided"
          }`,
          hoinsurance: `${
            resultProperty.annualHomeownersInsurance
              ? resultProperty.annualHomeownersInsurance
              : "Not Provided"
          }`,
          desc: `${
            resultProperty.description
              ? resultProperty.description
              : "Not Provided"
          }`,
        });

        setTaxHist(resultProperty.taxHistory);

        setPriceHist(resultProperty.priceHistory);

        setNearByHomes(resultProperty.nearbyHomes);

        setNearBySchools(resultProperty.schools);

        setResoFacts(resultProperty.resoFacts);
        setTimeout(() => {
          getPropertyImages(propertyZpid);
          showModal(true);
        }, 1500);
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
    <div className="main">
      <Header />
      <Nav />
      <SearchBar
        searchByZip={searchByZip}
        showModal={showModal}
        searchZpid={searchZpid}
        isLoading={isLoading}
        setLoading={setLoading}
        rerender={rerender}
        setRerender={setRerender}
        searched={searched}
        results={results}
        property={property}
        images={images}
        taxHist={taxHist}
        priceHist={priceHist}
        nearByHomes={nearByHomes}
        nearBySchools={nearBySchools}
        resoFacts={resoFacts}
        zpid = {zpid}
        setZpid = {setZpid}
        multi = {multi}
        setMulti = {setMulti}
        properties = {properties}
        setError = {setError}
        addressError = {addressError}
        getPropertyData = {getPropertyData}
      />
      {addressError ? <div>
        <h3>Hmm..can't find the address you are looking for, check and try again!</h3>
      </div> : null}
      {/* uncomment line below and loader in modal */}
     
      <About />
      <Footer />
    </div>
  );
};

export default App;
