import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Customers = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [kycFilter, setKycFilter] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPageUrl, setNextPageUrl] = useState(null); // Track the next page URL
  const [prevPageUrl, setPrevPageUrl] = useState(null); // Track the previous page URL

  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const token = userSession?.access;

  // Function to fetch customer data
  const fetchCustomers = async (changer) => {
    let url = `${import.meta.env.VITE_API_BASE_URL}/api/auth/all-user-details/`;
    if (changer === "next") {
      url = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/auth/all-user-details/?page=${currentPage + 1}`;
    }
    if (changer === "prev") {
      url = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/auth/all-user-details/?page=${currentPage - 1}`;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      // Set customer data, pagination URLs, and total count
      setCustomers(response.data.results || []);
      setTotalCount(response.data.count);
      setNextPageUrl(response.data.next);

      const prevUrl = response.data.previous;
      // console.log(prevUrl, currentPage);
      setPrevPageUrl(prevUrl); // Set previous page URL
    } catch (err) {
      // setError("Failed to fetch customer data.");
      // console.error("Error fetching customers:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized access. Please log in again.");
      } else {
        setError("Failed to fetch customer data.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch customer data on component mount or when pagination changes
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter and sort customers based on search query, KYC filter, and sorting options
  const filteredAndSortedCustomers = customers.filter((customer) => {
    const firstName = customer.first_name || "";
    return (
      firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (kycFilter === "all" ||
        (kycFilter === "verified" && customer.is_kyc_verified) ||
        (kycFilter === "submitted" &&
          customer.is_kyc_submitted &&
          !customer.is_kyc_verified) ||
        (kycFilter === "notsubmitted" &&
          !customer.is_kyc_submitted &&
          !customer.is_kyc_verified))
    );
  });

  // Handle Reset Filters and Reset Current Page
  const handleResetFilters = () => {
    setSearchQuery("");
    setKycFilter("all");
  };

  // Handle Pagination Button Click
  const handlePagination = (direction) => {
    if (direction === "next" && nextPageUrl) {
      // Fetch next page if next page URL exists
      setCurrentPage((prevPage) => prevPage + 1);
      fetchCustomers("next");
    } else if (direction === "previous" && prevPageUrl) {
      // Fetch previous page if previous page URL exists
      setCurrentPage((prevPage) => prevPage - 1);
      fetchCustomers("prev");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-black bg-white bg-opacity-75">
        <div className="w-5 h-5 mx-auto border-t-8 border-blue-500 rounded-full sm:h-20 sm:w-20 loader animate-spin"></div>
      </div>
    );
  }

  if (error) {
    const isUnauthorized =
      error === "Unauthorized access. Please log in again.";
    return (
      <div className="flex items-center justify-center min-h-screen text-black bg-gray-50">
        <div className="sm:text-5xl mb-4 border-2 bg-[#f99f9f61] border-red-500 w-max mx-auto px-2 sm:px-12 py-8 rounded-lg text-center font-bold text-red-500">
          {isUnauthorized
            ? "You don't have access to this page."
            : "Network Error. Please try again."}
          <br />
          {isUnauthorized && "Contact admin."}

          <div className="mt-4">
            <button
              onClick={() =>
                isUnauthorized ? navigate("/") : window.location.reload()
              }
              className="bg-[#52a5e4] z-[1!important]  sm:text-3xl text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              {isUnauthorized ? "Go to Home" : "Reload the Page"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen p-5 text-black sm:p-7 bg-gray-50">
        <div className="flex flex-col gap-5 mb-3 sm:items-center sm:flex-row sm:mb-6">
          <div className="text-3xl sm:text-4xl font-semibold text-[#52a5e4]">
            Customer Management
          </div>
        </div>
        {/* Header with Search Bar, Filters, and Sort */}
        {/* <div className="flex flex-col items-center justify-between mb-6 text-sm sm:text-base sm:flex-row">
          <div className="flex-1 px-2 max-sm:mb-2 max-sm:w-full sm:mr-4">
            <input
              type="text"
              placeholder="Search by first name on the current page..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-lg shadow-sm outline-none"
            />
            
          </div>
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-3 sm:space-y-0">
              <div className="grid flex-col grid-cols-2 p-1 space-x-1 bg-gray-300 rounded-md sm:flex sm:flex-row sm:space-y-0 max-sm:space-y-2">
              <div
                className={`max-sm:block hidden text-center text-white  py-2 max-sm:col-span-2 text-sm font-semibold rounded-md bg-blue-600 `}
              >
                KYC Details
              </div>
              <button
                onClick={() => setKycFilter("all")}
                className={`px-3 z-[1!important]  sm:px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  kycFilter === "all"
                    ? " text-white sm:hover:bg-white sm:hover:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setKycFilter("verified")}
                className={`px-3 z-[1!important]  sm:px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  kycFilter === "verified"
                    ? " text-white sm:hover:bg-white sm:hover:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setKycFilter("submitted")}
                className={`px-3 z-[1!important]  sm:px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  kycFilter === "submitted"
                    ? " text-white sm:hover:bg-white sm:hover:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Submitted
              </button>
              <button
                onClick={() => setKycFilter("notsubmitted")}
                className={`px-3 z-[1!important]  sm:px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  kycFilter === "notsubmitted"
                    ? " text-white sm:hover:bg-white sm:hover:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Not Submitted
              </button>
            </div>

            <div className="flex items-center max-w-full gap-2 max-sm:m-1">
              <button
                onClick={handleResetFilters}
                className="p-1 px-3 z-[1!important]  text-white transition duration-200 bg-red-500 rounded-lg shadow-md w-max sm:py-2 sm:px-6 max-sm:w-28 hover:bg-red-600"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div> */}

        {/* Table */}
        <div className="p-2 px-3 mb-3 text-sm font-bold text-[#52a5e4] bg-blue-100 border-2 border-[#52a5e4] rounded-lg sm:px-6 sm:text-lg w-max ">
          Total Users {totalCount}
        </div>
        <div className="grid w-full max-w-full grid-cols-1 overflow-x-auto text-sm rounded-md shadow-md scrollerBG sm:text-base">
          {filteredAndSortedCustomers.length > 0 ? (
            <table className="max-w-full ">
              <thead className="bg-gray-100">
                <tr>
                  {/* <th className="px-4 py-2 text-center border">SN</th> */}
                  <th className="px-4 py-2 text-left border">ID</th>
                  <th className="px-4 py-2 text-left border">First Name</th>
                  <th className="px-4 py-2 text-left border">Email</th>
                  <th className="px-4 py-2 text-left border">DOB</th>
                  <th className="px-4 py-2 text-left border">Phone</th>
                  <th className="px-4 py-2 text-left border">KYC Status</th>
                  <th className="px-4 py-2 text-left border">Location</th>
                  <th className="px-4 py-2 text-left border">Wallet Address</th>
                  <th className="px-4 py-2 text-left border">Coin Code</th>
                  <th className="px-4 py-2 text-left border">Balance</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCustomers.map((customer, i) => (
                  <tr key={customer.id}>
                    {/* <td className="px-4 py-2 border">{i + 1}</td> */}
                    <td className="px-4 py-2 border">{customer.id}</td>
                    <td className="px-4 py-2 border">{customer.first_name}</td>
                    <td className="px-4 py-2 border">{customer.email}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.dob}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.phone_number}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      <div
                        className={`${
                          customer.is_kyc_submitted
                            ? customer.is_kyc_verified
                              ? "bg-green-500"
                              : "bg-yellow-500"
                            : "bg-red-500"
                        } p-2 rounded-lg text-white font-medium`}
                      >
                        {
                          customer.is_kyc_submitted
                            ? customer.is_kyc_verified
                              ? "Verified" // If submitted and verified, green
                              : "Submitted" // If submitted but not verified, yellow
                            : "Not Submitted" // If not submitted and not verified, red
                        }
                      </div>
                    </td>
                    <td className="px-4 py-2 border">{customer.city}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.is_wallet_created ? (
                        customer.wallets[0]?.wallet_address
                      ) : (
                        <div className="p-2 font-medium text-white bg-red-500 rounded-lg">
                          Wallet not created
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.is_wallet_created ? (
                        customer.wallets[0]?.coin_code
                      ) : (
                        <div className="p-2 font-medium text-white bg-red-500 rounded-lg">
                          Wallet not created
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.is_wallet_created ? (
                        customer.wallets[0]?.balance
                      ) : (
                        <div className="p-2 font-medium text-white bg-red-500 rounded-lg">
                          Wallet not created
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full text-2xl font-bold text-center py-7">
              No Data Available
            </div>
          )}
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-center mt-6">{getPaginationButtons()}</div> */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => handlePagination("previous")}
            disabled={!prevPageUrl}
            className="p-2 z-[1!important] px-4 text-sm text-white bg-[#52a5e4] hover:bg-[#01021e] rounded-lg sm:text-base sm:px-6 disabled:opacity-50"
          >
            Previous
          </button>
          <div className="p-2 px-4 text-sm font-bold text-[#52a5e4]   bg-blue-100 rounded-lg sm:px-6 sm:text-lg ">
            Page {currentPage} of {Math.ceil(totalCount / 20)}
          </div>
          <button
            onClick={() => handlePagination("next")}
            disabled={!nextPageUrl}
            className="p-2 z-[1!important]  px-4 text-sm text-white bg-[#52a5e4] hover:bg-[#01021e] rounded-lg sm:text-base sm:px-6 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Customers;
