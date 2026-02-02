import React, { useState, useEffect } from "react";
import axios from "axios";
import { Gift } from "lucide-react";
import { toast } from "react-toastify"; // Import toast
import BuyNowPopup from "../Components/BuyNowPopup";
import { useNavigate } from "react-router-dom";
import WalletBalance from "../Components/WalletBalance";
import TransactionHistory from "../Transactions/TransactionHistory";

const BalanceHistory = () => {
  const [walletDetails, setWalletDetails] = useState(null); // To store wallet details
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // For error handling
  const [isWalletCreated, setIsWalletCreated] = useState(false); // Track if wallet is created
  const navigate = useNavigate(); // Hook for navigation

  // Get the userSession object from localStorage
  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const token = userSession?.access;

  const fetchWalletDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/wallet/details/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response if it's valid JSON
      if (response.status === 200 && response.data.length > 0) {
        setWalletDetails(response.data[0]);
        // console.log(response);
      } else {
        // console.log(response);
        setWalletDetails(null);
        setIsWalletCreated(false);
      }
    } catch (err) {
      console.error("Error fetching wallet details:", err);
      if (err.status === 401) {
        toast.warning("Session Expired so login again!");
      }
      if (err.response) {
        // Log the full error response if it exists
        console.error("Error Response:", err.response);
        console.error("Error Response Data:", err.response.data);
      } else {
        console.error("Error Message:", err.message);
      }
      setError("Failed to fetch wallet details");
      toast.error("Failed to fetch wallet details!");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new wallet
  const createWallet = async () => {
    toast.info("wallet creation is processing...");
    // console.log(token);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/wallet/create/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Wallet created successfully!"); // Show success toast
        // Update is_wallet_created in localStorage
        // console.log(response, "wallet created");
        userSession.user.is_wallet_created = true;
        localStorage.setItem("userSession", JSON.stringify(userSession));
        fetchWalletDetails();
        // Re-fetch wallet details after creation
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle unauthorized access (session expired)
        toast.error("Session expired. Please log in again.");
        localStorage.clear(); // Clear session data
        navigate("/login"); // Redirect to login page
      } else {
        // Handle other errors (like network issues)
        console.log(err);
        setError("Failed to create wallet");
        toast.error("Failed to create wallet!"); // Show error toast
      }
    }
  };
  // Navigate to wallet details page

  useEffect(() => {
    // Only fetch wallet details if the wallet has not been fetched before
    if (userSession?.user?.is_wallet_created && !isWalletCreated) {
      setIsWalletCreated(true); // Mark wallet as created
      fetchWalletDetails(); // Fetch wallet details only if not already fetched
    }
  }, [userSession, isWalletCreated]); // Dependency array updated to check isWalletCreated

  const [purchaseHistory] = useState([
    {
      date: "2024-10-01",
      amount: 1000,
      method: "Credit Card",
      senderAddress: "0xA1B2C3D4E5F60708A9B0C1D2E3F4A5B6C7D8E9F0",
      recipientAddress: "0xB1C2D3E4F5A60708A9B0C1D2E3F4A5B6C7D8E9F1",
    },
    {
      date: "2024-10-15",
      amount: 1500,
      method: "PayPal",
      senderAddress: "0xA1B2C3D4E5F60708A9B0C1D2E3F4A5B6C7D8E9F0",
      recipientAddress: "0xC1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F60708A9B0",
    },
    {
      date: "2024-10-01",
      amount: 1000,
      method: "Credit Card",
      senderAddress: "0xA1B2C3D4E5F60708A9B0C1D2E3F4A5B6C7D8E9F0",
      recipientAddress: "0xB1C2D3E4F5A60708A9B0C1D2E3F4A5B6C7D8E9F1",
    },
    {
      date: "2024-10-15",
      amount: 1500,
      method: "PayPal",
      senderAddress: "0xA1B2C3D4E5F60708A9B0C1D2E3F4A5B6C7D8E9F0",
      recipientAddress: "0xC1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F60708A9B0",
    },
    {
      date: "2024-10-01",
      amount: 1000,
      method: "Credit Card",
      senderAddress: "0xA1B2C3D4E5F60708A9B0C1D2E3F4A5B6C7D8E9F0",
      recipientAddress: "0xB1C2D3E4F5A60708A9B0C1D2E3F4A5B6C7D8E9F1",
    },
    {
      date: "2024-10-15",
      amount: 1500,
      method: "PayPal",
      senderAddress: "0xA1B2C3D4E5F60708A9B0C1D2E3F4A5B6C7D8E9F0",
      recipientAddress: "0xC1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F60708A9B0",
    },
  ]);

  return (
    <div className="min-h-screen p-4 text-gray-800 bg-gray-100 sm:p-8">
      <div className="grid grid-cols-1 lg:gap-8 lg:grid-cols-3">
        <div className="flex-row items-center justify-between col-span-1 gap-8 mb-8 lg:space-y-8 max-sm:flex-col max-lg:flex md:mb-8">
          {/* <div className="w-full p-6 transition bg-white rounded-lg shadow max-lg:h-full">
            <h2 className="mb-4 text-xl font-semibold text-gray-700 sm:text-2xl">
              Token Balance
            </h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : walletDetails ? (
              <div>
                <div className="text-lg">
                  <p className="line-clamp-5">
                    Wallet Address: {walletDetails.wallet_address}
                  </p>
                </div>

                <p className="text-xl font-semibold">
                  Balance: {walletDetails.balance} {walletDetails.coin_code}
                </p>
              </div>
            ) : (
              <div>
                <p>No wallet found.</p>
                {!isWalletCreated && (
                  <div
                    onClick={createWallet}
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded cursor-pointer w-max"
                  >
                    Generate Wallet
                  </div>
                )}
              </div>
            )}
          </div> */}
          <div className="w-full transition bg-white rounded-lg shadow max-lg:h-full">
            <WalletBalance />
          </div>

          <div className="w-full p-3 transition bg-white rounded-lg shadow sm:p-5 max-lg:h-full">
            <div className="text-xl sm:text-2xl mb-4 font-bold text-[#52a5e4]">
              Signup Bonus
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="border-l-2 pl-2 border-l-[#091433] flex items-center ">
                <Gift className="mr-2 text-theme-yellow-500" />
                <span className="text-2xl sm:text-3xl font-bold text-[#091433]">
                  {walletDetails ? "10 Tokens" : "10 Tokens"}
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600 sm:text-base">
                {walletDetails
                  ? "You received 10 Tokens as a signup bonus."
                  : "Generate wallet to receive 10 Tokens as a signup bonus."}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 p-3 transition bg-white rounded-lg shadow max-sm:mb-8 max-lg:col-span-3 sm:p-2 md:p-5 ">
          <BuyNowPopup />
        </div>
        <div className="col-span-3 p-6 transition bg-white rounded-lg shadow ">
          <TransactionHistory />
          {/* <div className="text-xl sm:text-2xl mb-4 font-bold text-[#52a5e4]">
            Transaction History
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left table-auto">
              <thead className="bg-theme-gray-100">
                <tr>
                  <th className="px-4 py-2 font-semibold text-theme-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-2 font-semibold text-theme-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-2 font-semibold text-theme-gray-700">
                    Payment Method
                  </th>
                  <th className="px-4 py-2 font-semibold text-theme-gray-700">
                    Sender Address
                  </th>
                  <th className="px-4 py-2 font-semibold text-theme-gray-700">
                    Recipient Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((purchase, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-theme-gray-600">
                      {purchase.date}
                    </td>
                    <td className="px-4 py-2 text-theme-gray-600">
                      {purchase.amount} Tokens
                    </td>
                    <td className="px-4 py-2 text-theme-gray-600">
                      {purchase.method}
                    </td>
                    <td className="px-4 py-2 break-words text-theme-gray-600">
                      {purchase.senderAddress}
                    </td>
                    <td className="px-4 py-2 break-words text-theme-gray-600">
                      {purchase.recipientAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BalanceHistory;
