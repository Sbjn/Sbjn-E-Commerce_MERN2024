import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1mobile from "../assest/banner/img1_mobile.jpg";
import image2mobile from "../assest/banner/img2_mobile.webp";
import image3mobile from "../assest/banner/img3_mobile.jpg";
import image4mobile from "../assest/banner/img4_mobile.jpg";
import image5mobile from "../assest/banner/img5_mobile.png";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const BannerProduct = () => {
  const [currenImage, setCurrenImage] = useState(0);

  const desktopImage = [image1, image2, image3, image4, image5];
  const mobileImage = [
    image1mobile,
    image2mobile,
    image3mobile,
    image4mobile,
    image5mobile,
  ];

  const nextImage = () =>{
    if(desktopImage.length -1 > currenImage){ 
        setCurrenImage(preve => preve + 1)
    }
  }

  const preveImage = () =>{
    if(currenImage !== 0){ 
        setCurrenImage(preve => preve - 1)
    }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
        if(desktopImage.length -1 > currenImage){
            nextImage()
        }else{
            setCurrenImage(0)
        }
    },3000)
    return ()=>clearInterval(interval)
  },[currenImage])

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-96 w-full bg-red-200 rounded relative">
        <div className="z-10 absolute w-full h-full md:flex items-center hidden">
          <div className=" flex justify-between w-full text-3xl">
            <button className="bg-white shadow-md rounded-full p-2" onClick={preveImage}>
              <FaAngleLeft />
            </button>
            <button className="bg-white shadow-md rounded-full p-2" onClick={nextImage}>
              <FaAngleRight />
            </button>
          </div>
        </div>
         {/* desktop ver */}
        <div className="md:flex h-full overflow-hidden hidden">
            {desktopImage.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageUrl}
                style={{ transform: `translateX(-${currenImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full" alt="" />
              </div>
            );
          })}
        </div>


        {/* mobile ver */}
        <div className="flex h-full overflow-hidden md:hidden">
            {mobileImage.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageUrl}
                style={{ transform: `translateX(-${currenImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full object-cover" alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
