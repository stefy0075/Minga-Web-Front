import React from 'react'
import './footer.css'
import footerback from '../../images/footerback.png'
import FooterNav from '../FooterNav/FooterNav'
import FooterForm from '../FooterForm/FooterForm'

export default function Footer() {
  return (
    <footer>
        <div className='img-container'>
            <img src={footerback} alt=""/>
        </div>
        <FooterForm />
        <FooterNav />
    </footer>
  )
}