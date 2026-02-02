import "./Footer.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import twitter from "../../assets/SVG/twitter.svg";
import youtube from "../../assets/SVG/youtube.svg";
// import dd from "../../assets/SVG/dropDownArrow.svg";
import telegram from "../../assets/SVG/telegram.svg";
import linkedin from "../../assets/SVG/linkedin.svg";
// import footerLogo from "../../assets/SVG/footerLogo.svg";

const Footer = () => {
  const [openLocation, setOpenLocation] = useState(null);
  const toggleLocation = (location) => {
    setOpenLocation(openLocation === location ? null : location);
  };

  const footerNewData = [
    { text: "About Us", link: "/aboutUs" },
    // { text: "Reviews", link: "/https://isonhouse.netlify.app/" },
    { text: "Learn More", link: "/learnMore" },
    {
      text: "List Property",
      link: "https://1ad0r0kvfjz.typeform.com/to/Vs5Off0C?typeform-source=localhost",
    },
    { text: "Contact Us", link: "/contactUs" },
  ];

  return (
    <footer id="footer" className="footerBox">
      <div className="footerContainer">
        <div className="footerLinkBox">
          <NavLink href="/" className="cursor-pointer">
            <img src="/logo.svg" alt="Logo" />
          </NavLink>
          {/* <div className="footerIcons"> */}
          {/* <a href="https://t.me/reltimedefiecosystem">
              <img src={telegram} alt="telegram" />
            </a>
            <a href="https://x.com/reltime_rtc">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="https://www.youtube.com/channel/UC6SnxjWCho9XiD-McvbtgZQ">
              <img src={youtube} alt="YouTube" />
            </a> */}
          {/* <a href="https://www.linkedin.com/company/reltimedefi/">
              <img src={linkedin} alt="LinkedIn" />
            </a>
          </div> */}
        </div>

        {/* <div className="footerColumnBox">
          <div className="footerColumn">
            <div>Locate Us</div>

            <div className="footerLocationItem">
              <div
                className="footerLocationHead"
                onClick={() => toggleLocation("NORWAY")}
              >
                NORWAY
                <img
                  src={dd}
                  alt="arrow"
                  className={`footerArrow ${
                    openLocation === "NORWAY" ? "footerArrowRotate" : ""
                  }`}
                />
              </div>
              <div
                className={`footerLocationDD ${
                  openLocation === "NORWAY" ? "open" : ""
                }`}
              >
                <div>Address: Oslo, Norway</div>
                <div>Contact: +47 1234 5678</div>
              </div>
            </div>

            <div className="footerLocationItem">
              <div
                className="footerLocationHead"
                onClick={() => toggleLocation("SWEDEN")}
              >
                SWEDEN
                <img
                  src={dd}
                  alt="arrow"
                  className={`footerArrow ${
                    openLocation === "SWEDEN" ? "footerArrowRotate" : ""
                  }`}
                />
              </div>
              <div
                className={`footerLocationDD ${
                  openLocation === "SWEDEN" ? "open" : ""
                }`}
              >
                <div>Address: Stockholm, Sweden</div>
                <div>Contact: +46 8765 4321</div>
              </div>
            </div>

            <div className="footerLocationItem">
              <div
                className="footerLocationHead"
                onClick={() => toggleLocation("INDIA")}
              >
                INDIA
                <img
                  src={dd}
                  alt="arrow"
                  className={`footerArrow ${
                    openLocation === "INDIA" ? "footerArrowRotate" : ""
                  }`}
                />
              </div>
              <div
                className={`footerLocationDD ${
                  openLocation === "INDIA" ? "open" : ""
                }`}
              >
                <div>Address: Mumbai, India</div>
                <div>Contact: +91 98765 43210</div>
              </div>
            </div>

            <div className="footerLocationItem">
              <div
                className="footerLocationHead"
                onClick={() => toggleLocation("AFRICA")}
              >
                AFRICA
                <img
                  src={dd}
                  alt="arrow"
                  className={`footerArrow ${
                    openLocation === "AFRICA" ? "footerArrowRotate" : ""
                  }`}
                />
              </div>
              <div
                className={`footerLocationDD ${
                  openLocation === "AFRICA" ? "open" : ""
                }`}
              >
                <div>Address: Cape Town, South Africa</div>
                <div>Contact: +27 123 456 789</div>
              </div>
            </div>
          </div>

          <div className="footerColumn">
            <div>Products</div>
            <div>
              <a href="#">Layer1 PoA</a>
              <a href="#">Web3 SuperApp</a>
              <a href="#">DEX</a>
              <a href="#">Crypto Payment Gateway</a>
            </div>
          </div>

          <div className="footerColumn">
            <div>Developers</div>
            <div>
              <a href="#">APIs</a>
              <a href="#">Services</a>
              <a href="#">Use Cases</a>
              <a href="#">Email Support</a>
            </div>
          </div>

          <div className="footerColumn">
            <div>Company</div>
            <div>
              <a href="#">About</a>
              <a href="#">Press Releases</a>
              <a href="#">Media</a>
              <a href="#">White Paper</a>
              <a href="#">DeSci</a>
            </div>
          </div>
        </div> */}

        <div className="footerNewColumnBox">
          {footerNewData.map((x, i) => (
            <div key={i} className="footerNewItem">
              <NavLink
                to={x.link}
                className={({ isActive }) =>
                  `${isActive ? "text-[#52a5e4!important] " : "text-white"}`
                }
              >
                {x.text}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div className="footerTextBox">
        Fjord Estate AS operates a non-custodial real estate marketplace based
        on proprietary blockchain technology. Fjord Estate AS is not a
        registered broker-dealer, investment advisor, or custodian, and does not
        provide investment advice or guarantees of investment returns. All
        investments involve risk and potential loss of capital. Regulatory
        authorities may request real-time access to platform data and compliance
        systems
        {/* , which Fjord Estate AS provides transparently through its Layer
        1 infrastructure */}
        . Users are fully responsible for their investment decisions and for
        compliance with applicable laws and regulations in their jurisdictions.
        Please review our Terms of Service and Privacy Policy for more
        information. Contact:{" "}
        <a
          href="mailto:regulatory@fjord.estate"
          className="underline transition-colors duration-300 text-accent hover:text-blue-200"
        >
          regulatory@fjord.estate.
        </a>
      </div>
      <div className="footerBottom">
        <span className="px-5 border-r border-gray-600">
          © 2025 Fjord
          {/* &nbsp; | &nbsp; */}
        </span>
        <NavLink to="/policy" className="px-5 border-r border-gray-600">
          Policy
        </NavLink>
        <NavLink
          to="/terms&Conditions"
          className="px-5 border-r border-gray-600"
        >
          Terms & Conditions
        </NavLink>
        <NavLink to="/compliance" className="px-5 border-r border-gray-600">
          Compliance & Regulatory Transparency
        </NavLink>{" "}
        <NavLink to="/disclaimer" className="px-5 border-r border-gray-600">
          Regulatory & Risk Disclaimer
        </NavLink>
        <NavLink to="/cookiePolicy" className="px-5 border-r border-gray-600">
          Cookie Policy
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
