import React, { useEffect, useState } from "react";
import SumaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetail, setUpdateUserDetail] = useState({
    _id: "",
    email: "",
    name: "",
    role: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SumaryApi.allUsers.url, {
      method: SumaryApi.allUsers.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();

      setAllUsers(dataResponse.data);


    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>stt</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return (
              <tr>
                <th>{index + 1}</th>
                <th>{el?.name}</th>
                <th>{el?.email}</th>
                <th>{el?.role}</th>
                <th>{moment(el?.createdAt).format("ll")}</th>
                <th>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetail(el);
                      setOpenUpdateUser(true);
                    }}
                  >
                    <MdModeEditOutline />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateUser && (
        <ChangeUserRole
          name={updateUserDetail.name}
          email={updateUserDetail.email}
          userId={updateUserDetail._id}
          role={updateUserDetail.role}
          onClose={() => setOpenUpdateUser(false)}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
