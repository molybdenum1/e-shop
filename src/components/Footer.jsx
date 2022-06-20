import React from 'react';
import {Icon} from 'react-icons-kit';
import {facebook_2} from 'react-icons-kit/ikons/facebook_2';
import {linkedin} from 'react-icons-kit/ikons/linkedin';
import {instagram} from 'react-icons-kit/ikons/instagram';
import {telegram} from 'react-icons-kit/icomoon/telegram';
import './css/Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-col'>
        <div className='footer-info'>
          <h2>Social Media</h2>
        </div>
       
        <div className='footer-links'>
            <div className='foot-link'>
                <Icon icon={facebook_2} size={40}/>
            </div>
            <div className='foot-link'>
                <Icon icon={linkedin} size={40}/>
            </div>
            <div className='foot-link'>
                <Icon icon={instagram} size={40}/>
            </div>
            <div className='foot-link'>
                <Icon icon={telegram} size={40}/>
            </div>
        </div>
      </div>
      <div className='footer-col'>
          <div className='footer-info'>
              <h3>Company</h3>
          </div>
          <div className='footer-sec'>
            <div className='foot-section'>
                About Us
            </div>
            <div className='foot-section'>
                FAQ
            </div>
            <div className='foot-section'>
                Contact Us
            </div>
        </div>
      </div>
      <div className='footer-col'>
        <div className='footer-info'>
            <h3>Legal</h3>
        </div>
        <div className='footer-sec'>
        <div className='foot-section'>
                Terms & Conditions
            </div>
            <div className='foot-section'>
                Privacy Policy
            </div>
            <div className='foot-section'>
                Disclaimer
            </div>
        </div>
      </div>
      
      <div className='footer-info'>Ⓒ2022 E_SHOP || All Rights Reserved</div>
    </div>
  )
}

export default Footer
