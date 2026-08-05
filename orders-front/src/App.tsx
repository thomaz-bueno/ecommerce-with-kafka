import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/header/header'
import Home from './pages/home/home'
import Product from './pages/product/product'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Cart from './pages/cart/cart'
import Favorites from './pages/favorites/favorites'
import ProtectedRoute from './components/protected-route/protected-route'

function AppRoutes() {
  const location = useLocation()
  const hideHeader = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
