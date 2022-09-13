import React, { useEffect, useState } from "react";
import imagesCSS from "./images.css";
import {BsArrowRightCircle} from 'react-icons/bs';
import {BsArrowLeftCircle} from 'react-icons/bs';
import Image from './Image.jsx'


const Images = ({ images }) => {
  const [image, setImage] = useState("");
  const [noImage, setReplacement] = useState(
    "https://www.budget101.com/images/image-not-available.png?14867"
  );

  const scrollRightCarousel = () => {
    document.querySelector('#carousel').scrollLeft += 200;
  };

  const scrollLeftCarousel = () => {
    document.querySelector('#carousel').scrollLeft += -200;
  };
 
  if (images.length === 1) {
    return (
      <div className = 'image-container'>
      <Image  image = {noImage}  key = {images.indexOf(image)}/>
    </div>
    )
  }
  return (
    <div className = 'outer-carousel'>
      <BsArrowLeftCircle className="arrowLeft" onClick={scrollLeftCarousel} />
    <div id = 'carousel' className="image-container">
        {images.map((image) => {
          return (
            <Image key = {images.indexOf(image)} image = {image} noImage = {noImage} />
              // <img className="image" key = {images.indexOf(image)} src = {image === null ? noImage : image}/>
          );
        })}
    </div>
    <BsArrowRightCircle className="arrowRight" onClick={scrollRightCarousel}/>
    </div>
  );
};

export default Images;
