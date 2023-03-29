import React from 'react'
import "./mymangascards.css"
import H2 from '../H2/H2'
import Image from '../../components/Image/Image'
import { useEffect, useState } from 'react'
import mangasActions from '../../store/MyMangas/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link as Anchor } from 'react-router-dom'
import addIcon from "../../images/addIcon.png"
import editIcon from "../../images/editIcon.png"
import CardAdd from "../../images/CardAdd.jpeg"
import EditModal from '../EditModal/EditModal'
import modalActions from '../../store/RenderEditModal/actions'
import DeleteModal from '../DeleteModal/DeleteModal'
import deleteModalActions from '../../store/RenderDeleteModal/actions'
import { useParams } from 'react-router-dom'


export default function MyMangasCards() {
    let mangas = useSelector(store => store.myMangas.myMangas)
    let editModalState = useSelector(store => store.modalState.state)
    let deleteModalState = useSelector(store => store.modalDeleteState.state)
    let categories = useSelector(store => store.categories.categories)
    let page = useParams().page

    const { read_myMangas } = mangasActions
    const { renderModal } = modalActions
    const { renderDeleteModal } = deleteModalActions
    const dispatch = useDispatch()

    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }

    useEffect(() => {
        dispatch(read_myMangas({ headers, page:page, categories:categories }))
    }, [ editModalState,  deleteModalState, categories, page])

      function handleEdit(event){
             dispatch(renderModal({state: true, id: event.target.id}))
        
    }
    // console.log(editModalState)

    
    function handleDelete(event){
        dispatch(renderDeleteModal({state: true, id: event.target.id}))
    }

  return (
    <div className='mangas-cards'>
         <section className='card'>
                    <div className='card_add-text'>
                        <Anchor to={'/manga-form'}><Image className= "addImage" src={addIcon} /></Anchor>
                    </div>
                    <div className='card-img'>
                        <Image src={CardAdd} alt='manga-image' />
                    </div>
                </section>
    {
        mangas.length ? mangas.map((manga, i) => {
            let card =
                <section className='card' key={i}>
                    <div className='card-text'>
                        <div className={'card-color-'+manga.category_id.name}></div>
                        <div className='text'>
                            <div className='createAndEdit-icons'>
                                <Anchor to={'/chapter-form/' + manga._id}><Image src={addIcon} /></Anchor>
                                <Anchor to={'/edit/' + manga._id}><Image src={editIcon} /></Anchor>
                            </div>
                            <div>
                                <H2 text={manga.title} />
                                <span className={'span-'+manga.category_id.name}>{manga.category_id.name}</span>
                            </div>
                            <div className='actions-btns'>
                                <Anchor className='myMangas-card-anchor' to={'/mangas/' + manga._id + "/1"}>Read</Anchor>
                                <Anchor id={manga._id} className='myMangas-card-anchor editBtn' onClick={handleEdit}>Edit</Anchor>
                                <Anchor id={manga._id} className='myMangas-card-anchor deleteBtn' onClick={handleDelete}>Delete</Anchor>
                            </div>
                        </div>
                    </div>
                    <div className='card-img'>
                        <Image src={manga.cover_photo} alt='manga-image' />
                    </div>
                </section>
            return card
        }) : <H2 text='there is not existing mangas' />
    }
    { editModalState ? <EditModal /> : "" }
    { deleteModalState ? <DeleteModal /> : "" }
</div>
      )}
    