import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const KYCPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    idNumber: "",
    address: "",
    document: null,
    dateOfBirth: "",
    isConfirmed: false,
  });

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    const isKYCSubmitted = userSession?.user?.is_kyc_submitted;
    const isKYCVerified = userSession?.user?.is_kyc_verified;

    if (isKYCVerified) {
      setCurrentStep(3); // Go to the verified step if KYC is already verified
    } else if (isKYCSubmitted) {
      setCurrentStep(2); // Go to the submitted step if KYC is already submitted
    }
  }, []);

  useEffect(() => {
    const uniqueId = `KYC-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID
    setFormData((prevData) => ({ ...prevData, idNumber: uniqueId }));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({ ...prevData, isConfirmed: e.target.checked }));
  };

  // Show a Toastify error if any required field is missing
  const showError = (message) => {
    toast.error(message);
  };

  // Validate form data for Step 1
  const validateStep1 = () => {
    const { idNumber, address, document, dateOfBirth, isConfirmed } = formData;
    if (!idNumber) return showError("ID Number is required.");
    if (!address) return showError("Address is required.");
    if (!document) return showError("Document file is required.");
    if (!dateOfBirth) return showError("Date of Birth is required.");
    if (!isConfirmed)
      return showError("You must confirm that your documents are valid.");
    if (!validateFile(document, "document")) return false;
    return true;
  };

  // Validate file type for document and profile image
  const validateFile = (file, type) => {
    const allowedTypes =
      type === "image"
        ? ["image/jpeg", "image/png", "image/jpg"]
        : ["application/pdf"];
    if (file && !allowedTypes.includes(file.type)) {
      showError(
        type === "image"
          ? "Please upload a valid image file."
          : "Please upload a PDF document."
      );
      return false;
    }
    return true;
  };

  // Handle form submission and API call
  const handleSubmit = async () => {
    // e.preventDefault();
    if (currentStep === 1 && validateStep1()) {
      const userSession = JSON.parse(localStorage.getItem("userSession"));
      const token = userSession?.access;

      const formDataToSend = new FormData();
      formDataToSend.append("id_number", formData.idNumber);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("document", formData.document);
      formDataToSend.append("date_of_birth", formData.dateOfBirth);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/kyc/`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);

        if (response.status === 201) {
          toast.success(response.data.message || "KYC Submitted Successfully!");
          const userSession = JSON.parse(localStorage.getItem("userSession"));
          if (userSession && userSession.user) {
            userSession.user.is_kyc_submitted = true;
            localStorage.setItem("userSession", JSON.stringify(userSession));
          }
          setCurrentStep(2);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error submitting KYC. Please try again.");
      }
    }
  };

  // // Preview image
  // const previewImage = (file) => {
  //   return URL.createObjectURL(file);
  // };

  return (
    <div className="flex items-center justify-center min-h-[95vh] text-black bg-gray-100 customKYCAuto">
      <div className="w-full p-8 py-6 bg-white shadow-lg max-sm:m-3 sm:max-w-2xl lg:max-w-3xl md:max-w-xl rounded-xl">
        <div className="text-2xl sm:text-3xl mb-4 border-2 bg-[#52a5e413] border-[#52a5e4] w-max mx-auto px-12 py-1 rounded-full text-center font-bold text-[#52a5e4]">
          KYC
        </div>
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex justify-between w-full mb-4">
            <div
              className={`sm:text-xl font-semibold ${
                currentStep >= 1 ? "text-[#52a5e4]" : "text-gray-500"
              }`}
            >
              Step 1
            </div>
            <div
              className={`sm:text-xl font-semibold ${
                currentStep >= 2 ? "text-[#52a5e4]" : "text-gray-500"
              }`}
            >
              Step 2
            </div>
            <div
              className={`sm:text-xl font-semibold ${
                currentStep >= 3 ? "text-[#52a5e4]" : "text-gray-500"
              }`}
            >
              Step 3
            </div>
          </div>
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className={`h-full bg-[#52a5e4] rounded-full`}
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div>
            <h2 className="mb-2 text-xl font-semibold text-center sm:text-2xl">
              Upload a proof of your identity
            </h2>
            <form className="space-y-3">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium">
                    ID Number <span className="text-xs">(Auto generated)</span>
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 text-black bg-gray-100 border rounded outline-none pointer-events-none"
                    required
                    readOnly // Make it non-editable
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className="w-full p-2 text-black border rounded"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 text-black border rounded"
                  required
                />
              </div>

              <div className="grid h-full gap-5 ">
                {" "}
                <div className="h-full ">
                  <label className="block mr-auto font-medium">
                    Document (PDF only)
                  </label>
                  <div className="flex flex-col items-center justify-center gap-3 p-2 bg-gray-100 border border-gray-400 border-dashed rounded max-h-44 h-44 customPDF">
                    {formData.document && (
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          Uploaded Document: {formData.document.name}
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="application/pdf"
                      name="document"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          document: e.target.files[0],
                        })
                      }
                      className="w-full text-black"
                      required
                    />
                  </div>
                </div>
                {/* <div className="h-full ">
                  <label className="block mr-auto font-medium">
                    Profile Image
                  </label>
                  <div className="relative flex flex-col items-center justify-center gap-3 p-2 bg-gray-100 border border-gray-400 border-dashed rounded flex-ol max-h-44 h-44">
                    {formData.profileImage && (
                      <div className="">
                        <img
                          src={previewImage(formData.profileImage)}
                          alt="Profile Preview"
                          className="object-cover h-40 border rounded"
                        />
                      </div>
                    )}
                    {!formData.profileImage && (
                      <div className="w-[50%] customPDF">
                        <input
                          type="file"
                          accept="image/*"
                          name="profileImage"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              profileImage: e.target.files[0],
                            })
                          }
                          className="w-full text-black "
                          required
                        />
                      </div>
                    )}
                    {formData.profileImage && (
                      <div className="absolute flex items-center justify-center p-2 transition-all ease-in-out scale-95 bg-white border-2 border-[#52a5e4] rounded-full right-1 hover:scale-105 bottom-1">
                        <input
                          type="file"
                          accept="image/*"
                          name="profileImage"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              profileImage: e.target.files[0],
                            })
                          }
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor="profileImage"
                          className="cursor-pointer"
                        >
                          <Edit size={24} className="text-[#52a5e4]" />{" "}
                        </label>
                      </div>
                    )}
                  </div>
                </div> */}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isConfirmed}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-[#52a5e4]"
                  required
                />
                <span>
                  I confirm that my documents are valid and up to date.
                </span>
              </div>

              <div
                onClick={handleSubmit}
                className="w-full py-2 text-center text-white cursor-pointer transition-all ease-in-out bg-[#091433]  hover:bg-[#091433c4] rounded "
              >
                {currentStep === 1 ? "Next Step" : "Submit"}
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center ">
            <h2 className="mb-3 text-xl sm:mb-6 sm:text-3xl">
              Reviewing Your Documents
            </h2>
            <div className="mb-3 text-sm sm:mb-6 sm:text-base">
              <p>We will notify you once your documents are verified.</p>
            </div>
            <div className="sm:text-3xl mb-4 border-2 bg-[#f9e79f8a] border-[#f39c12] w-max mx-auto px-2 sm:px-12 py-1 rounded-full text-center font-bold text-[#f39c12]">
              VERIFICATION IN PROGRESS
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Your KYC is Approved!
            </h2>
            <p className="mb-4">Thank you for submitting your KYC details.</p>
            <div className="px-2 py-1 mx-auto mb-4 font-bold text-center text-green-500 bg-green-100 border-2 border-green-500 rounded-full sm:text-3xl w-max sm:px-12">
              CONGRATS!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCPage;
