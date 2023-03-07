import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  foods: [],
  status: null,
  error: null,
}

export const foodFetch = createAsyncThunk(
  'foods/foodFetch',
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://vnrestaurant-api.vercel.app/products')

      return response?.data
    } catch (error) {
      return rejectWithValue('Error!')
    }
  }
)

const foodSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    addFood: (state, action) => {
      state.foods = [...state.foods, action.payload]
    },
    removeFood: (state, action) => {
      state.foods = state.foods.filter((food) => food.id !== action.payload.id)
    },
  },
  extraReducers: {
    [foodFetch.pending]: (state, action) => {
      // immer
      state.status = 'pending'
    },
    [foodFetch.fulfilled]: (state, action) => {
      // immer
      state.status = 'success'
      state.foods = action.payload
    },
    [foodFetch.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  },
})

const { addFood, removeFood } = foodSlice.actions

export { addFood, removeFood }

export default foodSlice.reducer
