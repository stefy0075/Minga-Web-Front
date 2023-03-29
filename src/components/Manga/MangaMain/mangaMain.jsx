import "./mangaMain.css"
import emojiup from '../../../images/emojiup.svg'
import emojidown from '../../../images/emojidown.svg'
import emojisuprised from '../../../images/emojisuprised.svg'
import emojiheart from '../../../images/emojiheart.svg'



const mangaMain =() =>{

    return(
     <>
     
                      <div className="emojis">
                        <img src={emojiup} alt="emojiup" />
                        <img src={emojidown} alt="emojidown" />
                        <img src={emojisuprised} alt="emojisuprised" />
                        <img src={emojiheart} alt="emojiheart" />
                    </div>
                  <div className="rating">
                    <div className='rectangle-manga'>
                      <div className='rectangle-text'>
                          <p className='text1'>4.5/5</p>
                          <p className='text2'>Rating</p>
                      </div>
                      <p className='text3'> | </p>
                      <div className='rectangle-text'>
                          <p className='text1'>265</p>
                          <p className='text2'>Chapters</p>
                      </div>
                      <p className='text3'> | </p>
                      <div className='rectangle-text'>
                          <p className='text1'>Eng</p>
                          <p className='text2'>Lenguaje</p>
                      </div>
                    </div>
                  </div>
     
     </>
          
                  
          
       
    )



}


export default mangaMain