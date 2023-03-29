import "./header.css"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import authorActions from "../../../store/authors/actions.js"
import { useParams } from "react-router"
import iconGps from "../../../images/iconGps.png"
import iconDate from "../../../images/iconDate.png"
import iconEdit from "../../../images/iconEdit.png"

const { get_author } = authorActions

const AuthorHeader = () => {
    const store = useSelector((store) => store.author)
    const authors = store.authors
    const author = store.authors[0]
    console.log(author)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        if (authors.length === 0) {
            dispatch(get_author({_id: params.id}))
        }
    })

    return (
        <>
          <div className="containerGeneral">
            {authors.length > 0 && (
                <div className="containerHeader">
                    <div className="container2">
                        <div className="fotoAuthor">
                            <img
                                className="imgAuthor"
                                src={author.photo}
                                alt="autora"
                            />
                        </div>
                        <div className="containerAuthorDetails">
                            <h2 className="nombreAuthor p-author">
                                {author.name} {author.last_name}
                            </h2>
                            <div className="div-detail">
                                <div>
                                    <p className="localidad p-author">
                                        <img
                                            className="iconLocalidad"
                                            src={iconGps}
                                            alt="icono localidad"
                                        />
                                        {author.city}, {author.country}
                                    </p>

                                    <p className="fechaNacimiento">
                                        {author.date && (
                                            <>
                                                <img
                                                    className="iconCumple"
                                                    src={iconDate}
                                                    alt="icono cumpleaños"
                                                />
                                                {author.date.slice(0, 10)}
                                            </>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <img
                                        className="icon-editar"
                                        src={iconEdit}
                                        alt="editar documento"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="descripcionAuthor">
                        {author.descriptions}
                    </p>
                </div>
            )}
          </div>
        </>
        
    )
}

export default AuthorHeader


