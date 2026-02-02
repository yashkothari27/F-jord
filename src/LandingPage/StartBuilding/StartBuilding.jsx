import "./StartBuilding.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import startSVG from "../../assets/SVG/startBuilding.svg";
import ComingSoon from "../ComingSoon";

const StartBuilding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const innerPageUrl = import.meta.env.VITE_APP_INNERPAGE_URL;

  return (
    <section id="start" className="startBox">
      <div className="startCard" data-aos="fade-up" data-aos-duration="500">
        <div className="startLHS">
          <div
            className="startCardName"
            data-aos="fade-right"
            data-aos-duration="600"
            id="caferUp"
          >
            Start building wealth for wherever your journey takes you
          </div>
          <div
            className="startCardPara"
            data-aos="fade-right"
            data-aos-duration="700"
            data-aos-anchor="#caferUp"
          >
            Don’t get left behind. Start investing in fractional real estate.
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-anchor="#caferUp"
          >
            {/* <button className="startCardBtn">View properties</button> */}
            {/* <Link to="/dashboard"> */}
            {/* onClick={openModal} */}
            <a
              href="/pdf/outlierVenture.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="startCardBtn">See Outlier Venture</button>
              {/* </Link>{" "} */}
            </a>
          </div>
        </div>
        <div className="startRHS">
          <div
            className="startColorLight1"
            data-aos="fade-left"
            data-aos-duration="300"
          ></div>
          <div
            className="startColorLight2"
            data-aos="fade-left"
            data-aos-duration="400"
          ></div>
          <img
            src={startSVG}
            alt="startSVG"
            data-aos="fade-left"
            data-aos-duration="700"
          />
        </div>
      </div>
      <ComingSoon isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default StartBuilding;
