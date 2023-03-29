import React from "react";
import Menu from "../../images/Menu.svg"
import "./navbar.css"
export default function Navbar({onClick}){

    return(
        <div onClick={onClick} >
            <img id="hmenu" src={Menu} alt="Handburguer menu" />
        </div>
    )
}