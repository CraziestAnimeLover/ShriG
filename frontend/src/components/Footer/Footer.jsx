import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
<<<<<<< HEAD
            {/* <img src={assets.ShriG} alt="" /> */}
            <h1>Shri_G_Bikaner</h1>
=======
            <h1>SHRI_G_BIKANER</h1>
>>>>>>> 29f89c05b11d8a4801082d1080c0bcab887da040
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+7428027803</li>
                <li>shrigbikanersweetshop@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © SHRIGBIKANER.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
