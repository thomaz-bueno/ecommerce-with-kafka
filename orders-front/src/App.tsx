import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/header'
import Home from './pages/home/home'
import Product from './pages/product/product'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
