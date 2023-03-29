import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import "./chapters.css"
import Comment from "../../components/Comments/Comments";
import { useDispatch, useSelector } from 'react-redux'
import modalActions from '../../store/ModalComments/actions'
import Chat from '../../images/chat.png'
import commentsActions from '../../store/Comments/actions'
import { Link as Anchor } from "react-router-dom"


export default function Chapters() {
    let url = "http://localhost:8080/api/chapters/"
    let {id, page} = useParams()
    let [chapter, setChapter] = useState({})
    let [next, setNext] = useState("")
    let [prev, setPrev] = useState("")
    let [index, setIndex] = useState(parseInt(page))
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let modalState = useSelector(store => store.commentsModal.state)
    const { renderModal } = modalActions

    let comments = useSelector(store => store.comments.comments)
    console.log(comments)

    let url2 = 'http://localhost:8080/api/comments?chapter_id=' + id
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    const { getComments } = commentsActions   

    useEffect(
        () => {
            axios.get(url + id)
            .then(res => {
                setChapter(res.data.chapter)
                setNext(res.data.next)
                setPrev(res.data.prev)
                console.log(res.data)
            })
                 .catch(e => console.log(e))
        }, 
        [id, page,comments]
    )

    let handlePrev = () => {
        setIndex(index - 1)
          navigate(`/chapters/${id}/${index - 1}`)
        if ( index <= 0 && chapter.order == 1) {
            navigate(`/mangas/${0}`)
        }

        else if (index <= 0) {
            navigate(`/chapters/${prev}/${0}`)
            window.location.reload(true)
        }
    }

    let handleNext = () => {
        setIndex(index + 1)
        navigate(`/chapters/${id}/${index + 1}`)
        if (index >= chapter.pages.length - 1) {
            navigate(`/chapters/${next}/${0}`)
            window.location.reload(true)
     
        }
    }

    function handleRender() {
        dispatch(renderModal({ state: true }))
      }


      
      useEffect(() => { 
        setTimeout(() => {       
          axios.get(url2, headers).then(res => dispatch(getComments({ comments: res.data.comments })))     
      }, 100)
     }, [])

    return (
      <>
      {
        token ? <div className='chapters'>
        <div className='header'>
            <h5>n°{chapter?.order } - { chapter?.title} </h5>
        </div>
        <div className='pages'>
        <div className='prev' onClick={handlePrev}>
            <img src="../../images/left-arrow.png" alt="prev" />
        </div>
        <img className='comic-page' src={chapter.pages?.[index]} />
        <div className='next' onClick={handleNext}>
            <img src="../../images/right-arrow.png" alt="next" />
        </div>
        </div>
        <div className="div-chapter3">
        <div className="chapter3">
          <p className="parrafo-chapter3">
            <img className="comment" src={Chat} alt="" onClick={handleRender} /> {/* ESTA ABRE EL MODAL*/}
          </p>
          <p className='quantity-comments'>{comments.length}</p>
          {modalState ? <Comment /> : ""}
        </div>
      </div>
    </div> : <div className='noLogged'><Anchor to='/auth'>Please Register or Login</Anchor></div>
      }
      </>
  )
}
