import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // import this at top

import {
  Home,
  CircleDollarSign,
  BriefcaseBusiness,
  Building,
  House,
  UsersRound,
  UserCheck,
  RefreshCw,
  SearchX,
} from "lucide-react";

import { Link } from "react-router-dom";

import ap2 from "../../assets/Images/MarketPlace/OtherApartment/2ndApartment.jpg";
import ap3 from "../../assets/Images/MarketPlace/OtherApartment/3rdApartment.jpg";
import ap4 from "../../assets/Images/MarketPlace/OtherApartment/4thApartment.jpg";
import ap5 from "../../assets/Images/MarketPlace/OtherApartment/5thApartment.jpg";
import ap6 from "../../assets/Images/MarketPlace/OtherApartment/6thApartment.jpg";
import ap7 from "../../assets/Images/MarketPlace/OtherApartment/7thApartment.jpg";
import ap8 from "../../assets/Images/MarketPlace/OtherApartment/8thApartment.jpg";
import ap9 from "../../assets/Images/MarketPlace/OtherApartment/9thApartment.jpg";
import ap10 from "../../assets/Images/MarketPlace/OtherApartment/10thApartment.jpg";
import ap11 from "../../assets/Images/MarketPlace/OtherApartment/11thApartment.jpg";
import ap12 from "../../assets/Images/MarketPlace/OtherApartment/12thApartment.jpg";
import ap13 from "../../assets/Images/MarketPlace/OtherApartment/13thApartment.jpg";
import ap14 from "../../assets/Images/MarketPlace/OtherApartment/14thApartment.jpg";
import ap15 from "../../assets/Images/MarketPlace/OtherApartment/15thApartment.jpg";
import ap16 from "../../assets/Images/MarketPlace/OtherApartment/16thApartment.jpg";
import ap17 from "../../assets/Images/MarketPlace/OtherApartment/17thApartment.jpg";

import ScrollToTop from "../../../ScrollToTop";
import MarketInfoHeader from "./MarketInfoHeader";
import Footer from "../../LandingPage/Footer/Footer";
import apartmentList from "../../assets/Data/Apartment.json";

const tabs = [
  { label: "All Data", icon: Home },
  { label: "Cash Flowing", icon: CircleDollarSign },
  { label: "Vacation Rentals", icon: BriefcaseBusiness },
  { label: "Commercial", icon: Building },
  { label: "Single Family", icon: House },
  { label: "Multi Family", icon: UsersRound },
  { label: "Owner Occupied", icon: UserCheck },
  { label: "Seller Buyback", icon: RefreshCw },
];

