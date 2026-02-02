import "./Learn.css";
import learn from "../../assets/Images/Learn/learn.jpg";
import learn1 from "../../assets/Images/learn1.png";
// import learn2 from "../../assets/Images/learn2.png";
// import learn3 from "../../assets/Images/learn3.png";
// import learn4 from "../../assets/Images/learn4.png";
import LineChart from "../LineChart";

const Learn = () => {
  const learnCardsData = [
    {
      imgSrc: learn1,
      aosSpeed: 400,
      aosDirection: "fade-right",
      name: "What Are Real World Assets And How DeFi Boosts Commercial Real Estate",
      para: null,
      chartTitle: "Projected Token Value Growth",
      chartYAxis: [0.018, 0.036, 0.072],
      max: 0.07,
      chartXAxis: [1, 2, 3],
      isChart: false,
      mainImg: learn,
      ahref:
        "https://www.forbes.com/sites/digital-assets/2023/10/05/what-are-real-world-assets-and-how-defi-boosts-commercial-real-estate/",
    },
    // {
    //   imgSrc: learn2,
    //   aosSpeed: 600,
    //   aosDirection: "fade-right",
    //   name: "Potential for Higher Returns",
    //   para: "The potential for even higher returns exists beyond the initial doubling, based on market demand and project success.",
    //   chartTitle: "Potential Token Value Growth",
    //   chartYAxis: [0.01, 0.03, 0.08, 0.15, 0.29],
    //   max: 0.29,
    //   chartXAxis: [1, 2, 3, 4, 5],
    // },
    // {
    //   imgSrc: learn3,
    //   aosSpeed: 900,
    //   aosDirection: "fade-left",
    //   name: "Market Demand and Adoption",
    //   para: "The token's success depends on its adoption and market demand, which will influence its future value and potential for growth.",
    //   chartTitle: "Token Adoption Rate",
    //   max: 500,
    //   chartYAxis: [100, 200, 300, 400, 500],
    //   chartXAxis: [1, 2, 3, 4, 5],
    // },
  ];

  return (
    <section id="learn" className="learnBox">
      <div className="learnContainer">
        <div
          className="learnHeading odosansBold"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          Global Markets for Real-World Assets. Powered by Fjord’s Blockchain
          Innovation
        </div>

        <div className="learnPara" data-aos="fade-up" data-aos-duration="600">
          Fjord turns physical value into instantly tradable blockchain tokens.
          Access global real estate, land, and infrastructure markets without
          borders or barriers.{" "}
          <strong>
            {" "}
            Invest fractionally. Trade globally. Control your assets — with
            Fjord. <br></br>
          </strong>
        </div>
        <div className="learnCardBox">
          {learnCardsData.map((card, index) => (
            <div
              className="learnCard"
              data-aos={card?.aosDirection}
              data-aos-duration={card?.aosSpeed}
              key={index}
            >
              {/* <img src={card?.imgSrc} alt={`learn${index + 1}`} /> */}
              <div className="learnCardLHS">
                <a
                  href={card?.ahref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learnCardName"
                >
                  {card?.name}
                </a>
                <a
                  href={card?.ahref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learnCardPara"
                >
                  {card?.para}
                </a>
              </div>
              {card?.isChart ? (
                <div className="leanCardCharts">
                  <LineChart
                    max={card?.max}
                    data={card?.chartYAxis}
                    categories={card?.chartXAxis}
                    title={card?.chartTitle}
                    gridOptions={{
                      strokeDashArray: 6,
                      borderColor: "#c0c0c0",
                    }}
                  />
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl group w-[100%] lg:w-[100%]">
                  <a
                    href={card?.ahref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="object-cover w-full transition-all duration-300 ease-in-out group-hover:opacity-70 rounded-xl group-hover:scale-105"
                      src={card?.mainImg}
                      alt="learn"
                    />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="LearnSpotLight"></div>
    </section>
  );
};

export default Learn;
