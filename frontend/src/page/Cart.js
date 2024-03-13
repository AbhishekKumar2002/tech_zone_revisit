import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import empty from "../assest/emptycart.jpg";

const Cart = () => {
  const productCartItems = useSelector((state) => state.product.cartItem);
  // console.log(productCartItems)

  const totalQty = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  const totalPrice = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const handlePayment = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productCartItems),
      }
    );
    // console.log(res)
    const data = await res.json();
    console.log(data);
  };
  return (
    <>
      <div className="p-2 md:p-4 ">
        <h2 className="text-lg md:text-4xl font-bold text-blue-600">
          Your Cart Items
        </h2>
        {productCartItems[0] ? (
          <div className="my-4 flex gap-3">
            <div className="w-full max-w-3xl">
              {productCartItems.map((el) => {
                return (
                  <CartProduct
                    id={el._id}
                    key={el._id}
                    name={el.name}
                    image={el.image}
                    price={el.price}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                  />
                );
              })}
            </div>

            <div className="w-full max-w-md ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Quantity :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price :</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-blue-500">₹</span>
                  {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
                Payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={empty} className="w-full max-w-sm" alt="" />
              <p className="text-blue-500 text-3xl font-bold ">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
