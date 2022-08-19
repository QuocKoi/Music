import React from 'react'
import { Outlet } from 'react-router-dom'
import Play from '../Components/Play/Play'

export default function PlayTemplate() {
  return (
    <div style={{backgroundColor:'#170f23'}}>
        <Outlet/>
        <Play/>
    </div>
  )
}
