import React from 'react'

export default function Input({className,type,name,id,ref,value,placeholder}) {
  return (
    <input className={className} type={type} name={name} id={id} ref={ref} value={value} placeholder={placeholder} />
  )
}