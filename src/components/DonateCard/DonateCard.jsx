import React from 'react'
import './donatecard.css'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import apiUrl from "../../url.js"




export default function DonateCard({donate}) {
    let url = `${apiUrl}payments`

    const handleClick =  async () => {

        try {
            axios.post(url, donate)
                 .then(res => (window.location.href = res.data.response.body.init_point))
                  await toast.show({
                    type: 'success',
                    text1: 'Sera redirigido a la pagina de Mercadopago',
                  })
        } catch (error) {
            if(error.response){
                if (typeof error.response.data.message === 'string') {
                  await toast.error(error.response.data.message)
                } else {
                  await error.response.data.message.forEach(err => toast.error(err))
                }
              }else{
                await toast.error(error.message)
              }
        }
             
    }


    
return (
    <div className='card-donate' onClick={handleClick}>
        <h4>
            {donate.title}
        </h4>
        <p className='desc'>
            {donate.description}
        </p>
        <h5 className='price'>
            {donate.price}
        </h5>
    </div>
)

}