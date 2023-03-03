import React, { useEffect } from 'react'
import { Cart4 } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotals } from '../store/cart/slice'

const NavBar = () => {
  const cartItems = useSelector((state) => state.carts.cartItems)
  const { cartTotalQuantity } = useSelector((state) => state.carts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTotals())
  }, [cartItems])
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Online Shop</h2>
      </Link>
      <Link to={'/cart'}>
        <div className="nav-bag">
          <Cart4 className="bagIcon" />
          <span className="bagQuantity">{cartTotalQuantity}</span>
        </div>
      </Link>
    </nav>
  )
}

export default NavBar
