import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from './component/ProtectedRoute'
import Register from './pages/Register'



function App() {
  const url='http://localhost:4000'
  return (
<>
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/register" element={<Register url={url} />} />
        <Route path='/login' element={<Login url={url}/>}/>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home url={url} />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>

  )
}

export default App
