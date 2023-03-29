import React, { useState } from 'react'
import iconPanel from '../../images/Union.png'
import { useDispatch } from 'react-redux';
import './tablerole.css'
import action from '../../store/PanelAdmin/actions'


const { captureState, update_author_active } = action;

export default function AuthorActive({ author }) {

    const [active, setActive] = useState(author.active);
    const dispatch = useDispatch();
    

    function IsActive() {
        dispatch(captureState({ buttonState: false }))
        dispatch(update_author_active({ _id: author._id, active: true }))
    }

    function NotActive() {
        dispatch(captureState({ buttonState: true }))
        dispatch(update_author_active({ _id: author._id, active: false }))
    }


    return (
        <>
            <tbody className='body-table'>
                <tr >
                    <td className="iconPanel"><img src={iconPanel} /></td>
                    <td className="colum1">{author.name}</td>
                    <td className="colum2">{author.city}</td>
                    <td className="colum3"><img className='photo-perfil-author' src={author.photo} alt="fotoperfil" /></td>
                    <div className={active ? 'panel-active' : 'panel-inactive'}>
                        <button className={active ? 'boton-option boton-entities' : 'boton-option'} onClick={IsActive} ></button>
                        <button className={!active ? 'boton-option boton-entities' : 'boton-option'} onClick={NotActive}></button>
                    </div>
                </tr>
            </tbody>
        </>
    )
}
