import React from "react";
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-400 cursor-pointer"
        >
          <IoMdClose />
        </div>
        <div className="flex justify-center p-4 max-w-[70vh] max-h-[70vh]">
          <img src={imgUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
