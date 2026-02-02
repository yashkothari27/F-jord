import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WalletBalance = () => {
  const [walletDetails, setWalletDetails] = useState(null);
  // To store wallet details
  const [isLoading, setIsLoading] = useState(false);
  // Loading state
  const [error, setError] = useState(null);
  // For error handling
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  // Track if wallet is created
  const navigate = useNavigate();
  // Hook for navigation

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
        setWalletDetails(response.data);
        // console.log(response, "wallet Details");
      } else {
        // console.log(response);
        setWalletDetails(null);
        setIsWalletCreated(false);
      }
    } catch (err) {
      // console.error("Error fetching wallet details:", err);
      if (err.status === 401) {
        toast.warning("Session Expired so login again!");
      }
      if (err.response) {
        // Log the full error response if it exists
        // console.error("Error Response:", err.response);
        // console.error("Error Response Data:", err.response.data);
      } else {
        // console.error("Error Message:", err.message);
      }
      setError("Failed to fetch wallet details");
      toast.error("Failed to fetch wallet details!, Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new wallet
  const createWallet = async () => {
    toast.info("wallet creation is processing...");
    setIsLoading(true);
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
        // console.log(err);
        setError("Failed to create wallet");
        toast.error("Failed to create wallet!"); // Show error toast
      }
    } finally {
      window.location.reload();
      setIsLoading(false);
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

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 p-3 text-white bg-white sm:p-5 rounded-xl">
        <div className="text-xl sm:text-2xl font-bold text-[#52a5e4]">
          Wallet Details
        </div>
        <div className="p-3 text-base font-bold sm:text-lg bg-gray-50 rounded-xl">
          <div className="pl-2 mb-1 border-l-2 text-[#091433] border-l-[#091433]">
            Balance
          </div>
          <div className="pl-3 mb-4 text-2xl sm:text-3xl text-[#091433] line-clamp-4 ">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : walletDetails ? (
              // <span>
              //   {walletDetails.balance}{" "}
              //   <span className="uppercase">
              //     {/* {walletDetails.coin_code} */}
              //     oslofjord TOKENS
              //   </span>
              // </span>
              <div className="flex flex-col gap-5 ">
                {walletDetails?.map((wallet, index) => (
                  <div key={index} className="p-2 bg-white rounded-md">
                    {/* <div className="pl-2 mb-1 border-l-2 text-[#091433] border-l-[#091433] text-base">
                      Balance
                    </div> */}
                    {wallet.balance}{" "}
                    <span className="uppercase">{wallet.coin_code} TOKENS</span>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          {!isWalletCreated &&
            (isLoading ? (
              <div className="w-full py-2 mx-auto text-base font-bold text-center bg-[#091433] cursor-not-allowed rounded-2xl ">
                <div className="w-5 h-5 mx-auto border-t-4 border-white rounded-full loader animate-spin"></div>
              </div>
            ) : (
              <div
                className="w-full py-2 mx-auto text-base font-bold text-center bg-[#091433] cursor-pointer rounded-2xl duration-300 ease-in-out transition-all hover:bg-[#091433c4] "
                onClick={createWallet}
              >
                {isLoading ? "Processing ..." : "Generate Wallet"}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
