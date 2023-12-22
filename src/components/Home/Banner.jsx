import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Banner = () => {
  useEffect(() => {
    AOS.init({});
  }, []);
  return (
    <div>
      {/* Text Section */}
      <div className="mt-20 flex justify-center items-center flex-col ">
        <h1
          className="2xl:text-8xl lg:text-7xl text-6xl text-center"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="800"
        >
          Efficient Task <br /> Management Strategies
        </h1>
        <p
          className="text-gray-400 text-center text-xl mt-5"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="700"
        >
          Boosting Productivity and Achieving Goals
        </p>
        <Link
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="500"
          to={"/login"}
          className="px-6 py-4 bg-primary text-white rounded-full mt-12 hover:bg-transparent hover:ring-2 hover:text-black transition-all ease-in-out duration-100 focus:scale-95"
        >
          Explore More
        </Link>
      </div>

      {/* Image Section */}
      <div className="grid md:grid-cols-7 grid-cols-1  justify-center gap- xl:mt-12 mt-6  overflow-hidden px-10">
        <div className="col-span-2  w-full h-full" data-aos="fade-right">
          <img src="/images/bannerBg1.png" alt="" className="w-full h-full " />
        </div>
        <div className=" col-span-5  w-full h-full" data-aos="fade-left">
          <img
            src="/images/bannerBg2.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
