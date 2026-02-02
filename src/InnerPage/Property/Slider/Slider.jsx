import { X } from "lucide-react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./Slider.css";

const Slider = ({ images, iFrameModalLink }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // inside your component:
  const [mainSwiper, setMainSwiper] = useState(null);
  // const images = [ap1, ap2, ap3, ap4, ap5, ap6, ap7, ap8];

  const openPopup = (index) => {
    setActivePhotoIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setThumbsSwiper(null);
  };

  return (
    <div>
      {/* Initial Display */}
      <div className="flex gap-3">
        <div className="w-full sm:flex hidden rounded-l-2xl bg-neutral300 md:h-[320px] xl:h-[400px]">
          {iFrameModalLink ? (
            <iframe
              // src="https://experience.arcgis.com/experience/0a342b82027442d2ba68398e7fcb7810/page/3D-Scene/"
              src={iFrameModalLink}
              title="3D Scene"
              className="object-cover w-full h-full rounded-l-2xl"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              // src="https://experience.arcgis.com/experience/0a342b82027442d2ba68398e7fcb7810/page/3D-Scene/"
              src={images[0]}
              title="Fullscreen"
              loading="lazy"
              onClick={() => openPopup(0)}
              className={` w-full h-full transition-all duration-300 ease-in-out bg-gray-900 cursor-pointer hover:opacity-70 ${
                images?.length > 1
                  ? "object-cover rounded-l-2xl"
                  : "object-contain rounded-2xl"
              }`}
            ></img>
          )}
        </div>
        {images?.length > 1 && (
          <div className="relative w-full gap-3 sm:grid sm:grid-cols-2 sm:grid-rows-2">
            {images?.slice(1, 5).map((src, index) => (
              <img
                key={index}
                src={src}
                loading="lazy"
                alt={`Property view ${index + 1}`}
                className={`w-full hidden sm:flex object-cover cursor-pointer hover:opacity-70 transition-all ease-in-out duration-300 bg-gray-500 md:h-[150px] xl:h-[190px] sm:h-[250px] ${
                  index === 1 ? "rounded-tr-2xl" : ""
                } ${index === 3 ? "rounded-br-2xl" : ""}`}
                onClick={() => openPopup(index + 1)}
              />
            ))}
            <button
              className="absolute z-0 items-center justify-center hidden gap-3 px-3 py-1 text-sm rounded-xl sm:flex w-max bottom-2 right-2 hover:bg-white hover:text-black"
              onClick={() => openPopup(0)}
            >
              View All Photos
            </button>
            <div className="sm:hidden">
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                loop={true}
                freeMode={true}
                navigation={true}
                modules={[Pagination, Navigation]}
              >
                {images?.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="cursor-pointer">
                      <img
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-contain w-full h-56 transition-all ease-in-out bg-gray-400 rounded-lg shadow-white hover:opacity-60"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>{" "}
          </div>
        )}

        {images?.length === 1 && (
          <div className="m-auto sm:hidden">
            <img
              src={images[0]}
              title="Fullscreen"
              loading="lazy"
              onClick={() => openPopup(0)}
              className="object-contain w-full h-56 transition-all duration-300 ease-in-out bg-gray-900 cursor-pointer hover:opacity-70 rounded-xl"
            />
          </div>
        )}
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full max-h-screen overflow-hidden bg-black bg-opacity-85 z-[9000]"
          onClick={closePopup}
        >
          <div
            className="w-11/12 p-5 rounded-lg bg-[#0000009c] max-w-8xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute p-3 text-lg font-bold rounded-full hover:bg-[#01021e] top-4 left-4"
              onClick={closePopup}
            >
              <X />
            </button>

            <Swiper
              pagination={{ type: "fraction" }}
              navigation={true}
              loop={true}
              modules={[Pagination, Navigation, Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              initialSlide={activePhotoIndex}
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) =>
                setActivePhotoIndex(swiper.activeIndex)
              }
              className="mb-4 rounded-lg"
            >
              {images?.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center bg-gray-200 rounded-lg h-[80vh] sm:h-[75vh]">
                    <img
                      src={src}
                      alt={`Property view ${index + 1}`}
                      className="object-contain h-full w-max"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={5}
              loop={true}
              freeMode={true}
              watchSlidesProgress={true}
              // remove slideToClickedSlide and allowTouchMove false for now, we do manual click
              className="mySwiper"
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {images?.map((src, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (mainSwiper) {
                        mainSwiper.slideToLoop(index); // use slideToLoop for looping support
                      }
                    }}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      className={`object-cover w-56 h-10 transition-all ease-in-out border border-gray-400 sm:h-24 shadow-white hover:opacity-60 ${
                        activePhotoIndex === index ? "border-yellow-400" : ""
                      }`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
