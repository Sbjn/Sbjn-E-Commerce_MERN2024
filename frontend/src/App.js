import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SumaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetail } from "./stores/userSlide";

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetail = async () => {
    const dataResponse = await fetch(SumaryApi.Current_user.url, {
      method: SumaryApi.Current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetail(dataApi.data))
    }
  };

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SumaryApi.addToCartProductCount.url,{
      method : SumaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    /**user Details */
    fetchUserDetail()
    /**user Details cart product */
    fetchUserAddToCart()
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetail, //user detail fetch
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart
      }}>
        <ToastContainer 
          position="top-center"/>
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
