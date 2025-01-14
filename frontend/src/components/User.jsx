import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [userData] = useContext(AuthContext);

  useEffect(() => {
    if (!userData.isLogin) navigate("/login");
  }, []);

  return (
    <div>
      <div className="flex justify-center w-24 rounded-full mx-auto mt-12">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="avater"
          className="w-full"
        />
      </div>
      <h2 className="text-center font-semibold text-orange-500 capitalize text-2xl mt-2">
        {userData.data?.name}
      </h2>

      <div className="px-10 py-2">
        <span className="flex items-center gap-2 font-bold text-orange-400">
          Email:{" "}
          <p className="font-normal text-white">{userData.data?.email}</p>
        </span>
        <span className="flex items-center gap-2 font-bold text-orange-400">
          Username:{" "}
          <p className="font-normal text-white">{userData.data?.username}</p>
        </span>
        <span className="flex items-center gap-2 font-bold text-orange-400">
          role: <p className="font-normal text-white">{userData.data?.role}</p>
        </span>
        {userData.data?.role !== "user" && <><span className="flex items-center gap-2 font-bold text-orange-400">
          RefferId:{" "}
          <p className="font-normal text-white">{userData.data?.refferId}</p>
        </span>
        <span className=" mb-4 flex items-center gap-2 font-bold text-orange-400">
          Total Income:{" "}
          <p className="font-normal text-white">{userData.data?.totalIncome?.toFixed(2)}</p>
        </span></>}
      </div>
    </div>
  );
};

export default User;
