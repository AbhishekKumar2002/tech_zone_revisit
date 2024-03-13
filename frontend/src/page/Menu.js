import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../redux/productSlide";

const Menu = () => {
  const { filterby } = useParams();
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  // console.log(productDisplay);
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem(productDisplay));
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-blue-100 dark:bg-slate-800 rounded-lg">
        <div className="max-w-lg overflow-hidden transition-all">
          <img src={productDisplay.image} alt="" className="hover:scale-105 rounded-lg overflow-hidden" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 dark:text-slate-300 text-center capitalize text-2xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className="text-center text-slate-500 dark:text-slate-200 font-medium text-2xl">
            {productDisplay.category}
          </p>
          <p className="text-center font-bold md:text-2xl">
            <span className="text-blue-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>
          <div className="flex gap-3 justify-center">
            <button className="bg-blue-500 py-2 mt-2 rounded hover:bg-blue-600 min-w-[100px]">
              Buy
            </button>
            <button
              onClick={handleAddCartProduct}
              className="bg-blue-500 py-2 mt-2 rounded hover:bg-blue-600 min-w-[100px] "
            >
              Add Cart
            </button>
          </div>
          <div className="">
            <p className="text-slate-600 dark:text-slate-200 font-medium pl-2">Description :</p>
            <p className="pl-2">{productDisplay.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;
