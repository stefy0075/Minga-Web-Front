import React from "react";
import "./info.css"
import Hero from "../../images/hero.svg"
import Manga from "../../images/manga.svg"
export default function info(){
    return(
        <div id="info-container">

            <div id="info" >
                <img id="heroimg" src={Hero} alt="hero" />
                <img id="manga" src={Manga} alt="" />
                <div id="mangainfo">
                    <h2>Trigun Stampe</h2>
                    <span id="mangatitle">Manga</span>
                    <p>TRIGUN is a popular action manga by Yasuhiro Nightow that follows the story of Vash Stampede, a legendary gunfighter and pacifist with a huge bounty on his head.</p>
                </div>
            </div>
            <div id="backnaruto">

                <div id="narutocontent">
                    <h2>Live the emotion of the manga</h2>
                    <h3>Find the perfect manga for you</h3>
                    <span>#MingaForever 🔥</span>
                    <a id="explore"  href="#">Explore</a>
                </div>
                
            </div>

        </div>

        
        
    )

}