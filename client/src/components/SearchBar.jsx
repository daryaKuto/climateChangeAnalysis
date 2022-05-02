import React, { useEffect, useState } from "react";

const SearchBar = ({
  searchByZip,
  searchZillowAPI,
  searchZpid,
  showModal,
  isLoading,
  setLoading
}) => {
  const [fullAddress, setAddress] = useState({
    address: "",
    citystate: "",
    zipcode: "",
  });

  const addressValueChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAddress({
      ...fullAddress,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    searchByZip(fullAddress.zipcode);
    //searchZillowAPI(fullAddress);
    searchZpid(fullAddress);
    setLoading(true);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchByZip(zipcode);
      }}
    >
      <input
        type="text"
        id="address"
        name="address"
        value={fullAddress.address}
        onChange={addressValueChange}
        placeholder="Enter your street address and house"
      />
      <input
        type="text"
        id="citystate"
        name="citystate"
        value={fullAddress.citystate}
        onChange={addressValueChange}
        placeholder="Enter your city and state separated by a comma"
      />
      <input
        type="text"
        id="zipcode"
        name="zipcode"
        value={fullAddress.zipcode}
        onChange={addressValueChange}
        placeholder="Enter you zipcode"
      />
      <input type="submit" value="Search" onClick={handleOnSubmit} />
    </form>
  );
};

export default SearchBar;
