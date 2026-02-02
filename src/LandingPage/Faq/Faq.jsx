import "./Faq.css";
import { NavLink } from "react-router-dom";

const Faq = () => {
  const faqCardsData = [
    {
      name: "Learn More about Fjord",
      src: "/fjord",
      aosSpeed: 800,
      questions: ["About Fjord", "Learn more on the technology behind"],
    },
    {
      name: "FAQ",
      src: "/faqs",
      aosSpeed: 600,
      questions: [
        "What is the minimum investment I can make?",
        "How long will it take for me to make a profit on my investment?",
      ],
    },
    {
      name: "Learn More",
      src: "/learnMore",
      aosSpeed: 400,
      questions: [
        "A Secure Choice",
        "What is Real World Asset (RWA)?",
        "Norway is rich",
      ],
    },
  ];

  return (
    <section id="faq" className="faqBox">
      <div className="faqContainer">
        <div className="faqCardBox">
          {faqCardsData.map((card, index) => (
            <div
              className="faqCard"
              key={index}
              data-aos="fade-right"
              data-aos-duration={card.aosSpeed}
            >
              <div className="faqCardName">{card.name}</div>
              <div className="faqCardPara">
                {card.questions.map((question, questionIndex) => (
                  <NavLink
                    to={
                      question === "What is Real World Asset (RWA)?"
                        ? "/rwa"
                        : card.src
                    }
                    key={questionIndex}
                    className="faqCardQuestion"
                    // target="_blank"
                    // rel="noopener noreferrer"
                  >
                    {question}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </section>
  );
};

export default Faq;
