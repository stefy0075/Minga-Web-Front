import React from 'react'
import './donatebtn.css'
import { Link as Anchor } from 'react-router-dom'
import { useState } from 'react';
import DonateModal from '../Donatemodal/DonateModal';
import apiUrl from "../../url.js"



export default function DonateBtn() {
    const [render, setRender] = useState(false);

    const handleClick = () => {
          setRender(!render);
        }
    

    return (
        <div>
            <Anchor className='donatebtn'>
                <h4 onClick={handleClick} >Donate</h4>
            </Anchor>
            {render ? <DonateModal onClick={handleClick}  /> : null}
        </div>
    )
}