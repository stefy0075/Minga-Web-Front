import React from 'react'
import './donatemodal.css'
import DonateCard from '../DonateCard/DonateCard';
import closeIcon from "../../images/closeIcon.png"



export default function DonateModal( {onClick} ) {

 

    const donationOptions = [
        { 
            title: "Dedicate a hacer otra cosa",
            description: "El objetivo de esta donacion es demostrar tu disconformidad con el/la/lxs desarrolladorxs",
            price: 1000
        },
        {
            title: "mmm, podria ser mejor",
            description: "Al donar este monto le dejas saber a el/la/lxs desarrolladorxs que te gusto su trabajo pero no estas conforme al 100%",
            price: 5000
        },
        {
            title: "Eres un crack, te daria la 10 de Messi",
            description: "Estas re contentx con la funcionalidad, diseño y todo lo referente a la pagina web y quieres demostrar tu satisfaccion",
            price: 10000
        }
    ]
 
return (
    <div onClick={onClick} className='modal-container'>
        <div className='encabezado-modal'> 
            <h1>Donate to the Developers</h1>
            <img src={closeIcon} onClick={onClick}/>
        </div>
        <div className='donate-cards' >
            {donationOptions.map((donate) => <DonateCard donate={donate} /> )}
        </div>

    </div>
)



}