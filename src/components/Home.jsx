import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetAllFoodsQuery } from '../store/food/api'
import '../style/home.css'
import { addToCart } from '../store/cart/slice'
import FOODS from '../database/data'

const Home = () => {
  const { data: datas, error, isLoading } = useGetAllFoodsQuery()

  const [foodData, setFoodData] = useState()

  useEffect(() => {
    datas ? setFoodData(datas) : setFoodData(FOODS)
  }, [foodData, datas])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="loading">
        <h1 data-text="Loading...">Loading...</h1>
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div>
  //       <h1>Error...</h1>
  //     </div>
  //   )
  // }

  const handleAddToCart = (food) => {
    dispatch(addToCart(food))
    // navigate('/cart')
  }

  return (
    <div style={{ marginBlock: '20px' }}>
      <ul className="listItem">
        {foodData?.map((data, index) => (
          <li key={index}>
            <img src={data.image} alt={data.name} width={300} height={280} />
            <div className="content">
              <div className="li-content">
                <h3>Tên: {data.name}</h3>
                <h4>名前: {data.desc}</h4>
                <p>Giá TIền(価格): {data.price}¥</p>
              </div>
              <div className="add-cart">
                <button className="add" onClick={() => handleAddToCart(data)}>
                  Add To Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
