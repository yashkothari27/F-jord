// import { useState } from "react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     fullName: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Form submission logic
//   };

//   return (
//     <div className="bg-[var(--bg-default)] min-h-screen text-gray-100 flex items-center justify-center">
//       <div className="max-w-lg w-[80%] p-8 rounded-lg bg-[var(--bg-light)] border border-[#52a5e4]  ">
//         <h2 className="mb-6 text-2xl font-semibold text-gray-100">
//           Contact Us
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="companyName" className="text-sm text-gray-200">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="companyName"
//               id="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 bg-[var(--bg-default)] border border-gray-600 rounded focus:border-gray-400 focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="fullName" className="text-sm text-gray-200">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="fullName"
//               id="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 bg-[var(--bg-default)] border border-gray-600 rounded focus:border-gray-400 focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="text-sm text-gray-200">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 bg-[var(--bg-default)] border border-gray-600 rounded focus:border-gray-400 focus:outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="message" className="text-sm text-gray-200">
//               Message
//             </label>
//             <textarea
//               name="message"
//               id="message"
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full mt-1 px-4 py-2 bg-[var(--bg-default)] border border-gray-600 rounded focus:border-gray-400 focus:outline-none"
//               rows="4"
//               required
//             ></textarea>
//           </div>
//           <div
//             type="submit"
//             className="w-full cursor-pointer text-center  py-3 text-white bg-[var(--text-default)] rounded hover:bg-opacity-90 transition duration-200"
//           >
//             Submit
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState } from "react";
import "./ContactUs.css";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

import twitter from "../assets/SVG/twitter.svg";
import youtube from "../assets/SVG/youtube.svg";
import telegram from "../assets/SVG/telegram.svg";
import linkedin from "../assets/SVG/linkedin.svg";

function ContactUs() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    companyname: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const mailtoLink = `mailto:laak@fjord-estate.com?subject=Contact from ${formData.firstname} ${formData.lastname}&body=Company: ${formData.companyname}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
  };
  return (
    <div className="contactUs" id="contact">
      <section className="leftcontainer ">
        <div className="leftRow">
          <h1>Contact Us</h1>
          <p>
            Feel free to get in touch with us. We are always open to discussing
            new projects, creative ideas, or opportunities to be part of your
            vision.
          </p>
        </div>
        {/* <div className="leftRow">
          <a className="phone" href="tel:+919865149951">
            <Phone />
            <div className="c1">+91-9865149951</div>
          </a>
          <a className="mail" href="support@ison.house">
            <Mail />
            <div className="c1">support@ison.house</div>
          </a>
          <a
            className="location"
            href="https://www.google.com/maps/place/102+Street+4657+Road"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin />
            <div className="c1">102 Street 4657 Road</div>
          </a>
        </div> */}
        <div className="leftRow">
          {/* <div className="footerIcons"> */}
          {/* <a href="https://t.me/reltimedefiecosystem">
              <img src={telegram} alt="telegram" />
            </a>
            <a href="https://x.com/reltime_rtc">
              <img src={twitter} alt="twitter" />
            </a>
            <a href="https://www.youtube.com/channel/UC6SnxjWCho9XiD-McvbtgZQ">
              {" "}
              <img src={youtube} alt="YouTube" />
            </a> */}
          {/* <a href="https://www.linkedin.com/company/reltimedefi/">
              {" "}
              <img src={linkedin} alt="LinkedIn" />
            </a> */}
          {/* </div> */}
        </div>
      </section>
      <section className="rightcontainer">
        <div className="rightContainerBox">
          <h6>Contact Information</h6>
          <form onSubmit={handleSubmit}>
            <div className="rows">
              <div className="inputgroup customContact">
                <input
                  type="text"
                  name="firstname"
                  placeholder=" "
                  id="firstname"
                  required
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="inputgroup customContact">
                <input
                  type="text"
                  name="lastname"
                  placeholder=" "
                  id="lastname"
                  required
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <label htmlFor="lastname">Last Name</label>
              </div>
            </div>
            <div className="rows">
              <div className="inputgroup customContact">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputgroup customContact">
                <input
                  type="text"
                  name="companyname"
                  placeholder=" "
                  id="companyname"
                  required
                  value={formData.companyname}
                  onChange={handleChange}
                />
                <label htmlFor="companyname">Company Name</label>
              </div>
            </div>
            <div className="messagegroup customContact">
              <textarea
                name="message"
                placeholder=" "
                id="message"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="message">Have any message / Queries?</label>
            </div>
            <div className="submiter">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
