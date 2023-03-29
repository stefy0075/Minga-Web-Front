import React from 'react'
import "./mangaselect.css"
import axios from 'axios'
import { useState, useEffect } from 'react'
import apiUrl from '../../url'

export default function MangaSelect(props) {

    let url = `${apiUrl}mangas`

    let [categories, setCategories] = useState([])

   useEffect(
    () => {
        axios.get(url)
        .then( response => setCategories(response.data.categories)
        ).catch(e => console.log(e))
    }, []
   )


  return (
    <select ref={props.refparent} name="insert-categories" id="insert-categories">
    <option value="">Insert category</option>
    {
    categories.map((e) => <option id={e._id} key={e.name} value={e.name}>{e.name}</option>)
    }
    </select>
  )
}
 