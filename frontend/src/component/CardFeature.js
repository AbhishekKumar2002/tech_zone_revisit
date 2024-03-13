import React from "react";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";
import { useDispatch } from "react-redux";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();
  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white dark:bg-slate-800 hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col rounded-lg">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-50 flex flex-col justify-center items-center">
              <img
                src={image}
                className="h-44 object-contain w-full rounded-lg"
                alt=""
              />
            </div>
            <div className="h-28">
              <h3 className="font-semibold dark:text-slate-300 text-slate-600 text-center capitalize text-lg mt-4">
                {name}
              </h3>
              <p className="text-center text-slate-500 font-medium">
                {category}
              </p>
              <p className="text-center font-bold">
                <span className="text-blue-500">₹</span>
                <span>{price}</span>
              </p>
            </div>
          </Link>
          <button
            className="bg-blue-500 py-2 mt-2 rounded hover:bg-blue-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
