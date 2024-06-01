import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpod"}/>
      <HorizontalCardProduct category={"earphones"} heading={"Top Earphones"}/>

      <VerticalCardProduct  category={"mobile"} heading={"Top Mobile"}/>
      <VerticalCardProduct  category={"mouse"} heading={"Top Mouse"}/>
      <VerticalCardProduct  category={"camera"} heading={"Top Camera & Photography"}/>
      <VerticalCardProduct  category={"printers"} heading={"Printers"}/>
      <VerticalCardProduct  category={"speakers"} heading={"Speakers"}/>
      <VerticalCardProduct  category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct  category={"processor"} heading={"processor"}/>
      <VerticalCardProduct  category={"watches"} heading={"watches"}/>
      <VerticalCardProduct  category={"TV"} heading={"Television"}/>
      <VerticalCardProduct  category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home