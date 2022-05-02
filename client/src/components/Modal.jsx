import React, { useEffect, useState } from "react";
import heat_logo from "../images/heat_logo.png";
import sea_logo from "../images/sea_logo.png";
import crops_logo from "../images/crops_logo.png";
import econ_logo from "../images/econ_logo.png";
import fire_logo from "../images/fire_logo.png";
import wetbulb_logo from "../images/wetbulb_logo.png";
import zillow_logo from "../images/zillow_logo.png"

//title and intro text
const Modal = ({ results, property , isLoading}) => {

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
    <div className="modal">
      <h2>Here is prediction for your zipcode: {results.county}</h2>
      <h3>Once a scale 1 to 10 from least extreme to most</h3>
      <div className="stats">
        <img className="logo" src={heat_logo} alt="Heat"></img>
        <p>Heat: {results.heat}</p>
        <img className="logo" src={wetbulb_logo} alt="wet_bulb"></img>
        <p>Wet Bulb: {results.wet_bulb}</p>
        <img className="logo" src={crops_logo} alt="crops"></img>
        <p>Farm Crop Yields: {results.farm_crop_yields}</p>
        <img className="logo" src={sea_logo} alt="sea_levels"></img>
        <p>Sea Level Rise: {results.sea_level_rise}</p>
        <img className="logo" src={fire_logo} alt="Fires"></img>
        <p>Very Large Fires: {results.large_fires}</p>
        <img className="logo" src={econ_logo} alt="econ_damage"></img>
        <p>Economic Damage: {results.economic_damage}</p>
      </div>
      <div className="property_info">
        <h3>Property information provided by Zillow:  <img className="zillow_logo" src={zillow_logo} alt="zillow"></img></h3>
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
    </div>
  );
};

export default Modal;

// lat: "37.766",
// lng: "-122.426",
// state: "CA",
// streetName: "Dolores St",
// streetNumber: "200",
// unitNumber: "8",
// zipCode: "94103",
// zpid: "122064067",
// zestimate: "$2,987,900",
// listed_price: "$2,950,000",
// squarefoot: "2248",