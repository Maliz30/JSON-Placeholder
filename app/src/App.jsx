import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import User from './views/User'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/:id" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
