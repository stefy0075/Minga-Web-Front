import React from "react";
import Hero from '../hero/hero';
import AuthForm from '../AuthForm/AuthForm'

export default function Index() {
    let token = localStorage.getItem('token')
    return (
      <>
          <Hero />
          {
            token ? "" : <AuthForm /> 
          }
      </>
    )
  }