import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'
import '../style/cart.css'
import { removeCart, addToCart, decreaseItemCart, clearCart, getTotals } from '../store/cart/slice'

const Cart = () => {
  const cartItems = useSelector((state) => state.carts.cartItems)
  const { cartTotalAmount } = useSelector((state) => state.carts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
  }, [cartItems])

  const handleAddToCart = (food) => {
    dispatch(addToCart(food))
  }

  const handleRemoveItem = (cartItem) => {
    dispatch(removeCart(cartItem))
  }

  const handleDecreaseItem = (cartItem) => {
    dispatch(decreaseItemCart(cartItem))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="cart-container">
      <div>
        <h2>Shopping Cart</h2>
      </div>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart Is Currently empty</p>
          <div className="start-shopping">
            <Link to={'/'}>
              <ArrowLeft />
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />
                  <div className="cart-product-item">
                    <div className="cart-product-item-name">
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                    </div>
                    <button onClick={() => handleRemoveItem(cartItem)}>Remove</button>
                  </div>
                </div>
                <div className="cart-product-price">{cartItem.price}¥</div>
                <div className="cart-product-quantity">
                  <button style={{ color: 'red' }} onClick={() => handleDecreaseItem(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button style={{ color: 'blue' }} onClick={() => handleAddToCart(cartItem)}>
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  {cartItem.cartQuantity * cartItem.price}¥
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal: </span>
                <span className="amount">{cartTotalAmount}¥</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping">
                <Link to={'/'}>
                  <ArrowLeft />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
