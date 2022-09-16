import React, { useEffect, useState } from "react";
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
import { BsCalendar2Check } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { TbArrowsUpDown } from "react-icons/tb";
import { FaArrowUp } from "react-icons/fa";
import { BsFlag } from "react-icons/bs";
import { GiWashingMachine } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { RiHome6Line } from "react-icons/ri";
import { MdChair } from "react-icons/md";
import { GiFireplace } from "react-icons/gi";
import { MdHouseboat } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
// import { GiFireplace } from "react-icons/gi";
//
import modalCSS from "./modal.css";

const Stats = ({
  property,
  isLoading,
  taxHist,
  priceHist,
  nearByHomes,
  nearBySchools,
  resoFacts,
  setRerender,
  setFullAddress,
}) => {
    console.log(property);
  return (
    <div className="stats_wrapper">
      <h2>Tax History</h2>
      <div className="tax_history">
        <div className="tax_heading">
          <div className="tax_stats">
            <BsCalendar2Check className="logo" />
            <p>Date</p>
          </div>
          <div className="tax_stats">
            <GiPayMoney className="logo" />
            <p>Tax Paid</p>
          </div>
          <div className="tax_stats">
            <TbArrowsUpDown className="logo" />
            <p>Tax Increase Rate</p>
          </div>
          <div className="tax_stats">
            <FaArrowUp className="logo" />
            <p>Value Increase Rate</p>
          </div>
          <div className="tax_stats">
            <AiOutlineDollarCircle className="logo" />
            <p>Worth value</p>
          </div>
        </div>
        {taxHist.map((taxYear) => {
          //console.log(taxYear);
          var humanDate = new Date(taxYear.time);
          return (
            <div className="tax_year">
              <p className="tax_stats">{humanDate.toGMTString()}</p>
              <p className="tax_stats">{taxYear.taxPaid || "Not Listed"}</p>
              <p className="tax_stats">
                {(taxYear.taxIncreaseRate * 100).toFixed(1)}%
              </p>
              <p className="tax_stats">
                {(taxYear.valueIncreaseRate * 100).toFixed(1)}%
              </p>
              <p className="tax_stats">{taxYear.value}</p>
            </div>
          );
        })}
      </div>
      <h2>Price History</h2>
      <div className="price_history">
        {/* {priceHist[0]=== "None Provided" ? 
        <div>
            Price History was not provided
        </div> : null } */}
        <div className="price_heading">
          <div className="price_stats">
            <BsCalendar2Check className="logo" />
            <p>Date</p>
          </div>
          <div className="price_stats">
            <BsFlag className="logo" />
            <p>Event</p>
          </div>
          <div className="price_stats">
            <AiOutlineDollarCircle className="logo" />
            <p>Price</p>
          </div>
          <div className="price_stats">
            <MdOutlineOtherHouses className="logo" />
            <p>Price Per Square Foot</p>
          </div>
        </div>
        {/* only display if "sold" or "listed for sale" */}
        {priceHist.map((priceYear) => {
          return (
            <div className="price_year">
              <p className="price_stats">{priceYear.date}</p>
              <p className="price_stats">{priceYear.event}</p>
              <p className="price_stats">{priceYear.price}</p>
              <p className="price_stats">${priceYear.pricePerSquareFoot}</p>
            </div>
          );
        })}
      </div>
      <h2>Facts and Features</h2>
      <div className="property_stats">
        <div className="zillow_stats">
          <GiWashingMachine className="logo" />
          <div>
            {Array.isArray(resoFacts.appliances) ? 
            resoFacts.appliances.map((item) => {
              return <p>{item}</p>;
            }) : "None"}
          </div>
        </div>
        <div className="zillow_stats">
          <BsCashCoin className="logo" />
          <p>HOA: {resoFacts.hoaFee || "Not Listed"}</p>
        </div>
        <div className="zillow_stats">
          <RiHome6Line className="logo" />
          <div>
            Floor Type: 
            {Array.isArray(resoFacts.flooring) ? resoFacts.flooring.map((floor) => {
              return <p>{floor}</p>;
            }) : "None Listed"}
          </div>
        </div>
        <div className="zillow_stats">
          <MdChair className="logo" />
          <p>{resoFacts.furnished ? "Furnished" : "Not Furnished"}</p>
        </div>
        <div className="zillow_stats">
          <GiFireplace className="logo" />
          <div>
            {Array.isArray(resoFacts.heating) ? resoFacts.heating.map((heat) => {
              return <p>{heat}</p>;
            }) : "None Listed"}
          </div>
        </div>
        <div className="zillow_stats">
          <FaWarehouse className="logo" />
          <div>
            {Array.isArray(resoFacts.parkingFeatures) ? resoFacts.parkingFeatures.map((parkSpace) => {
              return <p>{parkSpace}</p>;
            }) : "None Listed"}
          </div>
        </div>
        <div className="zillow_stats">
          <MdHouseboat className="logo" />
          <p>Home Owners Insurance: {"$" + property.hoinsurance || "Not Listed"}</p>
        </div>
        <div className="zillow_stats">
          <AiOutlineHome className="logo" />
          <p>{property.streetAddress}</p>
        </div>
        <div className="zillow_stats">
          <GiModernCity className="logo" />
          <p>{property.city}</p>
        </div>
        <div className="zillow_stats">
          <MdLocationCity className="logo" />
          <p>{property.state}</p>
        </div>
        <div className="zillow_stats">
          <BiMapPin className="logo" />
          <p>Zipcode: {property.zipCode}</p>
        </div>
        <div className="zillow_stats">
          <SiZillow className="logo" />
          <p>Zestimate: ${property.zestimate}</p>
        </div>
        <div className="zillow_stats">
          <MdConstruction className="logo" />
          <p>Year Bult: {property.year || "Not Listed"}</p>
        </div>
        <div className="zillow_stats">
          <AiOutlineDollarCircle className="logo" />
          <p>{"$" + property.price || "Not listed"}</p>
        </div>
        <div className="zillow_stats">
          <MdOutlineOtherHouses className="logo" />
          <p>Living Area sqft: {property.livingAreaSqft || "Not Listed"}</p>
        </div>
        <div className="zillow_stats">
          <BiBed className="logo" />
          <p>Bedrooms: {property.bedrooms || "Not Listed"}</p>
        </div>
        <div className="zillow_stats">
          <FaBath className="logo" />
          <p>Bathrooms: {property.bathrooms || "Not Listed"}</p>
        </div>
        <div className="zillow_stats">
          <BiBuildingHouse className="logo" />
          <p>Home Type: {property.type || "Not Listed"}</p>
        </div>
        <div className="zillow_stats">
          <HiOutlineReceiptTax className="logo" />
          <p>Tax Rate: {property.taxRate || "Not Listed"}</p>
        </div>
      </div>
      <h2>Near by Homes</h2>
      <div className="near_by_homes">
        {nearByHomes.map((house) => {
          return (
            // add on click to reload with that house
            <div className="neighbor">
              <p>{house.address.streetAddress}</p>
              {house.price === 0 ? "Not Provided" :
               <p>${house.price}</p>
              }
            </div>
          );
        })}
      </div>
      <div className="description">
        <h2>Description</h2>
        <p>{property.desc}</p>
      </div>
      <div className="schools">
        <h2>Near by Schools</h2>
        {nearBySchools.map((school) => {
          return (
            <p>
              {school.name} - {school.distance}mi
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Stats;
