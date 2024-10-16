import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import ProductContext from "../contexts/ProductContext";
import ProductCard from "./ProductCard";

const Home = () => {
  const [userData] = useContext(AuthContext);
  const allProducts = useContext(ProductContext);
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-2">All Products</h1>

      <div className="grid grid-cols-3 gap-4 px-3">
       {allProducts.map((product) => (
         <ProductCard key={product.id} product={product} userData={userData} />
       ))}
      </div>
    </>
  );
};

export default Home;
