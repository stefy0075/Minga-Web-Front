import React from 'react'
import './deletemodal.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import deleteModalActions from '../../store/RenderDeleteModal/actions'
import axios from 'axios';


export default function DeleteModal() {
    let deleteId = useSelector(store => store.modalDeleteState.id)

    const { renderDeleteModal } = deleteModalActions
    const dispatch = useDispatch()

    function handleClose() {
        dispatch(renderDeleteModal({ state: false }))
    }

    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    const url = 'http://localhost:8080/api/mangas/' + deleteId

    async function handleDelete() {
        try {
            await axios.delete(url, headers)
            Swal.fire("Manga deleted successfully")
            setTimeout(() => {
                handleClose()
            }, 1500)
        } catch (error) {
            if (error.response) {
                if (typeof error.response.data.message === 'string') {
                    Swal.fire(error.response.data.message)
                } else {
                    error.response.data.message.forEach(err => Swal.fire(err))
                }
            } else {
                Swal.fire(error.message)
            }
        }
    }

    return (
        <div className='delete-modal'>
            <h2>Delete this manga?</h2>
            <div className='modal-btns'>
                <p onClick={handleDelete}>Delete</p>
                <p onClick={handleClose}>Cancel</p>
            </div>
            
        </div>
    )
}