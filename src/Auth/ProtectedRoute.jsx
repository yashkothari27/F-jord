import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const isAdmin = userSession?.user?.is_super_user;

  const isToastDisplayed = useRef(false);

  useEffect(() => {
    if (!isToastDisplayed.current) {
      if (!userSession) {
        toast.error("You need to be logged in to access the dashboard.");
      } else {
        toast.info("Auto Logged In");
      }
      isToastDisplayed.current = true; // Prevent repeated toasts
    }
  }, []); // Run only on component mount

  useEffect(() => {
    if (isAdmin && !isToastDisplayed.current) {
      toast.info("Redirecting to Admin panel");
      isToastDisplayed.current = true; // Prevent repeated toasts
    }
  }, [isAdmin]);

  // Redirect if not logged in
  if (!userSession) {
    return <Navigate to="/login" />;
  }

  if (isAdmin) {
    return <Navigate to="/adminpanel" />;
  }

  // If user is logged in and not an admin, render the element
  return element;
};

export default ProtectedRoute;
