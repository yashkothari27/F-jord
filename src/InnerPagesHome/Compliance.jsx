const Compliance = () => {
  const ComplianceCard = [
    {
      heading: "Compliance & Regulatory Transparency",
      para: `Fjord Estate AS is committed to the highest standards of regulatory transparency and compliance. We operate a non-custodial blockchain-based platform for the fractional ownership of real estate. Our platform is fully designed to align with Norwegian and European legal frameworks, and we actively cooperate with relevant regulatory bodies.
  
  We specifically adhere to principles outlined by Finanstilsynet in regard to virtual asset services:
  👉 [https://www.finanstilsynet.no/konsesjon/virtuelle-valutatjenester/](https://www.finanstilsynet.no/konsesjon/virtuelle-valutatjenester/)
  
  Fjord Estate AS does not act as a broker-dealer, custodian, or financial advisor, and does not hold custody of customer funds or tokens at any time.`,
    },
    {
      heading: "Non-Custodial Architecture",
      para: `All digital assets (tokens representing fractional property ownership) are held directly by the user in self-managed wallets.
  Transactions are executed via smart contracts on Fjord Estate AS’s proprietary Layer 1 blockchain.
  Fjord Estate AS does not have the ability to unilaterally move or control user funds or tokens.
  Fiat conversions are handled through third-party payment providers at the user’s discretion.`,
    },
    {
      heading: "KYC / AML / Onboarding",
      para: `Fjord Estate AS has developed and operates its own proprietary KYC / AML onboarding system, designed to:
  
  - Ensure compliance with Norwegian AML laws and EU AML Directives
  - Maintain high standards of Know-Your-Customer verification
  - Maintain full audit trails for all identity checks and transactions
  - Support instant data access for regulatory audits upon request
  
  We offer regulators instant access to platform data via dedicated secure APIs and dashboards, providing:
  
  - Live visibility into transaction history
  - Full audit trail of onboarding and identity verification processes
  - Compliance reporting aligned with Norwegian and European standards`,
    },
    {
      heading: "Real-Time Regulator Access",
      para: `Fjord Estate AS proactively supports regulatory oversight. We provide authorized regulators with the ability to request and obtain real-time access to:
  
  - Transaction data on our Layer 1 blockchain
  - KYC and AML verification trails
  - Platform-wide compliance reporting
  
  Requests for regulator access should be directed to: [regulatory@fjord.estate](mailto:regulatory@fjord.estate)
  
  We are committed to ensuring that our platform is not used for illicit purposes, including but not limited to:
  
  - Money laundering
  - Terrorist financing
  - Sanctions evasion
  - Fraudulent activities`,
    },
    {
      heading: "International Cooperation",
      para: `As a global platform, Fjord Estate AS adheres to:
  
  - Norwegian law and regulations
  - European AML Directives
  - Applicable FATF guidelines
  
  We also monitor evolving regulatory frameworks and will update our compliance approach accordingly to maintain best practices.`,
    },
    {
      heading: "Legal Disclaimer",
      para: `Fjord Estate AS is not a licensed broker-dealer, financial advisor, or custodian, and does not provide investment advice or guarantees. All investments carry risk and may result in loss of capital. Users are solely responsible for their compliance with applicable laws in their respective jurisdictions.
  
  For questions regarding our compliance framework, please contact us at: [regulatory@fjord.estate](mailto:regulatory@fjord.estate)`,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 text-white md:px-14 xl:px-28 bg-default">
      <section id="compliance">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-accent md:text-5xl xl:text-6xl">
            Compliance & Transparency
          </h1>
          <p className="text-base font-medium md:text-xl">
            Our Commitment to Regulatory Oversight
          </p>
        </div>
        <div className="grid gap-6 xl:gap-10">
          {ComplianceCard.map((x, i) => (
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

export default Compliance;
