/* eslint-disable react/no-unescaped-entities */
import "./MarketPlace.css";
import mp1 from "../../assets/Images/MarketPlace/newMarket1.jpg";
import mp2 from "../../assets/Images/MarketPlace/marketPlace2.png";
import mp3 from "../../assets/Images/MarketPlace/newMarket3.jpg";
import mp4 from "../../assets/Images/MarketPlace/marketPlace4.png";
import mp5 from "../../assets/Images/MarketPlace/newMarket5.jpg";

const MarketPlace = () => {
  return (
    <section id="marketPlace" className="marketBox">
      <div className="marketContainer">
        {/*    <div
          className="marketHeading"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          Layer 1 Proof of Authority (PoA) Blockchain{" "}
        </div>
       <div className="marketPara" data-aos="fade-up" data-aos-duration="600">
          <strong>
            Reltime's Layer 1 PoA Blockchain: Speed, Security, and Scalability{" "}
            <br></br>
          </strong>
          Reltime's Layer 1 Proof of Authority (PoA) blockchain delivers
          exceptional transaction speeds with a robust, secure consensus
          mechanism. Optimized for scalability and designed for seamless mass
          adoption, this technology provides a versatile foundation suitable for
          a wide range of applications, from real estate tokenization to other
          transformative use cases. The Token is hold as Non Custody Wallet.
        </div> */}

        <div className="marketContentBox">
          <div
            className="marketCard"
            data-aos="fade-right"
            data-aos-duration="600"
          >
            <img src={mp1} alt="mp1" />
            <div className="marketCardName">
              Integrated Identity Verification
            </div>
            <div className="marketCardPara">
              Verifies user identities, minimizing transaction fraud.{" "}
            </div>
          </div>

          <div
            className="marketCard"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <img src={mp5} alt="mp5" className="w-[70%!important]" />
            <div className="marketCardName">
              Blockchain with EVM Compatibility
            </div>
            <div className="marketCardPara">
              Our native blockchain offers full EVM compatibility, enabling
              seamless migration of real-world assets while delivering the
              scalability, security, and performance you need.
            </div>
          </div>
          {/* <div
            className="marketCard"
            data-aos="fade-left"
            data-aos-duration="700"
          >
            <img src={mp3} alt="mp3" />
            <div className="marketCardName">API-Driven Development </div>
            <div className="marketCardPara">
              Reltime offers over 260 APIs for seamless application development
              and integration. This technology enables developers to easily
              create and deploy applications that interact with the Reltime
              blockchain.{" "}
            </div>
          </div> */}
          <div className="lg:mb-20"></div>
          <img
            src={mp2}
            className="marketPath"
            data-aos="fade-up"
            data-aos-duration="700"
            alt="mp"
          />
          {/* <img
            src={mp4}
            className="marketPath2"
            alt="mp2"
            data-aos="fade-up"
            data-aos-duration="500"
          /> */}
        </div>
      </div>
      <div className="marketSpotLight"></div>
      <div className="marketLinearGradient"></div>
      {/* <div className="marketLinearGradientBlocker"></div> */}
    </section>
  );
};

export default MarketPlace;
