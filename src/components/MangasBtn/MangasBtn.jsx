import React from 'react'
import './mangasBtn.css'
import { Link as Anchor } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function MangaBtns() {
    let page = Number(useParams().page)
    let mangas = useSelector(store => store.mangas.mangas)

    return (
        <div className='page-btns'>
            {page === 1 ? "" : <Anchor className='btn-prev' to={'/mangas/' + (page - 1)} >Prev</Anchor>}
            { mangas?.length === 6 || mangas?.length === 10 ? <Anchor className='btn-next' to={'/mangas/' + (page + 1)} >Next</Anchor> : "" }
        </div>
    )
}
