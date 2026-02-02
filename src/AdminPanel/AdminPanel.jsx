import { useState, useEffect } from "react";
import Customers from "./Pages/Customers";
import AdminSidePanel from "./AdminSidePanel";
import KYCListing from "./Pages/KYCListing";
import PaymentHistory from "./Pages/PaymentHistory";
import { Menu, ArrowRightFromLine } from "lucide-react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  NavLink,
} from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  // Fetch the user session from localStorage and check if it's available
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userSession"));
    if (session) {
      setUserSession(session);
    } else {
      // Redirect to login if no session found
      navigate("/login");
    }
  }, [navigate]);

  if (!userSession) {
    return (
      <div className="flex items-center justify-center min-h-screen text-black bg-white bg-opacity-75">
        <div className="w-5 h-5 mx-auto border-t-8 border-blue-500 rounded-full sm:h-20 sm:w-20 loader animate-spin"></div>
      </div>
    );
  }

  const userEmail = userSession.user.email;
  const userName = userSession.user.first_name;

  return (
    <div className="flex bg-gray-100">
      <header className="fixed top-0 left-0 z-[500] flex w-full  text-white">
        <div className="flex pr-4 items-center justify-between w-full p-2 bg-[#01021e] max-sm:rounded-b-3xl border-0 outline-none ">
          <div className="w-1/3 ">
            <div
              onClick={toggleSidebar}
              className={`
                p-2 rounded-full hover:bg-[#091433]
                 ${sidebarExpanded ? "bg-[#091433]" : ""}
                hover:text-[#52a5e4] text-gray-400 sm:hover:scale-110
              transition-all duration-300 w-max ease-in-out  cursor-pointer`}
            >
              <div
                className={`transition-transform duration-300 ease-in-out ${
                  sidebarExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                {sidebarExpanded ? (
                  <ArrowRightFromLine className="text-3xl text-[#52a5e4]" />
                ) : (
                  <Menu className="text-3xl" />
                )}
              </div>
            </div>
          </div>
          <NavLink to="/" className="flex items-center justify-center w-1/3 ">
            <img
              src="/logo.svg"
              className="object-contain mx-atuo w-24 cursor-pointer rounded-xl 
                hover:border-b hoverNonTouch:hover:scale-105 hover:border-[rgb(82,165,228)]  
                hover:shadow-[rgba(82,165,228,_0.1)_0px_0px_10px_10px,_rgba(82,165,228,_0.1)_0px_10px_10px_10px] ease-in-out transition-all duration-300 border-b border-[#01021e] h-10 sm:h-[3.25rem] sm:w-40"
            ></img>
          </NavLink>
          <div className="flex flex-col items-end w-1/3 text-right ">
            <div className="px-3 bg-[#18378b] rounded">
              <div
                // to="/dashboard/settings"
                className="font-medium cursor-default leading-tight text-[white] sm:text-lg"
              >
                Admin
              </div>
              <div
                // to="/dashboard/settings"
                className="hidden text-xs leading-none text-gray-400 transition-colors duration-300 ease-in-out cursor-default sm:flex hover:text-gray-300 hover:underline sm:text-sm"
              >
                {userEmail.length > 18
                  ? userEmail.slice(0, 18) + "..."
                  : userEmail}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Sidebar */}
      <div className="relative bg-gray-400">
        <AdminSidePanel
          expandedFromParent={sidebarExpanded}
          setExpanded={setSidebarExpanded}
        />
        <div
          onClick={toggleSidebar}
          className={`fixed flex lg:hidden  z-[480] ${
            sidebarExpanded ? "w-full h-full" : ""
          } bg-black bg-opacity-50`}
        ></div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-500 ${
          sidebarExpanded
            ? "lg:ml-60 md:ml-16 mt-[3.5rem] lg:mt-[4.25rem]"
            : "md:ml-16 mt-[3.5rem] lg:mt-[4.25rem]"
        }`}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/adminpanel/customers" />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="/kycListing" element={<KYCListing />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPanel;
