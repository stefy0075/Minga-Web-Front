import React from 'react'
import './newRoleCompany.css'
import Imgprofile from '../../images/profile-newrol.png'
import Imgprofile2 from '../../images/profile-newrol2.png'
import Imgprofile3 from '../../images/profile-newrol3.png'
import { Link as Anchor } from 'react-router-dom'

export default function NewRoleCompany() {
    return (
        <>
        <Anchor to={'/company-form'} className='text-author'>
            <div className='join-company'>
                <div className='profiles'>
                    <img src={Imgprofile} alt={Imgprofile} />
                    <img src={Imgprofile2} alt={Imgprofile2} />
                    <img src={Imgprofile3} alt={Imgprofile3} />
                </div>
                <div className='selec-company'>
                    <h3>Join as an Company!</h3>
                    <p>I'm a company and I want to publish my comics</p>
                </div>
            </div>
        </Anchor>
       </>
    )
}