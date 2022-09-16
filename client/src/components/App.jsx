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
  const [nearByHomes, setNearByHomes] = useState([])
  //near by schools
  const [nearBySchools, setNearBySchools] = useState([])
  //resofacts (facts and features of interior)
  const [resoFacts, setResoFacts] = useState({})

  //zillow id
  const [zpid, setZpid] = useState("");

  //will re-render the component when searchbar is cleared
  const [rerender, setRerender] = useState(false);

  // useEffect(() => {
  // This effect uses the `value` variable,
  // so it "depends on" `value`.

  // }, [rerender])  // pass `value` as a dependency

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


  //pass down to the stats to be able to reload with new address
  //add useEffect to reload upon change of zpid or address
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
          zpid: `${resultProperty.zpid}`,
          zestimate: `${resultProperty.zestimate}`,
          livingAreaSqft: `${resultProperty.livingArea}`,
          price: `${resultProperty.price}`,
          bathrooms: `${resultProperty.bathrooms}`,
          bedrooms: `${resultProperty.bedrooms}`,
          year: `${resultProperty.yearBuilt}`,
          type: `${resultProperty.homeType}`,
          taxRate: `${resultProperty.propertyTaxRate}`,
          hoinsurance: `${resultProperty.annualHomeownersInsurance}`,
          desc: `${resultProperty.description}`,
        });
        setTaxHist(resultProperty.taxHistory);
        if (Array.isArray(resultProperty.priceHistory)) {
          setPriceHist(resultProperty.priceHistory);
        } else {
          setPriceHist(["None Provided"]) 
        }
        setNearByHomes(resultProperty.nearbyHomes);
        setNearBySchools(resultProperty.schools);
        setResoFacts(resultProperty.resoFacts);
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
        taxHist = {taxHist}
        priceHist ={priceHist}
        nearByHomes = {nearByHomes}
        nearBySchools = {nearBySchools}
        resoFacts = {resoFacts}
      />
      {/* uncomment line below and loader in modal */}
      {/* {searched ? (
        <Modal
          searchByZip={searchByZip}
          showModal={showModal}
          searched={searched}
          searchZpid={searchZpid}
          setLoading={setLoading}
          rerender={rerender}
          setRerender={setRerender}
          isLoading={isLoading}
          results={results}
          property={property}
          images={images}
        />
      ) : null} */}
      {/* <Modal
          searchByZip={searchByZip}
          showModal={showModal}
          searched={searched}
          searchZpid={searchZpid}
          setLoading={setLoading}
          rerender={rerender}
          setRerender={setRerender}
          isLoading={isLoading}
          results={results}
          property={property}
          images={images}
        /> */}
      {/* <Images images={images} /> */}
      <About />
      <Footer />
    </div>
  );
};

export default App;
