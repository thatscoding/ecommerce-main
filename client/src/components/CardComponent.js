import { useState } from "react";
import React from "react";

function CardComponent({ product, AddItemToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className=" h-32 w-32 rounded-lg bg-orange-400  flex flex-col items-center justify-center text-white shadow-xl ease-in-out duration-700"
      onClick={() => AddItemToCart(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="text-base text-center ease-in-out duration-300 px-1">
        {product.productName}
      </p>
      {isHovered ? (
        <div className="ease-in-out duration-700 flex justify-center flex-col">
          <p className=" text-sm text-center ease-in-out duration-300">
            {product.price}
          </p>
          <p className=" text-sm text-center line-clamp-1  ease-in-out duration-300">
            {product.description}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default CardComponent;
