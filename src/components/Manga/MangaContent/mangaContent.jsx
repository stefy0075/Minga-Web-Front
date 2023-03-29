import "./mangaContent.css"
import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import mangaActions from "../../../store/mangas/actions.js"
import { useParams } from "react-router"
import { useState } from "react"
import chapterActions from '../../../store/chapters/actions'
import iconcomment from '../../../images/iconcomment.svg'

const { get_manga } = mangaActions
const {get_chapters}=chapterActions

const MangaContent=() => {
  const [isToggled, setIsToggled] = useState(false) 
  const data = useSelector((store) => store.mangas)
  console.log(data)
  const datachapter=useSelector((store)=> store.chapters.chapter)
  console.log(datachapter)
  const{description,cover_photo}=data
  


  //console.log(description)
  const dispatch = useDispatch()
  const params = useParams()
  const desc= useRef()
  const chapter= useRef()
  console.log(params)
   useEffect(() => {
       if (data) {
          dispatch(get_manga({_id: params.id}))
       }
    },[])
    
   useEffect(() => {
    if (datachapter) {
       dispatch(get_chapters({manga_id: params.id,page:params.page}))
    }
 },[])

 function mangaClick() {
  setIsToggled(false)
  

  if(chapter.current.className.includes("btnpink")){
    chapter.current.classList.toggle("btnpink")
  }
  if(!desc.current.className.includes("btnpink")){
    desc.current.classList.toggle("btnpink")
  }
 }
 function chapterClick(){
  setIsToggled(true)
  if(desc.current.className.includes("btnpink")){
    desc.current.classList.toggle("btnpink")
  }
  if(!chapter.current.className.includes("btnpink")){
    chapter.current.classList.toggle("btnpink")
  }
 }

 console.log(isToggled)
    




   return(
    <>
      <div className="buttons">
          <button className="manga-btn btnpink " ref={desc} onClick={mangaClick} >Manga</button>
          <button className="manga-btn" ref={chapter} onClick={chapterClick} >Chapters</button>
      </div>
      <div className="mangadesc">
        {!isToggled ?  <p>{description}</p> :"" }
        {isToggled ?  <div>
          {datachapter.map(cap => {
            return(
              <div className="chaptercontainer">
                <img className="chapterimg" src={cover_photo} alt="cover_photo" />
                <div className="order-chapter">
                  <p className="p-chapter">{cap.title}</p>
                  <div className="comment">
                      <img src={iconcomment} alt="iconcomment" />
                      <p>169</p>
                  </div>
                  
                </div>
                <button className='btn-read'>Read</button>
              </div>
            )
          })}
          
        </div> :"" }
      </div>
          
    </>
   )


}

export default MangaContent