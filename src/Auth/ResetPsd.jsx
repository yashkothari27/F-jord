import axios from "axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const ResetPsd = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if any required field is empty
    if (!formData.email) {
      setError("Please fill in all required fields.");
      toast.error("Please provide a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // Make the request with axios to your login API
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/password_reset/`,
        {
          email: formData.email,
        }
      );

      // Handle success response (200 status)
      if (response.status === 200) {
        toast.success(
          "A password reset link has been sent to your email address. Please check your inbox."
        );
        navigate("/login");
      } else {
        toast.error(
          "An error occurred while processing your request. Please try again."
        );
      }
      setLoading(false);
    } catch (err) {
      // console.error(err);

      // Handle error response (400 Bad Request or Network errors)
      if (err.response && err.response.status === 400) {
        toast.error(
          "The email address does not exist. Please check your details and try again."
        );
      } else {
        toast.error(
          "Network Error: Unable to send the reset password email. Please try again."
        );
      }

      setLoading(false);
    }
  };

  // Input styling for the fields
  const inputInnerClass = `absolute pointer-events-none left-3 px-3 sm:text-lg font-medium transition-all duration-300 ease-in-out transform border-b-0 
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:-top-3 rounded-xl 
    peer-focus:left-3 
    peer-focus:text-sm 
    peer-focus:border-b 
    peer-focus:text-[#52a5e4] 
    peer-focus:border-b-[#52a5e4] 
    peer-valid:-top-3 
    peer-valid:left-3 
    peer-valid:text-sm 
    peer-valid:border-b 
    peer-valid:text-[#52a5e4]
    peer-valid:border-b-[#52a5e4]`;

  return (
    <div className="flex flex-col w-full min-h-[100vh] overflow-hidden font-medium bg-[#01021e] sm:gap-10 p-5 sm:p-12 sm:flex-row">
      <div className="homeSpotLight"></div>

      <div className="flex flex-col items-center justify-center w-full gap-10 m-auto">
        {/* White Box Section */}
        <div
          className="w-full max-w-lg p-5 space-y-4 text-center sm:max-w-xl border shadow-[10px_10px_30px_0px_rgba(255,_255,_255,_.08)] border-[#414141de] border-r-0 border-b-0 sm:p-8 sm:px-10 rounded-xl h-max"
          style={{
            background:
              "linear-gradient(109.12deg, #090a33 -7.41%, rgba(9, 10, 51, 0) 99.06%)",
          }}
        >
          {/* Logo Section inside the white box */}
          <div className="flex justify-center mb-3">
            <NavLink to="/">
              <img
                src="/ison.jpg"
                alt="Logo"
                className="object-cover w-40  cursor-pointer rounded-xl 
                hover:border-b hover:border-[#52a5e4] shadow hover:shadow-[rgba(255,_255,_255,_0.1)_0px_20px_25px_-5px,_rgba(255,_255,_255,_0.04)_0px_10px_10px_-5px] ease-in-out transition-all duration-300 border-b border-transparent h-14 sm:w-44"
              />
            </NavLink>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="text-xl sm:text-2xl xl:text-2xl lg:text-3xl mb-8 sm:mb-5 font-bold text-[#52a5e4]">
              Reset Password
            </div>
            <div className="space-y-8 text-base sm:space-y-9 lg:text-lg xl:text-base">
              {/* Email */}
              <div
                className={`relative w-full px-4 py-3 sm:py-4 text-white transition-all ease-in-out duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                style={{
                  background:
                    "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <input
                  type="email"
                  name="email"
                  aria-label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-base bg-transparent border-none outline-none peer"
                  required
                  placeholder=""
                />
                <div
                  className={`${inputInnerClass}`}
                  style={{
                    background:
                      "linear-gradient(180deg, #080d32 0%, #10173d 50%, #1e2245 100%)",
                  }}
                >
                  Email
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-center text-red-600">
                <small>{error}</small>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ background: "transparent" }}
              className={`py-2 px-12 mx-auto mt-9 text-lg lg:text-xl font-bold text-center bg-[#52a5e4!important]  text-white cursor-pointer  rounded-3xl duration-300 ease-in-out transition-all  border border-transparent  ${
                loading
                  ? "opacity-100 cursor-not-allowed"
                  : " hover:border-[#52a5e4] hover:text-[#52a5e4] hover:bg-[white!important]"
              }`}
            >
              {loading ? (
                <>
                  {" "}
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-t-4 border-black rounded-full loader animate-spin"></div>
                    {/* <span className="ml-2 text-blue-500">Loading...</span> */}
                  </div>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
          <div className="mt-0 text-center">
            <span className="text-sm text-gray-600 xl:text-sm lg:text-base">
              Remebered the password?{" "}
              <NavLink to="/signup" className="text-[#52a5e4] hover:underline">
                Log in
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPsd;
