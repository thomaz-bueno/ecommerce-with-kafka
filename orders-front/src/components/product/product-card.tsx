import { Link } from 'react-router-dom'
import './product-card.css'

export interface ProductProps {
  id: number
  name: string
  base_price: string
  image_url: string
}

function ProductCard({ id, name, base_price, image_url }: ProductProps) {
  return (
    <Link to="/product" className="product-card">
      <div className="product-card-image">
        <img src={image_url} alt={name} />
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{name}</h3>
        <p className="product-card-price">R$ {base_price}</p>
      </div>
    </Link>
  )
}

export default ProductCard
