import bsv from "../assets/Images/bsv.jpg";
const stats = [
  // { value: "L1", label: "Blockchain" },
  { value: "500", label: "API" },
  {
    value: "1M",
    label: "TPS",
  },
  {
    value: "LOW",
    label: "Gas Fee",
  },
  {
    value: "KYC",
    label: "Regulatory",
  },
  {
    value: "ID",
    label: "Transparency",
  },
  // { value: "10", label: "Supported Chains" },
  // { value: "102", label: "Integrated Projects" },
  // {
  //   value: "80%",
  //   label: (
  //     <>
  //       Yieldcoin Market Share<sup>1</sup>
  //     </>
  //   ),
  // },
  // { value: "$1B", label: "TVL" },
];

const StatsSection = () => {
  return (
    <section className="px-6 py-24 text-white bg-default md:px-12 xl:px-10 bg-[linear-gradient(to_top,var(--bg-light),var(--bg-default))]">
      <div className="">
        <div className="flex items-center gap-5 mb-10 max-sm:flex-col md:mb-16">
          <h2
            className="xl:w-[30%] md:w-[50%]  md:leading-none  text-xl font-semibold md:text-2xl"
            data-aos="fade-up"
            data-aos-duration="400"
          >
            Fjord is building the foundation for the future of finance.
          </h2>
          {/* <div
            className="flex items-center gap-4 px-6 py-3 border bg-white/10 backdrop-blur-lg rounded-xl border-white/20"
            data-aos="fade-up"
            data-aos-duration="400"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-white/70 whitespace-nowrap">
              Powered by
              <a
                href="https://bsvassociation.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block group"
              >
                <span className="text-base md:text-lg font-semibold text-[#52a5e4] tracking-wide">
                  BSV
                </span>
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#52a5e4] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </span>

            <a
              href="https://bsvassociation.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={bsv} // Replace with actual path
                alt="BSV Logo"
                className="w-auto h-12 hover:scale-[.95] transition-transform duration-300 ease-in-out rounded-xl md:h-20"
              />
            </a>
          </div> */}
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-10 md:text-left"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="font-semibold text-center text-7xl odosansBold xl:text-7xl">
                {stat.value}
              </div>
              <div className="mt-3 text-xl font-normal leading-snug text-center md:mt-7 arizona md:text-2xl">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    //  <section className="relative w-full px-6 py-32 bg-default text-white md:px-12 xl:px-10 bg-[linear-gradient(to_top,var(--bg-light),var(--bg-default))]">
    //   <div className="flex items-center justify-center w-full">
    //     <div className="flex flex-col items-center justify-center gap-6 py-10 rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_4px_60px_rgba(255,255,255,0.1)] max-w-2xl w-full">
    // <div className="text-2xl font-semibold tracking-wider text-center md:text-4xl text-white/90">
    //   Powered by BSV
    // </div>

    // <div className="flex items-center justify-center gap-6">
    //   <img
    //     src={bsv}
    //     alt="BSV Logo"
    //     className="w-auto h-16 shadow-md md:h-24 rounded-2xl"
    //   />
    // </div>
    //     </div>
    //   </div>
    // </section>
    //
    // <section className="px-6 py-24 text-white bg-default md:px-12 xl:px-10 bg-[linear-gradient(to_top,var(--bg-light),var(--bg-default))]">
    //   <div className="flex items-center justify-center w-full">
    //     <div className="flex items-center justify-center gap-6 px-10 py-10 border shadow-xl flexcol rounded-3xl bg-white/10 backdrop-blur-xl border-white/20">
    //       <div className="flex items-center justify-center text-lg font-medium tracking-wider md:text-2xl text-white/80">
    //         Powered by BSV

    //       </div>
    //       <div className="flex items-center gap-4">
    //         <img
    //           src={bsv} // path to BSV logo
    //           alt="BSV Logo"
    //           className="w-auto h-12 rounded-xl md:h-32"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default StatsSection;
