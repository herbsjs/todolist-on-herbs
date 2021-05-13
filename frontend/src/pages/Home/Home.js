import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import style from '../../components/Styles/Styles'

function Home() {
  const classes = style()
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Welcome!</h1>
        <p>
          This is a sample Todo List graphQL/rest API using Herbs using Buchu, Gotu,
          Suma, Graphql with Apollo Server Express and Herbs2Rest
        </p>
      </main>
    </>
  )
}

export default Home
