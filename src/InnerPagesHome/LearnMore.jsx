// const LearnMore = () => {
//   const data1 = [
//     {
//       sectionHeading: "Learn More",
//       sectionPara: `<div class="px-5 mb-6 sm:text-base text-sm font-medium leading-tight text-white md:px-0 md:leading-normal text-start xl:mb-8 xl:text-2xl">

//       The Oslofjord Marina Token is a governance token that represents an investment in a real estate project located in the Oslofjord region. The funds raised through the sale of these tokens are directly used to finance the development of this project

//       <br></br>

//       </div>`,
//     },
//   ];

//   return (
//     <section
//       id="aboutus"
//       className="cursor-default relative w-full   sm:pt-5 pt-5 bg-[#01021e] h-auto justify-center  flex items-center flex-col"
//     >
//       {data1.map((item, index) => (
//         <div
//           key={index}
//           className="flex items-center justify-center w-full py-20 mb-10 sm:mb-0"
//         >
//           <div
//             className={`z-[2]
//          lg:w-[95%] sm:w-[90%] flex md:gap-5  flex-col justify-between
//                  ${index % 2 == 0 ? "sm:flex-row" : "sm:flex-row "}
//               `}
//           >
//             <div
//               className="px-5 mb-3 text-3xl font-bold leading-none text-[#52a5e4] text-default sm:text-4xl sm:sticky sm:top-32 sm:mb-20 h-max md:text-4xl md:px-0 md:text-left lg:leading-normal  lg:text-5xl xl:text-7xl "
//               data-aos="fade-up"
//               data-aos-anchor="aboutus"
//               data-aos-duration="600"
//             >
//               {item.sectionHeading}
//             </div>
//             <div
//               className="sm:w-[85%]  md:w-[70%]"
//               data-aos="fade-up"
//               data-aos-duration="800"
//               dangerouslySetInnerHTML={{ __html: item.sectionPara }}
//             />
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default LearnMore;

import api2 from "../assets/Images/faq.png";
import { useState, useEffect } from "react";

