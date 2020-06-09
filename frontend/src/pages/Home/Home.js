import React from 'react';
import style from '../../components/Styles/Styles';
import Form from './Form/Form';
import Formlist from './Formlist/Formlist';

function Home() {
  const classes = style();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>Welcome!</h1>
        <p>
          This is a sample Todo List graphQL API using Herbs using Buchu, Gotu, Suma and Graphql with Apollo Server
          Express
        </p>
        <Form />
        <Formlist />
      </main>
    </>
  );
}

export default Home;
