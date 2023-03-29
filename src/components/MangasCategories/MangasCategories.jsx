import React from 'react'
import './mangasCategories.css'
import H2 from '../H2/H2'

export default function MangasCategories() {
    return (
        <div className='mangas-categories'>
            <div className='category1'><H2 text='Adventures' /></div>
            <div className='category2'><H2 text='Nostalgic' /></div>
            <div className='category3'><H2 text='Popular' /></div>
        </div>
    )
}
