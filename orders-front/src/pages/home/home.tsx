import hero from '../../assets/hero.jpg'
import ProductCard from '../../components/product/product-card'
import { useProducts } from '../../hooks/useProducts'
import './home.css'

function Home() {
  const { products, loading, error } = useProducts()

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
          {loading && <p>Carregando produtos...</p>}
          {error && <p>{error}</p>}
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
