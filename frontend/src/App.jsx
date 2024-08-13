// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOder from './pages/PlaceOder/PlaceOder';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';



const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />

    </>
  );

};

export default App; // Make sure App is the default export
