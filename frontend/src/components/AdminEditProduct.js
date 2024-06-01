import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadimage from "../helpers/uploadimage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SumaryApi from "../common";
import {toast} from "react-toastify"

const AdminEditProduct = ({ onClose,productData,fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadimageCloudinary = await uploadimage(file);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadimageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  // upload product

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SumaryApi.UpdateProduct.url, {
      method: SumaryApi.UpdateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await dataResponse.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData()
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 bg-slate-400 bg-opacity-45 flex justify-center items-center">
      <div className="flex fixed bg-slate-300 bg-opacity-50 w-full h-full left-0 top-0 right-0 bottom-0 justify-center items-center">
        <div className="bg-white rounded p-4 w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Edit Product</h2>
            <div
              className="w-fit ml-auto text-2xl hover:text-red-400 cursor-pointer"
              onClick={onClose}
            >
              <IoMdClose />
            </div>
          </div>

          <form
            className="grid p-4 gap-3 overflow-y-scroll h-[90%] pb-3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="productName">product Name: </label>
            <input
              type="text"
              id="productName"
              placeholder="enter product name"
              name="productName"
              value={data.productName}
              onChange={handleOnchange}
              className="p-2 bg-slate-100 border rounded"
              required
            ></input>

            <label htmlFor="brandName" className="mt-3">
              brand Name:{" "}
            </label>
            <input
              type="text"
              id="brandName"
              placeholder="enter brand name"
              name="brandName"
              value={data.brandName}
              onChange={handleOnchange}
              className="p-2 bg-slate-100 border rounded"
              required
            ></input>

            <label htmlFor="category" className="mt-3">
              category:
            </label>
            <select
              value={data.category}
              className="p-2 bg-slate-100 border rounded"
              name="category"
              onChange={handleOnchange}
              required
            >
              <option value="">Selec Category</option>
              {productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="productImage" className="mt-3">
              Product Image:{" "}
            </label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 bg-slate-100 border rounded w-full h-32 flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-3xl">
                    <FaCloudUploadAlt />
                  </span>
                  <p className="text-sm">Upload Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  ></input>
                </div>
              </div>
            </label>
            <div>
              {data?.productImage[0] ? (
                <div className="flex items-center gap-1">
                  {data.productImage.map((el, index) => {
                    return (
                      <div className="relative group" key={el}>
                        <img
                          src={el}
                          alt={el}
                          width={80}
                          height={80}
                          className="bg-slate-100 border cursor-pointer"
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(el);
                          }}
                        />
                        <div
                          className="absolute top-0 right-0 p-0.5 text-white bg-red-400 rounded hidden group-hover:block cursor-pointer"
                          onClick={() => {
                            handleDeleteProductImage(index);
                          }}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-red-500 text-xs">
                  *Please Upload product Image
                </p>
              )}
            </div>

            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              placeholder="enter price"
              name="price"
              value={data.price}
              onChange={handleOnchange}
              className="p-2 bg-slate-100 border rounded"
              required
            ></input>

            <label htmlFor="sellingPrice">Selling Price: </label>
            <input
              type="number"
              id="sellingPrice"
              placeholder="enter selling price"
              name="sellingPrice"
              value={data.sellingPrice}
              onChange={handleOnchange}
              className="p-2 bg-slate-100 border rounded"
              required
            ></input>

            <label htmlFor="description">Description: </label>
            <textarea
              className="h-28 bg-slate-100 border resize-none p-1"
              placeholder="Enter Product Description"
              rows={3}
              onChange={handleOnchange}
              name="description"
              value={data.description}
            ></textarea>

            <button className="w-full bg-red-300 text-white font-bold hover:bg-red-500 p-2 rounded-md">
              Update product
            </button>
          </form>
        </div>

        {/* display image full */}

        {openFullScreenImage && (
          <DisplayImage
            onClose={() => setOpenFullScreenImage(false)}
            imgUrl={fullScreenImage}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEditProduct;
