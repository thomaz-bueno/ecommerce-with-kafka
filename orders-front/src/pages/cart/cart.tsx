import { useState } from 'react'
import './cart.css'

function Cart() {
  const [bannerVisible, setBannerVisible] = useState(true)

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-left">
          {bannerVisible && (
            <div className="free-delivery-banner">
              <div className="banner-content">
                <span className="banner-title">FREE DELIVERY</span>
                <span className="banner-text">
                  Applies to orders of ₱7,500 or more.{' '}
                  <a href="#" className="banner-link">View details.</a>
                </span>
              </div>
              <button
                className="banner-close"
                onClick={() => setBannerVisible(false)}
              >
                ×
              </button>
            </div>
          )}

          <h1 className="bag-title">Bag</h1>

          <div className="cart-item">
            <div className="item-image">
              <img
                src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/17j23py6zgy2pnqu0d3n/air-force-1-07-shoes-WrLlWX.png"
                alt="Nike Air Force 1 '07"
              />
            </div>

            <div className="item-details">
              <div className="item-info">
                <div className="item-text">
                  <h3 className="item-name">Nike Air Force 1 '07</h3>
                  <p className="item-category">Women's Shoe</p>
                  <p className="item-color">White/White/White</p>
                  <div className="item-meta">
                    <button className="meta-btn">
                      Size 8
                      <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <button className="meta-btn">
                      Quantity 1
                      <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                </div>
                <span className="item-price">₱5,495.00</span>
              </div>

              <div className="item-actions">
                <button className="action-icon" aria-label="Add to favorites">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <button className="action-icon" aria-label="Remove item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="cart-divider" />
        </div>

        <div className="cart-right">
          <h2 className="summary-title">Summary</h2>

          <div className="summary-row">
            <div className="summary-label">
              Subtotal
              <span className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
            </div>
            <span className="summary-value">₱5,495.00</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Estimated Delivery & Handling</span>
            <span className="summary-value">₱250.00</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row summary-total">
            <span className="summary-label total-label">Total</span>
            <span className="summary-value total-value">₱5,745.00</span>
          </div>

          <div className="checkout-buttons">
            <button className="checkout-btn guest-btn">Guest Checkout</button>
            <button className="checkout-btn member-btn">Member Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
