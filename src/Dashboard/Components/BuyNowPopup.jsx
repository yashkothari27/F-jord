import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BuyNowPopup() {
  // Header Token
  const userSession = JSON.parse(localStorage.getItem("userSession"));
  const token = userSession?.access;

  const navigate = useNavigate();
  // const pricePerUSD = 55.55;

  // Main values
  const [pricePerUSD, setPricePerUSD] = useState(0);
  const [isLoadingforPricePerUSD, setisLoadingforPricePerUSD] = useState(false);
  const MIN_TOKENS = 1388.75;
  const fees = 0;

  // Loading / Error Values
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showMinValueError, setShowMinValueError] = useState(false);
  const [isPaymentActive, setIsPaymentActive] = useState(false);

  // InitialTokenOptions Variables
  const initialTokenOptions = [
    { id: 1, amount: 50, price: (50 * pricePerUSD).toFixed(2) },
    { id: 2, amount: 100, price: (100 * pricePerUSD).toFixed(2) },
    { id: 3, amount: 250, price: (250 * pricePerUSD).toFixed(2) },
    { id: 4, amount: 500, price: (500 * pricePerUSD).toFixed(2) },
    { id: 5, amount: 1000, price: (1000 * pricePerUSD).toFixed(2) },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [customQuantity, setCustomQuantity] = useState(
    initialTokenOptions[selectedIndex].amount
  );

  // Currency or crypto
  const [convertedPrice, setConvertedPrice] = useState();
  const [selectedValue, setSelectedValue] = useState("USD");
  const [selectedType, setSelectedType] = useState("Currency");
  const [selectedCoinCode, setSelectedCoinCode] = useState("OSL");

  // Fetch PricePerUSD value
  useEffect(() => {
    const fetchOSLValue = async () => {
      try {
        setisLoadingforPricePerUSD(true);
        setIsLoading(true);
        setPricePerUSD(0);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/payment/osl-value/`,
          {}, // Empty request body as per your API specs
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.osl_value) {
          setPricePerUSD(parseFloat(response.data.osl_value));
          // Convert to number if necessary
        }
        // console.log(response);
      } catch (error) {
        // console.error("Error fetching OSL value:", error);
      } finally {
        setisLoadingforPricePerUSD(false);
        setIsLoading(false);
      }
    };

    const fetchISOValue = async () => {
      try {
        setisLoadingforPricePerUSD(true);
        setIsLoading(true);
        setPricePerUSD(0);

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/payment/iso-value/`,
          {}, // Empty request body as per your API specs
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.iso_value) {
          setPricePerUSD(parseFloat(response.data.iso_value));
          // Convert to number if necessary
        }
        // console.log(response);
      } catch (error) {
        // console.error("Error fetching OSL value:", error);
      } finally {
        setisLoadingforPricePerUSD(false);
        setIsLoading(false);
      }
    };

    if (selectedCoinCode === "OSL") {
      fetchOSLValue();
      // console.log("OSL if condition");
    } else {
      fetchISOValue();
      // console.log("ISO if condition");
    }
  }, [selectedCoinCode]);

  // Set the custom input if initialToken change
  useEffect(() => {
    if (initialTokenOptions[selectedIndex]) {
      setCustomQuantity(initialTokenOptions[selectedIndex].amount);
    }
  }, [selectedIndex]);

  // Set the active initialToken and set the custom input
  const handleSelect = (index) => {
    setSelectedIndex(index);
    setCustomQuantity(initialTokenOptions[index].amount);
  };

  // Increment handler
  const handleIncrement = () => {
    setCustomQuantity((prev) => {
      const prevQuantity = isNaN(parseFloat(prev)) ? 0 : parseFloat(prev);

      const newQuantity = prevQuantity + 1;
      if (newQuantity > 1000000) return prev;

      const updatedQuantity = newQuantity.toString();
      return updatedQuantity;
    });
  };

  // Decrement handler
  const handleDecrement = () => {
    setCustomQuantity((prev) => {
      const newQuantity = Math.max(25, parseFloat(prev) - 1);
      const updatedQuantity = newQuantity.toString();
      return updatedQuantity;
    });
  };

  // Custom input handler
  const handleCustomInputChange = (e) => {
    const inputValue = e.target.value;
    setCustomQuantity(inputValue);
  };

  // Effect hook to validate the value after it changes
  useEffect(() => {
    const inputQuantity = parseFloat(customQuantity);
    if (!isNaN(inputQuantity)) {
      const tokenValue = inputQuantity * pricePerUSD;
      if (tokenValue < MIN_TOKENS || isNaN(tokenValue)) {
        setShowMinValueError(true);
      } else {
        setShowMinValueError(false);
      }
    } else {
      setShowMinValueError(true);
    }
  }, [customQuantity, selectedValue, pricePerUSD]);

  const checkMinValueError = (tokenValue) => {
    if (tokenValue < MIN_TOKENS || isNaN(tokenValue)) {
      setShowMinValueError(true);
    } else {
      setShowMinValueError(false);
    }
  };

  const isCustomQuantityValid = initialTokenOptions.some(
    (option) => option.amount === customQuantity
  );

  // Calculate total price including fees based on selected value
  const totalPrice = customQuantity;
  const price = pricePerUSD;
  const totalPriceWithFees = (parseFloat(totalPrice) * price + fees).toFixed(4);

  const handleBuyTokens = async () => {
    checkMinValueError(customQuantity * pricePerUSD);

    if (!userSession) {
      toast.error("User session not found. Please log in.");
      return;
    }

    const walletCreation = userSession.user.is_wallet_created;
    if (!walletCreation) {
      toast.warning("You need to generate a wallet before buying tokens.");
      createWallet(token, userSession);
      return;
    }

    // console.log(paymentData);
    toast.info("Payment gateway has been initiated...");

    if (selectedType === "Currency") {
      const paymentData = {
        amount: customQuantity * 100,
        currency: "usd",
        // currency: selectedValue.toLowerCase(),
        rwa_token: customQuantity * price,
        email: userSession.user.email,
        name: `${userSession.user.first_name} ${userSession.user.last_name}`,
        customer_id: userSession.user.id,
        coin_code: selectedCoinCode,
      };
      try {
        setIsPaymentActive(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/payment/create_payment/`,
          paymentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          const newWindow = window.open(
            response.data.session_url,
            "_blank",
            "width=700,height=500,top=100,left=100"
          );
          const checkIfClosed = setInterval(() => {
            if (newWindow.closed) {
              clearInterval(checkIfClosed);
              toast.info("Check the transaction table");
              window.location.reload();
            }
          }, 500);
        } else {
          toast.error("Something went wrong. Please try again.", response);
        }
      } catch (error) {
        toast.error("Error processing payment. Please try again.");
        // console.error("Payment error:", error);
      }
    } else if (selectedType === "Crypto") {
      const paymentData = {
        amount: convertedPrice,
        currency: selectedValue.toLowerCase(),
        rwa_token: customQuantity * price,
        email: userSession.user.email,
        name: `${userSession.user.first_name} ${userSession.user.last_name}`,
        customer_id: userSession.user.id,
        coin_code: selectedCoinCode,
      };

      try {
        setIsPaymentActive(true);
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/payment/create_crypto_payment/`,
          paymentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(response);
        if (response.status === 200) {
          const newWindow = window.open(
            response.data.charge_url,
            "_blank",
            "width=700,height=500,top=100,left=100"
          );

          const checkIfClosed = setInterval(() => {
            if (newWindow.closed) {
              clearInterval(checkIfClosed);
              toast.info("Check the transaction table");
              window.location.reload();
            }
          }, 500);
        } else {
          toast.error("Something went wrong. Please try again.", response);
        }
      } catch (error) {
        toast.error("Error processing payment. Please try again.");
      }
    }
  };

  useEffect(() => {
    const convertIfCrypto = async () => {
      if (
        selectedType === "Crypto" &&
        customQuantity > 0 &&
        pricePerUSD !== 0
      ) {
        setConvertedPrice(null);
        const conversionResult = await convertToCrypto(
          (customQuantity * pricePerUSD).toFixed(4),
          selectedValue
        );
        if (conversionResult) {
          setConvertedPrice(conversionResult.crypto_value);
        }
      } else {
        setConvertedPrice(null);
      }
    };

    convertIfCrypto();
  }, [customQuantity, selectedType, pricePerUSD, selectedValue]);

  // Buying method and value selection (Currency or Crypto)
  const currencyOptions = ["USD"];
  const cryptoOptions = ["usdc", "btc", "sol", "xrp", "eth"];

  const handleSelectType = (type) => {
    // setCustomQuantity(0);
    setSelectedType(type);
    // checkMinValueError(0);
    setIsDropdownOpen(false);
    checkMinValueError((customQuantity * pricePerUSD).toFixed(4));

    if (type === "Currency") {
      setSelectedValue("USD");
    } else {
      setSelectedValue("usdc");
    }
  };

  const toggleCryptoDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectValue = (value) => {
    setSelectedValue(value);
    checkMinValueError(0);
    setIsDropdownOpen((prev) => !prev);
  };

  // Conversion API
  const convertToCrypto = async (tokenAmount, cryptoCode) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/usd_to_crypto/`,
        {
          token_amount: tokenAmount,
          crypto_code: cryptoCode,
          coin_code: selectedCoinCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error converting to crypto:");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  //wallet creation
  const createWallet = async (token, userSession) => {
    toast.info("wallet creation is processing...");
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/wallet/create/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Wallet created successfully!");
        userSession.user.is_wallet_created = true;
        localStorage.setItem("userSession", JSON.stringify(userSession));
        toast.success("wallet creation Success");
        window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("Failed to create wallet!");
      }
    } finally {
      window.location.reload();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-black rounded-lg ">
      {/* Header */}
      <div className="text-xl sm:text-2xl font-bold text-[#52a5e4]">
        Buy Tokens
      </div>

      {/* Token Options Section */}
      <section className="flex flex-col gap-3 p-3 bg-white border rounded-lg sm:p-4 border-neutral-200">
        <div className="text-sm font-semibold sm:text-base">
          Choose Token Value{" "}
        </div>
        <div className="flex flex-wrap justify-around gap-3 text-center text-slate-900 text-opacity-80">
          {initialTokenOptions.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleSelect(index)}
              className={`cursor-pointer px-3 py-2 rounded-md flex-1  transition-all ease-in-out duration-300 min-w-[100px] ${
                index === selectedIndex && isCustomQuantityValid
                  ? "bg-[#01021e] text-white"
                  : "bg-[#F7F7F7] text-[#05093E99]"
              } hover:bg-[#01021e] hover:text-white`}
            >
              {isLoadingforPricePerUSD ? (
                <div className="flex items-center justify-center">
                  {" "}
                  <div className="w-5 h-5 border-t-4 border-blue-500 rounded-full loader animate-spin"></div>
                </div>
              ) : (
                <>
                  <div className="text-sm font-medium">
                    Tokens : {(option.amount * pricePerUSD).toFixed(2)}
                  </div>
                  <div className="mt-1 text-sm font-semibold uppercase sm:text-base">
                    {/* {selectedValue} */}${option.amount}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col w-full gap-4 sm:flex-row">
        <div className="flex flex-col w-full gap-4 ">
          {/* Custom Quantity Input Section */}
          <section className="p-4 bg-white border rounded-lg border-neutral-200">
            <h2 className="mb-3 text-sm font-semibold sm:text-base">
              Custom Amount{" "}
              <span className="text-sm uppercase">
                {/* ({selectedValue}) */}
                (USD)
              </span>
            </h2>
            <div className="flex gap-4 text-sm">
              <button
                className="px-4 py-1 text-white hover:text-white hover:border-transparent hover:bg-[#091433] bg-[#318ac1] rounded-md"
                onClick={handleDecrement}
              >
                -
              </button>
              <input
                type="number"
                className="w-full px-4 py-1 text-base font-medium text-center border-2 border-black rounded-md sm:text-lg"
                value={customQuantity}
                onChange={handleCustomInputChange}
                min={MIN_TOKENS}
              />
              <button
                className="px-4 py-1 text-white hover:text-white hover:border-transparent hover:bg-[#091433] bg-[#318ac1] rounded-md"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            {showMinValueError && (
              <div className="mt-2 text-xs font-medium text-center text-red-500">
                Please enter an amount that should match or exceed {MIN_TOKENS}
                tokens.
                {/* {selectedType === "Crypto"
                  ? "Converted Minimum Amount should be greater than 25"
                  : "Minimum Amount is $25"} */}
              </div>
            )}
          </section>
          <section className="flex items-center justify-between p-4 bg-white border rounded-lg border-neutral-200">
            <h2 className="text-sm font-semibold sm:text-base">
              Coin Selection
              {/* <span className="text-sm uppercase">(USD)</span> */}
            </h2>
            <div className="flex gap-4">
              {["ISO", "OSL"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 text-sm sm:text-base rounded-md border hover:bg-[#318ac1] transition-all ease-in-out text-white duration-300 ${
                    selectedCoinCode === type
                      ? "bg-[#52a5e4]"
                      : "bg-neutral-200"
                  }`}
                  onClick={() => setSelectedCoinCode(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>
          {/* Buying Method Section */}
          <section className="p-4 bg-white border rounded-lg border-neutral-200">
            <h2 className="mb-3 text-sm font-semibold sm:text-base">
              Buying Method
            </h2>
            <div className="flex gap-4">
              {["Currency", "Crypto"].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 text-sm sm:text-base rounded-md border hover:bg-[#318ac1] transition-all ease-in-out text-white duration-300 ${
                    selectedType === type ? "bg-[#52a5e4]" : "bg-neutral-200"
                  }`}
                  onClick={() => handleSelectType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="relative text-sm sm:text-base ">
              <div
                className="flex items-center justify-between p-2 mt-3 uppercase border rounded-lg cursor-pointer border-stone-300"
                onClick={toggleCryptoDropdown}
              >
                <span>{selectedValue || `Select ${selectedType}`}</span>
                <span
                  className={`transform transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  // className={`transform transition-transform ${
                  //   selectedType === "Crypto" ? "rotate-180" : ""
                  // }`}
                >
                  ▼
                </span>
              </div>
              {isDropdownOpen && (
                //
                <div className="absolute z-50 w-full p-2 mt-1 bg-white border rounded-lg shadow-md">
                  {(selectedType === "Currency"
                    ? currencyOptions
                    : cryptoOptions
                  ).map((option, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleSelectValue(option);
                        // setCustomQuantity(0);
                      }}
                      className={`py-1 pl-2 mb-1 uppercase transition-colors ease-in-out rounded cursor-pointer hover:bg-gray-200 hover:text-black ${
                        selectedValue === option
                          ? "bg-[#52a5e4] text-white"
                          : ""
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
        <div className="flex flex-col w-full gap-4 text-sm sm:text-base">
          {/* Custom Quantity Input Section */}

          <section className="flex flex-col gap-3 p-3 bg-white border rounded-lg sm:p-4 border-neutral-200">
            <h2 className="text-sm font-semibold sm:text-base ">Payment</h2>
            <div className="flex justify-between rounded-md ">
              <span className="font-medium">Selected Coin</span>
              <span className="font-medium">
                {/* <span className="text-xs">(Tokens) </span> */}
                {selectedCoinCode}
              </span>
            </div>
            <div className="flex justify-between rounded-md ">
              <span className="font-medium">Tokens Per USD</span>
              <span className="font-medium">
                {/* <span className="text-xs">(Tokens) </span> */}
                {isLoadingforPricePerUSD ? (
                  <>
                    {" "}
                    <div className="w-6 h-6 border-t-4 border-blue-500 rounded-full loader animate-spin"></div>
                  </>
                ) : (
                  pricePerUSD.toFixed(4)
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">
                Total Tokens
                <span className="text-xs">
                  {" "}
                  {customQuantity > 0 ? (
                    <>
                      (
                      {pricePerUSD === 0 ||
                      pricePerUSD === null ||
                      pricePerUSD === undefined
                        ? "(crypto provider server down)"
                        : pricePerUSD.toFixed(4)}{" "}
                      x ${customQuantity})
                    </>
                  ) : (
                    ""
                  )}
                  {/* (1 {selectedValue} = {pricePerUSD}{" "}
                  tokens) */}
                  {/* {(pricePerUSD / customQuantity).toFixed(4)} x{" "}
                  {customQuantity}) */}
                </span>
              </span>
              <span
                className={` font-medium ${
                  (customQuantity * pricePerUSD).toFixed(4) < MIN_TOKENS
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                {(customQuantity * pricePerUSD).toFixed(4)}
              </span>
            </div>
            <div className="flex flex-col gap-2 p-2 font-medium rounded-md bg-slate-100">
              <div className="flex justify-between">
                <span className="font-medium">Buying Method</span>
                <span className="font-medium uppercase">{selectedValue}</span>
              </div>
              <div className="flex justify-between rounded-md ">
                <span className="">
                  {selectedType === "Currency" ? "Total" : "Selected"} Amount in
                  USD
                </span>
                <span className="uppercase ">
                  {/* {selectedValue}:{" "}
                {(
                  parseFloat(customQuantity) * pricePerUSD +
                  fees
                ).toFixed(4)} */}
                  {/* {selectedValue} */}
                  {customQuantity < 25 ? (
                    <span className="text-red-500">${customQuantity}</span>
                  ) : (
                    <>${customQuantity}</>
                  )}
                </span>
              </div>
              {selectedType === "Crypto" && (
                <div className="flex justify-between rounded-md ">
                  <span className="">
                    Converted Amount in{" "}
                    <span className="uppercase">{selectedValue}</span>
                  </span>
                  <span className="uppercase ">
                    {/* <span className="uppercase">{selectedValue} </span> */}
                    {isLoading ? (
                      <div className="w-6 h-6 border-t-4 border-blue-500 rounded-full loader animate-spin"></div>
                    ) : convertedPrice ? (
                      customQuantity < 25 ? (
                        <span className="text-red-500">{convertedPrice}</span>
                      ) : (
                        convertedPrice
                      )
                    ) : (
                      <span className="text-red-500">0</span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Payment Button Section */}
          <div className="text-base font-medium text-right">
            <button
              onClick={handleBuyTokens}
              disabled={showMinValueError || isLoading}
              className={`w-full py-2 font-semibold hover:text-white
hover:bg-[#091433] hover:border-transparent  text-white  bg-[#318ac1] rounded-lg ${
                showMinValueError || isLoading || isPaymentActive
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`} // Optional: Add styles to indicate it's disabled
            >
              Buy Tokens
            </button>
          </div>
        </div>
      </div>
      {showComingSoon && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-500 bg-opacity-75"
          onClick={() => setShowComingSoon(false)} // Close modal when clicking outside
        >
          <div
            className="p-6 bg-white rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <p className="text-xl text-center">
              Secured payment is Coming soon
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowComingSoon(false)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyNowPopup;
