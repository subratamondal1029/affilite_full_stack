import { Outlet } from "react-router-dom";
import { Header } from "./components";
import { useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import ProductContext from "./contexts/ProductContext";

function App() {
  const userData = useState({
    isLogin: false,
    data: null,
  });

  const [allProducts, setAllProduct] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() =>{
    async function fetchDatas() {
      setLoading(true)
      try {
        const currentUser = await( await fetch("/api/currentUser")).json();
        userData[1]({isLogin: currentUser.isLogedin, data: currentUser.data});
        const {data: allProductsData} = await( await fetch("/api/allProducts")).json();
        setAllProduct(allProductsData);
      } catch (error) {
        console.error(error);
      }

      setLoading(false)
    }

     fetchDatas()
  },[])

  if(isLoading) return "Loading..."

  return (
    <>
      <AuthContext.Provider value={userData}>
        <ProductContext.Provider value={allProducts}>
        <Header />
        <Outlet />
        </ProductContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
