import api2 from "../assets/Images/faq.png";
import { useState, useEffect } from "react";

const Bonus = () => {
  const [currentSection, setCurrentSection] = useState(0);

  // const bonusData = [
  //   {
  //     title: "Tokenomics",
  //     imgSRC: api2, // Use the same image or a different one if desired
  //     content: [
  //       {
  //         mainHeading: "Tokenomics",
  //         description: null,
  //         subContent: [
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Supply Limit",
  //             description:
  //               "Just like Bitcoin, these tokens will have a supply limit, set at only 250 million. They are backed by the project's profits of $4.5 million, setting the price of one token at $0.018.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Guaranteed Value Growth",
  //             description:
  //               "Each token is guaranteed to double in value within three years, right after the project's completion. At that point, you can choose between the Buyback option or a Reinvestment opportunity.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Buyback Option",
  //             description:
  //               "If chosen, the profits generated from the real estate project will be used to repurchase the tokens from their owners. This means that investors will receive both their initial investment and the profits from the project, effectively doubling their money.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Reinvestment Option",
  //             description:
  //               "If selected, the profits from the real estate project will be reinvested into a new project. This approach offers the potential for continued growth and returns.",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Bonuses",
  //     imgSRC: api2,
  //     content: [
  //       {
  //         mainHeading: "Bonuses",
  //         description: null,
  //         subContent: [
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "New Signup Bonus",
  //             description: "Every new signup is awarded 10 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "KYC Completion Bonus",
  //             description:
  //               "Users who go ahead and complete KYC are awarded an additional 100 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Referral Bonus",
  //             description:
  //               "If you refer a friend who buys 1000 tokens, you get 100 tokens. Remember, your friend is also awarded 10 tokens for signing up and 100 more tokens if they complete KYC.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Purchase Bonuses",
  //             description:
  //               "There is a percentage bonus awarded if a particular number of tokens are bought. The breakdown is as follows:",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "2% Bonus",
  //             description: "For every 5,000 tokens = 5,100 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "5% Bonus",
  //             description: "For every 100,000 tokens = 105,000 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "10% Bonus",
  //             description: "For every 1,000,000 tokens = 1,100,000 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "20% Bonus",
  //             description: "For every 5,000,000 tokens = 6,000,000 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Monthly Savings Bonus",
  //             description:
  //               "There is also a bonus for monthly savings as follows:",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "5.83% Savings",
  //             description:
  //               "For 10,000 tokens saved monthly for 12 months = 127,000 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "6.94% Savings",
  //             description:
  //               "For 10,000 tokens saved monthly for 36 months = 385,000 tokens.",
  //           },
  //           {
  //             linker: null,
  //             linkerText: null,
  //             heading: "Social Media Bonus",
  //             description:
  //               "If you follow us on all our social networks, you get 100 tokens.",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  const bonusData = [
    {
      title: "About Fjord",
      imgSRC: api2,
      content: [
        {
          mainHeading: "About Fjord",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "1 About Fjord",
              description: `Fjord is a next-generation, decentralized platform designed to unlock global access to Real World Assets (RWA) through its advanced Layer 1 Blockchain and integrated Marketplace.
  Our mission is to democratize wealth-building opportunities by allowing anyone — anywhere — to invest fractionally in high-quality real estate and other RWAs, seamlessly and securely.
  At the heart of Fjord is a purpose-built Layer 1 Proof-of-Authority (PoA) Blockchain, engineered for maximum scalability, transparency, and transaction efficiency. Unlike legacy blockchain networks, Fjord’s Layer 1 architecture ensures instant finality, minimal transaction costs, and high throughput, making it the ideal foundation for compliant and real-world asset tokenization.`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "2 The Marketplace",
              description: `The Fjord Marketplace empowers users to buy, sell, and trade fractional ownership of vetted real-world assets. Our current focus is on income-generating real estate properties across attractive global markets, such as resilient rental markets in the US (e.g. Texas and Arizona), with plans to expand into other asset classes including precious metals, commodities, and tokenized securities.
  • Fractional Ownership
  Investors can acquire fractional shares of income-generating properties starting from as little as one token, eliminating traditional barriers such as high down payments or complex legal structures.
  • Daily Rental Income
  Token holders receive daily rental payouts directly to their wallets — a disruptive feature compared to traditional monthly or quarterly cycles — while participating in property appreciation.
  • Real-Time Liquidity
  The built-in Order Book allows users to list and trade their tokenized property shares at any time, providing real-time liquidity within the Marketplace.
  • Professional Asset Management
  All properties are managed by professional, vetted operators with proven track records, ensuring stable returns and high-quality property upkeep.`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "3 The Technology: Fjord Layer 1 Blockchain",
              description: `Fjord’s Layer 1 Blockchain is the backbone of the entire ecosystem:
  • Full EVM Compatibility
  Developers can seamlessly migrate existing Ethereum-based dApps and smart contracts onto the Fjord chain, taking advantage of its superior performance and cost-efficiency.
  • Tokenization Engine
  Each property and asset is represented as a fully compliant digital token (NFT or fungible token), secured by the Layer 1 chain and linked to verified legal ownership and cash flow rights.
  • Integrated SuperApp & Wallet
  Users manage their entire investment lifecycle through the Fjord Web3 SuperApp, which features an intuitive wallet, investment tracking, staking, and fiat on/off ramps.
  • Decentralized Exchange (DEX)
  The built-in DEX allows for instant swapping of asset tokens and other crypto pairs, providing seamless value mobility within the ecosystem.
  • API-First Architecture
  The platform offers over 280 APIs, enabling integration with third-party apps, institutional partners, and enterprise use cases across banking, insurance, and wealth management.`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "4 Vision & Impact",
              description: `The traditional RWA investment market is plagued by inefficiencies — high costs, opaque processes, illiquidity, and geographic restrictions. Fjord removes these frictions through blockchain technology and a trusted, fully compliant framework.
  We are building a global platform where:
  • Anyone can own income-producing real estate or other RWAs, starting with just a few dollars.
  • Developers can build sophisticated DeFi and RWA dApps on top of our Layer 1.
  • Institutional partners can offer tokenized RWA products to their clients.
  • Communities worldwide can participate in a more inclusive and transparent financial ecosystem.`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "5 Core Advantages",
              description: `• Proven Layer 1 blockchain built for RWA tokenization.
  • Full-stack Marketplace with liquidity and real-world yield.
  • Professional-grade asset selection and management.
  • Strong focus on compliance, legal clarity, and security.
  • Growing partner ecosystem across Europe, Africa, India, and the US.
  Fjord is more than a platform — it is the future of real-world investing. By bridging blockchain innovation with tangible assets, we empower users to build lasting wealth in a way that is accessible, transparent, and borderless.`,
            },
          ],
        },
      ],
    },
    {
      title: "For Investors and Strategic Partners",
      imgSRC: api2,
      content: [
        {
          mainHeading: "For Investors and Strategic Partners",
          description: null,
          subContent: [
            {
              linker: null,
              linkerText: null,
              heading: "The RWA Tokenization Problem",
              description: `Fjord is not another "tokenization project." It is a purpose-built infrastructure to unlock scalable, compliant, and institutional-grade Real World Asset (RWA) markets — with a focus on retail and institutional accessibility and regulatory alignment from day one.
  RWA tokenization is already a $6T+ market opportunity — but most existing solutions are flawed:
  • Built on Layer 2 or public Layer 1s (Ethereum, Polygon) with uncertain regulatory clarity
  • Custodial platforms with opaque risk exposure
  • Limited interoperability with traditional finance
  • Poor user experience — complex, expensive, illiquid
  Fjord was built to address these gaps with a radically better model.`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "Fjord’s Key Differentiators",
              description: `1. Non-Custodial by Architecture
  • Users hold asset tokens and receive yield directly in their own wallets — Fjord does not hold client funds.
  • No intermediary custody risk — a key consideration for MiCA, SEC, FCA, and other regimes.
  • Enables true decentralization and avoids "token wrapping" compliance problems seen on most RWA platforms.
  
  2. Regulatory-First Design
  • Every tokenized asset is backed by legally verifiable ownership, linked to compliant structures.
  • Full KYC/AML on onboarding; identity and auditability baked into the Layer 1 itself.
  • Ready for alignment with MiCA (EU), FCA (UK), SEC RWA frameworks, and emerging African & Asian regulations.
  • Positioning Fjord as a trusted bridge between DeFi and TradFi — not a black box.
  
  3. Purpose-Built Layer 1 Blockchain
  • Public Layer 1s (Ethereum, Polygon) were not designed for real-world financial settlement.
  • Fjord operates on its own Proof-of-Authority Layer 1 Blockchain, giving:
    o High TPS (transactions per second) — critical for daily rental payouts & micro-yield distribution
    o Predictable, low fees — no retail user friction
    o Compliance and control at the chain level — not just at the app layer
    o Full EVM compatibility for app developers
  
  4. Live, Revenue-Generating Marketplace
  • Not just a protocol — fully operational Marketplace with live tokenized rental properties already traded on-chain.
  • Real-time order book liquidity — token holders can buy/sell fractions anytime.
  • Daily rental income flows automatically via smart contracts.
  • Professional property managers handle the real assets — Fjord provides the digital layer.`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "Why Fjord Is Winning",
              description: `The next wave of RWA platforms will be judged by regulators and institutions.
  Most current "Web3 RWA" models will struggle to scale because they either:
  • Violate securities laws with "wrapped" token models
  • Hold user funds — triggering custody license requirements
  • Have no chain-level compliance features — making them legally unfit for institutional adoption
  Fjord is positioned differently:
  ✅ Non-custodial, user-controlled
  ✅ Compliant from Layer 1 up
  ✅ Integrated UX with real-world yield and liquidity
  ✅ Own blockchain = no dependency on Layer 2 compromises
  ✅ Designed to scale cross-jurisdictionally`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "The Ask: Strategic Investors Wanted",
              description: `Fjord is now preparing for strategic scale:
  • Expanding Marketplace to new asset classes: precious metals, tokenized securities, commodities
  • Deepening institutional integrations (banking APIs, fiat on/off ramps, compliance partners)
  • Building partnership channels with banks, neobanks, and wealth platforms
  • Preparing for institutional RWA listings and larger-scale liquidity pools
  We are seeking strategic capital and partners who understand the unique challenges of scaling regulated RWA markets and want to lead this transition with us.`,
            },
            {
              linker: null,
              linkerText: null,
              heading: "Final Thought",
              description: `RWA tokenization is inevitable — but success will go to the platforms that:
  ✅ operate inside the regulatory perimeter
  ✅ enable real-world yield with real-time liquidity
  ✅ empower users to hold their assets, not just a promise
  ✅ are designed for compliance, not retrofitted later
  Fjord is already that platform — built, live, and ready to scale.`,
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
      bonusData.forEach((item, i) => {
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
      id="bonus"
      className="w-full h-full pt-4 text-white cursor-default md:pt-14"
    >
      <div className="flex justify-between gap-5 px-5 xl:gap-10 md:px-4 lg:px-8 xl:px-12 md:pb-[10%]">
        {/* LEFT STICKY SIDEBAR */}
        <div className="hidden md:flex flex-col md:w-[17%] lg:w-[20%] xl:w-[25%] items-start pt-[9%]">
          <div className="sticky w-full top-20">
            {bonusData.map((item, i) => (
              <div
                key={i}
                className={`w-full py-2 pl-2 border-b text-start cursor-pointer lg:text-xl text-ellipsis lg:whitespace-nowrap hover:text-white transition-colors ease-in-out
                ${
                  currentSection === i
                    ? "font-bold text-[#52a5e4] border-b-2 border-b-[#52a5e4]"
                    : "font-medium border-b-gray-300 text-gray-300"
                }`}
                onClick={() => scrollToSection(item, i)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN TEXT CONTENT */}
        <div className="flex flex-col items-start justify-start gap-8 md:gap-10 lg:gap-16 w-full md:w-[80%]">
          {bonusData.map((item, index) => (
            <div
              id={item.title}
              className="flex flex-col justify-between gap-8"
              key={index}
            >
              <div className="w-full">
                <div className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#52a5e4]">
                  {item.content[0].mainHeading}
                </div>

                {item.content[0].description && (
                  <div className="mb-6 md:mb-10 leading-relaxed md:leading-[1.8rem] text-sm md:text-base lg:text-xl text-gray-200">
                    {item.content[0].description}
                  </div>
                )}

                {item.content[0].subContent.map((sub, subIndex) => (
                  <div key={subIndex} className="mb-6">
                    {sub.heading && (
                      <div className="text-lg md:text-2xl lg:text-3xl font-semibold text-[#52a5e4] mb-2">
                        {sub.heading}
                      </div>
                    )}
                    <div className="text-sm leading-relaxed text-gray-100 whitespace-pre-line md:text-base lg:text-xl">
                      {sub.description}
                    </div>
                    {sub.linkerText && (
                      <a className="inline-block mt-2 font-medium underline text-[#52a5e4] hover:text-blue-400 transition-colors">
                        {sub.linkerText}
                      </a>
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

export default Bonus;
