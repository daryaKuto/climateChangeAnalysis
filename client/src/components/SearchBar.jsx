import React, { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { MdOutlineClear } from "react-icons/md";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import searchbar from "./searchbar.css";
import modalCSS from "./modal.css";
import Modal from "./Modal.jsx";
import Multi from "./Multi.jsx";

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
  taxHist,
  priceHist,
  nearByHomes,
  nearBySchools,
  resoFacts,
  multi,
  properties,
  setMulti,
  setError,
  addressError,
  getPropertyData,
}) => {
  //prev version
  const [fullAddress, setFullAddress] = useState({
    address: "",
    citystate: "",
    zipcode: "",
  });

  // const [newAddress, setNewAddress] = useState(useState({
  //   streetAddress: "",
  //   city: "",
  //   state: "",
  //   zipcode: "",
  // }));

  //suggestions
  const [suggested, setSuggestion] = useState(true);

  //autofill
  const [street, setStreet] = useState("");
  const [unit, setUnit] = useState("");
  const [address, setAddress] = useState("");

  //flag when new address is clicked on
  const [neighborFlag, setNeighborFlag] = useState(false);

  //useEffect for rerender with new address
  //need to pass down changeAdress function down to Stats., upon trigger, will
  //re render with new address
  // useEffect(() => {
  //   setLoading(false);
  // }, [address]);

  // comment out when troubleshooting
  useEffect(() => {
    showModal(false);
    //console.log(property)
  }, [rerender || neighborFlag]);

  // useEffect(() => {
  //   //set full address with the
  //   //setLoading(true);
  //   showModal(false)
  //   handleSearch()
  // }, [neighborFlag])

  //clear the fields
  const clearInputFields = () => {
    setAddress("");
    setUnit("");
    setStreet("");
    setSuggestion(true);
    setRerender(!rerender);
    setLoading(!isLoading);
    setError(false);
    setMulti(false);
  };

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
        setAddress(selectedSuggestion);
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
  const handleSearch = (fullAddress) => {
    console.log(fullAddress);
    if (fullAddress.address.length === 0) fullAddress.address = `${street} ${unit}`;
    var addressAsString = `${fullAddress.address},${fullAddress.citystate} ${fullAddress.zipcode} `;
    console.log(addressAsString);
    // if (addressAsString.length > 1) {
    //   searchByZip(fullAddress.zipcode);
    //   searchZpid(addressAsString);
    // } else {
    //   setError(true)
    // }
    searchByZip(fullAddress.zipcode);
    searchZpid(addressAsString);
    // showModal(true);
  };

  return (
    <div className="wrapper">
      <section id="search" className="search-container">
        <div
          className="search-btn"
          value="Search"
          onClick={() => {
            handleSearch(fullAddress);
          }}
        >
          <FaSearchLocation className="clear-btn-icon" />
        </div>
        <PlacesAutocomplete
          className="autocomplete-suggestions"
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
              {suggested ? (
                <div className="suggestions">
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#bcd4f8" : "#fff",
                      margin: "10px",
                      fontSize: "0.75rem",
                    };

                    return (
                      <div
                        className="suggestion"
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              ) : null}
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
        <div
          className="clear-btn"
          onClick={() => {
            clearInputFields();
          }}
        >
          <MdOutlineClear className="clear-btn-icon" />
        </div>
      </section>
      <section id="report">
        {multi ? (
          <Multi
            properties={properties}
            handleSearch={handleSearch}
            setMulti={setMulti}
            setLoading={setLoading}
            getPropertyData={getPropertyData}
            setError={setError}
          />
        ) : null}
        {searched ? (
          <Modal
            searchByZip={searchByZip}
            searchZpid={searchZpid}
            showModal={showModal}
            searched={searched}
            setLoading={setLoading}
            rerender={rerender}
            setRerender={setRerender}
            isLoading={isLoading}
            results={results}
            property={property}
            images={images}
            taxHist={taxHist}
            priceHist={priceHist}
            nearByHomes={nearByHomes}
            nearBySchools={nearBySchools}
            resoFacts={resoFacts}
            setFullAddress={setFullAddress}
            fullAddress={fullAddress}
            setNeighborFlag={setNeighborFlag}
            handleSearch={handleSearch}
            clearInputFields={clearInputFields}
            setUnit={setUnit}
            setStreet={setStreet}
          />
        ) : null}
      </section>
    </div>
  );
};

export default SearchBar;