// const apartmentList = [
//   {
//     id: 1,
//     title: "Neuberggata 31, Majorstuen, Oslo. 5 floor Norway",
//     location: "Oslo, Norway",
//     token: 5525,
//     tokenPrice: 49,
//     annualReturn: "15.0%",
//     rentalYeild: "15.2%",
//     category: "Single Family",
//     market: "Oslo",
//     image: ap1,
//     featureTag: "New Listing",
//   },
//   {
//     id: 2,
//     title: "Luxury Villa in Bergen",
//     location: "Bergen, Norway",
//     token: 5525,
//     tokenPrice: 49,
//     annualReturn: "15.0%",
//     rentalYeild: "15.2%",
//     category: "Vacation Rentals",
//     market: "Bergen",
//     image: ap2,
//     featureTag: "Featured",
//   },
//   {
//     id: 3,
//     title: "Scandinavian Loft in Trondheim",
//     location: "Trondheim, Norway",
//     token: 4525,
//     tokenPrice: 29,
//     annualReturn: "10.0%",
//     rentalYeild: "12.2%",
//     category: "Cash Flowing",
//     market: "Trondheim",
//     image: ap3,
//     featureTag: "Hot",
//   },
//   {
//     id: 4,
//     title: "Office Space in Oslo Center",
//     location: "Oslo, Norway",
//     token: 8523,
//     tokenPrice: 45,
//     annualReturn: "10.0%",
//     rentalYeild: "10,0%",
//     category: "Commercial",
//     market: "Oslo",
//     image: ap4,
//     featureTag: "New",
//   },
//   {
//     id: 5,
//     title: "Townhouse in Stavanger",
//     location: "Stavanger, Norway",
//     token: 3422,
//     tokenPrice: 27,
//     annualReturn: "7.0%",
//     rentalYeild: "9.2%",
//     category: "Owner Occupied",
//     market: "Stavanger",
//     image: ap5,
//   },
//   {
//     id: 6,
//     title: "Seaside Home in Kristiansand",
//     location: "Kristiansand, Norway",
//     token: 6325,
//     tokenPrice: 75,
//     annualReturn: "12.0%",
//     rentalYeild: "17.2%",
//     category: "Seller Buyback",
//     market: "Kristiansand",
//     image: ap6,
//     featureTag: "Exclusive",
//   },
//   {
//     id: 7,
//     title: "Modern Flat in Tromsø City Center",
//     location: "Tromsø, Norway",
//     token: 3980,
//     tokenPrice: 33,
//     annualReturn: "8.5%",
//     rentalYeild: "10.1%",
//     category: "Single Family",
//     market: "Tromsø",
//     image: ap7,
//     featureTag: "New Listing",
//   },
//   {
//     id: 8,
//     title: "Cozy Cabin in Lofoten Islands",
//     location: "Lofoten, Norway",
//     token: 2750,
//     tokenPrice: 22,
//     annualReturn: "6.8%",
//     rentalYeild: "8.0%",
//     category: "Vacation Rentals",
//     market: "Lofoten",
//     image: ap8,
//     featureTag: "Scenic",
//   },
//   {
//     id: 9,
//     title: "Contemporary Duplex in Drammen",
//     location: "Drammen, Norway",
//     token: 4433,
//     tokenPrice: 38,
//     annualReturn: "9.2%",
//     rentalYeild: "11.0%",
//     category: "Multi Family",
//     market: "Drammen",
//     image: ap9,
//     featureTag: "Trending",
//   },
//   {
//     id: 10,
//     title: "Downtown Studio in Ålesund",
//     location: "Ålesund, Norway",
//     token: 2250,
//     tokenPrice: 20,
//     annualReturn: "5.5%",
//     rentalYeild: "7.5%",
//     category: "Cash Flowing",
//     market: "Ålesund",
//     image: ap10,
//   },
//   {
//     id: 11,
//     title: "Retail Unit in Sandnes High Street",
//     location: "Sandnes, Norway",
//     token: 6890,
//     tokenPrice: 52,
//     annualReturn: "11.5%",
//     rentalYeild: "14.0%",
//     category: "Commercial",
//     market: "Sandnes",
//     image: ap11,
//     featureTag: "Premium",
//   },
//   {
//     id: 12,
//     title: "Riverside Home in Lillehammer",
//     location: "Lillehammer, Norway",
//     token: 3660,
//     tokenPrice: 30,
//     annualReturn: "8.0%",
//     rentalYeild: "9.8%",
//     category: "Owner Occupied",
//     market: "Lillehammer",
//     image: ap12,
//   },
//   {
//     id: 13,
//     title: "Lakeview Chalet in Øyer",
//     location: "Øyer, Norway",
//     token: 3000,
//     tokenPrice: 28,
//     annualReturn: "7.5%",
//     rentalYeild: "8.9%",
//     category: "Vacation Rentals",
//     market: "Øyer",
//     image: ap13,
//     featureTag: "Lakefront",
//   },
//   {
//     id: 14,
//     title: "Urban Apartment in Skien",
//     location: "Skien, Norway",
//     token: 4100,
//     tokenPrice: 36,
//     annualReturn: "9.0%",
//     rentalYeild: "10.5%",
//     category: "Single Family",
//     market: "Skien",
//     image: ap14,
//   },
//   {
//     id: 15,
//     title: "Historic Mansion in Fredrikstad",
//     location: "Fredrikstad, Norway",
//     token: 8700,
//     tokenPrice: 80,
//     annualReturn: "13.0%",
//     rentalYeild: "16.0%",
//     category: "Seller Buyback",
//     market: "Fredrikstad",
//     image: ap15,
//     featureTag: "Heritage",
//   },
//   {
//     id: 16,
//     title: "Eco-Friendly Smart Home in Halden",
//     location: "Halden, Norway",
//     token: 5200,
//     tokenPrice: 42,
//     annualReturn: "10.8%",
//     rentalYeild: "13.5%",
//     category: "Single Family",
//     market: "Halden",
//     image: ap16,
//     featureTag: "Eco Smart",
//   },
// ];

const uniqueMarkets = [
  "All Markets",
  ...new Set(apartmentList.map((p) => p.market)),
];

const tagColors = {
  "New Listing": "bg-green-500 text-white",
  Featured: "bg-purple-500 text-white",
  New: "bg-blue-500 text-white",
  Exclusive: "bg-yellow-400 text-gray-900",
};

