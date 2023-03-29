import React from 'react'
import './formEdit.css'
import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import actions from '../../store/chapters/actions'
import { useParams } from 'react-router-dom'


const {get_chapters,editChapter, deleteChapter} = actions

// 640a29dfaa914d6b7c58481e

export default function FormEdit() {
    const [reload,setReload]=useState(false)
    const dispatch = useDispatch()
    const id = useParams().manga_id
    const [chapter,setChapter]=useState([])
    let [order, setOrder] = useState()
    const [selectedChapter,setSelectedChapter]= useState()
    let capNum=useRef()
    let modCat=useRef()
    let modValue=useRef()
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    
    let url = 'http://localhost:8080/api/chapters?manga_id=' + id
    useEffect(() => {
        setTimeout(() => {
            axios.get(url, headers).then(res => setChapter(res.data.response))
            
        }, 100)
    }, [reload])

    function handleEdit(e){
        e.preventDefault()
        const modified={
            id: capNum.current.value,
            category: modCat.current.value,
            data: modValue.current.value
        }
        console.log(modified)
        dispatch(editChapter({
            data: { [modified.category]: modified.data },
            chapter_id: modified.id

        }))
        alert("Chapter Modified")
        e.target.reset()
    }
    function handleChange(e) {
        setOrder(e.target.value)
        const retorno = chapter.filter( (chapter) => {
            if(chapter._id== e.target.value){
                return chapter
            }
        })
        console.log(...retorno )
        setSelectedChapter(...retorno)
    }
    function handleDelete(e){
        console.log("hola")
        const deleted={
            id:capNum.current.value
        }
        dispatch(deleteChapter({
            chapter_id:deleted.id
        }))
        alert("chapter deleted")
        e.target.reset()
    }







    return (
    <div className='edit'>
        <div className='edit-form'>
            <h2 className='title-ed'>Edit Chapter</h2>
             <form onSubmit={handleEdit} >
                <fieldset className='form-ed'>
                 <select name='selectchapter' id='selectchapter' ref={capNum} onChange={handleChange} >
                    {chapter?.map(chapter => (
                        <option key={chapter.title} value={chapter?._id}>{chapter?.order}</option>
                    ))} 
                </select> 
                <select name="chapter" id="chapter" ref={modCat} >
                    <option value="title">title</option>
                    <option value="order">order</option>
                    <option value="pages">pages</option>
                </select>
                <input className='edit-button' type="text" placeholder='data to edit'ref={modValue} />
                </fieldset>
                <button className='btn-edit' >Edit</button>
            </form> 
                <button className='btn-del' onClick={handleDelete} >delete</button>
        </div>
         {
            selectedChapter?<div className='div-naruto'>
            <h2>{selectedChapter.title}</h2>
            <img className='img-naruto' src={selectedChapter.cover_photo} alt="photo" />
            </div> : ""
         }
    </div>
)
}