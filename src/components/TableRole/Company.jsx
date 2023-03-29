import React, { useState } from 'react'
import iconPanel from '../../images/Union.png'
import { useDispatch } from 'react-redux';
import './tablerole.css'
import action from '../../store/PanelAdmin/actions'
import axios from 'axios'




const { captureState, update_company_active } = action;

export default function CompanyTable({ company }) {

    const [active, setActive] = useState(company.active);
    const dispatch = useDispatch();
    // let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    function IsActive() {
        dispatch(captureState({ buttonState: false }))
        dispatch(update_company_active({ _id: company._id, active: true }))
    }

     function NotActive() {
        
        dispatch(captureState({ buttonState: true }))
        dispatch(update_company_active({ _id: company._id, active: false }))
    }



    return (
        <>
            <tbody className='body-table'>

                <tr >
                    <td className="iconPanel"><img src={iconPanel} alt={iconPanel} /></td>
                    <td className="colum1">{company.name}</td>
                    <td className="colum2">{company.website}</td>
                    <td className="colum3"><img className='photo-perfil-author' src={company.logo} alt={company.name} /></td>
                    <div className={active ? 'panel-active' : 'panel-inactive'}>
                        <button className={active ? 'boton-option boton-entities' : 'boton-option'} onClick={IsActive} ></button>
                        <button className={!active ? 'boton-option boton-entities' : 'boton-option'} onClick={NotActive}></button>
                    </div>
                </tr>
                
            </tbody>
        </>
    )
}