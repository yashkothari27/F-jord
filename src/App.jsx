import { useEffect, useState } from "react";

import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Link,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./LandingPage/Header/Header";
import Footer from "./LandingPage/Footer/Footer";
import Home from "./LandingPage/Home/Home";
import Faq from "./LandingPage/Faq/Faq";
import Learn from "./LandingPage/Learn/Learn";
import MarketPlace from "./LandingPage/MarketPlace/MarketPlace";
import ListProperty from "./LandingPage/ListProperty/ListProperty";
import StartBuilding from "./LandingPage/StartBuilding/StartBuilding";
import AboutUs from "./InnerPagesHome/AboutUs";
import Terms from "./InnerPagesHome/Terms";
import Policy from "./InnerPagesHome/Policy";
// import Facts from "./InnerPagesHome/Facts";
import FAQs from "./InnerPagesHome/FAQs";
import Bonus from "./InnerPagesHome/Bonus";
import LearnMore from "./InnerPagesHome/LearnMore";
import Dashboard from "./Dashboard/Dashboard";
import ContactUs from "./InnerPagesHome/ContactUs";
import LoginPage from "./Auth/Login";
import { toast } from "react-toastify";
import ProtectedRoute from "./Auth/ProtectedRoute";
import RwaTokens from "./InnerPagesHome/RwaTokens";
import NotFoundPage from "./NotFoundPage";
import ResetPsd from "./Auth/ResetPsd";
import AdminPanel from "./AdminPanel/AdminPanel";
import SignupVerification from "./Auth/SignupVerification";
import AdminProtected from "./AdminPanel/AdminProtected";
import ProjectInfo from "./InnerPage/Property/ProjectInfo";
import MarketInfo from "./InnerPage/MarketInfo/MarketInfo";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import Staking from "./InnerPage/Staking";
import BlogsOuter from "./InnerPage/Blogs/BlogsOuter";
import BlogsInner from "./InnerPage/Blogs/BlogsInner";
import Larry from "./LandingPage/Larry";
import DevloperPills from "./LandingPage/DeveloperPills";
import StatsSection from "./LandingPage/StatsSection";
import Disclaimer from "./InnerPagesHome/Disclaimer";
import Compliance from "./InnerPagesHome/Compliance";
import CookiePolicy from "./InnerPagesHome/CookiePolicy";

