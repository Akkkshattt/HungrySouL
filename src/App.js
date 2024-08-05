import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import AppDownLoad from './components/AppDownLoad/AppDownLoad';
import { useState } from 'react';
import LoginPopup from "./components/LoginPopup/LoginPopup"

function App() {
  const [login,SetLogin] = useState(false);

  return (
    <>
    {login ? <LoginPopup setlogin = {SetLogin}/> : <></>}
    <div className="app"  >
      <Navbar setlogin = {SetLogin} />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/order' element={<PlaceOrder />}></Route>
      </Routes>
      <AppDownLoad />
    </div>
    <Footer />
    </>
  );
}

export default App;
