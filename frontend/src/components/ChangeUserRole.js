import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SumaryApi from "../common";
import { toast } from 'react-toastify';

const ChangeUserRole = ({ userId, name, email, role, onClose,callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value)
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SumaryApi.updateUser.url, {
      method: SumaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if(responseData){
        console.log("res success 2")
        toast.success(responseData.message)
        onClose()
        callFunc()
    }
    // toast.success(responseData.message)
    //     onClose()
    //     callFunc()
    // if(responseData.success){
    //     console.log("res success 2");
    //     toast.success(responseData.message)
    //     onClose()
    //     callFunc()
    // }
    console.log("role updated",responseData)
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center bg-slate-200 bg-opacity-50 ">
      <div className=" bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="text-lg font-medium">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className="flex justify-between items-center my-4">
          <p>Role: </p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit flex m-auto border px-3 py-1 rounded-md bg-red-300 text-white hover:bg-red-400"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
