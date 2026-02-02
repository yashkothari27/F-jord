import "./Header.css";
import xSVG from "/xSvg.svg";
import headerSVG from "/headerSvg.svg";
import { useState, useEffect } from "react";
import ScrollToTop from "../../../ScrollToTop";
import { useNavigate, NavLink, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  const handleLoginClick = (e) => {
    if (userSession) {
      // Prevent default navigation
      e.preventDefault();
      // Redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  };

  // For larger start
  const [isNavOpenLarger, setNavOpenLarger] = useState(true);
  const toggleNavLarger = () => setNavOpenLarger(!isNavOpenLarger);

  // For larger end

  // const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(true);
  const toggleNav = () => setNavOpen(!isNavOpen);
  const [isLaptopView, setIsLaptopView] = useState(window.innerWidth >= 1024);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      navigate("/");
    }, 600);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLaptopView(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Add or remove no-scroll class based on isNavOpen
    if (!isNavOpen && !isLaptopView) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup class on component unmount
    return () => document.body.classList.remove("no-scroll");
  }, [isNavOpen]);

  // top

  const [scrollDirection, setScrollDirection] = useState("up");
  const [bgColor, setBgColor] = useState("lg:bg-black/60");
  const [bgColor2, setBgColor2] = useState("pt-4 bg-black/60 md:pt-6");
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight / 2;
      const bgThreshold = 20;
      // Define halfway point

      if (window.scrollY >= bgThreshold) {
        setBgColor("lg:bg-black/80");
        setBgColor2("bg-black/80 md:pt-3 max-sm:-mt-20");
      } else {
        setBgColor("lg:bg-black/60");
        setBgColor2("bg-black/60 pt-4 md:pt-6");
      }

      // if (window.scrollY >= threshold) {
      //   if (window.scrollY > lastScrollY) {
      //     setScrollDirection("down");
      //   } else {
      //     setScrollDirection("up");
      //   }
      // }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <header
      //  id="kafer"
      >
        {/* <div
          data-aos="fade-down"
          data-aos-duration="600"
          className="headerRefer"
        >
          <NavLink to="signupVerification" className="">
            Signup and earn 10 Tokens!
          </NavLink>{" "}
        </div> */}
        <div
          className={`flex fixed w-full z-[8990] bottom-0 lg:top-0 left-0 lg:bottom-auto
         transition-all duration-1000 md:duration-500 ease-in-out ${bgColor} bg-black/80 backdrop-blur-sm `}
        >
          <div
            // data-aos={isLaptopView ? "fade-down" : "fade-down"}
            // data-aos-duration={isLaptopView ? "600" : "700"}
            // data-aos-anchor="#kafer"
            className={`headerBox ${!isNavOpen ? "open" : ""}`}
          >
            <div className="headerImg">
              <img
                src="/logo.svg"
                alt="logo"
                className="hover:shadow-[0_8px_30px_rgb(256,256,256,0.22)]"
                onClick={handleClick}
              />
              <div
                className=" flex lg:hidden left-/2 translatex-[-50%] duration-300 transition-all "
                // data-aos="fade-up"
                data-aos-anchor="#yaferUp"
                data-aos-duration="700"
              >
                <a href="mailto:post@fjord.estate">
                  <button className="px-8 text-black bg-white border-none max-md:py-2 md:px-12 hover:text-white hover:bg-black hover:border-none">
                    Join Waitlist!
                  </button>
                </a>{" "}
                {/* <Link to={`/marketplace`}>
                  <button className="px-8 text-black bg-white border-none max-md:py-2 md:px-12 hover:text-white hover:bg-black hover:border-none">
                    Explore
                  </button>
                </Link> */}
              </div>
              <div className="mobileNavDot">
                <img
                  onClick={toggleNav}
                  className={`headerRatata ${
                    isNavOpen ? "headerRatataataa" : ""
                  }`}
                  src={`${isNavOpen ? headerSVG : xSVG}`}
                  alt="headerSVG"
                />
              </div>
            </div>
            <img
              src="/headerTxt.svg"
              alt=""
              className={`absolute lg:flex hidden left-1/2 translate-x-[-50%] duration-300 transition-all ${
                !isNavOpenLarger ? "opacity-0" : "opacity-100"
              }`}
            />

            <div
              className={`headerItem ${
                (isLaptopView ? isNavOpenLarger : isNavOpen)
                  ? isLaptopView
                    ? "openLarger"
                    : "open"
                  : ""
              }`}
            >
              {/* <div className={`headerItem ${isNavOpen ? "open" : ""}`}> */}
              <nav>
                {/* <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[#52a5e4!important] activationer border-b-[#52a5e4!important]"
                        : "text-white"
                    }`
                  }
                  to="/staking"
                >
                  Staking
                </NavLink> */}
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[#52a5e4!important] activationer border-b-[#52a5e4!important]"
                        : "text-white"
                    }`
                  }
                  to="/aboutUs"
                >
                  About us
                </NavLink>
                {/* <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[#52a5e4!important] activationer border-b-[#52a5e4!important]"
                        : "text-white"
                    }`
                  }
                  to="/marketplace"
                >
                  View Property
                </NavLink> */}
                <NavLink
                  to="/rwa"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[#52a5e4!important] activationer border-b-[#52a5e4!important]"
                        : "text-white"
                    }`
                  }
                >
                  What is RWA
                </NavLink>
                {/* <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-[#52a5e4!important] activationer border-b-[#52a5e4!important]"
                        : "text-white"
                    }`
                  }
                >
                  Blogs
                </NavLink> */}
                <a
                  href="https://1ad0r0kvfjz.typeform.com/to/Vs5Off0C"
                  className=""
                >
                  List Property
                </a>

                <NavLink
                  to="/login"
                  onClick={handleLoginClick}
                  className={
                    ({ isActive }) =>
                      `blackBtn
                `
                    // ${
                    //     isActive
                    //       ? "text-[#52a5e4!important] activationer border-b-[#52a5e4!important]"
                    //       : "text-white"
                    //   }
                  }
                >
                  Login
                </NavLink>
                {/* <NavLink
                  to="/dashboard"
                  // onClick={handleLoginClick}
                  className={({ isActive }) => `blackBtn`}
                >
                  Buy Tokens
                </NavLink> */}
              </nav>
            </div>
            <img
              onClick={toggleNavLarger}
              className={`largerHeaderImg headerRatata ${
                isNavOpenLarger ? "headerRatataataa" : ""
              }`}
              src={`${isNavOpenLarger ? headerSVG : xSVG}`}
              alt="headerSVG"
            />
          </div>
        </div>
        <div
          className={`fixed w-full lg:hidden flex py-4 justify-center items-center ease-in-out duration-300 transition-all z-[8988] ${bgColor2} 
          `}
          //   ${
          //    scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
          //  }
        >
          <img
            src="/headerTxt.svg"
            alt=""
            className={` flex lg:hidden duration-300 transition-all  ${
              !isNavOpenLarger ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </header>
      <div className="pb-16"></div>
      <div
        className={`${!isNavOpen && !isLaptopView ? "no-scroll" : ""}`}
        onClick={toggleNav}
      ></div>
      <div
        className={`modalBackdrop ${isOpen ? "show" : ""}`}
        onClick={toggleModal}
      >
        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
          <span className="closeButton" onClick={toggleModal}>
            &times;
          </span>
          <h2>Coming Soon</h2>
        </div>
      </div>
    </>
  );
};

export default Header;
