import React, { useEffect, useState } from "react";
import {MdLocalFireDepartment} from 'react-icons/md'
import {BiWater} from 'react-icons/bi'
import {FaSeedling} from 'react-icons/fa'
import {BsThermometerSun} from 'react-icons/bs'
import {AiOutlineDollar} from 'react-icons/ai'
import {SiRainmeter} from 'react-icons/si';
import {SiZillow} from 'react-icons/si'
import Images from './Images.jsx'
import modalCSS from './modal.css';
//title and intro text
const Modal = ({ results, property , isLoading, images}) => {

  if (isLoading) {
    return (
      <div className= "modal">
        <h3>FETCHING PROPERTY INFO</h3>
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      </div>
    )
  }
  return (
    <section id="results" className="results">
    <div className="modal">
      <h2>Here is prediction for your zipcode: {results.county}</h2>
      <h3>Once a scale 1 to 10 from least extreme to most</h3>
      <div className="stats">
        {/* <img className="logo" src={heat_logo} alt="Heat"></img> */}
        <p>  <BsThermometerSun  className="logo"/>Heat: {results.heat}</p>
        {/* <img className="logo" src={wetbulb_logo} alt="wet_bulb"></img> */}
        <p>  <SiRainmeter className="logo"/>Wet Bulb: {results.wet_bulb}</p>
        {/* <img className="logo" src={crops_logo} alt="crops"></img> */}
        <p>  <FaSeedling  className="logo"/>Farm Crop Yields: {results.farm_crop_yields}</p>
        <p> <BiWater  className="logo"/>Sea Level Rise: {results.sea_level_rise}</p>
        <p> <MdLocalFireDepartment className="logo" />Very Large Fires: {results.large_fires}</p>
        <p> <AiOutlineDollar  className="logo"/>Economic Damage: {results.economic_damage}</p>
      </div>
      <div className="property_info">
        <h3>Property information provided by Zillow: <SiZillow /></h3>
        <Images images = {images}/>
        <p className = 'zillow_stats'>Address: {property.streetNumber} {property.streetName} {property.unitNumber} </p>
        <p className='zillow_stats'>City: {property.city}</p>
        <p className='zillow_stats'>State: {property.state}</p>
        <p className='zillow_stats'>Zipcode: {property.zipCode}</p>
        <p className='zillow_stats'>Coordinates: {property.lat}, {property.lng}</p>
        <p className = 'zillow_stats'>Zestimate of current value $: {property.zestimate}</p>
        <p className='zillow_stats'>Asking Price: {property.listed_price}</p>
        <p className='zillow_stats'>Squarefoot: {property.squarefoot}</p>
        <p className='zillow_stats'>Bedrooms: {property.bedrooms}</p>
        <p className='zillow_stats'>Bathrooms: {property.bathrooms}</p>
      </div>
      <div>Tax Info</div>
    </div>
    </section>
  );
};

export default Modal;
