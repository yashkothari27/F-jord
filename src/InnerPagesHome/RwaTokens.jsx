import { useState, useEffect } from "react";

const RwaTokens = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const rwaData = [
    {
      title: "Real World Assets (RWA)",
      content: [
        {
          mainHeading: "Unlocking Real-World Value through Digital Innovation",
          description:
            "Real World Assets (RWAs) are tangible, physical assets that hold intrinsic value outside of the digital world. These assets include real estate, land, precious metals, commodities, infrastructure, and even logistics assets like shipping containers. Unlike purely digital assets or speculative financial instruments, RWAs are backed by physical existence and measurable economic value, offering greater stability, transparency, and long-term investment potential.<br /><br />At Fjord Estate, we are at the forefront of transforming how these traditional assets are accessed, owned, and traded. By leveraging blockchain technology and advanced tokenization, we bridge the gap between the physical and digital economies, enabling seamless, fractional, and traceable investment in real-world assets.",
          subContent: [],
        },
      ],
    },
    {
      title: "Why Real World Assets Matter",
      content: [
        {
          mainHeading: "Why Real World Assets Matter",
          description:
            "RWAs are a powerful hedge against volatility and inflation, providing investors with tangible security in an increasingly digital and often unstable financial landscape. Unlike cryptocurrencies or derivatives, RWAs are tied to physical properties that retain practical, real-world utility and measurable value.",
          subContent: [],
        },
      ],
    },
    {
      title: "Key Benefits of RWA Investments with Fjord Estate",
      content: [
        {
          mainHeading: "Key Benefits of RWA Investments with Fjord Estate",
          description: null,
          subContent: [
            {
              heading: "1. Asset-Backed Stability",
              description:
                "RWAs are inherently less volatile than purely digital assets. Physical assets like real estate, gold, or infrastructure have proven to preserve and often grow in value, even during economic downturns. This makes RWAs an ideal cornerstone for risk-adjusted portfolios seeking long-term security and predictable returns.",
            },
            {
              heading:
                "2. Fractional Ownership: Lower Barriers, Greater Access",
              description:
                "Through tokenization, Fjord Estate enables fractional ownership of high-value assets. Instead of needing substantial capital to invest in properties or commodities, investors can now own small, divisible shares (tokens) of premium assets. This democratizes access, allowing retail investors to participate alongside institutional players.<br /><br />Example: An investor can purchase 0.001% of a commercial real estate project or a gold reserve, lowering the traditional entry threshold from millions to potentially just hundreds of dollars.",
            },
            {
              heading:
                "3. Enhanced Liquidity for Traditionally Illiquid Assets",
              description:
                "Real estate, gold, and infrastructure have historically been illiquid markets, often requiring months to buy or sell. Through tokenization on Fjord Estate’s blockchain platform, these assets can now be traded instantly, securely, and globally, bringing liquidity to markets that were previously slow and restrictive.<br /><br />How We Ensure Liquidity:<br />• 24/7 Global Trading<br />• Integration with Decentralized Exchanges (DEXs)<br />• Peer-to-Peer Trading Functionality<br />• Automated Smart Contract Settlements",
            },
            {
              heading: "4. Global Investment Access: Borderless Ownership",
              description:
                "Fjord Estate eliminates geographical restrictions by making RWA investments globally accessible. Investors from any country can acquire asset-backed tokens, diversifying into international markets without complex legal or logistical hurdles.",
            },
            {
              heading:
                "5. Traceability and Compliance with ISO 6346 and Beyond",
              description:
                "For assets such as logistics infrastructure, shipping containers, and transportable commodities, we leverage ISO 6346 (the international standard for container identification and tracking) to ensure full traceability.<br /><br />• Each asset is digitally mapped to a unique token ID.<br />• Containers or movable assets are linked to their ISO 6346 codes, enabling precise real-time tracking and verification on the blockchain.<br />• This improves auditability, provenance validation, and reduces fraud risks.<br /><br />We are extending this methodology to other asset classes by integrating IoT sensors, GPS tracking, and serial number registries, ensuring continuous asset verification and secure ownership history.",
            },
            {
              heading: "6. Transparency and Immutable Records",
              description:
                "Every transaction, ownership transfer, and fractional division is recorded immutably on the blockchain, providing:<br />• Real-time auditing<br />• Full visibility into asset provenance<br />• Secure, tamper-proof transaction history<br /><br />Investors can trust the integrity of the assets and their digital representation without relying on centralized intermediaries.",
            },
            {
              heading: "7. Portfolio Diversification with Real-World Impact",
              description:
                "RWAs give investors the ability to build diversified, multi-asset portfolios that can include:<br />• Commercial and residential real estate<br />• Precious metals and natural resources<br />• Infrastructure projects<br />• Shipping and logistics assets<br />• Renewable energy installations<br /><br />These asset classes are often less correlated to traditional financial markets, offering better risk management and exposure to real-world economic growth.",
            },
            {
              heading: "8. Passive Income Opportunities",
              description:
                "Depending on the asset type, token holders may receive:<br />• Rental income (for tokenized properties)<br />• Dividend distributions (for revenue-generating assets)<br />• Commodity yields (from tokenized resources)<br /><br />This introduces a new pathway for steady passive income through blockchain-enabled fractional ownership.",
            },
            {
              heading: "9. Regulatory Alignment and Investor Protection",
              description:
                "Fjord Estate operates with a commitment to:<br />• Adhering to local and international regulations<br />• Incorporating KYC/AML protocols<br />• Providing compliant, secure investment channels that protect both institutional and retail investors.",
            },
          ],
        },
      ],
    },
    {
      title: "Transforming the Future of Real World Asset Investment",
      content: [
        {
          mainHeading: "Transforming the Future of Real World Asset Investment",
          description:
            "Fjord Estate is not just offering access to real-world assets—we are redefining the investment experience. By securely converting physical assets into blockchain-based tokens, we enable:<br />• Greater market efficiency<br />• Inclusive participation<br />• Enhanced liquidity and faster transactions<br />• Robust security and traceability<br /><br />We are building a platform where owning a fraction of a skyscraper, a gold bar, or a fleet of shipping containers is as seamless as owning a digital token.",
          subContent: [],
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
      rwaData.forEach((item, i) => {
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
      id="rwa"
      className="w-full h-full pt-4 text-white cursor-default md:pt-14"
    >
      <div className="flex justify-between  gap-5 px-5 xl:gap-10 md:px-4 lg:px-8 xl:px-12 md:pb-[10%]">
        <div className="hidden md:flex  flex-col md:w-full lg:w-[70%]  items-center pt-[9%]  ">
          <div className="sticky top-20">
            {rwaData.map((item, i) => (
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
          {rwaData.map((item, index) => (
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.content[0].description,
                      }}
                    />

                    {/* {item.content[0].description} */}
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
                      <div
                        dangerouslySetInnerHTML={{ __html: sub.description }}
                      />

                      {/* {sub.description}&nbsp; */}
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

export default RwaTokens;
