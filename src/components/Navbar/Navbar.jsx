import React from 'react'
import './navbar.css'
import Menu from "../../images/Menu.svg"

export default function NavBar({onClick}) {
    return (
        <div onClick={onClick} className='ham-menu'>
            <img id="hmenu" src={Menu} alt="Handburguer menu" />
        </div>
    )
}
