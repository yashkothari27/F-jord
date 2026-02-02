const Policy = () => {
  const policyData = [
    {
      heading: "1. Data Controller",
      para: `The data controller responsible for your personal data is:

Fjord Estate AS
www.fjord.estate
Email: [regulatory@fjord.estate](mailto:regulatory@fjord.estate)`,
    },
    {
      heading: "2. Data We Collect",
      para: `We collect the following categories of personal data:

- Identity Information: Name, date of birth, nationality, national ID/passport number
- Contact Information: Email address, phone number, physical address
- Financial Information: Bank account details (where applicable), payment information
- KYC/AML Data: Documents and verification data required for compliance
- Usage Data: IP address, browser type, device information, and website interaction data`,
    },
    {
      heading: "3. How We Collect Data",
      para: `We collect data in the following ways:

- Directly from you during registration and onboarding (KYC/AML process)
- When you interact with our website or contact our support team
- Through cookies and similar technologies (see Section 7)
- From third-party identity verification providers as part of our compliance process`,
    },
    {
      heading: "4. Purposes of Data Processing",
      para: `We process your personal data for the following purposes:

- To comply with applicable KYC/AML laws and regulatory requirements
- To provide access to the Platform and enable transactions
- To prevent fraud, money laundering, terrorist financing, and other illegal activities
- To communicate with you about your account and transactions
- To improve our services and user experience
- To comply with legal obligations and respond to requests from regulators`,
    },
    {
      heading: "5. Legal Basis for Processing",
      para: `Our processing of personal data is based on:

- Compliance with legal obligations (AML/KYC requirements under Norwegian and EU law)
- Performance of our contractual relationship with you
- Legitimate interests in ensuring the security and proper functioning of the Platform
- Your consent, where required`,
    },
    {
      heading: "6. Data Sharing",
      para: `We may share your data with:

- Regulatory authorities upon lawful request (including real-time access as described on our Compliance page)
- Third-party service providers that assist us in verifying identities and conducting KYC/AML checks
- Payment service providers for processing transactions
- Legal and professional advisors where necessary to comply with legal obligations

We will never sell your personal data to third parties.`,
    },
    {
      heading: "7. Cookies and Tracking Technologies",
      para: `We use cookies and similar technologies to:

- Analyze website traffic and usage patterns
- Provide a better user experience
- Ensure website security

You can manage your cookie preferences through your browser settings.`,
    },
    {
      heading: "8. Data Retention",
      para: `We retain personal data only for as long as necessary to fulfill the purposes described in this Privacy Policy, including to comply with legal obligations and regulatory requirements.

In general:

- KYC/AML data will be retained for a minimum of 5 years after the end of your relationship with us, as required by Norwegian law.
- Other data will be retained as long as necessary for the legitimate purposes outlined above.`,
    },
    {
      heading: "9. Data Security",
      para: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, misuse, or alteration.

However, no system can guarantee absolute security. You are responsible for safeguarding your wallet keys and login credentials.`,
    },
    {
      heading: "10. International Transfers",
      para: `We primarily store your data within the European Economic Area (EEA). If data is transferred outside the EEA, we ensure that appropriate safeguards are in place.`,
    },
    {
      heading: "11. Your Rights",
      para: `Under the GDPR, you have the following rights:

- Right to access your personal data
- Right to rectify inaccurate data
- Right to erase your data (subject to legal and compliance obligations)
- Right to restrict processing
- Right to data portability
- Right to object to certain processing
- Right to lodge a complaint with a supervisory authority (Datatilsynet in Norway)

To exercise your rights, contact: [regulatory@fjord.estate](mailto:regulatory@fjord.estate)`,
    },
    {
      heading: "12. Changes to this Privacy Policy",
      para: `We may update this Privacy Policy from time to time. The latest version will always be posted on our website with the effective date.`,
    },
    {
      heading: "13. Contact",
      para: `If you have questions about this Privacy Policy or our data practices, please contact:
[regulatory@fjord.estate](mailto:regulatory@fjord.estate)`,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 text-white md:px-14 xl:px-28 bg-default">
      <section id="policy">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-accent md:text-5xl xl:text-6xl">
            Privacy Policy
          </h1>
          <p className="text-base font-medium md:text-xl">
            How Fjord Estate handles your personal data
          </p>
        </div>
        <div className="grid gap-6 xl:gap-10">
          {policyData.map((x, i) => (
            <div
              key={i}
              className="p-6 transition-transform duration-300 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl hover:scale-[1.01] hover:bg-opacity-20"
            >
              <h2 className="mb-4 text-2xl font-bold text-blue-300 md:text-2xl xl:text-3xl">
                {x.heading}
              </h2>
              <div
                className="text-base font-medium leading-relaxed break-words break-all whitespace-pre-line md:text-lg xl:text-xl"
                dangerouslySetInnerHTML={{
                  __html: x.para.replace(
                    /\[(.*?)\]\((.*?)\)/g,
                    '<a href="$2" class="underline text-accent hover:text-blue-500" target="_blank" rel="noopener noreferrer">$1</a>'
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Policy;
