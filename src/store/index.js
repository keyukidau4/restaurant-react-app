import { configureStore } from '@reduxjs/toolkit'
import foodReducer, { foodFetch } from './food/slice'
import cartSlice, { getTotals } from './cart/slice'
import { foodsApi } from './food/api'

export const store = configureStore({
  reducer: {
    food: foodReducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    carts: cartSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(foodsApi.middleware)
  },
})

store.dispatch(foodFetch())
store.dispatch(getTotals())
