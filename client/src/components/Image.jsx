import React, { useState } from "react";
import ImagesCSS from './images.css'

const Image = ({ image, noImage }) => {
  const [expand, showExpand] = useState(false);

 const imageExpand = () => {
    showExpand(true);
 };
  return (
    <div>
      <img
        className="image"
        src={image === null ? noImage : image}
        onClick={() => imageExpand()}
      />
      {expand ? (
        <div className="exp-modal">
          <span
            onClick={() => {
              showExpand(!expand);
            }}
            className="close"
          >
            &times;
          </span>
          <img className="exp-modal-content" src={image} />
        </div>
      ) : null}
    </div>
  );
};

export default Image;
