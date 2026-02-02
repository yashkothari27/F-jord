import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nbc from "../../assets/SVG/nbc.svg";
import homeBg from "../../assets/Images/homeBgNew.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bg1 from "../../assets/Images/Home/Oslo.jpg";
import bg2 from "../../assets/Images/Home/Oslo2.jpg";
import bg3 from "../../assets/Images/Home/Oslo3.jpg";
import bg4 from "../../assets/Images/Home/Castle in Oslo.jpg";
import bg5 from "../../assets/Images/Home/Munch Museum.jpg";
import bg6 from "../../assets/Images/Home/Opera House.jpg";
import bg7 from "../../assets/Images/Home/Oslo Centrum.jpg";
import bg8 from "../../assets/Images/Home/Oslo pr night.jpg";
import bg9 from "../../assets/Images/Home/Vigelands Park.jpg";
import bg10 from "../../assets/Images/Home/Viking Museum.jpg";
import rent from "../../assets/Images/rent.png";
import nasdaq from "../../assets/SVG/nasdaq.svg";
import forbes from "../../assets/SVG/forbes.svg";
import businessIn from "../../assets/SVG/businessIn.svg";
import techCrunch from "../../assets/SVG/techCrunch.svg";
import businessjor from "../../assets/SVG/businessjor.svg";

