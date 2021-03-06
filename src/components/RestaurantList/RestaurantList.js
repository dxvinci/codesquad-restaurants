
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import restauranstStore from '../../apis/restaurantsApi';
import RefreshBtn from './RefreshBtn';
import { throttle } from '../../lib/util';
import RestartantModal from "./RestartantModal";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
`

const H2 = styled.h2`
  margin-top: 0;
  height: 60px;
`

const P = styled.p`
  margin: 0;
  font-weight: bold;
`

const RandomRestaurants = styled.div`
  position: relative;
  padding-top: 40px;
`

const Card = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background: #fff;
  width: 280px;
  height: 200px;
  border-radius: 20px;
  box-shadow: 0 2px 3px black, 0 2px 10px black;
  margin-bottom: 30px;
`

const ContensContainer = styled.div`
  width: 90%;
  height: 80%;
`

const Overlapped = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  padding: 40px;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  z-index: 2;
  color: #ffffff;
  opacity: 1;
  background-color: black;
  & h1 {
    text-align: center;
    word-break: keep-all; 
  }

  &:hover {
    opacity: 0;
    transition: opacity .5s ease-out;
  }
`

const Span = styled.span`
  display: inline-block;
  background-color: grey;
  border-radius: 20px;
  margin-right: 10px;
  height: 25px;
  width: 60px;
  text-align: center;
  padding-top: 3px;
`

const RestaurantList = () => {

  const [restaurantsInfo, setRestaurantsInfo] = useState([]);
  
  
  const getRestaurants = async () => {
    const restaurantsJson = await restauranstStore.get("/stores?size=9");
    const randomRestaurants = restaurantsJson.data.stores;
    console.log("random",randomRestaurants);
    setRestaurantsInfo(randomRestaurants);
  }

  const throttledHandler = throttle(getRestaurants, 300);

  const resetRestaurants = (e) => {
    e.preventDefault();
    throttledHandler();
  }
  
  useEffect(() => {
    getRestaurants();
  }, []);

  const total = restaurantsInfo.map( (restaurantsInfo) => {
      return (
        <RestartantModal key={restaurantsInfo.id} restaurantsInfo={restaurantsInfo}/>
      )
  })

  return (
    <RandomRestaurants>
      <RefreshBtn clickHandler={resetRestaurants} />
      <Div>
        { restaurantsInfo ? total : '... loading'}
      </Div>
    </RandomRestaurants>
  )

}

export default RestaurantList;
