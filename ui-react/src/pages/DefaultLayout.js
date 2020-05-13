import React from 'react';
import Header from '../components/Header/Header';

export default function DefaultLayout({ children }) {

  return (
      <div className="App">
        <Header />
        {children}
      </div>
  );
}
