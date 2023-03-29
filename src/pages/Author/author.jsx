import React, { useEffect } from "react"
import Cards from "../../components/Author/Cards/cards"
import Main from "../../components/Author/Main/main"
import { useNavigate } from "react-router"
import { Link as Anchor } from 'react-router-dom'

const Author = () => {
    let token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem("token")
        if (!token || token === undefined) {
            navigate("/")
        }
    })

    return (
        <>
        {
            token ? <Main>
            <Cards />
        </Main> : <div className='noLogged'><Anchor to='/auth'>Please Register or Login</Anchor></div>
        }
        </>
    )
}

export default Author
