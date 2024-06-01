import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayJPCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-52">
        <div className="w-32 h-32 ">
        <img
          src={data?.productImage[0]}
          width={180}
          height={180}
          alt=""
          className="m-auto object-fill h-full"
        />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">
            {
                displayJPCurrency(data.sellingPrice)
            }
          </p>
          <div
            className="w-fit ml-auto p-1 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => {
              setEditProduct(true);
            }}
          >
            <MdEdit />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => {
            setEditProduct(false);
          }}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
