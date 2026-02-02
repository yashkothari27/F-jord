import DOMPurify from "dompurify";
import blogData from "./BlogsData.jsx";
import { useParams, Link } from "react-router-dom";

const BlogsInner = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const blog = blogData.find((item) => item.slug === slug); // Find blog by slug

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg-default)] text-white">
        <div className="max-w-screen-md p-8 mx-auto text-center">
          <h1 className="text-[20vw] font-bold leading-none text-[var(--text-default)] md:text-[15vw] lg:text-[10vw] xl:text-[8vw]">
            404
          </h1>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Page Not Found
          </h2>
          <p className="mb-6 text-lg md:text-xl lg:text-2xl">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 mt-4 text-lg font-semibold text-white rounded-md bg-[var(--text-default)] hover:bg-[var(--bg-placehover)] transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-4 xl:px-16 md:p-8 xl:py-14
     bg-gradient-to-tl via-[#020324]
     from-[#52a5e4]/30 to-transparent
    "
    >
      <div className="pl-2 md:pl-4 mt-5 md:mt-2 mb-6 text-2xl md:text-5xl font-semibold border-l-4 border-l-[#52a5e4] md:leading-tight leading-6 rounded md:w-[75%] text-transparent bg-gradient-to-r from-[#52a5e4] to-white bg-clip-text ">
        {/* Does Stress Cause High Blood Pressure? What to Know */}
        {blog?.title}
      </div>

      <div className="flex flex-col gap-10 ">
        {blog?.introduction && (
          <div className="px-3 md:px-0">
            {/* <div className="flex flex-col gap-5 bg-purple-500"> */}
            <div className="text-sm md:text-lg">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blog?.introduction),
                }}
              ></p>
            </div>

            {/* <img
            src=""
            alt="blogInner"
            className="w-[80%] h-[20rem] rounded-lg mx-auto bg-orange-400"
          /> */}
          </div>
        )}

        <div className="">
          <div className="flex flex-col gap-10 md:gap-8">
            {blog?.content.map((x, i) => (
              <div
                key={i}
                className="px-4 py-2 bg-gradient-to-br from-[#090a33] to-[#52a5e4]/40 rounded-lg md:py-4 md:px-7 md:rounded-2xl"
              >
                <div className="pl-2 md:pl-4 my-2 md:my-4 text-xl md:leading-normal leading-6 md:text-4xl font-semibold text-transparent bg-gradient-to-r from-[#52a5e4] border-[#52a5e4] to-white bg-clip-text border-l-4 rounded">
                  {x.heading}
                </div>
                <p
                  className="text-sm md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(x.para),
                  }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsInner;
