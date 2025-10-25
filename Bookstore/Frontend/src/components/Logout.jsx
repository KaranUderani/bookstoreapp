import React from "react";
import { useAuth } from "../contexts/AuthProvider"; 
import toast from "react-hot-toast";

function Logout() {
  const { authUser, setAuthUser } = useAuth();  // ✅ CHANGED: object destructuring
  
  const handleLogout = () => {
    try {
      setAuthUser(null);  // ✅ CHANGED: set to null instead of object
      localStorage.removeItem("Users");
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);  // ✅ CHANGED: reduced to 1 second
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };
  
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;