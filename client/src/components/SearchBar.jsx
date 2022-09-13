import React, { useEffect, useState } from "react";
import {FaSearchLocation} from 'react-icons/fa';
import {MdOutlineClear} from 'react-icons/md';
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import searchbar from "./searchbar.css";
import modalCSS from "./modal.css";
import Modal from "./Modal.jsx";

const SearchBar = ({
  searchByZip,
  showModal,
  searched,
  searchZpid,
  setLoading,
  rerender,
  setRerender,
  results,
  property,
  isLoading,
  images,
}) => {
  //prev version
  const [fullAddress, setFullAddress] = useState({
    address: "",
    citystate: "",
    zipcode: "",
  });

  //suggestions 
  const [suggested, setSuggestion] = useState(true);


  //autofill
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("");
 const [address, setAddress] = useState("")

// comment out when troubleshooting
useEffect(() => {
  showModal(false)
}, [rerender]);




 //clear the fields 
 const clearInputFields = () => {
  setAddress('');
  setUnit('');
  setStreet('');
  setSuggestion(true);
  setRerender(!rerender);
  setLoading(!isLoading);
 }

 

  const unitValueChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
   // console.log(val);
    setUnit(val);
  };

  //handles selection from autofill
  const handleSelect = async (selectedSuggestion) => {
    geocodeByAddress(selectedSuggestion)
      .then((results) => {
        var fullAddressResults = results[0].formatted_address;
        var splittedFull = fullAddressResults.split(", ");
        //results: ['277 Douglass St', 'San Francisco', 'CA 94114', 'USA']
        var splittedStateZip = splittedFull[2].split(" ");
        //results: [CA,94114]
        setStreet(splittedFull[0]);
        setAddress(selectedSuggestion)
        setFullAddress({
          address: "",
          citystate: `${splittedFull[1]},${splittedStateZip[0]}`,
          zipcode: splittedStateZip[1],
        });
        setSuggestion(false);

      })
      .catch((error) => console.error(error));
  };


  //autofill version
  const handleSearch = () => {
    fullAddress.address = `${street} ${unit}`;
    var addressAsString = `${fullAddress.address},${fullAddress.citystate} ${fullAddress.zipcode} `;
    console.log(addressAsString);
    //enables loading screen
    searchByZip(fullAddress.zipcode);
    searchZpid(addressAsString);
    // showModal(true);
  };

  return (
    <div>
    <div className="search-container">
       <div className="search-btn" value="Search"
            onClick={() => {
              handleSearch()}}>
          <FaSearchLocation className="clear-btn-icon" />
        </div>
        <PlacesAutocomplete className = "autocomplete-suggestions"
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="autofill">
              <input
                type="text"
                id="address"
                name="address"
                {...getInputProps({
                  className: "my-input",
                  autoFocus: false,
                  placeholder: "Enter address to search...",
                })} 
              />
              {suggested ?
              <div className="suggestions">
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#bcd4f8" : "#fff",
                    margin: "10px",
                    fontSize: "0.8rem"
                  };

                  return (
                    <div className = "suggestion" {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div> : null}
            </div>
          )}
        </PlacesAutocomplete>
    
      <div className="other-inputs">
        <input
          type="text"
          id="unit-house"
          name="address"
          value={unit}
          onChange={unitValueChange}
          placeholder="Unit/House"
          className="house_input"
        />
      </div>
        <div className="clear-btn" onClick={() => {clearInputFields()}}>
        <MdOutlineClear className="clear-btn-icon" />
        </div>
    </div>
    {searched ? (
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
      ) : null}
    </div>
  );
};

export default SearchBar;


{/* 
      PREV VERSION <form
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
      </form> */}