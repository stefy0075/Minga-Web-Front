import React from 'react'
import {useRef} from 'react'
import axios from 'axios'
import "./formmanga.css"
import MangaSelect from '../Mangaselect/MangaSelect'
import apiUrl from '../../url'


export default function FormManga() {

 let title = useRef()
 let category = useRef()
 let description = useRef()

 async function handleSubmit(event){
   event.preventDefault()
     let data = {
       [title.current.name]: title.current.value,
       [category.current.name]: category.current.value,
       [description.current.name]: description.current.value 
     }

   let url = `${apiUrl}mangas`;
     try {
       await axios.post(url, data);
       alert("Manga Successfully Created")

     } catch (error) {
     
       console.log(error);
     }
     event.target.reset()
}
  return (
  
    <div className='new_manga'>
      <h1> New Manga </h1>
       <form onSubmit={handleSubmit}  action="New Manga" className='form-manga'>
        <input name="title" type="text" ref={title} placeholder='Insert title' />
        <MangaSelect refparent={category} name="category" />
        <input name="description" type="text" ref={description}  placeholder='Insert Description' />
        <input className='submit-manga' type="submit" name="submit" id="submit" />
       </form>
    </div>
   
  )
}
