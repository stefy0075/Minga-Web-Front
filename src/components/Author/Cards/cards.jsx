import "./cards.css"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import mangasActions from "../../../store/mangas/actions.js"
import { useParams } from "react-router"

const { get_mangas_from_author } = mangasActions

const AuthorCards = () => {
    const [isToggled, setIsToggled] = useState(false)
    const store = useSelector((store) => store.mangas)
    console.log(store)
    const mangas = store.mangas
    const dispatch = useDispatch()
    const { id } = useParams()

    const handleClick = () => {
        setIsToggled(!isToggled)
    }

    useEffect(() => {
        if (mangas.length === 0) {
            dispatch(get_mangas_from_author({author_id: id}))
        }
    }, [dispatch, id, mangas])

    const mangasF = mangas.filter((manga) => manga.author_id === id)

    let mangasFiltrados = mangasF

    switch (isToggled) {
        case false:
            mangasFiltrados = [...mangasF].sort(
                (a, b) => new Date (b.updatedAt
) - new Date (a.updatedAt
)
            )
            break
        case true:
            mangasFiltrados = [...mangasF].sort(
                (a, b) => new Date (a.updatedAt
) - new Date (b.updatedAt
)
            )
            break
        default:
            mangasFiltrados = mangasF
    }

    return (
        <>
            <div className="containerSwitch">
                <p>New</p>
                <div className="toggle-container">
                    <button
                        className={`toggle-button ${isToggled ? "active" : ""}`}
                        onClick={handleClick}
                    >
                        <span className="toggle-button__slider"></span>
                    </button>
                </div>
                <p>Old</p>
            </div>
            <div className="containerCards">
                {mangasFiltrados.length < 4
                    ? mangasFiltrados.map((manga) => (
                          <div className="card" key={manga._id}>
                              <Link to={`/manga/${manga._id}`} key={manga._id}>
                                  <img
                                      className="imgCard"
                                      src={manga.cover_photo}
                                      alt="manga"
                                  />
                              </Link>
                              <p className="titleManga">{manga.title}</p>
                          </div>
                      ))
                    : mangasFiltrados
                          .slice(0, mangasFiltrados.length / 2)
                          .map((manga) => (
                              <div className="card" key={manga._id}>
                                  <Link
                                      to={`/manga/${manga._id}`}
                                      key={manga._id}
                                  >
                                      <img
                                          className="imgCard"
                                          src={manga.cover_photo}
                                          alt="manga"
                                      />
                                  </Link>
                                  <p className="titleManga">{manga.title}</p>
                              </div>
                          ))}
            </div>
        </>
    )
}

export default AuthorCards
