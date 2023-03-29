import React, { useEffect } from "react"
import { useNavigate } from "react-router"
import MangaHeader from '../../components/Manga/MangaHeader/mangaHeader'
import Main from '../../components/Manga/Main/main'
import MangaMain from '../../components/Manga/MangaMain/mangaMain'
import MangaContent from "../../components/Manga/MangaContent/mangaContent"
import { Link as Anchor } from 'react-router-dom';

const Manga = () => {
  let token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
      let token = localStorage.getItem("token")
      if (!token || token === undefined) {
          navigate("/")
      }
  })

  return(
    <>
    {
      token ? <Main>
      <MangaHeader/>
      <MangaMain/> 
      <MangaContent/>
    </Main> : <div className='noLogged'><Anchor to='/auth'>Please Register or Login</Anchor></div>
    }
    </>
  )
}


export default Manga