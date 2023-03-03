import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import Home from './components/Home'
import Navbar from './components/NavBar'
import Cart from './components/Cart'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import NotFound from './components/NotFound'

import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
