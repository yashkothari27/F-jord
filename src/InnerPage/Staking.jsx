import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Menu,
  List,
  X,
  House,
} from "lucide-react";

const navLinks = [
  { label: "Home", icon: <Home size={20} />, key: "home", path: "/" },
  { label: "Staking", icon: <List size={20} />, key: "staking" },
  {
    label: "Account",
    icon: <User size={20} />,
    key: "account",
    path: "/login",
  },
  {
    label: "Marketplace",
    icon: <LayoutGrid size={20} />,
    key: "marketplace",
    path: "/marketplace",
  },
];

const data = [
  {
    property: "Neuberggata 31, Majorstuen, Oslo. 5 floor Norway",
    tvl: "$187,374.33",
    ratio: 1.53,
    apy7USDC: "9,824.73%",
    apy7Property: "9.68%",
    apy30USDC: "6,021.78%",
    apy30Property: "7.38%",
  },
  {
    property: "90 Madison Ave",
    tvl: "$50,322.54",
    ratio: 0.84,
    apy7USDC: "294.57%",
    apy7Property: "0.28%",
    apy30USDC: "173.79%",
    apy30Property: "1.36%",
  },
  {
    property: "3133 Estes St",
    tvl: "$7,757.78",
    ratio: 1.25,
    apy7USDC: "129.26%",
    apy7Property: "58.71%",
    apy30USDC: "59.06%",
    apy30Property: "27.89%",
  },
  {
    property: "615 Rose Ln",
    tvl: "$10,701.17",
    ratio: 0.41,
    apy7USDC: "120.30%",
    apy7Property: "1.20%",
    apy30USDC: "28.07%",
    apy30Property: "0.28%",
  },
  {
    property: "21 Hillcrest Ave, San Diego, CA",
    tvl: "$212,902.00",
    ratio: 1.92,
    apy7USDC: "10,207.99%",
    apy7Property: "11.13%",
    apy30USDC: "7,231.34%",
    apy30Property: "8.01%",
  },
  {
    property: "1400 Ocean Dr, Miami Beach, FL",
    tvl: "$83,119.20",
    ratio: 0.98,
    apy7USDC: "421.73%",
    apy7Property: "1.56%",
    apy30USDC: "210.33%",
    apy30Property: "3.19%",
  },
  {
    property: "88 Hudson St, Jersey City, NJ",
    tvl: "$102,555.60",
    ratio: 1.61,
    apy7USDC: "674.12%",
    apy7Property: "3.54%",
    apy30USDC: "434.21%",
    apy30Property: "2.95%",
  },
  {
    property: "3-14-9 Shibuya, Tokyo, Japan",
    tvl: "$129,456.80",
    ratio: 2.14,
    apy7USDC: "1,302.50%",
    apy7Property: "6.92%",
    apy30USDC: "978.33%",
    apy30Property: "5.84%",
  },
];

const Staking = () => {
  const [activeTab, setActiveTab] = useState("staking");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (link) => {
    if (link.path) {
      navigate(link.path);
    } else {
      setActiveTab(link.key);
    }
    setMobileOpen(false);
  };

  const Sidebar = () => (
    <div
      className={`bg-light text-white h-full py-6 px-4 flex flex-col justify-between 
      transition-all duration-300 ease-in-out`}
    >
      <div>
        <div
          className="flex items-center justify-between mb-6 cursor-pointer group"
          onClick={() => setCollapsed(!collapsed)}
        >
          {!collapsed && (
            <img
              src="./logo.svg"
              alt="logo"
              className={`w-24 transition-opacity duration-300`}
            />
          )}
          <div
            className={`p-1 transition-all rounded-full bg-white/10 group-hover:bg-white/20 ${
              collapsed ? "m-auto" : "ml-auto"
            }`}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </div>
        </div>

        <div className="space-y-2">
          {navLinks.map((nav) => (
            <div
              key={nav.key}
              onClick={() => handleNavClick(nav)}
              className={`flex items-center gap-3 px-[14px] py-2 rounded-lg cursor-pointer transition-all duration-200
              ${
                activeTab === nav.key
                  ? "bg-accent text-white"
                  : "hover:bg-white/10"
              }`}
            >
              <span className="w-7">{nav.icon}</span>
              <span
                className={`overflow-hidden inline-block whitespace-nowrap transition-all duration-300 ease-in-out 
    ${
      collapsed
        ? "w-0 opacity-0 translate-x-4"
        : "w-auto opacity-100 translate-x-0"
    }
  `}
              >
                {nav.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex min-h-screen overflow-hidden font-sans text-white bg-default">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <Sidebar />
      </div>

      {/* Mobile Sidebar Slide-in */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out md:hidden 
  ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col w-64 h-full p-4 shadow-lg bg-light">
          {/* Header in mobile only */}
          <div className="flex items-center justify-between mb-6">
            <img src="./logo.svg" className="w-24" alt="logo" />
            <button
              className="p-2 rounded-full"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile nav links */}
          <div className="space-y-2">
            {navLinks.map((nav) => (
              <div
                key={nav.key}
                onClick={() => handleNavClick(nav)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
          ${
            activeTab === nav.key ? "bg-accent text-white" : "hover:bg-white/10"
          }`}
              >
                {nav.icon}
                <span>{nav.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 w-full px-6 py-6 overflow-auto sm:px-6">
        <div className="flex items-center justify-between mb-6">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              className="relative z-40 p-2 text-white"
            >
              <Menu size={24} />
            </button>
          </div>
          <h1 className="text-xl font-bold md:text-2xl">
            Fjord Marketplace Liquidity
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="relative z-20 hidden px-4 py-2 rounded-lg sm:flex blackBtn"
          >
            Login
          </button>
        </div>

        {activeTab === "staking" && (
          <>
            <div className="inline-block p-4 mb-8 bg-light rounded-2xl">
              <div className="text-sm text-white/80">🏛️ Total Value Lent</div>
              <div className="text-2xl font-semibold md:text-3xl">
                $3,015,846.71
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-white">
                <thead className="border-b text-white/70 border-white/10">
                  <tr>
                    <th className="py-2">Property</th>
                    <th className="px-4 py-2">TVL</th>
                    <th className="px-4 py-2">USDC Supply Ratio</th>
                    <th className="px-4 py-2">7D APY (USDC)</th>
                    <th className="px-4 py-2">7D APY (Property)</th>
                    <th className="px-4 py-2">30D APY (USDC)</th>
                    <th className="px-4 py-2">30D APY (Property)</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-white/5 hover:bg-white/5 ${
                        idx === 0 ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                      onClick={() => idx === 0 && navigate("/details")}
                    >
                      <td className="flex items-center gap-2 py-4">
                        <House className="w-6 h-6 shrink-0" /> {item.property}
                      </td>
                      <td className="px-4">{item.tvl}</td>
                      <td className="px-4">{item.ratio}</td>
                      <td className="px-4">{item.apy7USDC}</td>
                      <td className="px-4">{item.apy7Property}</td>
                      <td className="px-4">{item.apy30USDC}</td>
                      <td className="px-4">{item.apy30Property}</td>
                      <td className="px-4">
                        <button
                          className={`px-4 py-2 rounded-lg ${
                            idx === 0
                              ? "bg-accent text-white"
                              : "bg-gray-600 text-white cursor-not-allowed"
                          }`}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Staking;
