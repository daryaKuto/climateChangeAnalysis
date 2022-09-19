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
  newAddress,
  setNewAddress,
  setZpid,
  zpid,
  setNeighborFlag,
  handleSearch,
  clearInputFields,
  fullAddress,
  searchByZip,
  searchZpid,
}) => {
  console.log(property);
  const [floor, setFloor] = useState([]);
  const [appliances, setAppliances] = useState([]);
  const [parking, setParking] = useState([]);
  const [heating, setHeat] = useState([]);

   //if no data provided
   const [noData, setNoData] = useState(["Not Provided"]);

  //check for flooring, appliances, parking, heating
  //check if resoFacts exist and if appliances, parking, flooring
  // heating are arrays with length greater or equal to 1
  // if (Array.isArray(resoFacts.appliances) && resoFacts.appliances.length >= 1) {
  //   setAppliances(resoFacts.appliances);
  // } 
  // if (Array.isArray(resoFacts.flooring) && resoFacts.flooring.length >= 1) {
  //   setFloor(resoFacts.flooring);
  // } 

  // if (Array.isArray(resoFacts.heating) && resoFacts.heating.length >= 1) {
  //   setHeat(resoFacts.heating);
  // } 

  // if (Array.isArray(resoFacts.parkingFeatures) && resoFacts.parkingFeatures.length >= 1) {
  //   setParking(resoFacts.parkingFeatures);
  // } 
const changeHouse = (address) => {
  clearInputFields();
  console.log(address)
  // setFullAddress({
  //   address: `${address.streetAddress}`,
  //   citystate: `${address.city}, ${address.state}`,
  //   zipcode: `${address.zipcode}`
  // })
  // console.log(fullAddress)
  let addressAsString = `${address.streetAddress},${address.city} ${address.state} ${address.zipcode} `;
    console.log(addressAsString);
    searchByZip(address.zipcode);
    searchZpid(addressAsString);
  
}

  return (
    <div className="stats_wrapper">
      <h2>Tax History</h2>
      <div className="tax_history">
      {taxHist.length >= 1 ? (
        <div className="tax_heading">
          {/* Need conditional if Tax  history is greater than one entry */}
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
          </div> )
          : 
           (<div>
           Tax history was not provided</div>) }
        {(Array.isArray(taxHist) &&
        taxHist.length >= 1) ? taxHist.map((taxYear) => {
          var humanDate = new Date(taxYear.time);
          return (
            <div className="tax_year">
              <p className="tax_stats">{humanDate.toGMTString()}</p>
              <p className="tax_stats">{taxYear.taxPaid || "Not Provided"}</p>
              <p className="tax_stats">
                {(taxYear.taxIncreaseRate * 100).toFixed(1)}%
              </p>
              <p className="tax_stats">
                {(taxYear.valueIncreaseRate * 100).toFixed(1)}%
              </p>
              <p className="tax_stats">{taxYear.value}</p>
            </div>
          );
        }): null}
      </div>
      <h2>Price History</h2>
      <div className="price_history">
        {priceHist.length >= 1 ? (
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
        ) : (<div>
          Price history was not provided</div>) }
        {(Array.isArray(priceHist) &&
        priceHist.length >= 1) ? priceHist.map((priceYear) => {
          return (
            <div className="price_year">
              <p className="price_stats">{priceYear.date}</p>
              <p className="price_stats">{priceYear.event}</p>
              <p className="price_stats">{priceYear.price}</p>
              <p className="price_stats">${priceYear.pricePerSquareFoot}</p>
            </div>
          );
        }) : null}
      </div>
      <h2>Facts and Features</h2>
      <div className="property_stats">
        <div className="zillow_stats">
          <GiWashingMachine className="logo" />
          {/* resoFacts.appliances.map((item) => {
                  return <p>{item}</p>;
                }) */}
          <div>
            {(Array.isArray(resoFacts.appliances) && resoFacts.appliances.length >= 1)
              ? (
                <div>
                  <p>{resoFacts.appliances[0]}</p>
                  <p>{resoFacts.appliances[1] ? resoFacts.appliances[1] : null}</p>
                </div>
              )
              : "Not Provided"}
            {/* {appliances.map((item) => {
                  return <p>{item}</p>;
                })} */}
          </div>
        </div>
        <div className="zillow_stats">
          <BsCashCoin className="logo" />
          <p>HOA: {resoFacts.hoaFee || "Not Provided"}</p>
        </div>
        <div className="zillow_stats">
          <RiHome6Line className="logo" />
          <div>
            {/* resoFacts.flooring.map((floor) => {
                  return <p>{floor}</p>;
                }) */}
            Floor Type:
            {(Array.isArray(resoFacts.flooring) && resoFacts.flooring.length >= 1)
              ? (
                <div>
                  <p>{resoFacts.flooring[0]}</p>
                  <p>{resoFacts.flooring[1] ? resoFacts.flooring[1] : null}</p>
                </div>
              )
              : "Not Provided"}
            {/* {floor.map((floorType) => {
                  return <p>{floorType}</p>;
                })} */}
          </div>
        </div>
        <div className="zillow_stats">
          <MdChair className="logo" />
          <p>{resoFacts.furnished ? "Furnished" : "Not Furnished"}</p>
        </div>
        <div className="zillow_stats">
          <GiFireplace className="logo" />
          {/* resoFacts.heating.map((heat) => {
                  return <p>{heat}</p>;
                }) */}
          <div>
            {(Array.isArray(resoFacts.heating) && resoFacts.heating.length >= 1)
              ? (
                <div>
                  <p>{resoFacts.heating[0]}</p>
                  <p>{resoFacts.heating[1] ? resoFacts.heating[1] : null}</p>
                </div>
              )
              : "Not Provided"} 
              {/* {heating.map((heat) => {
                  return <p>{heat}</p>;
                })} */}
          </div>
        </div>
        <div className="zillow_stats">
          <FaWarehouse className="logo" />
          {/* resoFacts.parkingFeatures.map((parkSpace) => {
                  return <p>{parkSpace}</p>;
                }) */}
          <div>
            {(Array.isArray(resoFacts.parkingFeatures) && resoFacts.parkingFeatures.length >= 1)
              ? (
                <div>
                <p>{resoFacts.parkingFeatures[0]}</p>
                <p>{resoFacts.parkingFeatures[1] ? resoFacts.parkingFeatures[1] : null}</p>
              </div>
              )
              : "Not Provided"}
              {/* {parking.map((parkSpace) => {
                  return <p>{parkSpace}</p>;
                })} */}
          </div>
        </div>
        <div className="zillow_stats">
          <MdHouseboat className="logo" />
          <p>
            Home Owners Insurance: {"$" + property.hoinsurance || "Not Provided"}
          </p>
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
          <p>Year Bult: {property.year}</p>
        </div>
        <div className="zillow_stats">
          <AiOutlineDollarCircle className="logo" />
          <p>{"$" + property.price}</p>
        </div>
        <div className="zillow_stats">
          <MdOutlineOtherHouses className="logo" />
          <p>Living Area sqft: {property.livingAreaSqft}</p>
        </div>
        <div className="zillow_stats">
          <BiBed className="logo" />
          <p>Bedrooms: {property.bedrooms}</p>
        </div>
        <div className="zillow_stats">
          <FaBath className="logo" />
          <p>Bathrooms: {property.bathrooms}</p>
        </div>
        <div className="zillow_stats">
          <BiBuildingHouse className="logo" />
          <p>Home Type: {property.type}</p>
        </div>
        <div className="zillow_stats">
          <HiOutlineReceiptTax className="logo" />
          <p>Tax Rate: {property.taxRate}</p>
        </div>
      </div>
      <h2>Near by Homes</h2>
    {(Array.isArray(nearByHomes) &&
        nearByHomes.length >= 1) ? (<div className="near_by_homes">
        {/* need array.is array */}
        {nearByHomes.map((house) => {
          return (
            // add on click to reload with that house
            <div className="neighbor" onClick = {(()=> changeHouse(house.address))}>
              <p >{house.address.streetAddress}</p>
              {house.price === 0 ? "Not Provided" : <p>${house.price}</p>}
            </div>
          );
        })}
      </div>)
          : "Not Provided"}      
      <div className="description">
        <h2>Description</h2>
        <p>{property.desc || "Not Provided"}</p>
      </div>
      <div className="schools">
        <h2>Near by Schools</h2>
         {(Array.isArray(nearByHomes) &&
        nearByHomes.length >= 1) ? nearBySchools.map((school) => {
          return (
            <p>
              {school.name} - {school.distance}mi
            </p>
          );
        })  : "Not Provided"} 
      </div>
    </div>
  );
};

export default Stats;
