import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageToBase64";
import SumaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate()

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e)=>{
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
   // console.log("imagePic",imagePic);

    setData((preve)=>{
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SumaryApi.SignUp.url,{
        method : SumaryApi.SignUp.method,
        headers: {
          "content-type":"application/json"
        },
        body : JSON.stringify(data)
      })
  
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    }
    else{
      toast.error("check password and confirm password")
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons"></img>
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full ">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic}/>
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label> Name: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={data.name}
                  onChange={handleOnchange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
              </div>
            </div>
            <div className="grid">
              <label> Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnchange}
                  required
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
                  name="password"
                  value={data.password}
                  onChange={handleOnchange}
                  required
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
            </div>
            <div>
              <label> Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Your confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnchange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
                <div>
                  <span
                    className="cursor-pointer text-xl"
                    onClick={() => setshowConfirmPassword((show) => !show)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-300 hover:bg-red-400 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              SignUp
            </button>
          </form>
          <p className="my-4">
            {" "}
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-red-300 hover:text-red-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
