import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const LoginPage = () => {
  const [userSession, setUserSession] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch the user session from localStorage and check if it's available
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("userSession"));
    if (session) {
      setUserSession(session);
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Make the request with axios to your login API
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login/`,
        {
          email_or_phone: formData.email,
          password: formData.password,
        }
      );

      // Handle success response (200 status)
      if (response.status === 200) {
        toast.success("Login successful!");

        const loginTime = Date.now();
        const sessionDuration = 7200000;
        const sessionExpiryTime = loginTime + sessionDuration;

        const { address1, post_code, DOB, ...restOfUser } = response.data.user;

        const sessionData = {
          access: response.data.access,
          refresh: response.data.refresh,
          user: {
            ...restOfUser, // Spread the rest of the user data
            address_line1: address1, // Rename address1 to address_line1
            postal_code: post_code, // Rename post_code to postal_code
            dob: DOB, // Rename DOB to dob
          },
          loginTime,
          sessionExpiryTime,
        };
        localStorage.setItem("userSession", JSON.stringify(sessionData));

        setTimeout(() => {
          localStorage.removeItem("userSession");
          toast.info("Your session has expired. Please log in again.");
          navigate("/login");
        }, sessionDuration);

        const timeLeftForTimeout = sessionExpiryTime - Date.now();
        if (timeLeftForTimeout > 120000) {
          setTimeout(
            () => toast.info("Your session will expire in 2 minutes."),
            timeLeftForTimeout - 120000
          );
        }
        if (timeLeftForTimeout > 60000) {
          setTimeout(
            () => toast.info("Your session will expire in 1 minute."),
            timeLeftForTimeout - 60000
          );
        }
        if (timeLeftForTimeout === 0) {
          setTimeout(
            () => toast.info("Your session will expire in 1 minute."),
            timeLeftForTimeout - 0
          );
          toast.info("Your session has expired. Please log in again.");
          navigate("/login");
        }

        navigate("/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
      setLoading(false);
    } catch (err) {
      // console.error(err);

      // Handle error response (400 Bad Request or Network errors)
      if (err.response && err.response.status === 400) {
        toast.error("Invalid credentials. Please check your details.");
      } else {
        toast.error("Network Error: Unable to login. Please try again.");
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

  // Redirect to login if userSession is available
  if (userSession) {
    return navigate("/dashboard");
  }

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
                src="/logo.svg"
                alt="Logo"
                className="object-contain w-40 cursor-pointer  
                hover:border-b hover:border-[#52a5e4] shadow hover:shadow-[rgba(255,_255,_255,_0.1)_0px_20px_25px_-5px,_rgba(255,_255,_255,_0.04)_0px_10px_10px_-5px] ease-in-out transition-all duration-300 border-b border-transparent h-12 sm:w-40"
              />
            </NavLink>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="text-xl sm:text-2xl xl:text-2xl lg:text-3xl mb-8 sm:mb-5 font-bold text-[#52a5e4]">
              LOGIN
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

              {/* Password */}
              <div
                className={`relative w-full px-4 py-3 sm:py-4 text-white transition-all ease-in-out duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                style={{
                  background:
                    "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
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
                  Password
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute z-10 p-0 -translate-y-1/2 bg-transparent right-4 top-1/2 transition-all hover:border-transparent duration-300 ${
                    showPassword ? "drop-shadow-[0_0_6px_white]" : "shadow-none"
                  }`}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>

                <div className="absolute right-0 text-sm text-gray-600 -bottom-6 xl:text-sm lg:text-base">
                  {" "}
                  <NavLink
                    to="/resetPassword"
                    className="text-[#52a5e4] hover:underline"
                  >
                    Forget Password?
                  </NavLink>
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
                  : "hover:border-[#52a5e4] hover:bg-[white!important] hover:text-[#52a5e4]"
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
                "Login"
              )}
            </button>
          </form>
          <div className="mt-0 text-center">
            <span className="text-sm text-gray-600 xl:text-sm lg:text-base">
              Don't have an account?
              <NavLink
                to="/signupVerification"
                className="text-[#52a5e4] hover:underline"
              >
                Sign up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
