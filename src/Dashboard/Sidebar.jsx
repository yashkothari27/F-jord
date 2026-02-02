/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Wallet,
  Settings,
  House,
  ChevronDown,
  LogOut,
  IdCard,
} from "lucide-react";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ expandedFromParent, setExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [expanded, setLocalExpanded] = useState(expandedFromParent || false);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Sync with external expanded state
  useEffect(() => {
    setLocalExpanded(expandedFromParent);
  }, [expandedFromParent]);

  // Automatically open active dropdown on sidebar expand
  useEffect(() => {
    if (expanded || hoverExpanded) {
      const activeIndex = menuItems.findIndex((item) =>
        item.subItems.some((subItem) =>
          location.pathname.includes(subItem.path)
        )
      );
      setOpenDropdown(activeIndex >= 0 ? activeIndex : null);
    }
  }, [expanded, location.pathname, hoverExpanded]);

  // Toggle dropdown state for menu items
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
    if (window.innerWidth <= 1023) {
      const newExpandedState = !expanded;
      setLocalExpanded(newExpandedState);
      setExpanded(newExpandedState);
    }
  };

  // Menu items with optional sub-items
  const menuItems = [
    {
      label: "Home",
      subItems: [],
      icon: <House />,
      path: "/",
    },

    {
      label: "Wallet",
      subItems: [],
      icon: <Wallet />,
      path: "/dashboard/wallet",
    },
    {
      label: "KYC",
      icon: <IdCard />,
      subItems: [],
      path: "/dashboard/kyc",
    },
    {
      label: "Settings",
      icon: <Settings />,
      subItems: [],
      path: "/dashboard/settings",
    },
  ];

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  return (
    <div
      className={`bg-[#01021e] text-[#52a5e4] h-full transition-[width] ease-in-out duration-500 z-[490] overflow-hidden 
        ${
          expanded || hoverExpanded ? "lg:w-60 w-56" : "w-0 md:w-16"
        } fixed top-0 left-0 z-50`}
    >
      {/* Menu Items */}
      <ul
        className="flex flex-col h-full pt-4"
        onMouseEnter={() => {
          if (!expanded && !isTouchDevice()) {
            setHoverExpanded(true); // Activate hover expansion if not expanded
          }
        }}
        onMouseLeave={() => {
          if (!expanded && !isTouchDevice()) {
            setHoverExpanded(false); // Deactivate hover expansion if not expanded
          }
        }}
      >
        {menuItems.map((item, index) => {
          const isParentActive =
            location.pathname === item.path ||
            item.subItems.some((subItem) =>
              location.pathname.includes(subItem.path)
            );

          return (
            <li key={index} className="relative ">
              <div
                className={`${index === 0 ? "mb-12 sm:mb-14" : "hidden m-0"}`}
              ></div>

              <div
                onClick={() => toggleDropdown(index)}
                className={`flex items-center justify-between cursor-pointer transition-colors ease-in-out   duration-300 hover:text-[#52a5e4] hover:bg-[#091433]
                  ${
                    isParentActive
                      ? "text-[#52a5e4] font-semibold"
                      : "text-gray-400 font-medium"
                  }`}
              >
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center transition-[padding] duration-300 ease-in-out w-full
                   ${expanded || hoverExpanded ? "p-4" : "py-4 pl-0 md:pl-4"}  
                     ${isActive || isParentActive ? "text-[#52a5e4]" : ""}`
                  }
                  onClick={
                    item.subItems.length ? (e) => e.preventDefault() : null
                  }
                >
                  <span
                    className={` duration-500 ease-in-out transition-opacity ${
                      expanded || hoverExpanded
                        ? "max-md:opacity-100"
                        : "max-md:opacity-0"
                    } `}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`ml-4 transition-opacity duration-500 ${
                      expanded || hoverExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </NavLink>
                {(expanded || hoverExpanded) && item.subItems.length > 0 && (
                  <ChevronDown
                    className={`transition-transform mr-2 ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
              <div className="mb-1"></div>
            </li>
          );
        })}
        {/* Logout Button */}
        <li
          onClick={() => {
            localStorage.clear();

            toast.success("Logged out successfully!");
            navigate("/");
          }}
          className="p-4 mt-auto mb-3 cursor-pointer flex items-center w-full text-gray-400 font-medium hover:text-[#52a5e4] hover:bg-[#091433] transition-colors duration-300 pl-5 "
        >
          <span
            className={`mr-4 duration-500 ease-in-out transition-opacity ${
              expanded || hoverExpanded
                ? "max-md:opacity-100"
                : "max-md:opacity-0"
            } `}
          >
            <LogOut />{" "}
          </span>
          <span
            className={`transition-opacity duration-500 ${
              expanded || hoverExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
