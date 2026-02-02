const Disclaimer = () => {
  const DisclaimerCard = [
    {
      heading: "Regulatory & Risk Disclaimer",
      para: `This site is operated by Fjord Estate AS ([www.fjord.estate](https://www.fjord.estate)). Fjord Estate is a technology provider offering a blockchain-based platform for the fractional ownership of real estate. Fjord Estate is a non-custodial platform — users hold their assets directly through self-managed wallets, and Fjord Estate does not at any time take possession of customer funds or tokens.
  
  Fjord Estate AS is not a registered broker-dealer or investment advisor, nor does it provide investment advice, endorsements, or recommendations with respect to any properties listed on this site.
  
  Fjord Estate operates fully in compliance with applicable Norwegian and European regulations, including the regulatory framework related to virtual asset services as defined by Finanstilsynet:
  👉 [https://www.finanstilsynet.no/konsesjon/virtuelle-valutatjenester/](https://www.finanstilsynet.no/konsesjon/virtuelle-valutatjenester/)
  
  We actively cooperate with regulators and provide real-time access to platform data through our proprietary Layer 1 blockchain infrastructure. Authorized regulatory bodies can, upon request, receive instant access to our transaction layers and KYC/AML audit trails, ensuring full transparency and compliance monitoring.
  
  Nothing on this website should be construed as an offer to sell, a solicitation of an offer to buy, or a recommendation in respect of any security. Users are solely responsible for determining whether any investment, investment strategy, or related transaction is suitable for their personal investment objectives, financial circumstances, and risk tolerance. We strongly advise consulting with licensed legal professionals and investment advisors for any legal, tax, insurance, or investment guidance.
  
  Fjord Estate does not guarantee any investment performance, outcomes, or return of capital for any investment opportunity posted on this site. By accessing this site and its pages, you agree to be bound by the Terms of Service and Privacy Policy.`,
    },
    {
      heading: "Risk Notice",
      para: `All investments carry risk and may result in partial or total loss. By using this site, investors acknowledge that:
  
  - Investing in real estate, like other investment types, involves inherent risks and unpredictability;
  - The real estate market is subject to macroeconomic fluctuations and regulatory changes;
  - The properties you invest in may not produce the expected cash flow or perform as anticipated;
  - The value of any real property investment can decline at any time; future valuations are uncertain.
  
  Prospective investors should thoroughly review all available information and seek advice from qualified tax and legal advisors before making any investment decisions.
  
  Fjord Estate does not provide investment advice or recommendations regarding any offering listed on this website. All investment-related information provided is obtained from sources that Fjord Estate believes to be reliable; however, Fjord Estate does not make representations or warranties about its accuracy or completeness, and accepts no liability for it.`,
    },
    {
      heading: "Non-Custodial Model",
      para: `Transactions on the Fjord Estate Marketplace are conducted using digital currency and smart contracts on our proprietary blockchain. All digital assets are held in the user’s own wallet — Fjord Estate does not hold custody of user funds at any time.
  
  If you use a payment method other than fiat to submit a purchase order, you agree to convert your currency into an equivalent amount of USD at the current exchange rate. Your order will be executed in USD, a 1:1 digital representation of the US dollar on the blockchain, which may fluctuate in value. If your order is cancelled or expires, any unspent USD equivalent will be returned to your wallet.
  
  When submitting a sell order for your property tokens, and if the order is filled, you will receive payment in USD equivalent (e.g. USDC), which you may convert back to fiat through third-party services.`,
    },
    {
      heading: "Company Information",
      para: `Fjord Estate AS
  Homepage: [www.fjord.estate](https://www.fjord.estate)
  Regulatory Contact: [regulatory@fjord.estate](mailto:regulatory@fjord.estate)`,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 text-white md:px-14 xl:px-28 bg-default">
      <section id="disclaimer">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-accent md:text-5xl xl:text-6xl">
            Regulatory & Risk Disclaimer
          </h1>
          <p className="text-base font-medium md:text-xl">
            Regulatory & Risk Disclaimer for Fjord Estate Platform
          </p>
        </div>
        <div className="grid gap-6 xl:gap-10">
          {DisclaimerCard.map((x, i) => (
            <div
              key={i}
              className="p-6 transition-transform duration-300 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl hover:scale-[1.01] hover:bg-opacity-20"
            >
              <h2 className="mb-4 text-2xl font-bold text-blue-300 md:text-2xl xl:text-3xl">
                {x.heading}
              </h2>
              <div className="text-base font-medium leading-relaxed break-words break-all whitespace-pre-line md:text-lg xl:text-xl">
                <span
                  dangerouslySetInnerHTML={{
                    __html: x.para.replace(
                      /\[(.*?)\]\((.*?)\)/g,
                      '<a href="$2" class="underline text-accent hover:text-blue-500" target="_blank" rel="noopener noreferrer">$1</a>'
                    ),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
