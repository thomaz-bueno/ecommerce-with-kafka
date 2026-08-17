import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderCard from '../../components/orders/order-card'
import './orders.css'

interface OrderItem {
  size: string
  color: string
  price: number
  quantity: number
  productId: string
}

interface Order {
  id: string
  items: OrderItem[]
  total: string
  created_at: string
}

function Orders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar pedidos')
        return res.json()
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  function handleToggleOrder(orderId: string) {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
  }

  return (
    <section className="orders-page">
      <div className="orders-header">
        <h2 className="orders-title">Meus Pedidos</h2>
      </div>

      <div className="orders-list">
        {loading && <p>Carregando pedidos...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <div className="empty-orders">
            <div className="empty-orders-icon-wrapper">
              <svg className="empty-orders-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h2 className="empty-orders-title">Nenhum pedido encontrado</h2>
            <p className="empty-orders-subtitle">Faça sua primeira compra para vê-la aqui</p>
            <button className="empty-orders-btn" onClick={() => navigate('/')}>
              Explorar produtos
            </button>
          </div>
        )}
        {!loading && !error && orders.length > 0 && orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            items={order.items}
            total={order.total}
            created_at={order.created_at}
            isExpanded={order.id === expandedOrderId}
            onToggle={() => handleToggleOrder(order.id)}
          />
        ))}
      </div>
    </section>
  )
}

export default Orders
