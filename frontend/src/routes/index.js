import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'
import Home from '../pages/Home/Home'

export default function Routes() {

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  )
}
