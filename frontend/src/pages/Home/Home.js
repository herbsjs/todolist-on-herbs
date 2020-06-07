import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import style from '../../components/Styles/Styles';
import { useTranslation } from 'react-i18next';

function Home() {
  const classes = style();
  const { t } = useTranslation();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>{t('welcome')}!</h1>
        <p>
        {t('welcomeDescription')}
        </p>
      </main>
    </>
  );
}

export default Home;
