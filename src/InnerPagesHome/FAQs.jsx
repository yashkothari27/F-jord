import api2 from "../assets/Images/faq.png";
import { useState, useEffect } from "react";

const FAQs = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const faqsData = [
    {
      title: "Oslo Fjord Token",
      imgSRC: api2,
      content: [
        {
          mainHeading: "Oslo Fjord Token",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "What is the Oslo Fjord Token?",
              description:
                "The Oslofjord Marina Token is a governance token that represents an investment in a real estate project located in the Oslofjord region.",
            },
            {
              linker: null,
              linkerText: null,
              heading: "How much is one Token?",
              description: "1 Oslo Fjord Token is equivalent to 0.018 USD",
            },
          ],
        },
      ],
    },
    {
      title: "Investment Details",
      imgSRC: null,
      content: [
        {
          mainHeading: "Investments Details",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "What is the minimum investment I can make?",
              description:
                "You can invest as low as10 USD which will get you up to 550 tokens",
            },
            {
              linker: null,
              linkerText: null,
              heading: "What is the maximum investment I can make?",
              description:
                "The pool of 250 million Tokens is yours for the taking, the more you believe in our project, the more you can pull your funds and invest.",
            },
          ],
        },
      ],
    },
    {
      title: "Profits & Returns",
      imgSRC: null,
      content: [
        {
          mainHeading: "Profits & Returns",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading:
                "How long will it take for me to make a profit on my investment?",
              description:
                "When the secondary market opens, you can sell your tokens to secondary investors. As an early investor, you will benefit when the indirectly-backed value of the token increases during the project. The token's indirectly-backed value will rise at different stages of the project. For example, when the construction permit is granted, the valuation of the land plot is set to rise significantly.",
            },
            {
              linker: null,
              linkerText: null,
              heading:
                "How can you guarantee that my investment will double after 3 years?",
              description:
                "The project is managed by professional real estate developers with 15 years of experience. The budget is based on prices from long-term subcontractors. The selling prices of the finished apartments are based on market prices in the area, factoring in inflation and economic growth in the country. Hence, the risk is managed in the best possible way.Construction of the project starts after pre-sale is launched, in which case most of the apartments will already be sold before the major construction costs are incurred. This ensures the profits in the project. The profits of $4.5 million USD over a 3-year period will be used to buy back tokens, plus an additional $4.5 million USD from the initial token sale, totaling a buyback value of $9 million USD.",
            },
          ],
        },
      ],
    },
    {
      title: "Exiting the Investment",
      imgSRC: null,
      content: [
        {
          mainHeading: "Exiting the Investment",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "Can I cash out before 3 years?",
              description:
                "When the secondary market is operational, anyone can buy and sell tokens. While we cannot guarantee that someone will purchase your tokens, our top-notch marketing team will highlight the benefits of this project that appeal to secondary investors.",
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
      faqsData.forEach((item, i) => {
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
      id="api"
      className="w-full h-full pt-4 text-white cursor-default md:pt-14"
    >
      <div className="flex justify-between  gap-5 px-5 xl:gap-10 md:px-4 lg:px-8 xl:px-12 md:pb-[10%]">
        <div className="hidden md:flex  flex-col md:w-[17%] lg:w-[20%] xl:w-[50%] items-center pt-[9%]  ">
          <div className="sticky top-20">
            {faqsData.map((item, i) => (
              <div
                key={i}
                className={`w-full rounded-[0] bg-none py-2 pl-2 overflow-hidden lg:text-xl cursor-pointer text-start text-ellipsis lg:whitespace-nowrap border-b hover:border-b-white hover:shadow-none hover:border-transparent hover:border-b hover:translate-y-0   hover:text-white transition-colors ease-in-out 
                  ${
                    currentSection === i
                      ? "font-bold text-[#52a5e4] border-b-2 border-b-[#52a5e4]"
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
          <div className="text-3xl font-bold leading-7  md:text-4xl lg:text-5xl  md:leading-normal text-[#52a5e4] ">
            Frequently Asked Questions
          </div>
          {faqsData.map((item, index) => (
            <div
              id={item.title}
              className="flex flex-col justify-between md:flex-row"
              key={index}
            >
              <div className="md:w-[65%]">
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
              <div className="flex  w-[33vh]  md:w-[30%] md:mx-0 mx-auto flex-col ">
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

export default FAQs;
