import "./mangaHeader.css"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import mangaActions from "../../../store/mangas/actions.js"
import { useParams } from "react-router"


const { get_manga } = mangaActions


const MangaHeader = () => {
  const data = useSelector((store) => store.mangas)
  
  const{title,cover_photo,category,company}=data

  //console.log(category)
  const dispatch = useDispatch()
  const params = useParams()

   useEffect(() => {
       if (data) {
          dispatch(get_manga({_id: params.id}))
       }
    },[])
  return(
   <div className="mangaheader">
      <section className="mangaphoto">
          <img src={cover_photo} className="cover" alt="cover_photo"/>
          <h2>{title}</h2>
      </section>
      <section className="mangainfo">
          <h2 className="category" >{category}</h2>
          <h2 className="company"> {company} </h2>
      </section>
   </div>
  )

}


export default MangaHeader