const MarketInfo = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const [selectedTab, setSelectedTab] = useState("All Data");
  const [selectedMarket, setSelectedMarket] = useState("All Markets");

  const filteredProperties = apartmentList.filter((property) => {
    const marketMatch =
      selectedMarket === "All Markets" || property.market === selectedMarket;
    const categoryMatch =
      selectedTab === "All Data" || property.category === selectedTab;
    const searchMatch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return marketMatch && categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen text-white md:pt-20 bg-default">
      <ScrollToTop />
      {/* <MarketInfoHeader /> */}
      <MarketInfoHeader />
      {/* Filters */}
      <div className="sticky top-0 z-10 flex gap-4 px-5 py-1 mx-auto mb-10 md:gap-8 md:py-2 bg-light md:px-10 xl:px-20 md:items-center">
        <div className="p-1 md:p-2 border-2 border-white/50 rounded-xl bg-light transition focus-within:border-white min-w-[8rem] h-max max-md:m-auto md:flex-shrink-0">
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="w-full p-2 text-white outline-none cursor-pointer bg-inherit md:w-auto"
          >
            {uniqueMarkets.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar flex-nowrap">
          {tabs.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setSelectedTab(label)}
              className={`rounded-none flex items-center gap-2 px-4 w-max py-2 flex-col 
            border-b-[3px] border-transparent hover:bg-transparent whitespace-nowrap hover:border-transparent bg-transparent min-w-[6rem] hover:shadow-none text-sm font-semibold transition-all duration-200 ${
              selectedTab === label
                ? "md:border-b-white text-white"
                : "text-gray-500 hover:text-white"
            }`}
            >
              <Icon className="w-6 h-6 stroke-1" />
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Property Grid */}
      <div className="grid grid-cols-1 gap-8 px-8 mx-auto md:gap-6 xl:px-20 md:px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="relative flex flex-col overflow-hidden transition border border-gray-700 shadow bg-light rounded-2xl hover:shadow-lg"
          >
            {property.featureTag && (
              <div
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  tagColors[property.featureTag] || "bg-gray-500 text-white"
                }`}
              >
                {property.featureTag}
              </div>
            )}

            <img
              src={property.image}
              alt={property.title}
              className="object-cover w-full bg-white/40 h-52"
            />
            <div className="p-4">
              <h2 className="font-semibold t-lg mb-">{property.title}</h2>
              <p className="text-sm text-gray-400">{property.location}</p>
              <p className="mt-2 font-bold text-white">
                {property.rentalYeild} Rental Yeild
              </p>
              <p className="font-bold text-gray-400">
                {property.annualReturn} Projected Annual Return
              </p>
            </div>

            <p className="py-3 mt-auto text-sm font-semibold text-center text-black bg-white">
              Available: {property.token} tokens at ${property.tokenPrice}
            </p>
          </div>
        ))} */}
        {filteredProperties.map((property) => {
          const isClickable = property.active || !property.active;

          const CardContent = (
            <div
              key={property.id}
              className={`relative flex group flex-col overflow-hidden transition-transform duration-300 ease-in-out border border-gray-700 shadow bg-light rounded-2xl ${
                isClickable
                  ? "hover:shadow-lg hover:scale-[1.015] cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {property.featureTag && (
                <div
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                    property.featureTag?.toLowerCase().includes("sold")
                      ? "bg-red-500 text-white"
                      : tagColors[property.featureTag] ||
                        "bg-gray-500 text-white"
                  }`}
                >
                  {property.featureTag}
                </div>
              )}

              <img
                src={property.previewImage}
                alt={property.title}
                className="object-cover w-full transition-transform duration-300 ease-in-out bg-white/40 h-52"
              />
              <div className="p-4">
                <h2 className="font-semibold line-clamp-1 t-lg">
                  {property.title}
                </h2>
                <p className="text-sm text-gray-400">{property.location}</p>
                <p className="mt-2 font-bold text-white">
                  {property.rentalYeild} Rental Yeild
                </p>
                <p className="font-bold text-gray-400">
                  {property.annualReturn} Projected Annual Return
                </p>
              </div>
              <p className="py-3 mt-auto text-sm font-semibold text-center text-black bg-white">
                Available: {property.token} tokens at ${property.tokenPrice}
              </p>
            </div>
          );

          return isClickable ? (
            <Link to={`/market/${property.title}`} key={property.title}>
              {CardContent}
            </Link>
          ) : (
            // <Link to="/details" key={property.id}>
            //   {CardContent}
            // </Link>
            <div key={property.id}>{CardContent}</div>
          );
        })}
      </div>
      {filteredProperties.length === 0 && (
        <div className="flex flex-col items-center justify-center p-5 m-auto mt-10 text-gray-200 rounded-xl w-max bg-white/5 animate-fadeIn">
          <SearchX className="w-10 h-10 mb-2 text-red-400" />
          <p className="text-sm md:text-2xl">
            No apartmentList found for the selected filters.
          </p>
        </div>
      )}
      <div className="pt-20"></div>
      <Footer />
    </div>
  );
};

export default MarketInfo;
