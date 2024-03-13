import React from "react";
import { BsFilter } from "react-icons/bs";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div>
      <div onClick={onClick}>
        <div
          className={`text-3xl p-3 bg-blue-400 rounded-full cursor-pointer ${
            isActive && "bg-blue-600 text-white"
          } flex justify-center items-center`}
        >
          <BsFilter />
        </div>
        <p className="text-center font-medium my-1 capitalize">{category}</p>
      </div>
    </div>
  );
};

export default FilterProduct;
