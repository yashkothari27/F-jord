import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KYCListing = () => {
  const navigate = useNavigate();

  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  const handleDocumentClick = (documentLink) => {
    setSelectedDocument(documentLink);
    setIsModalOpen(true);
  };

  //

  const [kyclisting, setKYCListing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentSucceed, setPaymentSucceed] = useState("all");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const token = userSession?.access;

  // Function to fetch customer data
  const fetchKYCListing = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/auth/kyc/list/?status=Pending`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(response);
      // Set customer data, pagination URLs, and total count
      setKYCListing(response.data || []);
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

  const kycApprove = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/kyc/approve/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(response);
      // if (response.code === 200) {
      toast.success("KYC Approved successfully");
      window.location.reload();
      //   }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access. Please log in again.");
      } else {
        setError("Network Error, Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch customer data on component mount or when pagination changes
  useEffect(() => {
    fetchKYCListing();
  }, []);

  // Filter and sort kyclisting based on search query, KYC filter, and sorting options
  const filteredAndSortedKYCListing = kyclisting.filter((customer) => {
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
    filteredAndSortedKYCListing.length / itemsPerPage
  );
  const currentData = filteredAndSortedKYCListing.slice(
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
            KYC Verification
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
          Total Records {filteredAndSortedKYCListing.length}
        </div>
        <div className="grid w-full max-w-full grid-cols-1 overflow-x-auto text-sm rounded-md shadow-md scrollerBG sm:text-base">
          {currentData.length > 0 ? (
            <table className="max-w-full ">
              <thead className="bg-gray-100">
                <tr>
                  {/* <th className="px-4 py-2 text-center border">SN</th> */}
                  <th className="px-4 py-2 text-left border">ID</th>
                  <th className="px-4 py-2 text-left border">First Name</th>
                  <th className="px-4 py-2 text-left border">Last Name</th>
                  <th className="px-4 py-2 text-left border">Email</th>
                  <th className="px-4 py-2 text-left border">Phone Number</th>
                  <th className="px-4 py-2 text-left border">Address</th>
                  {/* <th className="px-4 py-2 text-left border">Document</th> */}
                  <th className="px-4 py-2 text-left border">Verification</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((customer) => (
                  <tr key={customer.id_number}>
                    {/* <td className="px-4 py-2 border">{i + 1}</td> */}
                    <td className="px-4 py-2 border">{customer.id_number}</td>
                    <td className="px-4 py-2 border">
                      {customer.user.first_name}
                    </td>
                    <td className="px-4 py-2 border">
                      {customer.user.last_name}
                    </td>
                    <td className="px-4 py-2 border">{customer.user.email}</td>
                    <td className="px-4 py-2 border">
                      {customer.user.phone_number}
                    </td>
                    <td className="px-4 py-2 border">{customer.address}</td>
                    {/* <td className="px-4 py-2 border ">
                      <div
                        className="py-1 font-medium text-center text-white transition-all duration-300 ease-in-out bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600 hover:translate-y-1"
                        onClick={() =>
                          // handleDocumentClick(customer.document)
                          window.open(
                            import.meta.env.VITE_API_BASE_URL +
                              customer.document,
                            "_blank"
                          )
                        }
                      >
                        View
                      </div>
                    </td> */}
                    {/* {console.log(
                      import.meta.env.VITE_API_BASE_URL + documentLink
                    )} */}

                    <td className="px-4 py-2 border whitespace-nowrap">
                      <div
                        className="px-2 py-1 font-medium text-center text-white transition-all duration-300 ease-in-out bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 hover:translate-y-1"
                        onClick={() => kycApprove(customer.user.id)}
                      >
                        Confirm Verification
                      </div>
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
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          documentLink={selectedDocument}
        />
      </div>
    </>
  );
};

const Modal = ({ isOpen, onClose, documentLink }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Callback when the document is loaded
  const onLoadSuccess = ({ numPages }) => setNumPages(numPages);

  // Change page number
  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[100]">
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-md shadow-lg">
        <div
          onClick={onClose}
          className="absolute p-1 text-lg font-bold leading-none text-red-500 transition-all duration-300 ease-in-out hover:scale-105 hover:text-[#52a5e4] rounded-full cursor-pointer top-3 hover:translate-y-1 right-4"
        >
          <X className="font-bold " />
        </div>
        {/* {console.log(import.meta.env.VITE_API_BASE_URL + documentLink)} */}
        <h2 className="mb-4 text-2xl">Document Preview</h2>
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(
            import.meta.env.VITE_API_BASE_URL + documentLink
          )}&embedded=true`}
          width="100%"
          height="500px"
          title="Document View"
          onError={() =>
            alert(
              "Error loading document. Ensure the URL is publicly accessible and the format is supported."
            )
          }
        />
      </div>
    </div>
  );
};

export default KYCListing;
