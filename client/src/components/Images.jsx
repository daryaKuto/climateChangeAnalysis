import React, { useEffect, useState } from "react";
import img_fires from "../images/img_fires.png";
import img_farm from "../images/img_farm.png";
import img_econ_damages from "../images/img_econ_damages.png";
import img_sea_level from "../images/img_sea_level.png";
import img_heat from "../images/img_heat.png";
//client/src/images

//src={require('../images/img_fires.png')}

const Images = () => {
  //images with correlated text
  //flex rows for image container
  //flex column for individual image and text

  const [image, setImage] = useState("");
  const [noImage, setReplacement] = useState(
    "https://www.budget101.com/images/image-not-available.png?14867"
  );

  return (
    <div className="image-container">
     images from zillow in glalery go here
    </div>
  );
};

export default Images;
