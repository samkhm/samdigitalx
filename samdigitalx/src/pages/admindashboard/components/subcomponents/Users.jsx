import React from "react";
import Admins from "../subsections/Admins";
import API from "@/service/api";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [allUsersCount, setAllUsersCount] = useState(null);
  const [loadingUser, setLoadingUsers] = useState(false);
  const [errorLoadingUser, setErrorLoadingUser] = useState("");
  const [loadingUserUpdate, setLoadingUserUpdate] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [loadDelUser, setLoadDelUser] = useState(null);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await API.get("/auth/users");
      const users = res.data?.users || [];

      setUsers(users);
      setAllUsersCount(users.length);
    } catch (error) {
      const message = error.response?.data?.message;
      setErrorLoadingUser(message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const updateUser = async (id, payload) => {
    setLoadingUserUpdate(true);
    try {
      const res = await API.put(`/auth/updateUserInfo/${id}`, payload);
      const updatedUser = res.data.updatedUser || res.data;
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, ...updatedUser } : u)),
      );
      setMessage("User updated successfully");
      setMessageType("success");
    } catch (e) {
      setMessage("Update failed");
      setMessageType("error");
    } finally {
      setLoadingUserUpdate(false);
    }
  };

  const deleteUser = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure?")) return;

    setLoadDelUser(id);
    try {
      await API.delete(`/auth/deleteUser/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } finally {
      setLoadDelUser(null);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div>
      <div className="flex items-center justify-center border-b border-gray-200 p-3 sticky top-0 bg-white z-10">
        <h3 className="text-xl font-bold border-b-3 rounded p-2">
          System Users
        </h3>
      </div>

      <div
        className="flex justify-center items-center p-5 
      bg-gray-200 scrollbar-hide w-full"
      >
        <Admins
          users={users}
          loadingUser={loadingUser}
          updateUser={updateUser}
          loadingUserUpdate={loadingUserUpdate}
          message={message}
          messageType={messageType}
          deleteUser={deleteUser}
          loadDelUser={loadDelUser}
        />
      </div>
    </div>
  );
}
