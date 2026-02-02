import axios from "axios";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import WalletBalance from "../Components/WalletBalance";
import defaultDP from "../../assets/Images/defaultDP.png";

const Settings = () => {
  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const token = userSession?.access;

  // State for user details and address
  const [userDetails, setUserDetails] = useState(() => ({
    first_name: userSession?.user?.first_name || null,
    last_name: userSession?.user?.last_name || null,
    display_name: userSession?.user?.display_name || null,
    phone_number: userSession?.user?.phone_number || null,
    email: userSession?.user?.email || null,
    dob: userSession?.user?.dob || null,
    address: userSession?.user?.address || null,
    address_line1: userSession?.user?.address_line1 || null,
    city: userSession?.user?.city || null,
    postal_code: userSession?.user?.postal_code || null,
    profile_image: userSession?.user?.profile_image || defaultDP,
  }));
  const [previewImage, setPreviewImage] = useState(false);

  // Edit state for user details
  const [isEditingUserDetails, setIsEditingUserDetails] = useState(false);

  const handleUserDetailsChange = (e) => {
    // console.log(userDetails);
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const saveUserDetails = () => {
    setIsEditingUserDetails(false); // Close edit mode
  };

  // Address
  const [isEditingAddressDetails, setIsEditingAddressDetails] = useState(false);
  const [editedAddress, setEditedAddress] = useState(userDetails);

  const handleEditClick = () => {
    setIsEditingAddressDetails(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress({
      ...editedAddress,
      [name]: value,
    });
  };

  // const handleSaveClick = () => {
  //   // Save edited details (e.g., call API to update)
  //   setIsEditingAddressDetails(false);
  // };

  const handleSaveClick = () => {
    const isFile = userDetails.profile_image instanceof File;

    const updatedDetails = {
      profile_image: isFile ? userDetails.profile_image : null,
      first_name: userDetails.first_name,
      last_name: userDetails.last_name,
      display_name: userDetails.display_name,
      phone_number: userDetails.phone_number,
      email: userDetails.email,
      dob: userDetails.dob,
      address: editedAddress.address,
      address_line1: editedAddress.address_line1,
      city: editedAddress.city,
      postal_code: editedAddress.postal_code,
    };

    const cleanDetails = Object.fromEntries(
      Object.entries(updatedDetails).filter(([key, value]) => value != null)
    );

    // Call the API function to update the user details
    updateUserDetails(cleanDetails);

    setIsEditingAddressDetails(false);
    setIsProfileImageUpdated(false);
    // Close the edit mode
  };

  // Image

  const profileImageUrl =
    userDetails.profile_image == null || userDetails.profile_image === undefined
      ? defaultDP // Return default image if it's null or undefined
      : typeof userDetails.profile_image === "string" &&
        userDetails.profile_image.startsWith("http")
      ? userDetails.profile_image // Return the URL as is if it starts with 'http'
      : typeof userDetails.profile_image === "string" &&
        userDetails.profile_image.startsWith("/media")
      ? import.meta.env.VITE_API_BASE_URL + userDetails.profile_image
      : userDetails.profile_image;

  // console.log(profileImageUrl, userDetails);

  const [isEditingProfileImage, setIsEditingProfileImage] = useState(true);
  const [isProfileImageUpdated, setIsProfileImageUpdated] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfileBtnEditClick = () => {
    setIsProfileImageUpdated(true);
    setIsEditingProfileImage(true);
    openFileExplorer();
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];

    // Check if the file is selected
    if (file) {
      // Allowed image formats
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];

      // Validate file type
      if (validTypes.includes(file.type)) {
        // If the file type is valid, set preview image and update userDetails
        setPreviewImage(URL.createObjectURL(file));
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          profile_image: file,
        }));
      } else {
        // If the file type is not valid, show a toast error
        toast.error(
          "Invalid format! Only PNG, JPG, or JPEG images are allowed."
        );
        // Optionally, clear the file input
        event.target.value = "";
      }
    }
  };

  const openFileExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      // setIsProfileImageUpdated(false);
    }
  };

  const updateUserDetails = async (updatedDetails) => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append regular user details (strings) to FormData
      Object.keys(updatedDetails).forEach((key) => {
        if (updatedDetails[key] != null) {
          // Only append non-null values
          formData.append(key, updatedDetails[key]);
        }
      });

      // Append profile image if it's a file (not just a URL)
      if (userDetails.profile_image instanceof File) {
        formData.append("profile_image", userDetails.profile_image);
      }

      // Send the request as PATCH with FormData
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/update-user/`, // Update with your actual endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Correct header for file uploads
            Authorization: `Bearer ${token}`, // Add Authorization header with the token
          },
        }
      );

      // console.log(response);
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      if (response.status === 200) {
        toast.success("User details updated successfully!");
        // console.log("User details updated successfully:", response.data);

        // Retrieve and update userSession in localStorage
        const userSession = JSON.parse(localStorage.getItem("userSession"));
        const updatedUser = {
          ...userSession.user,
          ...updatedDetails,
        };

        if (updatedUser.profile_image instanceof File) {
          updatedUser.profile_image = previewImage;
        }

        // Update the session with new details
        const updatedUserSession = {
          ...userSession,
          user: updatedUser,
        };

        localStorage.setItem("userSession", JSON.stringify(updatedUserSession));

        // Update state with the new details
        setUserDetails({
          first_name: updatedUser.first_name || null,
          last_name: updatedUser.last_name || null,
          display_name: updatedUser.display_name || null,
          phone_number: updatedUser.phone_number || null,
          email: updatedUser.email || null,
          dob: updatedUser.dob || null,
          address: updatedUser.address || null,
          address_line1: updatedUser.address_line1 || null,
          city: updatedUser.city || null,
          postal_code: updatedUser.postal_code || null,
          profile_image: updatedUser.profile_image || defaultDP,
        });
      } else {
        toast.error("Please try again.");
        //  console.log("Failed to update user details");
      }
    } catch (error) {
      if (error.response.request.status === 400) {
        toast.warning("Please Enter a Valid Details");
        // console.log(error);
      }
      toast.error("Error updating user details");
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-4 overflow-hidden font-medium bg-gray-100 sm:gap-6 sm:p-8 lg:flex-row ">
      <div className="flex flex-col w-full gap-6 ">
        {/* User Details Section */}
        <div className="p-5 bg-white rounded-xl h-max space-y-7">
          <div className="text-2xl font-bold text-[#52a5e4]">User Details</div>
          <div className="space-y-8">
            <div className="flex flex-col gap-5 sm:flex-row ">
              <div
                className={`relative w-full px-4 py-3 text-black transition-all ease-in-out customKYCAuto duration-300 border  border-[#52a5e4] ${
                  isEditingUserDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingUserDetails ? (
                  <input
                    type="text"
                    name="first_name"
                    value={userDetails.first_name}
                    onChange={handleUserDetailsChange}
                    className="w-full bg-transparent border-none outline-none"
                  />
                ) : (
                  userDetails.first_name
                )}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingUserDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  First name
                </div>
              </div>
              <div
                className={`relative w-full px-4 py-3 text-black transition-all ease-in-out customKYCAuto duration-300 border  border-[#52a5e4] ${
                  isEditingUserDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingUserDetails ? (
                  <input
                    type="text"
                    name="last_name"
                    value={userDetails.last_name}
                    onChange={handleUserDetailsChange}
                    className="w-full bg-transparent border-none outline-none"
                  />
                ) : (
                  userDetails.last_name
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingUserDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  Last name
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row ">
              <div
                className={`relative w-full px-4 py-3 text-black transition-all ease-in-out customKYCAuto duration-300 border  border-[#52a5e4] ${
                  isEditingUserDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingUserDetails ? (
                  <input
                    type="text"
                    name="display_name"
                    value={userDetails.display_name}
                    onChange={handleUserDetailsChange}
                    className="w-full bg-transparent border-none outline-none "
                    required
                  />
                ) : userDetails.display_name ? (
                  userDetails.display_name
                ) : (
                  <span className="text-gray-500">Eg : Nick</span>
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingUserDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  Display Name
                </div>
              </div>
              <div
                className={`relative w-full px-4 py-3 text-black transition-all ease-in-out customKYCAuto duration-300 border  border-[#52a5e4] ${
                  isEditingUserDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingUserDetails ? (
                  <input
                    type="tel"
                    name="phone_number"
                    value={userDetails.phone_number}
                    onChange={handleUserDetailsChange}
                    className="w-full bg-transparent border-none outline-none"
                    required
                    readOnly
                  />
                ) : userDetails.phone_number ? (
                  userDetails.phone_number
                ) : (
                  "+911111111111"
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingUserDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  Phone Number
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row ">
              <div
                className={`relative w-full max-w-[38rem] px-4 py-3 text-black transition-all customKYCAuto ease-in-out duration-300 border border-[#52a5e4] ${
                  isEditingUserDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingUserDetails ? (
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleUserDetailsChange}
                    className="w-full break-words bg-transparent border-none outline-none"
                    required
                    readOnly
                  />
                ) : (
                  <div className="break-words">
                    {userDetails.email
                      ? userDetails.email
                      : "example@gmail.com"}
                  </div>
                )}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingUserDetails
                      ? "border-b border-b-[#52a5e4]"
                      : "border-b border-transparent"
                  }`}
                >
                  Email
                </div>
              </div>

              <div
                className={`relative sm:min-w-52 h-max px-4 py-3 text-black transition-all customKYCAuto ease-in-out duration-300 border  border-[#52a5e4] ${
                  isEditingUserDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingUserDetails ? (
                  <input
                    type="date"
                    name="dob"
                    value={userDetails.dob || ""}
                    onChange={handleUserDetailsChange}
                    className="w-full bg-transparent border-none outline-none"
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                ) : userDetails.dob ? (
                  userDetails.dob
                ) : (
                  <span className="text-gray-500">dd/mm/yyyy</span>
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingUserDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  dob
                </div>
              </div>
            </div>
            <div
              className=" py-2 ml-auto text-lg font-bold text-center bg-[#52a5e4] text-white cursor-pointer max-w-40 rounded-3xl duration-300 ease-in-out transition-all hover:bg-white border border-transparent hover:border-[#52a5e4] hover:text-[#52a5e4]"
              onClick={() => {
                if (isEditingUserDetails) {
                  saveUserDetails();
                  handleSaveClick();
                } else {
                  setIsEditingUserDetails(true);
                  setIsEditingAddressDetails(false);
                }
              }}
            >
              {isEditingUserDetails ? "Save" : "Edit"}
            </div>
          </div>
        </div>

        {/* Address Details Section */}
        <div className="p-5 bg-white rounded-xl h-max space-y-7">
          <div className="text-2xl font-bold text-[#52a5e4]">
            Address Details
          </div>
          <div className="space-y-8">
            <div className="flex flex-col gap-5 sm:flex-row ">
              <div
                className={`relative  w-full max-w-[38rem] px-4 py-3 text-black transition-all ease-in-out duration-300 border  border-[#52a5e4] customKYCAuto ${
                  isEditingAddressDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingAddressDetails ? (
                  <input
                    type="text"
                    name="address"
                    value={editedAddress.address || ""}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none "
                    required
                  />
                ) : editedAddress.address ? (
                  editedAddress.address
                ) : (
                  <span className="text-gray-500">
                    Enter your Address Line 1
                  </span>
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingAddressDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  Address Line 1
                </div>
              </div>
              <div
                className={`relative w-full px-4 py-3 text-black transition-all ease-in-out customKYCAuto duration-300 border  border-[#52a5e4] ${
                  isEditingAddressDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingAddressDetails ? (
                  <input
                    type="text"
                    name="address_line1"
                    value={editedAddress.address_line1 || ""}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none "
                    required
                  />
                ) : editedAddress.address_line1 ? (
                  editedAddress.address_line1
                ) : (
                  <span className="text-gray-500">
                    Enter your Address Line 2
                  </span>
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingAddressDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  Address Line 2
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row ">
              <div
                className={`relative w-full px-4 py-3 text-black transition-all ease-in-out customKYCAuto duration-300 border  border-[#52a5e4] ${
                  isEditingAddressDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingAddressDetails ? (
                  <input
                    type="text"
                    name="city"
                    value={editedAddress.city || ""}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none"
                    required
                  />
                ) : editedAddress.city ? (
                  editedAddress.city
                ) : (
                  <span className="text-gray-500">Enter your city name</span>
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingAddressDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  City
                </div>
              </div>
              <div
                className={`relative w-full px-4 py-3 text-black transition-all ease-in-out customKYCAuto duration-300 border  border-[#52a5e4] ${
                  isEditingAddressDetails
                    ? "bg-gray-100 rounded-3xl"
                    : "bg-white rounded-xl"
                }`}
              >
                {isEditingAddressDetails ? (
                  <input
                    type="text"
                    name="postal_code"
                    value={editedAddress.postal_code || ""}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none outline-none"
                    required
                  />
                ) : editedAddress.postal_code ? (
                  editedAddress.postal_code
                ) : (
                  <span className="text-gray-500">Enter your Postal Code</span>
                )}{" "}
                <div
                  className={`absolute px-2 text-sm text-[#52a5e4] font-medium bg-white duration-300 ease-in-out transition-all -top-3 left-3 rounded-xl ${
                    isEditingAddressDetails
                      ? "border-b border-b-[#52a5e4]"
                      : " border-b border-transparent"
                  }`}
                >
                  Postal Code
                </div>
              </div>
            </div>
            <div
              className="py-2 ml-auto text-lg font-bold text-center bg-[#52a5e4] text-white cursor-pointer max-w-40 rounded-3xl duration-300 ease-in-out transition-all hover:bg-white border border-transparent hover:border-[#52a5e4] hover:text-[#52a5e4]"
              onClick={() => {
                if (isEditingAddressDetails) {
                  handleSaveClick();
                } else {
                  handleEditClick();
                  setIsEditingUserDetails(false);
                }
              }}
            >
              {isEditingAddressDetails ? "Save" : "Edit"}{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Profile and Wallet Sections */}
      <div className="flex flex-col max-sm:mt-10 lg:w-[23rem] xl:w-[28rem] gap-6">
        {/* Profile Section */}
        <div className="flex flex-col justify-between gap-2 p-5 bg-white rounded-xl">
          <div className="text-2xl font-bold text-[#52a5e4]">Profile</div>
          <div className="flex flex-col justify-center gap-2 text-lg font-bold sm:flex-row">
            <div className="relative p-2 mx-auto mb-3 border-2 rounded-full border-[#52a5e4] w-max h-fit">
              <img
                src={previewImage ? previewImage : profileImageUrl}
                className="w-24 rounded-full max-w-24 aspect-square"
                alt="Profile"
              />
              {isEditingProfileImage && (
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleProfileImageChange}
                  className="absolute bottom-0 right-0 p-1 scale-75 bg-[#52a5e4] rounded-full cursor-pointer aspect-square"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              )}
              <div
                className="absolute bottom-0 right-0 p-1 scale-75 bg-[#52a5e4] hover:scale-[.8] transition-all ease-in-out rounded-full cursor-pointer aspect-square"
                onClick={handleProfileBtnEditClick}
              >
                <Pencil className="scale-90" />
              </div>
            </div>
            <div className="pb-2 sm:w-[18rem] my-auto overflow-hidden text-lg text-ellipsis text-wrap max-md:text-center text-start">
              <div className="text-black break-words">
                {userDetails.first_name} {userDetails.last_name}
              </div>
              <div className="text-gray-500 break-words">
                {userDetails.email}
              </div>
              {isProfileImageUpdated && (
                <div
                  className=" w-full mt-3 py-2 mx-auto text-base font-bold text-center bg-[#091433] cursor-pointer rounded-2xl duration-300 ease-in-out transition-all hover:bg-[#091433c4]"
                  onClick={handleSaveClick}
                >
                  Upload
                </div>
              )}
            </div>
          </div>
        </div>

        <WalletBalance />

        {/* Transaction Section */}
        <div className="p-5 text-[#091433] flex flex-col bg-white rounded-xl h-max space-y-4">
          <div className="text-2xl font-bold text-[#52a5e4]">Transactions</div>
          {/* <div className="space-y-8">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-2 p-4 bg-gray-50 rounded-xl"
              >
                <div className="text-lg font-medium break-words line-clamp-4">
                  Token: {transaction.token}
                </div>
                <div className="text-sm">{transaction.date}</div>
                <div
                  className={`text-${
                    transaction.type === "Credit" ? "green" : "red"
                  }-500`}
                >
                  {transaction.type}
                </div>
              </div>
            ))}
          </div> */}
          <NavLink
            to="/dashboard/wallet"
            className="w-full py-2 text-base font-bold text-center bg-[#091433] text-white cursor-pointer rounded-2xl duration-300 ease-in-out transition-all hover:bg-[#091433c4]"
          >
            See Transaction
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Settings;