const LearnMore = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const learnMoreData = [
    {
      title: "A Secure Choice",
      imgSRC: api2,
      content: [
        {
          mainHeading: "Investing in Norway: A Secure Choice",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "1.	Economic Stability",
              description:
                "Norway boasts a robust economy, driven by oil and gas exports, maritime industries, and technology. Its GDP per capita is among the highest globally.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "2.	Low Corruption",
              description:
                "Transparency International consistently ranks Norway as one of the least corrupt countries. Investors can trust the integrity of business dealings.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "3.	Natural Resources",
              description:
                "Norway’s oil wealth is managed by the Government Pension Fund Global (often called the “Oil Fund”). This fund invests globally and provides stability to the Norwegian economy.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "4.	Innovation Hub",
              description:
                "Oslo, the capital, is a thriving tech and innovation hub. Norway invests heavily in research and development, fostering a dynamic business ecosystem.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "5.	Quality of Life",
              description:
                "Norway consistently ranks high in quality-of-life indices. A contented, educated workforce contributes to productivity and stability.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "6.	Green Transition",
              description:
                "Norway leads in renewable energy adoption. Hydropower, wind, and electric vehicles are key areas for investment.",
            },
            {
              linker: null,
              linkerText: null,
              heading: null,
              description:
                "In summary, Norway combines economic strength, ethical governance, and forward-thinking policies, making it an ideal destination for investors seeking security and growth.",
            },
          ],
        },
      ],
    },
    {
      title: "Norway is rich",
      imgSRC: api2,
      content: [
        {
          mainHeading: "Norway is rich",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "1.	Oil Wealth",
              description:
                "Norway is the world’s 7th largest oil exporter. The discovery of North Sea oil in the 1960s transformed its economy. The Government Pension Fund Global (Oil Fund) manages this wealth, currently valued at over $1.4 trillion. Yes, trillion! It’s the largest sovereign wealth fund globally.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "2.	GDP Per Capita:",
              description:
                "Norway consistently ranks among the top countries in terms of GDP per capita. As of 2021, it’s around $75,000 per person. This high income level contributes to a strong consumer market.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "3.	Standard of Living",
              description:
                "Norwegians enjoy an exceptional standard of living. Universal healthcare, quality education, and social welfare programs contribute to their well-being.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "4.	Low Income Inequality",
              description:
                "Norway’s wealth distribution is relatively equal. Progressive taxation ensures that the benefits of prosperity reach all citizens.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "5.	Other Industries",
              description:
                "Beyond oil, Norway thrives in maritime industries, aquaculture, and technology. Companies like Equinor, Telenor, and DNV GL are global players.",
            },
          ],
        },
      ],
    },
    {
      title: "Remarkable Stability",
      imgSRC: api2,
      content: [
        {
          mainHeading: "Norway’s Remarkable Stability and Human Development",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "1.	Human Development Index (HDI)",
              description:
                "Norway consistently ranks high in HDI. As of 2021, it holds the 2nd position globally with an impressive HDI of 0.9611.	Norwegians enjoy long lives (average life expectancy of 83.2 years), quality education (average schooling of 13.0 years), and a Gross National Income (GNI) per capita of approximately $65,000.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "2.	Political Stability:",
              description:
                "Norway maintains strong political stability. Its Political Stability Index for 2022 is 0.86, placing it among the top countries. This stability contributes to a favorable investment climate.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "3.	Economic Freedom:",
              description:
                "Index of Economic Freedom (2015): 27th out of 179 countries.Fraser Institute’s Economic Freedom of the World (2015), Also 27th out of 157 countries.Notably, Norway’s government size ranks 132nd out of 1573",
            },
            {
              linker: null,
              linkerText: null,
              heading: "4.	Ease of Doing Business:",
              description:
                "The World Bank’s Ease of Doing Business Index (2019) places Norway at an impressive 9th position out of 183 countries.Efficient regulations and business-friendly policies contribute to this ranking.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "5.	Global Stability:",
              description:
                "Norway consistently ranks high in global stability indices, reflecting its strong institutions, social welfare, and economic resilience.	It’s a secure choice for investors seeking stability and growth.",
            },
            {
              linker: null,
              linkerText: null,
              heading: null,
              description:
                "In summary, Norway’s harmonious blend of human development, political stability, and economic freedom makes it an attractive destination for investment",
            },
          ],
        },
      ],
    },
  ];

  const scrollToSection = (item, i) => {
    const sectionElement = document.getElementById(item.title);
    if (sectionElement) {
      const topOffset = window.innerHeight * 0.1; // Adjust offset to your needs
      const elementPosition =
        sectionElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Set current section immediately on click
      setCurrentSection(i);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      learnMoreData.forEach((item, i) => {
        const sectionElement = document.getElementById(item.title);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const sectionMiddle = rect.top + rect.height / 2;
          const viewportMiddle = window.innerHeight / 2;

          if (
            sectionMiddle >= viewportMiddle - 50 && // Adjust this threshold for sensitivity
            sectionMiddle < viewportMiddle + 50
          ) {
            setCurrentSection(i);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="learnMore"
      className="w-full h-full pt-4 text-white cursor-default md:pt-14"
    >
      <div className="flex justify-between  gap-5 px-5 xl:gap-10 md:px-4 lg:px-8 xl:px-12 md:pb-[10%]">
        <div className="hidden md:flex  flex-col md:w-[45%] lg:w-[50%] xl:w-[50%] items-center pt-[9%]  ">
          <div className="sticky w-full top-20">
            {learnMoreData.map((item, i) => (
              <div
                key={i}
                className={`w-full  text-start line-clamp-4 break-words rounded-[0] bg-none py-2 pl-2 overflow-hidden lg:text-xl cursor-pointer text-ellipsis border-b hover:border-b-white hover:shadow-none hover:border-transparent hover:border-b hover:translate-y-0 hover:text-white transition-colors ease-in-out 
  ${
    currentSection === i
      ? "font-semibold text-[#52a5e4] border-b-2 border-b-[#52a5e4]"
      : "font-medium border-b-gray-300 text-gray-300"
  }`}
                onClick={() => scrollToSection(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-4 md:gap-8 lg:gap-14 ">
          {/* <div className="text-3xl font-bold leading-7  md:text-4xl lg:text-5xl  md:leading-normal text-[#52a5e4] ">
            Investing in Norway: A Secure Choice
          </div> */}
          {learnMoreData.map((item, index) => (
            <div
              id={item.title}
              className="flex flex-col justify-between md:flex-row"
              key={index}
            >
              <div className="md:w[65%]">
                <div className="lg:mb-5 mb-1 text-xl md:text-2xl lg:text-5xl font-bold w-[80%]">
                  {item.content[0].mainHeading}
                </div>
                {item.content[0].description && (
                  <div className="font-medium leading-[1.2rem] md:mb-10 md:leading-normal mb-7 text-sm md:text-base lg:text-xl">
                    {item.content[0].description}
                  </div>
                )}
                {item.content[0].subContent.map((sub, subIndex) => (
                  <div key={subIndex}>
                    {sub.heading && (
                      <div
                        className={`lg:text-3xl md:text-2xl text-xl font-bold text-[#52a5e4]  ${
                          sub.linker
                            ? "md:mt-3 lg:mt-5 mt-3"
                            : "md:mt-3 lg:mt-5 mt-3"
                        }`}
                      >
                        {sub.heading}
                      </div>
                    )}
                    <div
                      className={`leading-[1.2rem] md:leading-normal md:text-base lg:text-xl text-sm font-medium ${
                        sub.linker ? "inline mb-0" : "block mb-5"
                      }`}
                    >
                      {sub.description}&nbsp;
                    </div>
                    {sub.linkerText && (
                      // <div className="mb-5">
                      <a
                        // href={sub.linker}
                        onClick={() => {
                          // togglePDFModal(sub.linker);
                        }}
                        // className="text-xl font-medium underline text-[#52a5e4]"
                        className="overflow-hidden font-medium underline transition-colors ease-in-out lg:text-xl hover:text-blue-500 text-[#52a5e4] whitespace-nowrap text-ellipsis"
                      >
                        {sub.linkerText}
                      </a>
                      // {/* </div> */}
                    )}
                  </div>
                ))}
              </div>
              <div className="w-[33vh] hidden  md:w-[30%] md:mx-0 opacity-0 mx-auto flex-col ">
                {item.imgSRC && (
                  <img
                    src={item.imgSRC}
                    alt={item.imgSRC}
                    className="object-cover w-full "
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
