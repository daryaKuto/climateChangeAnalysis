import React, { useEffect, useState } from "react";
import { MdLocalFireDepartment } from "react-icons/md";
import { BiWater } from "react-icons/bi";
import { FaSeedling } from "react-icons/fa";
import { BsThermometerSun } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import { SiRainmeter } from "react-icons/si";
import { SiZillow } from "react-icons/si";
import Images from "./Images.jsx";
import modalCSS from "./modal.css";
//title and intro text
const Modal = ({ setLoading, rerender, setRerender, results, property, isLoading, images }) => {
  // comment out when troubleshooting
  useEffect(() => {
    setLoading(true);
    }, [rerender]); // pass `value` as a dependency
      
  if (isLoading) {
    return (
      <div className= "modal">
        <h3>Loading...</h3>
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
          <div className="indv_stats">
          <BsThermometerSun className="logo" />
            <p>
              {" "}
              Heat: {results.heat}
            </p>
          </div>
          <div className="indv_stats">
          <SiRainmeter className="logo" />
            <p>
              {" "}
              Humidity: {results.wet_bulb}
            </p>
          </div>
          {/* <img className="logo" src={wetbulb_logo} alt="wet_bulb"></img> */}
          {/* <img className="logo" src={heat_logo} alt="Heat"></img> */}
          {/* <img className="logo" src={crops_logo} alt="crops"></img> */}
          <div className="indv_stats">
          <FaSeedling className="logo" />
            <p>
              {" "}
              Crop Yields: {results.farm_crop_yields}
            </p>
          </div>
          <div className="indv_stats">
          <BiWater className="logo" />
            <p>
              {" "}
              Sea Level Rise: {results.sea_level_rise}
            </p>
          </div>
          <div className="indv_stats">
          <MdLocalFireDepartment className="logo" />
            <p>
              {" "}
              Very Large Fires: {results.large_fires}
            </p>
          </div>
          <div className="indv_stats">
          <AiOutlineDollar className="logo" />
            <p>
              {" "}
              Economic Damage: {results.economic_damage}
            </p>
          </div>
        </div>
        <div className="property_info">
          <h3>
            Property information provided by Zillow: <SiZillow />
          </h3>
          <Images images={images} />
          <p className="zillow_stats">
            {/* change to streetAddress */}
            {/* Address: {property.streetNumber} {property.streetName}{" "}
            {property.unitNumber}{" "} */}
            Address: {property.streetAddress}
          </p>
          <p className="zillow_stats">City: {property.city}</p>
          <p className="zillow_stats">State: {property.state}</p>
          <p className="zillow_stats">Zipcode: {property.zipCode}</p>
          <p className="zillow_stats">
            Zestimate of current value: ${property.zestimate}
          </p>
          <p className="zillow_stats">
            Year Bult: {property.year || "Not Listed"}
          </p>
          <p className="zillow_stats">Asking Price: ${property.price || "Not listed"}</p>
          <p className="zillow_stats">Squarefoot: {property.livingAreaSqft || "Not Listed"}</p>
          <p className="zillow_stats">Bedrooms: {property.bedrooms || "Not Listed"}</p>
          <p className="zillow_stats">Bathrooms: {property.bathrooms || "Not Listed"}</p>
          <p className="zillow_stats">Home Type: {property.type || "Not Listed"}</p>
          <p className="zillow_stats">Tax Rate: {property.taxRate || "Not Listed"}</p>
        </div>
        <div className ='tax'>
          <h2>-------Tax Info-----</h2>
          </div>
      </div>
    </section>
  );
};

export default Modal;
