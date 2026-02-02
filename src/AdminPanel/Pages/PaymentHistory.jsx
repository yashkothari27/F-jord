import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentHistory = () => {
  const navigate = useNavigate();

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentSucceed, setPaymentSucceed] = useState("all");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const token = userSession?.access;

  // Function to fetch customer data
  const fetchPaymentHistory = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/payment_history/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      // Set customer data, pagination URLs, and total count
      setPaymentHistory(response.data || []);
    } catch (err) {
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
    fetchPaymentHistory();
  }, []);

  // Filter and sort paymentHistory based on search query, KYC filter, and sorting options
  const filteredAndSortedPaymentHistory = paymentHistory.filter((customer) => {
    const firstName = customer.customer_name || "";
    return (
      firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (paymentSucceed === "all" ||
        (paymentSucceed === "succeeded" &&
          customer.payment_intent_status === "succeeded") ||
        (paymentSucceed === "notsucceeded" &&
          customer.payment_intent_status !== "succeeded"))
    );
  });

  // Handle Reset Filters and Reset Current Page
  const handleResetFilters = () => {
    setSearchQuery("");
    setPaymentSucceed("all");
  };

  // Get paginated data for the current page
  const totalPages = Math.ceil(
    filteredAndSortedPaymentHistory.length / itemsPerPage
  );
  const currentData = filteredAndSortedPaymentHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination logic
  const handlePagination = (direction) => {
    if (direction === "previous" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
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
            Transaction History
          </div>
          {/* <div className="p-2 px-4 text-sm font-medium text-blue-500 bg-blue-100 border-2 border-blue-500 rounded-lg sm:px-6 sm:text-lg w-max ">
            Total Users {totalCount}
          </div> */}
        </div>
        {/* Header with Search Bar, Filters, and Sort */}
        {/* <div className="flex flex-col items-center justify-between mb-6 text-sm sm:text-base sm:flex-row">
          <div className="flex-1 px-2 max-sm:mb-2 max-sm:w-full sm:mr-4">
            <input
              type="text"
              placeholder="Search by customer name on the current page..."
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
                Payment Details
              </div>
              <button
                onClick={() => setPaymentSucceed("all")}
                className={`px-3 z-[1!important]  sm:px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  paymentSucceed === "all"
                    ? " text-white sm:hover:bg-white sm:hover:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPaymentSucceed("succeeded")}
                className={`px-3 z-[1!important]  sm:px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  paymentSucceed === "succeeded"
                    ? " text-white sm:hover:bg-white sm:hover:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Succeeded
              </button>

              <button
                onClick={() => setPaymentSucceed("notsucceeded")}
                className={`px-3 z-[1!important]  sm:px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  paymentSucceed !== "succeeded" && paymentSucceed !== "all"
                    ? " text-white sm:hover:bg-white sm:hover:text-black"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Not Succeed
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
          Total Records {filteredAndSortedPaymentHistory.length}
        </div>
        <div className="grid w-full max-w-full grid-cols-1 overflow-x-auto text-sm rounded-md shadow-md scrollerBG sm:text-base">
          {currentData.length > 0 ? (
            <table className="max-w-full ">
              <thead className="bg-gray-100">
                <tr>
                  {/* <th className="px-4 py-2 text-center border">SN</th> */}
                  <th className="px-4 py-2 text-left border">ID</th>
                  <th className="px-4 py-2 text-left border">Customer Name</th>
                  <th className="px-4 py-2 text-left border">Email</th>
                  <th className="px-4 py-2 text-left border">
                    Payment Platform
                  </th>
                  <th className="px-4 py-2 text-left border">Currency</th>
                  <th className="px-4 py-2 text-left border">Amount</th>
                  <th className="px-4 py-2 text-left border">Tokens</th>
                  <th className="px-4 py-2 text-left border">Status</th>
                  {/* <th className="px-4 py-2 text-left border">Time</th> */}
                  <th className="px-4 py-2 text-left border">Payment Type</th>
                  <th className="px-4 py-2 text-left border">txn ref</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((customer, i) => (
                  <tr key={customer.id}>
                    {/* <td className="px-4 py-2 border">{i + 1}</td> */}
                    <td className="px-4 py-2 border">{customer.id}</td>
                    <td className="px-4 py-2 border">
                      {customer.customer_name}
                    </td>
                    <td className="px-4 py-2 border">
                      {customer.customer_email}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.payment_platform}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.currency}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.amount}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.rwa_tokens}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      <div
                        className={`${
                          customer.payment_intent_status === "succeeded"
                            ? "bg-green-500"
                            : "bg-red-500"
                        } p-2 rounded-lg text-white font-medium`}
                      >
                        {customer.payment_intent_status}
                      </div>
                    </td>
                    {/* <td className="px-4 py-2 border">{customer.created_at}</td> */}
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.payment_type}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {customer.txn_ref}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full text-2xl font-bold text-center py-7">
              No Payment History Found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => handlePagination("previous")}
            disabled={currentPage === 1}
            className="p-2 z-[1!important] px-4 text-sm text-white bg-[#52a5e4] hover:bg-[#01021e] rounded-lg sm:text-base sm:px-6 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="p-2 px-4 text-sm font-bold text-[#52a5e4]   bg-blue-100 rounded-lg sm:px-6 sm:text-lg ">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePagination("next")}
            disabled={currentPage === totalPages}
            className="p-2 z-[1!important]  px-4 text-sm text-white bg-[#52a5e4] hover:bg-[#01021e] rounded-lg sm:text-base sm:px-6 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
