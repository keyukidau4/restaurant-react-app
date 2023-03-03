import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
        toast.info(`increase ${state.cartItems[itemIndex].desc} quantity by 1`, {
          position: 'top-left',
        })
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProduct)
        toast.success(`add ${action.payload.desc} to cart`, {
          position: 'top-left',
        })
      }

      localStorage.setItem('cartItems: ', JSON.stringify(state.cartItems))
    },
    decreaseItemCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1

        toast.warning(`decrease ${action.payload.desc} cart quantity`, {
          position: 'top-left',
        })
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)

        state.cartItems = nextCartItem

        toast.error(`remove ${action.payload.desc} from cart`, {
          position: 'top-left',
        })
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeCart: (state, action) => {
      const nextCartItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)

      state.cartItems = nextCartItem

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

      toast.error(`remove ${action.payload.desc} from cart`, {
        position: 'top-left',
      })
    },
    clearCart: (state) => {
      state.cartItems = []
      toast.error(`remove all item from cart`, {
        position: 'top-left',
      })
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem
          const itemTotal = price * cartQuantity

          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        }
      )
      state.cartTotalAmount = total
      state.cartTotalQuantity = quantity
    },
  },
})

const { addToCart, removeCart, decreaseItemCart, clearCart, getTotals } = cartSlice.actions

export { addToCart, removeCart, decreaseItemCart, clearCart, getTotals }

export default cartSlice.reducer
