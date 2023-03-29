import React from 'react'
import './footerForm.css'
import Input from '../input/input'

export default function FooterForm() {
    return (
        <section className='subscribe-section'>
            <h2>Subscribe</h2>
            <form className='subscribe-container'>
                <Input type='email' name='subscribe' id='subscribe' placeholder='Enter your email' />
                <Input className='subscribe-submit' type='submit' value='Subscribe Now' />
            </form>
        </section>
    )
}