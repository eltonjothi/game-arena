/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Head from 'next/head';
import Main from '../components/Main';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sapient Games Arena</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}
