import { useState, useEffect } from "react";

const AboutUsPage = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const aboutUsData = [
    // {
    //   title: "Who We Are",
    //   content: [
    //     {
    //       mainHeading: "Who We Are",
    //       description:
    //         "Fjord Estate AS is a next-generation real estate investment firm transforming high-value properties into tokenised assets on a proprietary Layer 1 blockchain, built for global asset accessibility and liquidity. Headquartered in Oslo, we combine Scandinavian design, sustainable architecture, and Web3 innovation to open new pathways for fractional ownership of real-world assets (RWA).",
    //       subContent: [],
    //     },
    //   ],
    // },
    {
      title: "Our Vision",
      content: [
        {
          mainHeading: "Our Vision",
          description:
            "To democratise access to premium real estate through ERC-6346-compliant tokenisation, creating secure, transparent, and tradeable asset-backed instruments. By connecting luxury properties with DeFi, Fjord Estate bridges traditional real estate with the future of finance.",
          subContent: [],
        },
      ],
    },
    {
      title: "Our Services",
      content: [
        {
          mainHeading: "Our Services",
          description: null,
          subContent: [
            {
              heading: "1. Tokenised Real Estate Acquisition",
              description:
                "Acquire shares in landmark properties across the Nordics and Europe using ERC-6346 RWA tokens, which ensure compliance, traceability, and smart contract-based governance.",
            },
            {
              heading: "2. Decentralised Marketplace",
              description:
                "Access a secure, user-friendly marketplace for buying, selling, or staking real estate-backed tokens via /Marketplace",
            },
            {
              heading: "3. Luxury Property Development",
              description:
                "Partner with us in developing environmentally conscious, high-value residential and commercial estates in core European markets.",
            },
            {
              heading: "4. Yield-Generating Asset Pools",
              description:
                "Stake your RWA tokens into managed liquidity pools with real-world collateral to earn stable returns, backed by real assets, not speculation.",
            },
            {
              heading: "5. Compliant Digital Custody",
              description:
                "All RWA assets are tied to tokenised legal titles using a hybrid custody model and smart contract logic to ensure investor protection and transparency.",
            },
            // {
            //   heading: "6. Layer 1 Blockchain Infrastructure",
            //   description:
            //     "Built from the ground up, our blockchain infrastructure is optimised for real-world transactions, low gas fees, high throughput, and real-asset compliance.",
            // },
          ],
        },
      ],
    },
    {
      title: "Our Values",
      content: [
        {
          mainHeading: "Our Values",
          description: null,
          subContent: [
            // {
            //   heading: "1. Transparency and Trust",
            //   description:
            //     "All transactions and ownership changes are immutably recorded on our Layer 1 blockchain, ensuring full auditability and legal clarity.",
            // },
            {
              heading: "1. Access and Inclusion",
              description:
                "From institutional investors to first-time property holders, our model makes high-value assets accessible through fractionalised token ownership.",
            },
            {
              heading: "2. Sustainability and Design",
              description:
                "We invest in architectural excellence, combining modern Scandinavian aesthetics with energy-efficient standards and ethical development.",
            },
            {
              heading: "3. Regulatory Alignment",
              description:
                "Using the ERC-6346 standard, our RWA tokens are fully compliant, KYC-verified, and legally binding under local and international frameworks.",
            },
            {
              heading: "4. Real Value, Not Hype",
              description:
                "Our assets are real, verifiable, and income-generating, providing investors with a path to long-term growth grounded in tangible value.",
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
      aboutUsData.forEach((item, i) => {
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
      id="aboutUs"
      className="w-full h-full pt-4 text-white cursor-default md:pt-14"
    >
      <div className="flex justify-between  gap-5 px-5 xl:gap-10 md:px-4 lg:px-8 xl:px-12 md:pb-[10%]">
        <div className="hidden md:flex  flex-col md:w-[70%]  xl:w-[45%] items-center pt-[9%]  ">
          <div className="sticky w-full top-20">
            {aboutUsData.map((item, i) => (
              <div
                key={i}
                className={`w-full text-start line-clamp-4 break-words rounded-[0] bg-none py-2 pl-2 overflow-hidden lg:text-xl cursor-pointer text-ellipsis border-b hover:border-b-white hover:shadow-none hover:border-transparent hover:border-b hover:translate-y-0 hover:text-white transition-colors ease-in-out 
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
            About US
          </div> */}
          {/* <br></br> */}
          {aboutUsData.map((item, index) => (
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
                  <div className="font-medium leading-[1.2rem] md:mb-1 md:leading-normal mb-7 text-sm md:text-base lg:text-xl">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
