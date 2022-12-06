import React from "react";
import about from "./about.css";

const About = () => {
  return (
    <div className="about">
      <h2>Why we do this</h2>
      <p>
        Times are tough for homebuyers. The typical residential mortgage is 30
        years long, but news articles are written every day about how climate
        migration is threatening various communities. This tool provides a
        simple measure, based upon best in class science, to inform homebuyers
        of what to expect when purchasing anything from a short-term investment
        property to their family’s forever home.
      </p>
      <h2>How we do it</h2>
      <p>
        This tool combines residential property data from Zillow with median
        climate migration estimation data compiled by ProPublica from
        internationally-renowned studies to provide projections of the climate
        impacts a homebuyer can expect between 2040 and 2060. Each measure of
        climate impact is rated from 1 - least severe to 10 - most severe.
      </p>
    </div>
  );
};

export default About;
