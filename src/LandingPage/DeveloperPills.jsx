const homeList = [
  "Layer 1 PoA Blockchain",
  "260+ APIs TPS > 37.000",
  "Transaction time < 1.8 sec",
  "Full KYC and Regulatory Compliant",
  "Zero Gas Fee",
  "Focus on Identity and Traceability",
];

const DevloperPills = () => {
  return (
    <div className="bg-[linear-gradient(to_top,var(--bg-light),var(--bg-default))] py-24 xl:pb-32">
      <div
        data-aos="fade-up"
        data-aos-duration="400"
        className="bg-[#52a5e440] z-10 w-[90%] sm:w-[98%] mx-auto p-3 lg:py-12 py-6 flex rounded-2xl md:rounded-[4rem] justify-center items-center
      
      "
      >
        <div
          className="flex flex-col justify-around w-full gap-5 px-10 sm:gap-4 sm:px-0 md:px-6 sm:flex-row "
          data-aos="fade-up"
          data-aos-duration="700"
        >
          {homeList.map((x, i) => (
            <div
              className=" 
              bg-[linear-gradient(300deg,_rgba(109,_246,_242,_0.4)_0%,_rgba(82,_165,_228,_0.4)_53.522481416401114%,_rgba(1,_2,_30,_0.4)_100%)] px-1 hover:scale-105 transition-all   duration-300 cursor-default lg:rounded-3xl xl:rounded-[1.8rem] xl:text-lg lg:text-base rounded-full sm:rounded-xl text-sm text-center flex items-center justify-center sm:px-2 sm:leading-[1.3rem!important] lg:px-5 py-3 sm:py-4 lg:py-5 text-white xl:w-[15rem] lg:w-[11.2rem] sm:w-[9rem] font-bold leading-[1rem!important] md:leading-[1rem]"
              key={i}
              // dangerouslySetInnerHTML={{ __html: x }}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevloperPills;
