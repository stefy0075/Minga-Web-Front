import React from "react";
import './roleChange.css'
 import NewRoleAuthor from '../../components/NewRoleAuthor/NewRoleAuthor'
 import NewRoleCompany from '../../components/NewRoleCompany/NewRoleCompany'
 import NewRoleImage from '../../components/NewRoleImage/NewRoleImage'
 import NewRoleIndex from '../../components/NewRoleIndex/NewRoleIndex'
 import { Link as Anchor } from 'react-router-dom'

export default function RoleChange(){
  let token = localStorage.getItem('token')
  return(
    <>
    {
      token ? <div className='newrole'>
      <div className='author-company'>

          <NewRoleIndex />
          <NewRoleAuthor/>
          <NewRoleCompany />
      </div>
      <NewRoleImage />
  </div> : <div className='noLogged'><Anchor to='/auth'>Please Register or Login</Anchor></div>
    }
    </>
  )
}