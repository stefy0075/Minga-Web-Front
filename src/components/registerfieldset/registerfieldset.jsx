import React from 'react'
import './registerfieldset.css'
import Legend from '../Legend/Legend'
import Input from '../input/input'

export default function RegisterFieldset({id,legendText,inputType,inputName,inputId,imgSrc,imgAlt}) {
  return (
    <fieldset id={id}>
        <Legend text={legendText} />
        <Input type={inputType} name={inputName} id={inputId} />
        <img src={imgSrc} alt={imgAlt} />
    </fieldset>
  )
}