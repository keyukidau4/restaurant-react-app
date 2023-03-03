import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const foodsApi = createApi({
  reducerPath: 'foodsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getAllFoods: builder.query({
      query: () => 'products',
    }),
    // getFoodById: builder.query({
    //   query: (id) => `products/${id}`,
    // }),
  }),
})

// const useGetFoodByIdQuery = foodsApi.endpoints.getFoodById

export const { useGetAllFoodsQuery } = foodsApi
// export const { useGetAllFoodsQuery } = foodsApi
