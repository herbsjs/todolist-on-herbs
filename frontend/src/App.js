import React from 'react'
import { Router } from 'react-router-dom'
import Routes from './routes'
import './App.css'
import history from './extensions/history'

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  )
}

export default App
