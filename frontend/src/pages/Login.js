import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"
import SumaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({
    email: "",
    password:""
  })

  const navigate = useNavigate()
  const {fetchUserDetail,fetchUserAddToCart} = useContext(Context)

  const handleOnchange = (e) => {
    const {name, value} = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    
    const dataResponse = await fetch(SumaryApi.SignIn.url,{
      method: SumaryApi.SignIn.method,
      credentials:"include",
      headers:{
        "content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetail()
      fetchUserAddToCart()
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }


   
  }


  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons"></img>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label> Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Your email"
                  name ="email"
                  value={data.email}
                  onChange={handleOnchange}
                  className="w-full h-full outline-none bg-transparent"
                ></input>
              </div>
            </div>

            <div>
              <label> Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  name ="password"
                  value={data.password}
                  onChange={handleOnchange}
                  className="w-full h-full outline-none bg-transparent"
                ></input>
                <div>
                  <span
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassword((show) => !show)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link to={"/forgot-password"} className="block w-fit ml-auto hover:underline hover:text-red-400 mt-3">
                Forgot Password ?
              </Link>
            </div>

            <button className="bg-red-300 hover:bg-red-400 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">Login</button>
          </form>
          <p className="my-4"> Don't have account ? <Link to={"/sign-up"} className="text-red-300 hover:text-red-400 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
