const Terms = () => {
  const TermsData = [
    {
      heading: "1. Acceptance of Terms",
      para: `Welcome to Fjord Estate AS (“Fjord Estate”, “we”, “our”, or “us”). By accessing or using our website (www.fjord.estate) and related services (collectively, the “Platform”), you (“User”, “you”) agree to comply with and be bound by these Terms of Service (“Terms”).

If you do not agree to these Terms, you may not access or use the Platform.`,
    },
    {
      heading: "2. Nature of the Platform",
      para: `Fjord Estate AS operates a non-custodial blockchain-based marketplace that enables users to acquire fractional ownership in real estate assets through tokenized representations.

We do not act as:

- A broker-dealer
- A financial advisor
- A custodian of funds or tokens
- A guarantee provider of returns or investment outcomes

We provide a technology platform only.`,
    },
    {
      heading: "3. Non-Custodial Model",
      para: `All digital assets transacted on the Platform are held directly in the User’s self-managed wallet. Fjord Estate AS does not and cannot take custody of User funds or tokens at any time.

Transactions occur via smart contracts on our proprietary Layer 1 blockchain. The User is solely responsible for managing their wallet keys and security.`,
    },
    {
      heading: "4. Eligibility",
      para: `By using the Platform, you represent and warrant that you:

- Are at least 18 years of age or the age of legal majority in your jurisdiction
- Have full power and authority to enter into these Terms
- Are not subject to sanctions or restrictions by any relevant government authority
- Will comply with all applicable local, national, and international laws and regulations

We may restrict access to the Platform in jurisdictions where such services are illegal.`,
    },
    {
      heading: "5. Regulatory Compliance",
      para: `Fjord Estate AS operates in compliance with applicable Norwegian and European regulations, including:

- Norwegian Anti-Money Laundering (AML) laws
- European AML Directives
- FATF guidelines

We maintain a proprietary KYC/AML onboarding system and provide regulators with real-time access to transaction and compliance data upon request.

Details: [https://www.finanstilsynet.no/konsesjon/virtuelle-valutatjenester/](https://www.finanstilsynet.no/konsesjon/virtuelle-valutatjenester/)`,
    },
    {
      heading: "6. User Responsibilities",
      para: `You are solely responsible for:

- Conducting your own due diligence before investing
- Understanding the risks associated with real estate investment and blockchain technology
- Managing your own wallet, keys, and tokens
- Complying with local legal and tax obligations

Fjord Estate AS does not provide legal, tax, or investment advice.`,
    },
    {
      heading: "7. Risks",
      para: `By using the Platform, you acknowledge and accept that:

- All investments involve risk and may result in loss of capital
- Real estate markets can be volatile and subject to regulatory changes
- Blockchain technology introduces technical and operational risks
- Past performance of any property is not indicative of future results

Fjord Estate AS makes no representations or warranties regarding investment performance or future valuations.`,
    },
    {
      heading: "8. Prohibited Conduct",
      para: `You agree not to:

- Use the Platform for illegal purposes
- Circumvent compliance procedures or KYC/AML checks
- Upload or distribute malware or harmful content
- Attempt unauthorized access to Platform systems
- Engage in fraudulent or deceptive activities

Violations may result in suspension or termination of Platform access and may be reported to relevant authorities.`,
    },
    {
      heading: "9. Intellectual Property",
      para: `All content on the Platform, including text, graphics, logos, and software, is the property of Fjord Estate AS or its licensors, protected by intellectual property laws.

You may not copy, modify, distribute, or create derivative works without prior written consent.`,
    },
    {
      heading: "10. Limitation of Liability",
      para: `To the fullest extent permitted by law, Fjord Estate AS shall not be liable for:

- Any loss of profits, revenue, or data
- Any indirect, incidental, or consequential damages
- Any damages resulting from the use of or inability to use the Platform

You use the Platform at your own risk.`,
    },
    {
      heading: "11. Indemnification",
      para: `You agree to indemnify and hold harmless Fjord Estate AS, its affiliates, and their respective officers, directors, and employees from any claims, damages, or expenses arising out of your use of the Platform or violation of these Terms.`,
    },
    {
      heading: "12. Modifications",
      para: `We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Platform. Continued use constitutes acceptance of the updated Terms.`,
    },
    {
      heading: "13. Termination",
      para: `We may suspend or terminate your access to the Platform at our discretion, without prior notice, for violations of these Terms or applicable law.`,
    },
    {
      heading: "14. Governing Law",
      para: `These Terms shall be governed by and construed in accordance with Norwegian law. Any disputes shall be subject to the exclusive jurisdiction of Norwegian courts.`,
    },
    {
      heading: "15. Contact",
      para: `For questions regarding these Terms or our compliance framework, contact:
Fjord Estate AS
Email: [regulatory@fjord.estate](mailto:regulatory@fjord.estate)`,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 text-white md:px-14 xl:px-28 bg-default">
      <section id="terms">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-accent md:text-5xl xl:text-6xl">
            Terms of Service
          </h1>
          <p className="text-base font-medium md:text-xl">
            Legal Terms for Using the Fjord Estate Platform
          </p>
        </div>
        <div className="grid gap-6 xl:gap-10">
          {TermsData.map((x, i) => (
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

export default Terms;
