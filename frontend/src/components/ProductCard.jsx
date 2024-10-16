import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product, userData, classname=""}) => {
  return (
    <Link to={`/product/${product?.id}`} className={`min-h-96 bg-gray-950 rounded-md max-w-80 ${classname}`}>
    <img
      src={product?.imageUrl}
      alt={product?.name}
      className="w-full h-44 rounded-tl-md rounded-tr-md"
    />
    <h2 className="font-semibold text-xl p-3 ">{product?.name}</h2>
    <p className="text-gray-400 text-sm px-3">
      {product?.description}
    </p>
    <div className="flex items-center px-5 py-3 mt-2" >
    <span className="rounded-full px-3 py-1 border-2 border-orange-500 select-none">{product.price}</span>
     <button className="bg-orange-500 text-white px-3 py-1 my-2 rounded-md ml-auto cursor-pointer">
      View
    </button>
    </div>
  </Link>
  )
}

export default ProductCard