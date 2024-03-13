import React from 'react'
import {TbPlus, TbMinus} from 'react-icons/tb'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { deleteCartItems, increaseQty, decreaseQty } from '../redux/productSlide'

const CartProduct = ({id, name, image, category, qty, total, price}) => {
    const dispatch = useDispatch()
  return (
    <div className='dark:bg-slate-800 bg-slate-200 p-2 flex gap-4 rounded border-2 border-blue-300'>
      <div className='bg-white p-3 rounded overflow-hidden'>
        <img src={image} alt="" className='h-40 w-40 object-cover ' />

      </div>
      <div className="flex flex-col gap-1 mt-4 w-full">
          <div className='flex justify-between'>
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div className='cursor-pointer text-red-300 hover:text-red-500' onClick={()=>dispatch(deleteCartItems(id))}>
            <AiFillDelete/>

          </div>
          </div>
          <p className=" text-slate-500 font-medium ">
            {category}
          </p>
          <p className=" font-bold text-base">
            <span className="text-blue-500">₹</span>
            <span>{price}</span>
          </p>
          <div className='flex justify-between'>

          <div className="flex gap-3 items-center">
            <button className="bg-blue-300 py-2 mt-2 rounded hover:bg-blue-500 p-1" onClick={()=>dispatch(increaseQty(id))}>
            <TbPlus/>
            </button>
            <p className='font-semibold'>{qty}</p>
            <button
              className="bg-blue-300 py-2 mt-2 rounded hover:bg-blue-500 p-1" onClick={()=>dispatch(decreaseQty(id))}
            >
              <TbMinus/>
            </button>
          </div>

          <div className='flex items-center gap-2 font-bold text-slate-700'>
          <p>Total :</p>
          
          <p><span className='text-blue-500'>₹</span>{total}</p>

          </div>

          </div>
    </div>
    </div>
  )
}

export default CartProduct
