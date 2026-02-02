import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SignupInformation from "./SignupInformation";

const SignupVerification = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false); // Stop the timer when it reaches 0
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email) {
      setError("Please enter a valid email.");
      toast.error("Please enter a valid email.");
      setLoading(false);
      return;
    }

    setFormData({ email: formData.email, otp: "" });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp/`,
        { email: formData.email }
      );
      // console.log(response);

      if (response.status === 200) {
        toast.success(
          "OTP sent successfully. Please check your email. The OTP is valid for 10 minutes."
        );
        setStep(2); // Move to OTP input step
        setTimer(600); // Reset timer to 10 minutes
        setIsTimerActive(true); // Start timer
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Invalid email or user already exists.");
      } else {
        // setStep(2); // Move to OTP input step
        // setTimer(600); // Reset timer to 10 minutes
        // setIsTimerActive(true);
        // console.log(err);
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.otp) {
      setError("Please enter the OTP.");
      toast.error("Please enter the OTP.");
      setLoading(false);
      return;
    }
    if (formData.otp.length !== 6) {
      setError("OTP must be 6 digits.");
      toast.error("OTP must be 6 digits.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp/`,
        {
          email: formData.email,
          otp: formData.otp,
        }
      );

      // console.log(response);

      if (response.status === 200) {
        toast.success("OTP verified successfully.");
        setIsVerified(true);
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Invalid OTP. Please try again.");
      } else {
        // toast.success("OTP verified successfully.");
        setIsVerified(false);
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleReload = () => {
  //   setStep(1);
  //   setFormData({ email: "", otp: "" });
  //   setTimer(600);
  //   setIsTimerActive(false);
  //   setError(null);
  // };

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
  if (!isVerified)
    return (
      <div className="flex flex-col w-full min-h-[100vh] overflow-hidden font-medium bg-[#01021e] sm:gap-10 p-5 sm:p-12 sm:flex-row">
        <div className="homeSpotLight"></div>
        <div className="flex flex-col items-center justify-center w-full gap-10 m-auto">
          <div
            className="w-full max-w-lg p-5 relative space-y-4 text-center sm:max-w-xl border shadow-[10px_10px_30px_0px_rgba(255,_255,_255,_0.07)] border-[#414141de] border-r-0 border-b-0 sm:p-6 sm:px-8 rounded-xl h-max"
            style={{
              background:
                "linear-gradient(109.12deg, #090a33 -7.41%, rgba(9, 10, 51, 0) 99.06%)",
            }}
          >
            {step === 2 && isTimerActive && (
              <div className="text-lg bg-[#52a5e4] absolute right-5 p-1 px-4 rounded">
                {formatTime(timer)}
              </div>
            )}

            <div className="flex items-center justify-center mb-3">
              <NavLink to="/">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="object-contain w-40 cursor-pointer 
                hover:border-b hover:border-[#52a5e4] shadow hover:shadow-[rgba(255,_255,_255,_0.1)_0px_20px_25px_-5px,_rgba(255,_255,_255,_0.04)_0px_10px_10px_-5px] ease-in-out transition-all duration-300 border-b border-transparent h-14 sm:w-44"
                />
              </NavLink>
            </div>
            <form onSubmit={step === 1 ? handleSubmitEmail : handleSubmitOTP}>
              <div className="text-xl sm:text-2xl xl:text-2xl lg:text-3xl mb-8 sm:mb-4 font-semibold text-[#52a5e4]">
                {step === 1
                  ? "Enter your email for verification"
                  : step === 2 && timer !== 0
                  ? "Enter the OTP sent to your email"
                  : "Something Wrong ?"}
              </div>
              <div className="space-y-8 text-base sm:space-y-8 lg:text-lg xl:text-base">
                {/* Email Input */}
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-base bg-transparent border-none outline-none peer"
                    required
                    disabled={step === 2}
                    placeholder=""
                  />
                  {step !== 2 && (
                    <div
                      className={`${inputInnerClass}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #080d32 0%, #10173d 50%, #1e2245 100%)",
                      }}
                    >
                      Email
                    </div>
                  )}
                </div>
                {/* OTP Input */}
                {step === 2 && timer !== 0 && (
                  <div
                    className={`relative w-full px-4 py-3 sm:py-4 text-white transition-all ease-in-out duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                    style={{
                      background:
                        "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                    }}
                  >
                    <input
                      type="text" // Use type text to control the length and characters more flexibly
                      name="otp"
                      autoFocus
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full text-base bg-transparent border-none outline-none peer"
                      placeholder="6 digit otp"
                      disabled={timer === 0}
                      maxLength={6}
                      inputMode="numeric"
                    />
                    <div
                      className={`${inputInnerClass}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #080d32 0%, #10173d 50%, #1e2245 100%)",
                      }}
                    >
                      OTP
                    </div>
                  </div>
                )}
              </div>
              {/* Error */}
              {error && <div className="text-red-500">{error}</div>}

              {/* Submit Button */}
              {timer !== 0 && (
                <div className="flex w-full py-3 justify-evenly">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-1 px-4 sm:px-12 sm:py-2 mx-auto mt-5 text-base sm:text-lg lg:text-xl font-semibold text-center bg-[#52a5e4!important]  text-white cursor-pointer  rounded-3xl duration-300 ease-in-out transition-all  border border-transparent  ${
                      loading
                        ? "opacity-100 cursor-not-allowed"
                        : "hover:border-[#52a5e4] hover:text-[#52a5e4]  hover:bg-[white!important]"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-t-4 border-black rounded-full loader animate-spin"></div>
                        {/* <span className="ml-2 text-blue-500">Loading...</span> */}
                      </div>
                    ) : step === 1 ? (
                      "Send OTP"
                    ) : (
                      "Verify OTP"
                    )}

                    {/* {loading
                ? "Please wait..."
                : step === 1
                ? "Send OTP"
                : "Verify OTP"} */}
                  </button>
                  {step === 2 && (
                    <button
                      onClick={() => window.location.reload()}
                      className={`py-1 px-6 sm:py-2 sm:px-8 mx-auto mt-5 text-base sm:text-lg lg:text-xl font-semibold text-center bg-red-500 text-white cursor-pointer  rounded-3xl duration-300 ease-in-out transition-all  border border-transparent  ${
                        loading
                          ? "opacity-100 cursor-not-allowed"
                          : "hover:border-[#52a5e4] hover:text-[#52a5e4]  hover:bg-[white!important]"
                      }`}
                    >
                      Wrong Email ?
                    </button>
                  )}
                </div>
              )}
            </form>

            {/* Resend or Reload Button */}
            {step === 2 && timer === 0 && (
              <div className="flex w-full py-3 justify-evenly">
                <button
                  onClick={handleSubmitEmail}
                  className="px-5 py-2 text-white bg-[#52a5e4] rounded hover:bg-[#3484c0]"
                >
                  Resend OTP
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Wrong Email ?
                </button>
              </div>
            )}
            <div className="mt-0 text-center">
              <span className="text-sm text-gray-600 xl:text-sm lg:text-base">
                Already have an account?{" "}
                <a href="/login" className="text-[#52a5e4] hover:underline">
                  Log in
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  if (isVerified) {
    return <SignupInformation email={formData.email} />;
  }
};

export default SignupVerification;
