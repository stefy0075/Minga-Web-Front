import React from 'react'
import CompanyForm from '../../components/CompanyForm/companyform'
import { Link as Anchor } from 'react-router-dom'

function FormCompany() {
  let token = localStorage.getItem('token')
  return (
    <>
    {
      token ? <CompanyForm/> : <div className='noLogged'><Anchor to='/auth'>Please Register or Login</Anchor></div>
    }
    </>
    
  )
}

export default FormCompany
