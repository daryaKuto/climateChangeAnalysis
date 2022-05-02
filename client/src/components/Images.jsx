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
      <div className="image-and-text">
        <div className="image">
          <img className="img" src={img_heat} alt="Heat"></img>
        </div>
        <div className="description">
          <p>When heat meets excessive humidity, the body can no longer cool itself by sweating. That combination creates wet bulb temperatures, where 82 degrees can feel like southern Alabama on its hottest day, making it dangerous to work outdoors and for children to play school sports. As wet bulb temperatures increase even higher, so will the risk of heat stroke — and even death..</p>
        </div>
      </div>
      <div className="image-and-text">
        <div className="image">
        <img className="img" src={img_fires} alt="Fires"></img>
        </div>
        <div className="description">
          <p>With heat and evermore prevalent drought, the likelihood that very large wildfires (ones that burn over 12,000 acres) will affect U.S. regions increases substantially, particularly in the West, Northwest and the Rocky Mountains, but also in Florida, Georgia and the Southeast.</p>
        </div>
      </div>
      <div className="image-and-text">
        <div className="image">
          <img className="img" src={img_farm} alt="Farm"></img>
        </div>
        <div className="description">
          <p>With rising temperatures, it will become more difficult to grow food. Corn and soy are the most prevalent crops in the U.S. and the basis for livestock feed and other staple foods, and they have critical economic significance. Because of their broad regional spread, they offer the best proxy for predicting how farming will be affected by rising temperatures and changing water supplies.</p>
        </div>
      </div>
      <div className="image-and-text">
        <div className="image">
          <img className="img" src={img_sea_level} alt="sea-level"></img>
        </div>
        <div className="description">
          <p>As sea levels rise, the share of property submerged by high tides increases dramatically, affecting a small sliver of the nation's land but a disproportionate share of its population.</p>
        </div>
      </div>
      <div className="image-and-text">
        <div className="image">
          <img className="img" src={img_econ_damages} alt="econ-damages"></img>
        </div>
        <div className="description">
          <p>Rising energy costs, lower labor productivity, poor crop yields and increasing crime are among the climate-driven elements that will increasingly drag on the U.S. economy, eventually taking a financial toll that exceeds that from the COVID-19 pandemic in some regions. Rhodium measured how much damage — or how much of a benefit — those counties might see, as a share of their GDP..</p>
        </div>
      </div>
    </div>
  );
};

export default Images;
