import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // Function to fetch transaction data
  const fetchTransactions = async () => {
    setLoading(true); // Start loading spinner
    try {
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.access;
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/transaction_history/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);

      if (response.status === 200 && response.data.length > 0) {
        const reversedTransactions = response.data.reverse();
        setTransactions(reversedTransactions);

        // Store the data in state
        // toast.success("Transactions loaded successfully.");
      } else if (response.status === 200 && response.data.length === 0) {
        setTransactions([]);
        // toast.info("No transaction history found.");
      }
    } catch (error) {
      toast.error("Error fetching transactions. Please try again later.");
      // console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(transactions.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="">
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center h-20">
          <div className="w-6 h-6 border-t-4 border-blue-500 rounded-full loader animate-spin"></div>
          <span className="ml-2 text-blue-500">Loading...</span>
        </div>
      ) : transactions.length > 0 ? (
        <div className="mb-3 overflow-x-auto scrollerBG">
          <table className="w-full border border-collapse border-gray-300 table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Currency</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Coin Code</th>
                <th className="px-4 py-2 border">Platform</th>
                <th className="px-4 py-2 border">Tokens</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Customer Name</th>
                <th className="px-4 py-2 border">Customer Email</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-4 py-2 border">{transaction.id}</td>
                  <td className="px-4 py-2 border">{transaction.currency}</td>
                  <td className="px-4 py-2 border">{transaction.amount}</td>
                  <td className="px-4 py-2 border">{transaction.coin_code}</td>
                  <td className="px-4 py-2 border">
                    {transaction.payment_platform}
                  </td>
                  <td className="px-4 py-2 border">{transaction.rwa_tokens}</td>
                  <td className="px-4 py-2 border">
                    {transaction.payment_intent_status}
                  </td>
                  <td className="px-4 py-2 border">
                    {transaction.payment_type}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">
                    {transaction.customer_name}
                  </td>
                  <td className="px-4 py-2 border">
                    {transaction.customer_email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="my-4 text-center text-gray-500">
          No transaction history found.
        </div>
      )}

      {/* Pagination Controls */}
      {transactions.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <div
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm rounded cursor-pointer sm:text-base sm:px-4 disabled:opacity-50 disabled:bg-gray-300 ${
              currentPage === 1 ? "bg-gray-300" : "bg-[#52a5e4] text-white"
            }`}
          >
            Previous
          </div>
          <span className="text-sm font-medium sm:text-base">
            Page {currentPage} of{" "}
            {Math.ceil(transactions.length / itemsPerPage)}
          </span>
          <div
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(transactions.length / itemsPerPage)
            }
            className={`px-3 py-2 text-sm disabled:bg-gray-300 rounded cursor-pointer sm:text-base sm:px-4 disabled:opacity-50 ${
              currentPage === Math.ceil(transactions.length / itemsPerPage)
                ? "bg-gray-300"
                : "bg-[#52a5e4] text-white"
            }`}
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
