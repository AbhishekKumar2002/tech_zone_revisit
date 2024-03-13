"use client"
import React, { useEffect, useRef, useState, Suspense } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../component/CardFeature'
import { FcPrevious, FcNext } from 'react-icons/fc'
import { BsFilter } from 'react-icons/bs'
import FilterProduct from '../component/FilterProduct'
import AllProduct from '../component/AllProduct'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { useGLTF } from "@react-three/drei";
import Laptop3d from '../Laptop/Lap11'
// import Scene from '../Laptop/Scene.jsx'
// import Lap1 from '../Laptop/Lap1.jsx'
// import Lap1 from '../../public/Laptop/Lap1'


const Home = () => {
  const productData = useSelector((state)=>state.product.productList)

  // console.log(productData)
  const homeProductCartList = productData.slice(1, 7)
  // console.log(homeProductCartList)

  const homeProductCartListLaptop = productData.filter(el=>el.category==="laptop", [])
  // console.log(homeProductCartListLaptop)

  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef =  useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft+=200
  }
  const prevProduct = () => {
    slideProductRef.current.scrollLeft-=200
  }


 

  
  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        <div className='md:w-1/2 '>
          <Canvas className='h-3/4'>
          <ambientLight intensity={2}/>
          <OrbitControls enableZoom={false}/>
            <Suspense fallback={null}>
             
              <Laptop3d />
            </Suspense>
            <Environment preset='sunset'/>
            <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color='#000000'/>
          </Canvas>

        </div>
          
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el=>{
              return(
                <HomeCard
                  key = {el._id}
                  id = {el._id}
                  image = {el.image}
                  name = {el.name}
                  category = {el.category}
                  price = {el.price}
                />
              )

            })
            :
            loadingArray.map((el, index)=>{
              return(
                <HomeCard
                  key = {index}
                  loading={"Loading..."}
                />
              )
            })
          }
            
          </div>

          
      </div>

      <div className=''>
          <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl dark:text-slate-300 text-slate-700 mb-4'>New Launches</h2>
          <div className='ml-auto'>
            <button onClick={prevProduct} className='bg-slate-300 hover:bg-slate-400 dark:bg-slate-800 hover:dark:bg-slate-700 text-lg p-2 rounded'><FcPrevious/></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400  dark:bg-slate-800 hover:dark:bg-slate-700 text-lg p-2 rounded'><FcNext/></button>

          </div>

          </div>
          <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
          {
            homeProductCartListLaptop ? homeProductCartListLaptop.map(el=>{
              return(
                <CardFeature 
                  key = {el._id}
                  id = {el._id}
                  name = {el.name}
                  category={el.category}
                  price = {el.price}
                  image = {el.image}
                />
              )
            })
            :
            loadingArrayFeature.map((el, index)=>(<CardFeature loading = "Loading..." key = {index}/>))
          }
            
          </div>

      </div>

          <AllProduct className="dark:text-slate-300" heading={"All Product"}/>
      
      
    </div>
  )
}

export default Home