const Home = () => {
  const brandData = [
    {
      name: "NBC",
      picture: nbc,
      aosSpeed: 300,
      aosDirection: "fade-up",
    },
    {
      name: "Business Insider",
      picture: businessIn,
      aosSpeed: 400,
      aosDirection: "fade-up",
    },
    {
      name: "Forbes",
      picture: forbes,
      aosSpeed: 500,
      aosDirection: "fade-up",
    },
    {
      name: "Business Journal",
      picture: businessjor,
      aosSpeed: 600,
      aosDirection: "fade-up",
    },
    {
      name: "Nasdaq",
      picture: nasdaq,
      aosSpeed: 700,
      aosDirection: "fade-up",
    },
    {
      name: "TechCrunch",
      picture: techCrunch,
      aosSpeed: 800,
      aosDirection: "fade-up",
    },
  ];

  const bgImages = [
    { image: bg5, text: "Munch Museum" },
    { image: bg8, text: "Oslo Nights" },
    { image: bg4, text: "Castle in Oslo" },
    { image: bg6, text: "Opera House" },
    { image: bg7, text: "Oslo Centrum" },
    { image: bg1, text: "Oslo" },
    { image: bg9, text: "Vigelands Park" },
    { image: bg2, text: "Oslo" },
    { image: bg10, text: "Viking Museum" },
    { image: bg3, text: "Oslo" },
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-slide logic
  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [autoSlide, bgImages.length]);

  // Resume auto-slide after 10 seconds
  useEffect(() => {
    if (!autoSlide) {
      const timeout = setTimeout(() => setAutoSlide(true), 10000);
      return () => clearTimeout(timeout);
    }
  }, [autoSlide]);

  const goToNext = () => {
    setCurrentBgIndex((prevIndex) =>
      prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
    );
    setAutoSlide(false);
  };

  const goToPrev = () => {
    setCurrentBgIndex((prevIndex) =>
      prevIndex === 0 ? bgImages.length - 1 : prevIndex - 1
    );
    setAutoSlide(false);
  };

  const toggleVideoModal = () => {
    setIsVideoOpen(!isVideoOpen);
    setIsLoading(true);
    if (!isVideoOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  };
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow on unmount
    };
  }, []);

  return (
    <>
      <section id="home" className="relative -mt-16 homeBox">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {bgImages.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentBgIndex ? "opacity-100 z-[1]" : "opacity-0 z-0"
              }`}
            >
              <img
                src={bg.image}
                alt={`bg-${index}`}
                className="object-cover w-full h-full"
              />

              {/* <div className="absolute pl-5 bottom-20 w-max left-10 max-lg:pb-5 lg:pl-14">
                <div className="p-[1.5px] rounded-lg bg-gradient-to-r from-[rgb(255,0,255)] to-[#ffff00] relative z-10 text-center gradientbackgroundHover">
                  <div className="flex justify-center items-center w-full h-full bg-[#01021e] rounded-lg overflow-visible">
                    <div className="p-5 text-white shimmer-bg ">
                      <h2 className="mb-2 text-xl font-semibold md:text-2xl">
                        Launching 20th July 2025
                      </h2>
                      <p className="mb-2 text-base font-medium leading-6">
                        Join the waitlist Today !
                      </p>

                      <a href="mailto:post@fjord.estate">
                        <button className="listPropertyBtn">Contact Us</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Text Overlay -hidden for now */}
              <div className="absolute inset-0 flex items-center justify-end bg-gradient-to-t from-black/60 via-black/60 to-transparent">
                {/* <div className="max-w-4xl px-6 py-4 text-center bgblack/40 backdropblur-sm rounded-xl">
                  <h2 className="text-2xl font-semibold text-white md:text-4xl drop-shadow-md">
                    {bg.text}
                  </h2>
                </div> */}
                <div
                  className="flex w-[85%] max-lg:mx-auto lg:mr-16 max-md:gap-10 lg:w-[55%] xl:w-[40%] lg:gap-5 xl:gap-10 gap-10 lg:mt-20 flex-col items-center justify-center"
                  id="yaferUp"
                  data-aos="fade-up"
                  data-aos-duration="700"
                >
                  {/* <span className="text-transparent">STEP INTO A</span> */}
                  <div className="text-[4rem] leading-[1] lg:leading-[1.05] md:text-[5rem] odosansBold lg:font-bold lg:text-[6rem]">
                    {/* {bg.text} */}
                    Welcome to the Open Economy
                  </div>
                  <div className=" md:w-[65%] lg:w-[70%] md:text-xl font-medium  mr-auto arizona">
                    At Fjord, we provide real-world asset (RWA) Real Estate
                    solutions to markets worldwide.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="absolute left-0 z-50 scale-75 md:left-14 bottom-7 md:scale-100 sm:bottom-14 ">
          <div className="p-[1.5px] rounded-lg bg-gradient-to-r from-[rgb(255,0,255)] to-[#ffff00] relative z-50 text-center gradientbackgroundHover">
            <div className="flex justify-center items-center w-full h-full bg-[#01021e] rounded-lg overflow-visible">
              <div className="p-5 text-white shimmer-bg ">
                <h2 className="mb-2 text-xl font-semibold ">
                  Launching 20th July 2025
                </h2>
                <p className="mb-3 text-base font-medium">
                  Join the Waitlist Today !
                </p>

                <a href="mailto:post@fjord.estate">
                  <button className="px-4 py-1 text-base listPropertyBtn">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div> */}
        {/* Prev / Next Buttons */}
        <div className="absolute z-10 flex items-center justify-between w-full px-0.5 pointer-events-none max-md-translate-y-[12%] inset-y-0 md:px-4">
          <button
            onClick={goToPrev}
            className="p-1 transition duration-300 rounded-full pointer-events-auto md:p-2 hover:bg-white/60 hover:text-black hover:scale-110 hover:translate-y-0 bg-white/30"
          >
            <ChevronLeft className="w-4 h-4 md:w-8 md:h-8" />
          </button>
          <button
            onClick={goToNext}
            className="p-1 transition duration-300 rounded-full pointer-events-auto md:p-2 hover:bg-white/60 hover:text-black hover:scale-110 hover:translate-y-0 bg-white/30"
          >
            <ChevronRight className="w-4 h-4 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Content Section */}

        {/* <img className="homeBackgroundVideo" src={homeBg} /> */}
        {/* <video className="homeBackgroundVideo" autoPlay loop muted playsInline>
          <source src="isonBG1080.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        {/* <div className="homeSpotLight"></div> */}

        <div className="flex items-center justify-center w-full h-full text-center max-mdhidden lg:items-end lg:justify-end flex-rw-reverse ">
          <div
            className="flex flex-col items-start justify-end w-full h-full "
            data-aos="fade-right"
            data-aos-duration="700"
          >
            {/* <Link to={`/marketplace`} className="pl-5 max-lg:pb-5 lg:pl-14">
              <button className="text-black bg-white border-none hover:text-white max-md:text-sm max-md:px-10 max-md:py-2 hover:bg-black hover:border-none">
                Explore
              </button>
            </Link> */}
            {/* <a
              href="mailto:post@fjord.estate"
              className="pl-5 max-lg:pb-5 lg:pl-14"
            >
              <button className="text-black bg-white border-none hover:text-white max-md:text-sm max-md:px-10 max-md:py-2 hover:bg-black hover:border-none">
                Contact Us
              </button>
            </a> */}
            <div className="hidden pl-8 sm:pl-14 max-lg:pb-5 max-lg:mb-5 lg:-mb-10 xl:mb-0 xl:pl-14 lg:pl-7">
              <div className="p-[1.5px] rounded-lg bg-gradient-to-r from-[rgb(255,0,255)] to-[#ffff00] relative z-10 text-center gradientbackgroundHover">
                <div className="flex justify-center items-center w-full h-full bg-[#01021e] rounded-lg overflow-visible">
                  <div className="p-5 text-white shimmer-bg ">
                    <h2 className="mb-2 text-xl font-semibold ">
                      Launching 20th July 2025
                    </h2>
                    <p className="mb-3 text-base font-medium">
                      Join the Waitlist Today !
                    </p>

                    <a href="mailto:post@fjord.estate">
                      <button className="px-4 py-1 text-base listPropertyBtn">
                        Contact Us
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div
            className="flex flex-col items-center justify-center w-[120%] h-full lg:justify-center "
            // data-aos="fade-up"
            // data-aos-duration="500"
          >
            <div
              id="yaferUp"
              className="flex flex-col leading-[2.5rem] items-center justify-center text-lg md:text-xl lg:text-lg font-medium lg:font-[300] tracking-widest "
              data-aos="fade-up"
              data-aos-duration="700"
            >
              STEP INTO A
              <div className="text-4xl font-bold lg:font-normal lg:text-5xl">
                NEW YORK <span className="font-bold">RWA</span>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div
            className="homeLHS"
            data-aos="fade-right"
            data-aos-duration="500"
          >
            <div
              className="homeHeading"
              data-aos="fade-right"
              data-aos-duration="600"
            >
              Oslofjord Marina Real Estate
            </div>
            <div
              id="yaferUp"
              className="homePara"
              data-aos="fade-right"
              data-aos-duration="700"
            >
              Discover Reltime, where Real World Asset (RWA) tokenisation
              enables you to own, trade, and manage fractions of premium
              properties globally. Secure, transparent, and accessible – real
              estate investment reimagined.
            </div>
            <div
              className="homeBtnBox"
              data-aos="fade-right"
              data-aos-anchor="#yaferUp"
              data-aos-duration="700"
            >
              <Link to={`/marketplace`}>
                <button>Learn More</button>
              </Link>
            </div>
          </div> */}
        {/* <div className="homeRHS" id="daferUp">
            <div
              className="homeColorLight1"
              data-aos="fade-left"
              data-aos-duration="300"
            ></div>
            <div
              className="homeColorLight2"
              data-aos="fade-left"
              data-aos-duration="400"
            ></div>
            <img
              src={rent}
              alt="rent"
              data-aos="fade-left"
              data-aos-duration="700"
            />
          </div> */}
        {/* <div className="homeMarq">
          <div className="homeMarquee-wrapper">
            {brandData.concat(brandData).map((card, index) => (
              <img
                key={index}
                src={card.picture}
                alt={card.name}
                data-aos={card.aosDirection}
                data-aos-anchor="#daferUp"
                data-aos-duration={card.aosSpeed}
              />
            ))}
          </div>
        </div> */}
        {/* <div className="homeLinerGradient"></div> */}
        {/* <div className="homeLinerGradientBlocker"></div> */}
      </section>

      {/* <div
        className={`videoBackdrop ${isVideoOpen ? "active" : ""}`}
        onClick={toggleVideoModal}
      >
        <div className="videoModalContent" onClick={(e) => e.stopPropagation()}>
          <span className="videoCloseButton" onClick={toggleVideoModal}>
            &times;
          </span>

          {isVideoOpen && (
            <div className="videoContainer">
              {isLoading && (
                <div className="spinner">
                  <div className="double-bounce1"></div>
                  <div className="double-bounce2"></div>
                </div>
              )}
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/5Y-W-7ZPHE4?autoplay=1&loop=1&playlist=5Y-W-7ZPHE4"
                title="YouTube video player"
                frameBorder="0"
                autoPlay
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div> */}
    </>
  );
};

export default Home;
