import { Quote } from "lucide-react";
import larryImage from "../assets/Images/Larry/larry.jpg";

const Larry = () => {
  return (
    <div className="min-h-[85vh] md:min-h-[65vh] lg:min-h-[85vh] xl:min-h-[85vh] mb-20 relative flex flex-col md:flex-row text-white bg-[linear-gradient(to_bottom,var(--bg-light),var(--bg-default))]">
      {/*  */}
      <div
        className="lg:w-[400px] md:h-[320px] md:w-[320px] h-[300px] w-[300px] z-10 md:absolute max-md:ml-auto bg-gray-300 right-0 top-0 lg:h-[400px]"
        data-aos="fade-left"
        data-aos-duration="400"
        style={{
          clipPath: "polygon(12% 0, 100% 0, 100% 89%, 77% 99%, 0 79%, 0 10%)",
          WebkitClipPath:
            "polygon(12% 0, 100% 0, 100% 89%, 77% 99%, 0 79%, 0 10%)",
        }}
      >
        <img
          src={larryImage}
          alt="Clipped"
          className="object-cover w-full h-full bg-gray-500 grayscale"
        />
      </div>
      {/* Right Quote + Image */}
      <div
        className="md:absolute bottom-0 right-0 flex flex-col items-center justify-center md:w-[45%]"
        data-aos="fade-up"
        data-aos-duration="400"
      >
        <div className="md:absolute -top-20 left-[5rem]">
          <Quote className="w-10 h-10 rotate-180 md:w-20 md:h-20 fill-accent stroke-none" />
        </div>
        <div className="relative max-w-md px-10 py-3 md:py-10 md:border-l-2 border-accent">
          <p className="mb-4 text-2xl italic font-bold md:text-4xl text-accent">
            Tokenization of securities will be the next generation in markets.
          </p>
          <p className="text-sm font-semibold text-gray-400">
            – Larry Fink, chief executive officer of BlackRock Inc.
          </p>
        </div>
      </div>
      {/* Left Text Section */}
      <div
        className="flex flex-col justify-center max-md:px-10 md:pl-10 lg:pl-20 max-md:pt-5 space-y-6 font-normal md:w-[50%] lg:w-[55%]"
        data-aos="fade-right"
        data-aos-duration="400"
      >
        <p className="leading-relaxed md:text-xl">
          Fjord will revolutionize the $300 trillion property market through our
          suite of revolutionary financial solutions. We make investing into
          real estate affordable and accessible for everyone, everywhere.
        </p>

        <p className="leading-relaxed md:text-xl">
          Through blockchain technology we will be able to change the landscape
          of real estate investing, lending and ownership. The Fjord portfolio
          breaks down entry barriers, and puts the power of financials back into
          the hands of investors.
        </p>

        <p className="leading-relaxed md:text-xl">
          The Fjord ecosystem will work with token for every property (so
          unlimited) and a FJORD tokens we will list on major exchange.
        </p>
      </div>
    </div>
  );
};

export default Larry;
