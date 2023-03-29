import React from 'react'
import './mangasTitle.css'
import H2 from '../../components/H2/H2'
import Image from '../../components/Image/Image'
import loupe from '../../images/Search.svg'
import { useRef } from 'react'
import textActions from '../../store/SearchBar/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default function MangasTitle() {
    const search = useRef()
    const dispatch = useDispatch()
    const {captureText} = textActions
    
    function handleSearch(){
        dispatch(captureText({inputText: search.current[0].value}))
    }
    
    let text = useSelector(store => store.text.text)
    
    function handleSubmit(e){
        e.preventDefault()
    }

    return (
        <section className='title'>
            <H2 text='Mangas' />
            <div className='search-bar'>
                <Image src={loupe} alt='loupe' />
                <form ref={search} onSubmit={handleSubmit}>
                    <input type='text' name='search-bar' placeholder='Find your manga here' onChange={handleSearch} defaultValue={text} />
                </form>
            </div>
        </section>
    )
}
