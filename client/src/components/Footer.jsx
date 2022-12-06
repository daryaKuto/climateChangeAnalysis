import React from 'react'
import css from './footer.css';

const Footer = () => {
  return (
    <div className= "footer_container">
         <p className="note">
        *Credit for all climate data listed above: humidity (Wet bulb), sea level rise, crop yield and economic damage data represent ranges of median probabilities for each county modeled by the
        Rhodium Group for each climate scenario between 2040 and 2060. Sources:
        Chi Xu, School of Life Sciences, Nanjing University (global human
        climate niche), Rhodium Group/Climate Impact Lab (wet bulb, heat, crop
        yields and economic damages), John Abatzoglou, University of California,
        Merced (very large fires). Noun Project icons by Adrien Coquet, Laymik
        and ProSymbols. Full report can be accessed at https://projects.propublica.org/climate-migration/
      </p>
    </div>
  )
}

export default Footer