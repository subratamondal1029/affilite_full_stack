import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../contexts/ProductContext";
import AuthContext from "../contexts/AuthContext";

const Product = () => {
  const [userData] = useContext(AuthContext);
  const allProducts = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [showPopUp, setShowPopup] = useState(false)
 const [affiliateLink, setAffiliateLink] = useState("")
 const [prouctBuyData, setProductBuyData] = useState(null)

  useEffect(() => {
    if (allProducts.length === 0) {
      fetch(`/api/product?productId=${encodeURIComponent(1)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setProduct(data.data);
        });
    } else {
      setProduct(allProducts.find((product) => product.id == id));
    }
  }, [id]);

  const handleClick = (e) => {
    if (userData.data.role === "user") {
      fetch("/api/buyProduct", {
        method: "post",
        headers: {
          "content-type": "application/json" 
        },
        body: JSON.stringify({
          productId: id,
          userId: userData.data.id,
          refferCode: userData.data.refferCode
        })
      }).then(res => res.json())
      .then(data =>{
        if(data.success){
          setShowPopup(true)
          setProductBuyData(data.productDetail)
        }else throw new Error(data.message)
      })
      .catch(console.error)
    } else {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/redirect?productId=${id}&refferCode=${userData.data.refferId}`;
      setShowPopup(true)
      setAffiliateLink(url)
    }
  };

  return (
    <>
      <img
        src={product?.imageUrl}
        className="w-120 ml-4 rounded-md mt-3"
        alt={product?.name}
      />
      <h2 className="font-semibold text-xl p-3 ">{product?.name}</h2>
      <p className="text-gray-400 text-sm px-3">{product?.description}</p>
      <div className="flex items-center px-5 mb-3 mt-6 justify-start gap-10 w-full">
        <span
          className="rounded-full px-3 py-1 border-2 border-orange-500 select-none"
          title="refferCode"
        >
          {product.price}
        </span>
        {userData.isLogin && (
          <button
            className="bg-orange-500 text-white px-3 py-1 my-2 rounded-md"
            onClick={handleClick}
          >
            {userData?.data?.role === "user" ? "Buy Now" : "Create Link"}
          </button>
        )}
        {userData.data?.role !== "user" && <p className="text-sm text-gray-600">* 10% commission over the price</p>}
      </div>

      {showPopUp && (
        <div className="w-full flex items-center justify-center bg-white/20 h-screen fixed top-0">
          <div
            className="absolute top-20 right-2 cursor-pointer bg-gray-800 p-3 text-2xl rounded-lg"
            onClick={() => setShowPopup(false)}
          >
            close
          </div>
          {affiliateLink && <div className="w-60 p-4 bg-gray-900 rounded-md flex items-center">
            <div className="truncate w-3/4">{affiliateLink}</div>
            <button
              className="bg-orange-500 text-white p-2 text-sm rounded-md"
              onClick={(e) => {
                navigator.clipboard
                  .writeText(affiliateLink)
                  .then(() => (e.target.textContent = "Done"));
              }}
            >
              Copy
            </button>
          </div>}
          {prouctBuyData && (
            <div className="w-60 p-4 bg-gray-900 rounded-md flex justify-center flex-col">
              <div className="text-center text-xl mb-2">Order Confirmed</div>
            <div className="truncate w-3/4">name: {prouctBuyData.name}</div>
            <div className="truncate w-3/4">Price: {prouctBuyData.price}</div>
          </div>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
