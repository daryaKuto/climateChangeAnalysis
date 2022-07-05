import React, {useState} from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import {TbReportSearch} from "react-icons/tb";
import navCSS from "./nav.css";

const Nav = () => {
  const [activeNav, setActiveNav] = useState("#");
  return <nav>
     <a href ="#" onClick ={()=> {setActiveNav("#")}} className={activeNav === '#' ? 'active' : ''}><BsArrowUpCircle/></a>
    <a href ="#report" onClick ={()=> {setActiveNav("#report")}} className={activeNav === '#report' ? 'active' : ''}><TbReportSearch/></a>
  </nav>;
};

export default Nav;

/*
import React, {useState} from 'react'
import {BiHomeSmile} from 'react-icons/bi'
import {BiUserCircle} from 'react-icons/bi'
import {GiPencilBrush} from 'react-icons/gi'
import {RiServiceLine} from 'react-icons/ri'
import {FiPhoneCall} from 'react-icons/fi'
import navCSS from './nav.css'


const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  return (
   <nav>
    <a href ="#" onClick ={()=> {setActiveNav("#")}} className={activeNav === '#' ? 'active' : ''}><BiHomeSmile/></a>
    <a href ="#about" onClick ={()=> {setActiveNav("#about")}} className={activeNav === '#about' ? 'active' : ''}><BiUserCircle/></a>
    <a href ="#experience"onClick ={()=> {setActiveNav("#experience")}}className={activeNav === '#experience' ? 'active' : ''}><GiPencilBrush/></a>
    <a href ="#services"onClick ={()=> {setActiveNav("#services")}} className={activeNav === '#services' ? 'active' : ''}><RiServiceLine/></a>
    <a href ="#contact" onClick ={()=> {setActiveNav("#contact")}} className={activeNav === '#contact' ? 'active' : ''}><FiPhoneCall/></a>
   </nav>
  )
}

export default Nav
*/
