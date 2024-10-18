import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Reffer = () => {
  const userData = useContext(AuthContext)
  const navigate = useNavigate();
  const searchQuaries = new URLSearchParams(location.search);
  const productId = searchQuaries.get("productId");
  const refferCode = searchQuaries.get("refferCode");
  console.log(refferCode);
  

  useEffect(() => {

    if(userData?.data?.role === "affiliate") {
      navigate
    }else{
      fetch(`/api/refferRedirect?refferCode=${encodeURIComponent(refferCode)}`)
      .then(res => res.json())
      .then(res =>{
        if (res.isLogedin) {
          navigate(`/product/${productId}`)
        }else{
          navigate(`/login?redirect=/product/${productId}`)
        }
      }).catch(console.error)
    }
  }, []);

  return <p className="text-xl text-center mt-4">Redirecting... </p>;
};

export default Reffer;
