import React from "react";
import { useParams } from 'react-router-dom'
import "./open.css"
import NavHeader from "../NavHeader/NavHeader";
import NavBody from "../NavBody/NavBody";


export default function Open({handleRender}){
    const { favourites } = useParams()
    return(
        <nav id="navopen">
            <div id="user">
                <div id="userinfo">
                    <NavHeader handleRender={handleRender} />
                </div>
            </div>
            <div id="pages">
                <NavBody handleRender={handleRender}/>
            </div>
        </nav>
    )
}