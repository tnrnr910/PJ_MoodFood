import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LayOut() {
  return (
    <>
      <Header />
      <main style={{ marginTop: 100 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default LayOut;
