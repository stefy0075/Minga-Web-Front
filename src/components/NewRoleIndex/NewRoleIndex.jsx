import React from 'react'
import './newRoleIndex.css'
import Logo from '../../images/Logo.png'


export default function NewRoleIndex() {
    return (
        <>
            <div className='newrole-index'>
                <h2>Change role to</h2>
                <img src={Logo} alt={Logo} />
            </div>
        </>
    )
}