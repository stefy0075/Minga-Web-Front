import React, { useEffect } from 'react'
import './comments.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import modalActions from '../../store/ModalComments/actions'
import commentsActions from '../../store/Comments/actions'
import Edit from '../../images/edit.png'
import Delete from '../../images/delete.png'
import Send from '../../images/send.png'
import Chat from '../../images/chat.png'
import Left from '../../images/left-arrow.png'
import Right from '../../images/right-arrow.png'

export default function Comment() {
    let [comments,setComments] = useState("")
    let [reload, setReload] = useState(false)
    let user = JSON.parse((localStorage.getItem('user')))

    let dispatch = useDispatch()
    const { renderModal } = modalActions
    const { getComments } = commentsActions

    let id = useParams().id
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    let [page, setPage] = useState(1)
    let url = 'http://localhost:8080/api/comments?chapter_id=' + id + '&page=' + page
    useEffect(() => {
        setTimeout(() => {
            axios.get(url, headers).then(res => setComments(res.data.comments))
        }, 100)
    }, [page, reload])

    function handlePage1() {
        if (page !== 1) {
            setPage(page - 1)
        }
    }

    function handlePage2() {
        setPage(page + 1)
    }

    let input = useRef()

    async function handlePost(e) {
        e.preventDefault()
        try {
            let url = 'http://localhost:8080/api/comments'
            let data = {
                "chapter_id": id,
                "text": input.current.value
            }
            await axios.post(url, data, headers)
            input.current.value = ""
            // toast.success("Comment created")
            setReload(!reload)
        } catch (error) {
            if(error.response){
                if (typeof error.response.data.message === 'string') {
                    console.log(error.response.data.message)
                    //toast.error(error.response.data.message)
                } else {
                    error.response.data.message.forEach(err => console.log(err))
                    
                }
            }
        }
    }

    async function handleDelete(e) {
        try {
            let url = 'http://localhost:8080/api/comments/' + e.target.id
            await axios.delete(url, headers)
            // toast.success("Comment deleted")
            setReload(!reload)
        } catch (error) {
            if (typeof error.response.data.message === 'string') {
                // toast.error(error.response.data.message)
            } else {
                // error.response.data.message.forEach(err => toast.error(err))
            }
        }
    }

    let [editText, seteditText] = useState(false)
    function prueba() {
        seteditText(!editText)
    }

    async function handleEdit(e) {
        e.preventDefault()
        let inputValue = ""
        if (e.target.localName == "form") {
            inputValue = e.target.firstChild.value
        }
        if (e.target.localName == "img") {
            inputValue = e.target.previousSibling.firstChild.value
        }
        try {
            let url = 'http://localhost:8080/api/comments/' + e.target.id
            let data = {
                "chapter_id": id,
                "text": inputValue
            }
            await axios.put(url, data, headers)
            // toast.success("Comment edited")
            setReload(!reload)
            seteditText(!editText)
        } catch (error) {
            if (typeof error.response.data.message === 'string') {
                // toast.error(error.response.data.message)
            } else {
                // error.response.data.message.forEach(err => toast.error(err))
            }
        }
    }

    function handleClose() {
        dispatch(renderModal({ state: false }))
    }

    useEffect(() => { 
        let url = 'http://localhost:8080/api/comments?chapter_id=' + id
        setTimeout(() => {
            axios.get(url, headers).then(res => dispatch(getComments({comments: res.data.comments})))
        }, 100)
    }, [reload])

    return (
        <div className='comment-modal'>
            {
                comments.length ? comments.map((comment, i) => {
                    let card = <div className="comment-is-property" key={i}>
                        <div className="user-coment">

                            {comment.user_id._id === user.id ? <div className="edit-delete">
                                <div id={comment._id} className="edit-comment" onClick={prueba}>
                                    <p>Edit</p>
                                    <img src={Edit} alt="" />
                                </div>
                                <div className="delete-comment" >
                                    <img id={comment._id} src={Delete} alt="" onClick={handleDelete} />
                                </div>
                            </div> : ""}

                            <img src={comment.user_id.photo} className="img-comment" alt="" />
                        </div>
                        <div className="user-coments">
                            <p className="name-comment">{comment.user_id.name} </p>
                            {
                                comment.user_id._id === user.id ? !editText ? <p className="comentario">{comment.text} </p> : <div className='new-comment'>
                                    <form id={comment._id} onSubmit={handleEdit}>
                                        <input type='text' defaultValue={comment.text} />
                                    </form>
                                    <img id={comment._id} src={Send} onClick={handleEdit} />
                                </div> : <p className="comentario">{comment.text} </p>
                            }
                        </div>
                        <div className="sub_comments">
                            <div className="sub-reply">
                                <img className="subcomment" src={Chat} alt="" />
                                <div className="reply-comment">
                                    <p>Reply</p>
                                    <img src={Edit} alt="" />
                                </div>
                            </div>
                            <p className="time">{new Date(comment.updatedAt).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    return card
                }) : ""
            }
            <div className='flechas'>
                {page == 1 ? "" : <img src={Left} onClick={handlePage1} />}
                {comments.length == 4 ? <img src={Right} onClick={handlePage2} /> : ""}
            </div>
            <div className='new-comment'>
                <form onSubmit={handlePost}>
                    <input type='text' placeholder='Say something here...' ref={input} />
                </form>
                <img src={Send} onClick={handlePost} />
            </div>
            <div className='modal-btns'>
                <p onClick={handleClose}>Cancel</p>
            </div>
        </div>
    )
}