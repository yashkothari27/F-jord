import React, { useState, useEffect } from "react";

// Sample data for transactions (replace with actual API data)
const sampleTransactions = [
  {
    id: "TXN12345",
    type: "Deposit",
    amount: 500,
    date: "2023-11-01",
    status: "Completed",
  },
  {
    id: "TXN12346",
    type: "Withdrawal",
    amount: 200,
    date: "2023-10-29",
    status: "Pending",
  },
  {
    id: "TXN12347",
    type: "Deposit",
    amount: 750,
    date: "2023-10-15",
    status: "Completed",
  },
  {
    id: "TXN12348",
    type: "Purchase",
    amount: 300,
    date: "2023-10-05",
    status: "Completed",
  },
  {
    id: "TXN12349",
    type: "Deposit",
    amount: 600,
    date: "2023-10-03",
    status: "Completed",
  },
  {
    id: "TXN12350",
    type: "Withdrawal",
    amount: 150,
    date: "2023-09-29",
    status: "Pending",
  },
  // Add more transactions as needed for testing
];

const OrderHistory = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 3;

  useEffect(() => {
    // Load transactions from API here
    // e.g., fetch("/api/transactions").then(res => res.json()).then(data => setTransactions(data))
  }, []);

  // Filter transactions based on selected type
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((txn) => txn.type === filter);

  // Calculate pagination details
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  // Change page function
  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-3 text-gray-800 bg-gray-100 h-[100vh] sm:p-8">
      <h1 className="mb-8 text-3xl font-semibold">Order History</h1>

      {/* Filter Section */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium text-gray-700">Filter by Type:</label>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
          <option value="Purchase">Purchase</option>
        </select>
      </div>

      {/* Transactions Table with Responsiveness */}
      <div className="bg-white w-[77vw] sm:w-full rounded-lg shadow-md overflow-x-auto sm:p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="px-6 py-3 font-semibold bg-gray-50">
                Transaction ID
              </th>
              <th className="px-6 py-3 font-semibold bg-gray-50">Type</th>
              <th className="px-6 py-3 font-semibold bg-gray-50">Amount</th>
              <th className="px-6 py-3 font-semibold bg-gray-50">Date</th>
              <th className="px-6 py-3 font-semibold bg-gray-50">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((txn) => (
                <tr key={txn.id} className="border-b">
                  <td className="px-6 py-3">{txn.id}</td>
                  <td className="px-6 py-3">{txn.type}</td>
                  <td className="px-6 py-3">${txn.amount}</td>
                  <td className="px-6 py-3">{txn.date}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`p-1 rounded-lg text-white ${
                        txn.status === "Completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 font-medium text-center text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <div
          onClick={() => changePage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer disabled:opacity-10"
          disabled={currentPage === 1}
        >
          Previous
        </div>
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            onClick={() => changePage(index + 1)}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </div>
        ))}
        <div
          onClick={() => changePage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer disabled:opacity-10"
          disabled={currentPage === totalPages}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
