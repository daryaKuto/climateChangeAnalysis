import React, { useEffect, useState } from "react";
import { MdLocalFireDepartment } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import { FaSeedling } from "react-icons/fa";
import { BsThermometerSun } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import { SiRainmeter } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai";
import { GiModernCity } from "react-icons/gi";
import { BiMapPin } from "react-icons/bi";
import { SiZillow } from "react-icons/si";
import { MdConstruction } from "react-icons/md";
import { MdLocationCity } from "react-icons/md";
import { MdOutlineOtherHouses } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { FaBath } from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Images from "./Images.jsx";
import modalCSS from "./modal.css";
import SearchBar from "./SearchBar.jsx";
import Stats from "./Stats.jsx";
//title and intro text
const Modal = ({
  searchByZip,
  searchZpid,
  showModal,
  searched,
  setLoading,
  rerender,
  setRerender,
  results,
  property,
  isLoading,
  images,
  setFullAddress,
  taxHist,
  priceHist,
  nearByHomes,
  nearBySchools,
  resoFacts,
  setNeighborFlag,
  handleSearch,
  clearInputFields,
  fullAddress,
  setUnit ,
          setStreet ,
}) => {
  if (isLoading) {
    return (
      <div className="modal">
        <h3>Loading...</h3>
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      </div>
    );
  }
  return (
    <div id="results">
      {/* {searched ? ( */}
      <div className="results">
        <h2>Here is prediction for your zipcode: </h2>
        <h3 id = "county">{results.county}</h3>
        <h3>Once a scale 1 to 10 from least extreme to most</h3>
        <div className="stats">
          <div className="indv_stats">
            <BsThermometerSun className="logo" />
            <p> Heat: {results.heat}</p>
          </div>
          <div className="indv_stats">
            <SiRainmeter className="logo" />
            <p> Humidity: {results.wet_bulb}</p>
          </div>
          <div className="indv_stats">
            <FaSeedling className="logo" />
            <p> Crop Yields: {results.farm_crop_yields}</p>
          </div>
          <div className="indv_stats">
            <BiWater className="logo" />
            <p> Sea Level Rise: {results.sea_level_rise}</p>
          </div>
          <div className="indv_stats">
            <MdLocalFireDepartment className="logo" />
            <p> Very Large Fires: {results.large_fires}</p>
          </div>
          <div className="indv_stats">
            <AiOutlineDollar className="logo" />
            <p> Economic Damage: {results.economic_damage}</p>
          </div>
        </div>
        <div className="property_info">
          <h3>
            Property information provided by Zillow: <SiZillow />
          </h3>
          <Images images={images} />
          <h2>Facts and Features</h2>
          <Stats
            property={property}
            taxHist={taxHist}
            priceHist={priceHist}
            nearByHomes={nearByHomes}
            nearBySchools={nearBySchools}
            resoFacts={resoFacts}
            setFullAddress={setFullAddress}
            setRerender={setRerender}
            setNeighborFlag ={setNeighborFlag}
            handleSearch = {handleSearch}
            clearInputFields = {clearInputFields}
            fullAddress = {fullAddress}
            setUnit = {setUnit}
            setStreet = {setStreet}
            searchByZip={searchByZip}
          searchZpid={searchZpid}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
