import React from 'react'
import './footerNav.css'
import DonateBtn from '../Donatebtn.js/DonateBtn'
import logo from '../../images/Logo.png'
import facebook from '../../images/Facebook.svg'
import twitter from '../../images/Twitter.svg'
import vimeo from '../../images/Vimeo.svg'
import youtube from '../../images/Youtube.svg'

export default function FooterNav() {
    return (
        <nav id='navfooter' >
            <div className='pages'>
                <a>Home</a>
                <a>Mangas</a>
            </div>
            <div className='logo-container'>
                <img src={logo} alt="logo" />
                
            </div>
            <div className='social-container'>
                <div className='social'>
                    <a href="#"><img src={facebook} alt="" /></a>
                    <a href="#"><img src={twitter} alt="" /></a>
                    <a href="#"><img src={vimeo} alt="" /></a>
                    <a href="#"> <img src={youtube} alt="" /></a>
                </div>
                <DonateBtn />
            </div>
        </nav>
    )
}