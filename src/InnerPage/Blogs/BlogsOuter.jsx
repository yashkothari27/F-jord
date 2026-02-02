import DOMPurify from "dompurify";
import blogData from "./BlogsData.jsx";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

function truncateTextByWords(paragraph, wordLimit) {
  // Split the paragraph into an array of words
  const words = paragraph.split(" ");

  // Check if the paragraph has more words than the limit
  if (words.length > wordLimit) {
    // Join the words up to the word limit and add ellipsis
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  // If the word count is less than or equal to the limit, return the whole paragraph
  return paragraph;
}

const BlogsOuter = () => {
  return (
    // bg-gradient-to-br from-[#01021e] via-[#020324] to-[#52a5e4]
    <div
      className="xl:px-16 md:p-8 max-sm:pt-5 xl:py-14 px-6
    bg-gradient-to-tl via-[#020324]
     from-[#52a5e4]/30 to-transparent"
    >
      <div
        className="md:px-12 md:py-4 mx-auto w-max mb-5 md:mb-14 text-2xl md:text-5xl font-semibold text-transparent bg-gradient-to-r from-[#52a5e4] to-white bg-clip-text"
        data-aos="fade-up"
        data-aos-duration="400"
      >
        Fjord Educational Blog
      </div>
      <div className="flex flex-col justify-between gap-7 md:gap-5 lg:gap-12 md:flex-row">
        <div
          className="relative w-full overflow-hidden"
          data-aos="fade-left"
          data-aos-duration="500"
        >
          <img
            src={blogData[0]?.imgSRC}
            alt="placeholder"
            className="object-cover bg-gradient-to-tl via-[#020324] bg-[#52a5e4]
     from-[#52a5e4]/10 to-transparent w-full h-[15rem] md:h-[20rem] lg:h-[24rem] rounded-xl"
          />
          <div
            className="absolute p-3 text-black 
          bg-gradient-to-r from-[#52a5e4] to-white
          rounded-l-xl md:w-full lg:w-auto bottom-3 md:left-0 left-3 lg:left-3"
          >
            <div
              className="flex items-center gap-4 mb-2 text-[10px] md:text-sm"
              id="samakar"
            >
              <div
                className="px-2 md:px-3 py-1 md:py-2 text-xs md:text-xs xl:text-base lg:text-sm leading-4 sm:leading-3 text-white bg-[#020324] backdrop-blur-lg rounded-md md:rounded-lg"
                data-aos="fade-left"
                data-aos-duration="600"
              >
                {" "}
                Fjord RWA
              </div>
              <div className="" data-aos="fade-left" data-aos-duration="700">
                Jan 23 2025
              </div>
              <Link
                to={`/blog/${blogData[0]?.slug}`}
                className="flex leading-3 items-center gap-3 text-[10px] md:text-sm font-semibold text-blue-700 underline transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-1 decoration-transparent  hover:decoration-blue-400 w-max"
                data-aos="fade-left"
                data-aos-duration="800"
              >
                Read More in 10 Minutes <MoveRight />
              </Link>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-anchor="#samakar"
            >
              <Link
                className="text-sm font-semibold leading-tight underline transition-all duration-300 ease-in-out lg:leading-7 hover:text-blue-500 md:text-lg xl:text-2xl"
                to={`/blog/${blogData[0]?.slug}`}
              >
                {truncateTextByWords(blogData[0].title, 10)}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full">
          <div
            className="flex items-center gap-4 mb-5 md:mb-0 text-xl font-semibold md:text-2xl lg:text-3xl text-transparent bg-gradient-to-r from-[#52a5e4] to-white bg-clip-text"
            data-aos="fade-left"
            data-aos-duration="500"
          >
            <div className="bg-[#52a5e4] w-10 md:w-20 h-1 rounded"></div>
            News About Fjord
          </div>
          <div className="flex flex-col justify-between gap-8 md:gap-0 lg:gap-5 ">
            <div
              className="flex flex-col items-center gap-4 py-3 md:px-0 px-2 rounded-lg md:bg-none bg-gradient-to-br from-[#090a33] to-[#52a5e4]/30  md:py-0 md:items-start md:flex-row"
              data-aos="fade-down"
              data-aos-duration="400"
            >
              <img
                src={blogData[1]?.imgSRC}
                alt="blogsOuter50"
                className="object-cover bg-[#020324] bg-gradient-to-br from-[#52a5e4]/70 to-transparent  my-auto w-[70%] md:w-[30%] xl:w-[22%] rounded-xl"
              />
              <div className="flex w-full flex-col md:py-3 md:w-[80%] lg:w-[55%] xl:w-[65%] justify-center gap-3 text-sm">
                <div>
                  <Link
                    to={`/blog/${blogData[1]?.slug}`}
                    className="flex hover:decoration-white underline decoration-transparent transition-colors ease-in-out duration-300 items-center text-lg md:text-base lg:text-lg mb-2 pl-3 md:font-medium hover:border-l-white border-l-[#52a5e4] border-l-4 rounded"
                  >
                    <p className="hidden md:flex xl:hidden">
                      {truncateTextByWords(blogData[1]?.title, 4)}
                    </p>
                    <p className="flex md:hidden xl:flex">
                      {truncateTextByWords(blogData[1]?.title, 15)}
                    </p>{" "}
                  </Link>
                  <p
                    className="hidden pl-3 md:flex xl:hidden"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        truncateTextByWords(blogData[1]?.glimpse, 15)
                      ),
                    }}
                  ></p>
                  <p
                    className="flex pl-3 md:hidden xl:flex"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        truncateTextByWords(blogData[1]?.glimpse, 28)
                      ),
                    }}
                  ></p>
                </div>
                <Link
                  to={`/blog/${blogData[1]?.slug}`}
                  className="pl-4 text-xs text-blue-400 underline transition-all duration-300 ease-in-out cursor-pointer md:text-sm decoration-transparent hover:decoration-blue-400 w-max"
                >
                  Read More ...
                </Link>
              </div>
            </div>{" "}
            <div
              className="flex flex-col items-center gap-4 py-3 md:px-0 px-2  rounded-lg md:bg-none bg-gradient-to-br from-[#090a33] to-[#52a5e4]/30  md:py-0 md:items-start md:flex-row"
              data-aos="fade-down"
              data-aos-duration="600"
            >
              <img
                src={blogData[2]?.imgSRC}
                alt="blogsOuter50"
                className="object-cover bg-[#020324] bg-gradient-to-br from-[#52a5e4]/70 to-transparent  my-auto w-[70%] md:w-[30%] xl:w-[22%] rounded-xl"
              />
              <div className="flex w-full flex-col md:py-3 md:w-[80%] lg:w-[55%] xl:w-[65%] justify-center gap-3 text-sm">
                <div>
                  <Link
                    to={`/blog/${blogData[2]?.slug}`}
                    className="flex hover:decoration-white underline decoration-transparent transition-colors ease-in-out duration-300 items-center text-lg md:text-base lg:text-lg mb-2 pl-3 md:font-medium hover:border-l-white border-l-[#52a5e4] border-l-4 rounded"
                  >
                    <p className="hidden md:flex xl:hidden">
                      {truncateTextByWords(blogData[2]?.title, 5)}
                    </p>
                    <p className="flex md:hidden xl:flex">
                      {truncateTextByWords(blogData[2]?.title, 15)}
                    </p>
                  </Link>
                  <p
                    className="hidden pl-3 md:flex xl:hidden"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        truncateTextByWords(blogData[2]?.glimpse, 15)
                      ),
                    }}
                  ></p>
                  <p
                    className="flex pl-3 md:hidden xl:flex"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        truncateTextByWords(blogData[2]?.glimpse, 28)
                      ),
                    }}
                  ></p>
                </div>
                <Link
                  to={`/blog/${blogData[1]?.slug}`}
                  className="pl-4 text-xs text-blue-400 underline transition-all duration-300 ease-in-out cursor-pointer md:text-sm decoration-transparent hover:decoration-blue-400 w-max"
                >
                  Read More ...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-14">
        <div
          className="pl-4 mb-5 text-xl md:text-2xl lg:text-3xl font-medium  border-l-4 w-max  text-transparent bg-gradient-to-r from-[#52a5e4] to-white bg-clip-text border-l-[#52a5e4] 
        rounded"
        >
          Explore More
        </div>
        <div className="grid lg:grid-cols-2 gap-x-20 xl:gap-x-24 gap-y-12">
          {blogData.slice(3, 7).map((x, i) => (
            <div key={i} className="flex gap-4 pb-3 border-b md:gap-8 md:pb-7">
              <div className="flex flex-col gap-2">
                <img
                  src={blogData[i + 3]?.imgSRC}
                  alt="explore more"
                  className="object-cover w-[40rem] xl:h-full bg-[#020324] bg-gradient-to-br from-[#52a5e4]/70 to-transparent rounded-xl md:w-[33rem]  "
                />
                <div className="text-[10px] font-light md:text-sm">
                  Jan 23, 2025
                </div>
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <Link
                  className="font-normal leading-tight underline transition-colors duration-300 ease-in-out decoration-transparent hover:decoration-white md:text-2xl md:leading-7"
                  to={`/blog/${blogData[i + 3]?.slug}`}
                >
                  {truncateTextByWords(blogData[i + 3]?.title, 15)}
                </Link>
                <div className="text-[10px] font-light md:text-sm">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        truncateTextByWords(blogData[i + 3]?.glimpse, 38)
                      ),
                    }}
                  ></p>
                </div>
                <Link
                  to={`/blog/${blogData[i + 3]?.slug}`}
                  className="flex items-center gap-3 mt-auto text-[10px] lg:text-xs md:text-sm font-semibold text-blue-400 underline transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-1 decoration-transparent hover:decoration-blue-400 w-max"
                >
                  Read More in 10 Minutes <MoveRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-14">
        <div className="pl-4 mb-5 text-xl md:text-2xl lg:text-3xl font-medium  border-l-4 w-max text-transparent bg-gradient-to-r from-[#52a5e4] to-white bg-clip-text border-l-[#52a5e4] rounded">
          Explore More in Detail
        </div>

        <div className="flex flex-col gap-8 md:gap-14">
          {blogData.slice(7).map((x, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 pb-4 border-b md:pb-10 md:flex-row md:gap-8 xl:gap-14"
            >
              <div className="flex flex-col gap-2">
                <img
                  src={blogData[i + 7]?.imgSRC}
                  alt="explore more"
                  className="object-cover rounded-xl bg-[#020324] bg-gradient-to-br from-[#52a5e4]/70 to-transparent  h-[10rem] md:h-[14rem] md:w-[17rem] xl:w-[25rem]"
                />
              </div>
              <div className="flex xl:w-[50%] md:w-[80%] flex-col gap-1 md:gap-2">
                <Link
                  className="text-xl font-normal leading-tight underline duration-300 ease-in-out md:leading-normal md:text-2xl lg:text-3xl decoration-transparent hover:decoration-white"
                  to={`/blog/${blogData[i + 7]?.slug}`}
                >
                  {truncateTextByWords(blogData[i + 7]?.title, 20)}
                </Link>
                <div className="text-xs font-light md:text-base">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        truncateTextByWords(blogData[i + 7]?.glimpse, 52)
                      ),
                    }}
                  ></p>
                </div>
                <div className="mt-auto">
                  <div className="text-xs font-light md:text-sm ">
                    Jan 23, 2025
                  </div>
                  <Link
                    to={`/blog/${blogData[i + 7]?.slug}`}
                    className="flex items-center gap-3 mt-auto text-xs font-semibold text-blue-400 underline transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-1 md:text-base decoration-transparent hover:decoration-blue-400 w-max"
                  >
                    Read More in 10 Minutes <MoveRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsOuter;
