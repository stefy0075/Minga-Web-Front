import React from 'react'
import './LogIn.css'
import LoginForm from '../../components/LoginForm/LoginForm'
import LogInimg from '../../images/LogIn.png'


export default function LogIn({renderRegister}) {
  return (
    <section className='log-in'>
      <div className='img-section'>
        <img src={LogInimg} alt="imagelogin" />
      </div>

      <div className='form-section'>
        <div className='welcome-section'>
          <h2>Welcome <span>Back</span>!</h2>
          <p>Discover manga, manhua and manhwa, track your progress, have fun, read manga</p>
        </div>

        <div className='form'>
          <LoginForm renderRegister={renderRegister} />
        </div>
      </div>

    </section>
  )
}

