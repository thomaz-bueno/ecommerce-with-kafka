import { Link } from 'react-router-dom'
import hero from '../../assets/hero.jpg'
import tenis from '../../assets/tenis.png'
import './home.css'

const products = [
  { id: 1, name: 'Kyrie 5 x Friends', price: '$114.95', image: tenis },
  { id: 2, name: 'Nike Air Max 720', price: '$154.95', image: tenis },
  { id: 3, name: 'Nike Zoom Pegasus 35 Turbo BRS', price: '$159.95', image: tenis },
]

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-image" style={{ backgroundImage: `url(${hero})` }} />
      </section>

      <section className="top-picks">
      <div className="top-picks-header">
        <h2 className="top-picks-title">Top Picks</h2>
      </div>

      <div className="top-picks-grid">
        {products.map((product) => (
          <Link to="/product" key={product.id} className="product-card">
            <div className="product-card-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-card-info">
              <h3 className="product-card-name">{product.name}</h3>
              <p className="product-card-price">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
    </>
  )
}

export default Home
