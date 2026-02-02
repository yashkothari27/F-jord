import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // ADD THIS AT THE TOP

import { useNavigate, NavLink, Link } from "react-router-dom";

const MarketInfoHeader = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  const handleLoginClick = (e) => {
    if (userSession) {
      // Prevent default navigation
      e.preventDefault();
      // Redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  };

  function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const updateScrollDirection = () => {
        const scrollY = window.scrollY;
        const direction = scrollY > lastScrollY ? "down" : "up";
        if (
          direction !== scrollDirection &&
          Math.abs(scrollY - lastScrollY) > 5
        ) {
          setScrollDirection(direction);
        }
        setLastScrollY(scrollY > 0 ? scrollY : 0);
      };

      window.addEventListener("scroll", updateScrollDirection);
      return () => window.removeEventListener("scroll", updateScrollDirection);
    }, [scrollDirection, lastScrollY]);

    return scrollDirection;
  }

  const scrollDirection = useScrollDirection();

  //

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchInput(newSearch);
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      if (newSearch) {
        updatedParams.set("search", newSearch);
      } else {
        updatedParams.delete("search");
      }
      return updatedParams;
    });
  };

  //   useEffect(() => {
  //     if (isOpen) {
  //       document.body.style.overflow = "hidden";
  //     } else {
  //       document.body.style.overflow = "";
  //     }
  //   }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute md:hidden rounded-4xl transition-all duration-[700ms] z-[12] backdrop-blur-2xl h-screen w-screen bg-white/10  ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {/*  */}
      <header
        className={`max-md:fixed md:absolute left-0 w-full  z-50 text-lg transition-all duration-500 md:duration-700 ease-in-out
     max-md:bg-light md:bg-default backdrop-blur-sm shadow-md 
      max-md:bottom-0 max-md:top-auto max-md:rounded-t-3xl 
      md:top-0 md:bottom-auto
      ${scrollDirection === "down" ? "-translat-y-full" : "translat-y-0"}
      ${isOpen ? "max-md:max-h-screen" : "max-md:max-h-[5rem]"}
    `}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 max-lg:gap-3">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center gap-2">
                <img
                  className="xl:h-9 p-.5 lg:h-8 md:h-7 max-md:h-6 w-auto"
                  src="/logo.svg"
                  alt="FJORD"
                />
                {/* <span className="text-2xl text-white uppercase xl:text-4xl">
                FJORD
              </span> */}
              </a>
            </div>

            <div className="relative flex md:w-[80%] lg:w-[60%] flex-col items-center max-md:justify-center md:justify-between h-16 overflow-hidden gap-2 transition-all duration-500 ease-in-out md:gap-2">
              {/* Search bar with slide animation */}
              <div
                className={`w-full md:w-[80%] transition-all duration-500 ease-in-out transform ${
                  !isOpen
                    ? "md:translate-y-2 opacity-100 max-h-16"
                    : "md:-translate-y-20 opacity-0 md:scale-[.5] md:max-h-0"
                }`}
              >
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white pointer-events-none">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search . . ."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full py-2 pl-10 pr-4 text-white bg-black border border-white max-md:text-sm rounded-3xl focus:outline-none placeholder:text-white"
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav
                className={`items-center  hidden space-x-12 md:flex transition-all duration-500 ease-in-out transform ${
                  isOpen
                    ? "md:-translate-y-2 opacity-100 max-h-16"
                    : "md:-translate-y-24 opacity-0 md:scale-[.5] md:max-h-0"
                }`}
              >
                <NavLink
                  to="/aboutUs"
                  className="text-white transition-colors duration-300 ease-in-out hover:text-accent"
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/rwa"
                  className="text-white transition-colors duration-300 ease-in-out hover:text-accent"
                >
                  What is RWA
                </NavLink>
                <a
                  href="https://1ad0r0kvfjz.typeform.com/to/Vs5Off0C"
                  className="text-white transition-colors duration-300 ease-in-out hover:text-accent"
                >
                  Become an Affiliate
                </a>

                <NavLink
                  to="/login"
                  onClick={handleLoginClick}
                  className="inline-flex items-center px-4 py-2 ml-4 text-lg font-semibold text-white transition-colors duration-300 ease-in-out bg-transparent border rounded-full shadow-2xl border-white/60 hover:shadow-2xs hover:bg-white/20"
                >
                  Login
                </NavLink>
              </nav>
            </div>
            {/* Mobile Menu Button */}
            <div className="mdhidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 text-white ease-in-out rounded-full hover:text-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent focus:text-accent focus:bg-default"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                {!isOpen ? (
                  <svg
                    className="block w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden bg-white/20 shadow-2xl w-[90%] mx-auto transform origin-top overflow-hidden transition-all rounded-4xl relative rounded-3xl duration-[700ms] ease-in-out z-[50] ${
            isOpen ? "max-h-screen opacity-100 pt-4 mb-7" : "max-h-0 opacity-0"
          }`}
          id="mobile-menu"
        >
          <nav className="flex flex-col items-center px-4 pb-6 space-y-2">
            <NavLink
              to="/aboutUs"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-lg text-white ease-in-out rounded-md hover:text-accent"
            >
              About Us
            </NavLink>
            <NavLink
              to="/rwa"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-lg text-white transition-colors duration-300 ease-in-out rounded-md hover:text-accent"
            >
              What is RWA
            </NavLink>
            <a
              onClick={() => setIsOpen(false)}
              href="https://1ad0r0kvfjz.typeform.com/to/Vs5Off0C"
              className="block px-3 py-2 text-lg text-white transition-colors duration-300 ease-in-out rounded-md hover:text-accent"
            >
              Become an Affiliate
            </a>

            <NavLink
              to="/login"
              onClick={handleLoginClick}
              className="block w-full px-4 py-2 text-lg font-medium text-center text-white border border-transparent rounded-md bg-accent hover:bg-default"
            >
              Login
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default MarketInfoHeader;
