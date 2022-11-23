import React, { useState } from "react";
import axios from "axios";
import modalCSS from "./modal.css";

const Multi = ({
  properties,
  handleSearch,
  multi,
  setMulti,
  setLoading,
  setError,
}) => {
  const [multiLoad, setMultiLoad] = useState(false);
  const [single, setSingle] = useState({
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const getAddress = (propertyZpid) => {
    axios
      .get("/getproperty", { params: { zpid: `${propertyZpid}` } })
      .then((res) => {
        console.log(res.data);
        let singleHouse = res.data;
        setSingle({
          address: `${singleHouse.streetAddress}`,
          city: `${singleHouse.city}`,
          state: `${singleHouse.state}`,
          zipcode: `${singleHouse.zipcode}`,
        });
        setMultiLoad(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleClick = (address) => {
    handleSearch(single);
    setLoading(true);
    setMulti(false);
    setError(false);
  };
  //   const getAll = (properties) => {
  //     properties.map((item) => {
  //       setTimeout(() => {
  //         getData(item.zpid);
  //       }, 1000);
  //     });
  //     setMultiLoad(false)
  //   };

  if (multi) {
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
    <div>
      <h2>
        Following zpids are listed under your input address, click on individual
        address for detailed info:
      </h2>
      {/* <div>{getAll(properties)}</div> */}
      <div>
        {properties.map((item) => {
          return <div onClick={() => getAddress(item.zpid)}>{item.zpid}</div>;
        })}
      </div>
      <div>
        {multiLoad ? (
          <h3 onClick={() => handleClick(single)}>
            {single.address},{single.city} {single.state},{single.zipcode}
          </h3>
        ) : null}
      </div>
    </div>
  );
};

export default Multi;
