import './order-card.css'

interface OrderItem {
  size: string
  color: string
  price: number
  quantity: number
  productId: string
}

interface OrderCardProps {
  id: string
  items: OrderItem[]
  total: string
  created_at: string
  isExpanded: boolean
  onToggle: () => void
}

function OrderCard({
  id,
  items,
  total,
  created_at,
  isExpanded,
  onToggle,
}: OrderCardProps) {
  const formattedTotal = `R$ ${parseFloat(total).toFixed(2)}`
  const formattedDate = new Date(created_at).toLocaleDateString('pt-BR')

  return (
    <div className={`order-card ${isExpanded ? 'order-card-expanded' : ''}`}>
      <button className="order-card-header" onClick={onToggle}>
        <div className="order-card-info">
          <span className="order-card-id">Pedido #{id.slice(0, 8)}</span>
          <span className="order-card-date">{formattedDate}</span>
        </div>
        <div className="order-card-right">
          <span className="order-card-total">{formattedTotal}</span>
          <svg
            className={`order-card-chevron ${isExpanded ? 'order-card-chevron-open' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="order-card-items">
          {items.map((item, index) => (
            <div key={index} className="order-card-item">
              <div className="order-card-item-row">
                <span className="order-card-item-label">Produto</span>
                <span className="order-card-item-value">#{item.productId}</span>
              </div>
              <div className="order-card-item-row">
                <span className="order-card-item-label">Quantidade</span>
                <span className="order-card-item-value">{item.quantity}</span>
              </div>
              <div className="order-card-item-row">
                <span className="order-card-item-label">Tamanho</span>
                <span className="order-card-item-value">{item.size}</span>
              </div>
              <div className="order-card-item-row">
                <span className="order-card-item-label">Cor</span>
                <span className="order-card-item-value">{item.color}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderCard
