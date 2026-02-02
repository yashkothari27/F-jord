import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProtected = ({ element }) => {
  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const isAdmin = userSession?.user?.is_super_user;
  const toastDisplayed = useRef(false); // Ref to track toast state for login check

  useEffect(() => {
    if (!userSession || toastDisplayed.current) return; // Check if user is logged in and toast is not already displayed

    if (!isAdmin) {
      toast.error("You don't have admin access");
    } else {
      toast.info("Admin Panel Login");
    }

    toastDisplayed.current = true; // Mark toast as displayed
  }, [userSession, isAdmin]);

  // Redirect if not logged in, and show toast only once
  if (!userSession && !toastDisplayed.current) {
    toast.error("You need to be logged in to access the page");
    toastDisplayed.current = true; // Mark toast as displayed
    return <Navigate to="/login" />;
  }

  // Redirect if not an admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  // If user is logged in and is an admin, render the element
  return element;
};

export default AdminProtected;
