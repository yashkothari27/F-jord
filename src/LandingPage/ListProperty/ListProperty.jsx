import "./ListProperty.css";
// import React, { useState } from "react";
import { Link } from "react-router-dom";
// import lstNew1 from "../../assets/Images/PropertyImages/property1.jpg";
// import lstNew2 from "../../assets/Images/PropertyImages/property2.jpg";
// import lstNew3 from "../../assets/Images/PropertyImages/property3.jpg";
// import lstNew4 from "../../assets/Images/PropertyImages/property4.jpg";
// import lstNew5 from "../../assets/Images/PropertyImages/property5.jpg";

import lstNew1 from "../../assets/Images/Home/Oslo Centrum.jpg";
import lstNew2 from "../../assets/Images/Home/Oslo pr night.jpg";
import lstNew3 from "../../assets/Images/Home/Vigelands Park.jpg";
import lstNew4 from "../../assets/Images/Home/Viking Museum.jpg";
import lstNew5 from "../../assets/Images/Home/Opera House.jpg";

const ListProperty = () => {
  const propertyData = [
    {
      img: [lstNew1, lstNew2, lstNew3, lstNew4, lstNew5],
      name: "Herøya",
      percentage: "25.99%",
      address: "Axel Auberts gate 8, 3936 Porsgrunn, Norway",
      returnLabel: "Est. Annual Return",
      gmapLink: "https://maps.app.goo.gl/FFkTLefzNSY9Qnqa8",
    },
  ];

  return (
    <section id="listProperty" className="listPropertyBox">
      <div className="listPropertyContainer">
        <div
          className="listPropertyHeading odosansBold"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {/* Discover The Washington Hotel */}
          Global Trading of Real-World Assets. Powered by Advanced Blockchain
          Technology.
        </div>
        <div
          className="listPropertyPara"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          Fjord turns real estate and other physical assets into blockchain
          tokens that can be traded globally—instantly, securely, and with full
          transparency. We enable fast settlement, instant asset minting, low
          fees, and borderless access for investors seeking to diversify their
          portfolios with high-value real-world assets.
          <br></br>
          <strong>
            Invest fractionally. Trade globally. Unlock new markets. Invest
          </strong>
        </div>

        <div
          className="listPropertyCardBox"
          data-aos="fade-up"
          data-aos-duration="600"
          id="ooferUp"
        >
          {/* <div className="listPropertyNewImageBox">
            <div className="listPropertyNewImageBig">
              <img src={lstNew1} alt="" />
            </div>
            <div className="listPropertyNewImageGrid">
              <img src={lstNew2} alt="" />
              <img src={lstNew3} alt="" />
              <img src={lstNew4} alt="" />
              <img src={lstNew5} alt="" />
            </div>
          </div> */}
          {/*    {propertyData.map((property, index) => (
            <div key={index} className="listPropertyCard">
            <img src={property.img} alt={property.name} /
              <div className="listPropertyCardContent">
                <div className="listPropertyCardName">{property.name}</div>
                <div className="listPropertyCardPercentage">
                  {property.percentage}
                </div>
                <div className="listPropertyCardAddress">
                  {property.address}
                </div>
                <div className="listPropertyCardPercentageName" id="aaferUp">
                  {property.returnLabel}
                </div>
              </div>
            </div>
          ))}> */}
          <div className="listPropertyCard ">
            <div className="listPropertyNewImageBox">
              <div className="listPropertyNewImageBig">
                <img src={propertyData[0].img[0]} alt="" />
              </div>

              <div className="listPropertyNewImageGrid">
                {propertyData[0].img.slice(1).map((image, index) => (
                  <img key={index} src={image} alt="" />
                ))}
              </div>
            </div>
            <div className="listPropertyCardContent">
              <div className="listPropertyCardName"></div>
              {/* <div className="listPropertyCardName">{propertyData[0].name}</div> */}
              <div className="listPropertyCardPercentage">
                {propertyData[0].percentage}
              </div>
              <a
                href={propertyData[0].gmapLink}
                target="_blank"
                className=" listPropertyCardAddress"
              >
                {/* {propertyData[0].address}{" "} */}
                {/* <span className="text-lg leading-none">📍</span> */}
              </a>
              {/* <a
                href={propertyData[0].gmapLink}
                target="_blank"
                className=" listPropertyCardAddress"
              >
                {propertyData[0].address}{" "}
                <span className="text-lg leading-none">📍</span>
              </a> */}
              <div className="listPropertyCardPercentageName" id="aaferUp">
                {propertyData[0].returnLabel}
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor="#ooferUp"
          className="mx-auto"
        >
          {/* <button >View properties</button> */}
          {/* <Link to={`/marketplace`}>
            <button className="listPropertyBtn">View Properties</button>
          </Link> */}
          {/* <Link to={`/marketplace`}>
            <button className="listPropertyBtn">View Properties</button>
          </Link> */}
          <a href="mailto:post@fjord.estate">
            <button className="listPropertyBtn">Join Waitlist!</button>
          </a>

          {/* <a
            href={`${innerPageUrl}/marketplace`}

            // href="https://reltime-marketplace.vercel.app/details"
          >
            <button className="listPropertyBtn">View Properties</button>
          </a> */}
        </div>
      </div>
      <div className="listPropertySpotLight"></div>
    </section>
  );
};

export default ListProperty;
