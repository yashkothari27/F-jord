import "./Compare.css";
import compareImage from "../../assets/Images/compare.png";

const Compare = () => {
  const compareCardData = [
    {
      name: "Reltime vs. Arrived Homes",
      bgPicture: compareImage,
      aosSpeed: 400,
      aosDirection: "fade-right",
    },
    {
      name: "Reltime vs. Arrived Homes",
      bgPicture: compareImage,
      aosSpeed: 400,
      aosDirection: "fade-left",
    },
    {
      name: "Reltime vs. Arrived Homes",
      bgPicture: compareImage,
      aosSpeed: 500,
      aosDirection: "fade-right",
    },
    {
      name: "Reltime vs. Arrived Homes",
      bgPicture: compareImage,
      aosSpeed: 500,
      aosDirection: "fade-left",
    },
  ];

  return (
    <section id="compare" className="compareBox">
      <div className="compareContainer">
        <div
          className="compareHeading"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          Compare Reltime
        </div>
        <div className="compareCardBox">
          {compareCardData.map((card, index) => (
            <div
              className="compareCard"
              data-aos={card.aosDirection}
              data-aos-duration={card.aosSpeed}
              style={{ backgroundImage: `url(${card.bgPicture})` }}
              key={index}
            >
              <div className="compareCardName">{card.name}</div>
            </div>
          ))}
        </div>
        <div data-aos="fade-up" data-aos-duration="400">
          <button className="compareBtn">View all comparison</button>
        </div>
      </div>
    </section>
  );
};

export default Compare;
