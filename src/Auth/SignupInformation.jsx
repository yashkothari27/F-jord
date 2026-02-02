import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useNavigate, NavLink } from "react-router-dom";

const SignupInformation = ({ email }) => {
  const [formData, setFormData] = useState({
    email: email,
    phone_number: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone_number: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Check if any required field is empty
    if (
      !formData.email ||
      !formData.phone_number ||
      !formData.password ||
      !formData.confirm_password ||
      !formData.first_name ||
      !formData.last_name ||
      !acceptedTerms
    ) {
      setError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Check if password has at least 8 characters
    const passwordRegex =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long and include at least one symbol."
      );
      toast.error(
        "Password must be at least 8 characters long and include at least one symbol."
      );
      setLoading(false);
      return;
    }

    if (formData.first_name.length < 2) {
      setError("The first name must contain at least 2 characters.");
      toast.error("The first name must contain at least 2 characters.");
      setLoading(false);
      return;
    }

    if (formData.last_name.length < 2) {
      setError("The last name must contain at least 2 characters.");
      toast.error("The last name must contain at least 2 characters.");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Make the request with axios
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup/`,
        {
          email: email,
          phone_number: `+${formData.phone_number}`,
          password: formData.password,
          confirm_password: formData.confirm_password,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }
      );

      // Handle success response (201 status)
      if (response.status === 201) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }

      setLoading(false);
    } catch (err) {
      // console.error(err);

      // Handle error response (400 Bad Request or Network errors)
      if (!err.response) {
        toast.error("Network error. Please try again.");
      } else if (err.response.status === 400) {
        toast.error("User already exists or invalid request.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  //   inputInnerClass
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
          className="w-full max-w-lg p-5 space-y-4 text-center sm:max-w-xl border shadow-[10px_10px_30px_0px_rgba(255,_255,_255,_.07)] border-[#414141de] border-r-0 border-b-0 sm:p-6 sm:px-8 rounded-xl h-max"
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
                className="object-contain w-40  cursor-pointer
                hover:border-b hover:border-[#52a5e4] shadow hover:shadow-[rgba(255,_255,_255,_0.1)_0px_20px_25px_-5px,_rgba(255,_255,_255,_0.04)_0px_10px_10px_-5px] ease-in-out transition-all duration-300 border-b border-transparent h-14 sm:w-44"
              />
            </NavLink>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="text-xl sm:text-2xl xl:text-2xl lg:text-3xl mb-8 sm:mb-4 font-bold text-[#52a5e4]">
              Create Your Account
            </div>
            <div className="space-y-8 text-base sm:space-y-8 lg:text-lg xl:text-base">
              {/* First Name and Last Name */}
              <div
                className={`relative w-full px-4 py-3 sm:py-4 text-white transition-all ease-in-out  duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                style={{
                  background:
                    "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
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
                  First name
                </div>
              </div>

              <div
                className={`relative w-full px-4 py-3 sm:py-4 text-white transition-all ease-in-out duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                style={{
                  background:
                    "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
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
                  Last name
                </div>
              </div>

              {/* Email */}
              <div
                className={`relative w-full px-4 py-3 sm:py-4 text-white transition-all ease-in-out duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                style={{
                  background:
                    "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <div
                  //   onChange={handleChange}
                  className="w-full text-base bg-transparent border-none outline-none text-start peer"
                  required
                  placeholder=""
                  disabled
                >
                  {email}
                </div>
                {/* <div
                  className={`${inputInnerClass}`}
                  style={{
                    background:
                      "linear-gradient(180deg, #080d32 0%, #10173d 50%, #1e2245 100%)",
                  }}
                >
                  Email
                </div> */}
              </div>

              {/* Phone Number */}
              <div
                className={`relative w-full px-2 py-2 text-black transition-all ease-in-out duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                style={{
                  background:
                    "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <PhoneInput
                  country={"us"}
                  enableSearch
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  placeholder="123123454"
                  value={formData.phone_number}
                  onChange={handlePhoneChange}
                  inputClass="w-max text-base bg-transparent border-none outline-none text-black"
                  required
                />
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
                  type="password"
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
              </div>

              {/* Confirm Password */}
              <div
                className={`relative w-full px-4 py-3 sm:py-4 text-white transition-all ease-in-out duration-300 border rounded-xl border-[#52a5e4] border-r-0 border-b-0`}
                style={{
                  background:
                    "linear-gradient(120.29deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              >
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
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
                  Confirm Password
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-center text-red-600">
                <small>{error}</small>
              </div>
            )}

            <div className="flex items-start gap-1 mt-6 text-sm text-white sm:text-base">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 scale-125 accent-[#52a5e4]"
                required
              />
              <label htmlFor="acceptTerms" className="leading-snug">
                I confirm that I have read and accept the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#52a5e4] underline hover:no-underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#52a5e4] underline hover:no-underline"
                >
                  Privacy Policy
                </a>
                . I acknowledge that investing involves risk and that I am
                solely responsible for my investment decisions and compliance
                with applicable laws.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              // disabled={loading || !acceptedTerms}
              style={{ background: "transparent" }}
              className={`py-2 px-12 mx-auto mt-9 text-lg lg:text-xl font-bold text-center bg-[#52a5e4!important]  text-white cursor-pointer  rounded-3xl duration-300 ease-in-out transition-all  border border-transparent  ${
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
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          {/* Already have an account? Log in section inside the white box */}
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
};

export default SignupInformation;
