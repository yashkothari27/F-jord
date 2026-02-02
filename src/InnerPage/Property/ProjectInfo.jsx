import Slider from "./Slider/Slider";
import Highlights from "./Highlights";
import { useParams, Navigate, Link } from "react-router-dom"; // ✅ import Navigate
import apartmentList from "../../assets/Data/Apartment.json";

import {
  FileText,
  Layout,
  Building,
  Grid,
  BarChart,
  MapPin,
  Info,
} from "lucide-react";

const iconMap = {
  FileText,
  Layout,
  Building,
  Grid,
  BarChart,
  MapPin,
  Info,
};

const ProjectInfo = () => {
  const { projectTitle } = useParams();
  const selectedProject = apartmentList.find(
    (p) => p.title.toString() === projectTitle
  );

  // ✅ Redirect if project is not found
  if (!selectedProject) {
    return <Navigate to="/notfound" replace />;
  }

  // const { projectTitle } = useParams();
  // const selectedProject = apartmentList.find(
  //   (p) => p.title.toString() === projectTitle
  // );

  // const financialItems = [
  //   { label: "Projected Annual Return", value: "25.99%" },
  //   { label: "Absolute return – 3 years", value: "100.00%" },
  //   { label: "Start token price ", value: "$0.018" },
  //   { label: "Projected token price after 3 years ", value: "$0.036" },
  // ];

  // const features = [
  //   {
  //     icon: FileText,
  //     text: "Lease Abstract",
  //     link: "https://1drv.ms/b/s!As4PlGRBkB7phzaS9eY7ia2bASV_?e=JhcNeP",
  //   },
  //   {
  //     icon: Layout,
  //     text: "Floor Plan",
  //     link: "https://1drv.ms/b/s!As4PlGRBkB7phzcHqxvnpGA_VQv2?e=4WHUK8",
  //   },
  //   {
  //     icon: Building,
  //     text: "Oslo Hotel",
  //     link: "https://1drv.ms/b/s!As4PlGRBkB7phzqJT9HXXzxaCbRw?e=wHGkc4",
  //   },
  //   {
  //     icon: Grid,
  //     text: "Room Types",
  //     link: "https://1drv.ms/x/s!As4PlGRBkB7phzhquHcPUdtVtvhF?e=gSfCdp",
  //   },
  //   {
  //     icon: BarChart,
  //     text: "Hotel Reports",
  //     link: "https://1drv.ms/x/s!As4PlGRBkB7phzkGGxzFrVMScL-n?e=Wp80AJ",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-5 p-5 md:p-10 xl:px-20 lg:py-10">
      <div className="mt-4 text-xl font-semibold leading-none ">
        {selectedProject.title}
      </div>
      <Slider
        images={selectedProject.sliderImages}
        iFrameModalLink={selectedProject?.iFrameModalLink}
      />
      <div className="flex flex-col-reverse gap-10 mt-2 lg:flex-row ">
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-semibold">{selectedProject.title}</div>
          <a
            title="Location"
            target="_blank"
            rel="noopener noreferrer"
            href={selectedProject.mapLink}
            className="inline-flex w-auto gap-1 text-base underline transition-colors ease-in-out rounded-lg md:w-max hover:text-neutral-200 text-neutral-500 "
          >
            <MapPin />
            <div className="">{selectedProject.title}</div>
          </a>

          <div
            className={`flex gap-2 px-3 py-1 border ${
              selectedProject.active ? "border-teal-500" : "border-red-500"
            } rounded-full cursor-default w-max`}
          >
            <div
              className={`flex my-auto w-2.5 h-2.5  ${
                selectedProject.active ? "bg-teal-500" : "bg-red-500"
              } rounded-full`}
            />
            <div className="my-auto">
              {selectedProject.active ? "Active" : "Inactive"}
            </div>
          </div>

          <div className="h-0.5 bg-blue-200"></div>
          <>
            {Array.isArray(selectedProject.highlights) &&
              selectedProject.highlights.length > 0 && (
                <Highlights data={selectedProject.highlights} />
              )}
            <section className="">
              <h2 className="text-2xl font-semibold lg:text-3xl">
                About the Property
              </h2>

              <div className="mt-6">
                <h2 className="text-xl font-semibold underline">
                  Location & Project Features
                </h2>
                <p>{selectedProject.about}</p>
                <p>Here are the key features of the development:</p>
                {Array.isArray(selectedProject.details) &&
                  selectedProject.details.length > 0 &&
                  selectedProject.details.map((group, index) => (
                    <div key={index} className="mt-6">
                      <h3 className="text-xl font-semibold underline text-white/90">
                        {group.heading}
                      </h3>
                      <ul className="pl-6 mt-2 space-y-1 font-medium list-disc text-neutral-300">
                        {group.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              {Array.isArray(selectedProject.documents) &&
                selectedProject.documents.length > 0 && (
                  <div className="mt-6">
                    <h2 className="mt-8 mb-1 text-2xl font-medium underline">
                      Documents
                    </h2>
                    <div className="flex flex-wrap items-center h-full gap-5 mb-5 text-base text-slate-900 max-md:max-w-full">
                      {selectedProject.documents.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || Info;
                        return (
                          <a
                            key={index}
                            href={feature.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col w-32 sm:w-32 h-full justify-center items-center gap-3 p-3 font-medium duration-300 transition-all ease-in-out bg-white rounded-xl shadow-md cursor-pointer  sm:my-1 hover:bg-[#52a5e4] hover:shadow-[0_0px_30px_rgb(256,256,256,0.3)]  hover:text-white"
                            title={`View ${feature.text}`}
                          >
                            <Icon className="w-6 h-6 max-sm:w-7 max-sm:h-7 " />
                            <div className="text-sm text-center sm:text-sm ">
                              {feature.text}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
            </section>
          </>
        </div>
        <div
          className="p-5 border rounded-lg top-32 lg:mt-14 lg:sticky lg:w-max h-max"
          style={{
            boxShadow: "0px 0px 50px rgba(255, 255, 255, 0.15)",
          }}
        >
          <div className="self-center mb-4 text-xl font-semibold text-white ">
            Estimation Price
          </div>
          {selectedProject.financialItems.map((item, index) => (
            <div
              key={index}
              className={`flex gap-5 justify-between items-start pb-2 mt-4 w-full  px-2 ${
                index !== selectedProject.financialItems.length - 1
                  ? "border-b border-stone-300"
                  : ""
              }`}
            >
              <div className="flex gap-2 text-white">
                <Info className="object-contain w-5 text-blue-500 aspect-square" />
                <div className="break-normal sm:whitespace-nowrap">
                  {item.label}
                </div>
              </div>
              <div className="text-zinc-300 whitespace-nowrap">
                {item.value}
              </div>
            </div>
          ))}

          <div className="mt-0 sm:mt-2">
            <div className="flex justify-between w-full gap-6 p-2 text-base">
              <Link
                to="/dashboard"
                className="py-2 mx-auto mt-4 transition-all duration-300 ease-in-out rounded px-7 hover:bg-white hover:text-[#01021e] listPropertyBtn w-max"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;

// {
//   "id": 10,
//   "title": "Building with Business Premises, 9 Apartments, and Development Land in Central Sandefjord",
//   "location": "Kongens gate 11 and Stockfleths gate 10, 3210 Sandefjord",
//   "market": "Sandefjord",
//   "category": "Multi Family",
//   "previewImage": "/Images/MarketPlace/10thApartment/10thApartment1.webp",
//   "token": 329411,
//   "tokenPrice": 0.085,
//   "rentalYeild": "7.2%",
//   "annualReturn": "10.8%",
//   "featureTag": "Investment",
//   "active": true,
//   "mapLink": "https://share.google/jt3k9ICGc0LSnF9Jw",
//   "highlights": [
//     { "icon": "apartment", "text": "9 Apartments" },
//     { "icon": "store", "text": "1 Commercial Premises" },
//     { "icon": "garage", "text": "20 Parking Spaces" },
//     { "icon": "land", "text": "Extra Land with Development Potential" }
//   ],
//   "iFrameModalLink": null,
//   "sliderImages": [
//     "/Images/MarketPlace/10thApartment/10thApartment1.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment2.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment3.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment4.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment5.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment6.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment7.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment8.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment9.webp",
//     "/Images/MarketPlace/10thApartment/10thApartment10.webp"
//   ],
//   "financialItems": [
//     { "label": "Total Appraisal Value (EUR)", "value": "€2,380,000" },
//     { "label": "Annual Rental Income (EUR)", "value": "€239,801.24" },
//     { "label": "Total Appraisal Value (NOK)", "value": "kr. 28,000,000" },
//     { "label": "Annual Rental Income (NOK)", "value": "kr. 2,821,191" },
//     { "label": "Total Tokens", "value": "32,941,176" },
//     { "label": "Token Price", "value": "€0.085" }
//   ],
//   "documents": null,
//   "about": "Kongens gate 11 is a venerable apartment building with business premises, 9 apartments, and an associated undeveloped parking lot in Stockfleths gate 10 that has future development opportunities. The property is located in a pedestrian street in central Sandefjord. The apartments are large and well-maintained with exceptionally high standards for rentals. Built around 1890/1900, extended toward the backyard in 1983/84, and with a stairwell added in 1997. The property is currently appraised at kr. 28,000,000 (€2,380,000). Annual rental income including the parking lot is kr. 2,821,191 (€239,801).",
//   "details": [
//     {
//       "heading": "Property Overview",
//       "items": [
//         "Excellent location in a pedestrian street in central Sandefjord.",
//         "Total gross area: 2,100 m².",
//         "Year built: circa 1890/1900.",
//         "Extended in 1983/84, stairwell added in 1997.",
//         "Plot area: 1,171 m² (owned).",
//         "Possessive form: Other.",
//         "Sold as a company (AS sale).",
//         "Price applies to net property value."
//       ]
//     },
//     {
//       "heading": "Layout by Floor",
//       "items": [
//         "1st floor: 560 m² GLA – Business premises.",
//         "2nd floor: 565 m² GLA – 4 apartments.",
//         "3rd floor: 560 m² GLA – 4 apartments.",
//         "4th floor: 200 m² GLA – 1 apartment.",
//         "5th floor: 15 m² GLA – Tower room/living room.",
//         "Basement: 200 m² GLA – Commercial and warehouse space."
//       ]
//     },
//     {
//       "heading": "Parking",
//       "items": [
//         "Approx. 20 parking spaces on private property.",
//         "Parking lot currently generates annual rental income of kr. 800,000 (excluding VAT)."
//       ]
//     },
//     {
//       "heading": "Rental & Financial Info",
//       "items": [
//         "Annual rental income (2024): kr. 2,021,191 (€171,801.24)",
//         "Parking lot annual rental income: kr. 800,000 (€68,000.00)",
//         "Total combined income: kr. 2,821,191 (€239,801.24)",
//         "100% consumer price index adjustment.",
//         "Deposit and settlement terms per standard commercial practice."
//       ]
//     },
//     {
//       "heading": "Legal & Regulation",
//       "items": [
//         "Municipality number: 3804.",
//         "Farm no.: 172, Usage no.: 162 and 167.",
//         "Zoned for city centre purposes per municipal plan.",
//         "Municipal right of pre-emption applies for tenement buildings.",
//         "Prospectus with full documentation required before bidding.",
//         "Subject to money laundering reporting requirements."
//       ]
//     }
//   ]
// }
