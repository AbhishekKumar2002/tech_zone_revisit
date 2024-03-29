import './App.css';
import react, { useEffect } from 'react'
import { useState } from 'react'
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import { setDataProduct } from './redux/productSlide';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}product`)
      const resData = await res.json()
      // console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[])
  // console.log(productData)
  return (
    <>
    <Toaster/>
      <div className=''>
      <Header/>
      <main className='pt-16 bg-slate-100 dark:bg-slate-950 dark:text-slate-200 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </div>
    </>
  );
}

export default App;