// const navigate = useNavigate();
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({});
  }, []);

  const checkSessionExpiration = () => {
    const sessionData = JSON.parse(localStorage.getItem("userSession"));
    if (sessionData) {
      const { sessionExpiryTime } = sessionData;
      if (Date.now() >= sessionExpiryTime) {
        localStorage.removeItem("userSession");
        toast.info("Your session has expired. Please log in again.");
      }
    }
  };

  useEffect(() => {
    checkSessionExpiration();
  }, []);

  const FloatingBtn = () => (
    <Link
      to="/dashboard"
      // onClick={() => navigate("/dashboard")} // Redirect to the dashboard on click
      className="fixed p-1 px-4 z-[112] overflow-hidden font-bold transition-all ease-in-out duration-500 rounded-xl text-white  hover:text-[#ff591c] border-[3px] border-transparent hover:border-[#ff591c] hover:bg-white cursor-pointer bottom-10 right-5 text-sm shadow-[0px_0px_45px_6px_rgba(255,255,255,.3)] hover:shadow-[0px_0px_35px_8px_rgba(256,89,28,.2)] translate-y-0 hover:-translate-y-1 gradient-background
        flex sm:text-3xl items-center max-w-[300px]
        "
    >
      <span className=" text whitespace-nowrap">Buy Tokens</span>
    </Link>
    // <Link
    //   to="/dashboard"
    //   // onClick={() => navigate("/dashboard")} // Redirect to the dashboard on click
    //   className="fixed p-1 z-[112] overflow-hidden font-bold transition-all ease-in-out duration-500 text-white  hover:text-[#ff591c] border-[3px] border-transparent hover:border-[#ff591c] hover:bg-white rounded-full  cursor-pointer bottom-10 right-5 shadow-[0px_0px_45px_6px_rgba(255,255,255,1)] hover:shadow-[0px_0px_35px_8px_rgba(256,89,28,.5)] translate-y-0 hover:-translate-y-1 gradient-background
    //     flex text-3xl items-center  h-14 max-w-14 hover:max-w-[300px]
    //     "
    // >
    //   <span className="pl-[.7rem] mr-4 text-4xl">$</span>
    //   <span className="pr-3 text whitespace-nowrap">Buy Tokens</span>
    // </Link>
  );

  // useEffect(() => {
  //   const handleLoad = () => {
  //     // Add a delay of 1 second before hiding the loading screen
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000); // 1000ms = 1 second
  //   };

  //   if (document.readyState === "complete") {
  //     // If the document is already loaded, call the handler immediately
  //     handleLoad();
  //   } else {
  //     // Otherwise, wait for the window load event
  //     window.addEventListener("load", handleLoad);
  //   }

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener("load", handleLoad);
  //   };
  // }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  // Layout for pages with header and footer
  const MainLayout = () => (
    <div>
      <div className="">
        <Header />
      </div>
      <Outlet />
      {/* <FloatingBtn /> */}
      <Footer />
    </div>
  );

  // const RwaMarketplaceCard = () => {
  //   return (
  //     <div
  //       className="lg:w-[420px]  md:hidden w-[300px] my-20 mx-auto h-max p-[1.5px] rounded-lg bg-gradient-to-r from-[rgb(255,0,255)] to-[#ffff00] relative z-10 text-center gradientbackgroundHover"
  //       data-aos="zoom-in-up"
  //       data-aos-duration="700"
  //     >
  //       {/* <div className="w-[40%] mx-auto h-max p-0.5 rounded-xl bg-gradient-to-r from-[#41a0ff] to-[#0ef7f3] relative z-10 text-center animate-gradient-run bg-[length:200%_200%]"> */}
  //       <div className="absolute top-[0px] left-0 right-0 z-[-1] h-full w-full transform scale-[.92] gradientbackgroundHover blur-[34.5px] bg-gradient-to-r from-[#13b37f] to-[#52a5e4] transition-opacity duration-500"></div>
  //       <div className="flex justify-center items-center w-full h-full bg-[#01021e] rounded-lg overflow-visible">
  //         <div className="p-6 text-white shimmer-bg ">
  //           <h2 className="mb-4 text-xl font-bold md:text-2xl">
  //             Launching 20th July 2025
  //           </h2>
  //           <p className="mb-4 text-base font-medium leading-6">
  //             Join the Waitlist Today !
  //             <a
  //               href="mailto:post@fjord.estate"
  //               className="text-[#52a5e4] underline hover:text-blue-400 transition-colors duration-300"
  //             >
  //               post@fjord.estate
  //             </a>
  //           </p>

  //           <a href="mailto:post@fjord.estate">
  //             <button className="listPropertyBtn">Contact Us</button>
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Component for homepage layout
  const HomePage = () => (
    <div style={{ overflow: "hidden" }}>
      <div className="">
        <Header />
      </div>
      <Home />
      {/* <RwaMarketplaceCard /> */}
      <StatsSection />
      {/* <DevloperPills /> */}
      <Larry />
      <ListProperty />
      <Learn />
      <MarketPlace />
      <StartBuilding />
      {/* <Faq /> */}
      <Footer />
      {/* <FloatingBtn /> */}
    </div>
  );

  // Configure routes
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/aboutUs", element: <AboutUs /> },
        { path: "/learnMore", element: <LearnMore /> },
        { path: "/terms&Conditions", element: <Terms /> },
        { path: "/disclaimer", element: <Disclaimer /> },
        { path: "/compliance", element: <Compliance /> },
        { path: "/cookiePolicy", element: <CookiePolicy /> },
        // { path: "/facts", element: <Facts /> },
        // { path: "/fjord", element: <Bonus /> },
        // { path: "/faqs", element: <FAQs /> },
        { path: "/policy", element: <Policy /> },
        // { path: "/details", element: <MarketPage /> }, NOOO
        // { path: "/details", element: <ProjectInfo /> },
        { path: "/market/:projectTitle", element: <ProjectInfo /> },

        { path: "/rwa", element: <RwaTokens /> },
        { path: "/contactus", element: <ContactUs /> },
        // { path: "/blogs", element: <BlogsOuter /> },
        // { path: "/blog/:slug", element: <BlogsInner /> },
      ],
    },
    {
      path: "/marketplace",
      element: <MarketInfo />,
    },

    // {
    //   path: "/staking",
    //   element: <Staking />,
    // },
    {
      path: "/adminpanel/*",
      element: <AdminProtected element={<AdminPanel />} />,
    },
    {
      path: "/dashboard/*",
      element: <ProtectedRoute element={<Dashboard />} />,
    },

    { path: "/signupVerification", element: <SignupVerification /> },
    { path: "/resetPassword", element: <ResetPsd /> },
    {
      path: "/login",
      element: <LoginPage />,
      // element: userSession ? <Navigate to="/dashboard" /> : <LoginPage />,
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
