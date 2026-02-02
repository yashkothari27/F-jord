const CookiePolicy = () => {
  const cookieData = [
    {
      heading: "What Are Cookies?",
      para: `Cookies are small text files stored on your device (computer, smartphone, tablet) when you visit a website. They help us remember your preferences, understand how our Site is used, and enhance functionality.`,
    },
    {
      heading: "Types of Cookies We Use",
      para: `**Strictly Necessary Cookies:**  
  Required for the operation of the Site. They enable basic functions such as page navigation and access to secure areas. These cookies cannot be disabled.
  
  **Performance & Analytics Cookies:**  
  Help us understand how visitors interact with the Site by collecting information anonymously (e.g., Google Analytics). This helps us improve the performance and usability of the Site.
  
  **Functionality Cookies:**  
  Remember your preferences (such as language selection) to provide a more personalized experience.
  
  We do not use marketing or advertising cookies.`,
    },
    {
      heading: "How to Manage Cookies",
      para: `You can control and manage cookies in your browser settings. Most browsers allow you to:
  
  - View what cookies are stored
  - Delete cookies
  - Block cookies from specific websites or all websites
  - Set preferences for cookie handling
  
  Please note that blocking certain types of cookies may impact the functionality and performance of our Site.
  
  For more detailed instructions, visit [www.aboutcookies.org](https://www.aboutcookies.org) or check your browser’s help documentation.`,
    },
    {
      heading: "Changes to this Cookie Policy",
      para: `We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. The latest version will always be posted on this page with the effective date.`,
    },
    {
      heading: "Contact",
      para: `If you have any questions about our use of cookies, please contact:  
  [regulatory@fjord.estate](mailto:regulatory@fjord.estate)`,
    },
  ];

  return (
    <div className="min-h-screen px-6 py-12 text-white md:px-14 xl:px-28 bg-default">
      <section id="cookie">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-accent md:text-5xl xl:text-6xl">
            Cookie Policy
          </h1>
          <p className="text-base font-medium md:text-xl">
            Learn how Fjord Estate uses cookies and how you can control them
          </p>
        </div>
        <div className="grid gap-6 xl:gap-10">
          {cookieData.map((x, i) => (
            <div
              key={i}
              className="p-6 transition-transform duration-300 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl hover:scale-[1.01] hover:bg-opacity-20"
            >
              <h2 className="mb-4 text-2xl font-bold text-blue-300 md:text-2xl xl:text-3xl">
                {x.heading}
              </h2>
              <div
                className="text-base font-medium leading-relaxed break-words whitespace-pre-line md:text-lg xl:text-xl"
                dangerouslySetInnerHTML={{
                  __html: x.para
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<span class="font-semibold text-accent">$1</span>'
                    )
                    .replace(
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

export default CookiePolicy;
