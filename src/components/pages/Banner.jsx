import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const Banner = () => {

   const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <>
      <div className="p-1.5 pt-8 pr-4 pl-4 flex flex-col justify-center items-center md:items-start md:justify-start">
        <h2 className="text-xl font-sans font-bold mb-4 text-center md:text-left">
          POCO M8 5G Online Coming
        </h2>

        <img
          src="/images/Home/image1.jpeg"
          alt="Image 1"

        />
        <img
          src="/images/Home/image2.webp"
          alt="Image 2"
        />
        <img
          src="/images/Home/image3.webp"
          alt="Image 3"
        />
        <img
          src="/images/Home/image4.webp"
          alt="Image 4"
        />
        <img
          src="/images/Home/image5.webp"
          alt="Image 5"
        />
        <img
          src="/images/Home/image6.webp"
          alt="Image 6"
        />
        <img
          src="/images/Home/image7.webp"
          alt="Image 7"
        />
        <img
          src="/images/Home/image8.webp"
          alt="Image 8"
        />
        <img
          src="/images/Home/image9.webp"
          alt="Image 9"
        />
        <img
          src="/images/Home/image10.webp"
          alt="Image 10"
        />
        <img
          src="/images/Home/image11.webp"
          alt="Image 11"
        />
        <img
          src="/images/Home/image12.webp"
          alt="Image 12"
        />
        <img
          src="/images/Home/image13.webp"
          alt="Image 13"
        />
        <img
          src="/images/Home/image14.webp"
          alt="Image 14"
        />
        <img
          src="/images/Home/image15.webp"
          alt="Image 15"
        />
        <img
          src="/images/Home/image16.webp"
          alt="Image 16"
        />
        <img
          src="/images/Home/image17.webp"
          alt="Image 17"
        />
        <img
          src="/images/Home/image18.webp"
          alt="Image 18"
        />
        <img
          src="/images/Home/image19.webp"
          alt="Image 19"
        />
        <img
          src="/images/Home/image20.webp"
          alt="Image 20"
        />
        <img
          src="/images/Home/image21.webp"
          alt="Image 21"
        />
        <img
          src="/images/Home/image22.webp"
          alt="Image 22"
        />
        <img
          src="/images/Home/image23.webp"
          alt="Image 23"
        />
        <img
          src="/images/Home/image24.webp"
          alt="Image 24"
        />
        <img
          src="/images/Home/image25.webp"
          alt="Image 25"
        />
        <img
          src="/images/Home/image26.webp"
          alt="Image 26"
        />
        <img
          src="/images/Home/image27.webp"
          alt="Image 27"
        />
        <img
          src="/images/Home/image28.webp"
          alt="Image 28"
        />
        <img
          src="/images/Home/image29.webp"
          alt="Image 29"
        />
        <img
          src="/images/Home/image30.webp"
          alt="Image 30"
        />
        <img
          src="/images/Home/image31.webp"
          alt="Image 31"
        />
        <img
          src="/images/Home/image32.webp"
          alt="Image 32"
        />
        <img
          src="/images/Home/image33.webp"
          alt="Image 33"
        />
        <img
          src="/images/Home/image34.webp"
          alt="Image 34"
        />
        <img
          src="/images/Home/image35.webp"
          alt="Image 35"
        />
        <img
          src="/images/Home/image36.webp"
          alt="Image 36"
        />
        <img
          src="/images/Home/image37.webp"
          alt="Image 37"
        />
        <img
          src="/images/Home/image38.webp"
          alt="Image 38"
        />
        <img
          src="/images/Home/image39.webp"
          alt="Image 39"
        />
        <img
          src="/images/Home/image40.webp"
          alt="Image 40"
        />
        <img
          src="/images/Home/image41.webp"
          alt="Image 41"
        />
        <img
          src="/images/Home/image42.webp"
          alt="Image 42"
        />
        <img
          src="/images/Home/image43.webp"
          alt="Image 43"
        />
        <img
          src="/images/Home/image44.webp"
          alt="Image 44"
        />
        <img
          src="/images/Home/image45.webp"
          alt="Image 45"
        />
        <img
          src="/images/Home/image46.webp"
          alt="Image 46"
        />
        <img
          src="/images/Home/image47.webp"
          alt="Image 47"
        />
        <img
          src="/images/Home/image48.webp"
          alt="Image 48"
        />
        <img
          src="/images/Home/image49.webp"
          alt="Image 49"
        />
        <img
          src="/images/Home/image50.webp"
          alt="Image 50"
        />
        <img
          src="/images/Home/image51.webp"
          alt="Image 51"
        />
        <img
          src="/images/Home/image52.webp"
          alt="Image 52"
        />
        <img
          src="/images/Home/image53.webp"
          alt="Image 53"
        />
        <img
          src="/images/Home/image54.webp"
          alt="Image 54"
        />
        <img
          src="/images/Home/image55.webp"
          alt="Image 55"
        />
        <img
          src="/images/Home/image56.webp"
          alt="Image 56"
        />
        <img
          src="/images/Home/image57.webp"
          alt="Image 57"
        />
        <img
          src="/images/Home/image58.webp"
          alt="Image 58"
        />
        <img
          src="/images/Home/image59.webp"
          alt="Image 59"
        />
        <img
          src="/images/Home/image60.webp"
          alt="Image 60"
        />
        <img
          src="/images/Home/image61.webp"
          alt="Image 61"
        />
        <img
          src="/images/Home/image62.webp"
          alt="Image 62"
        />
        <img
          src="/images/Home/image63.webp"
          alt="Image 63"
        />

      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="
            fixed bottom-6  right-6 z-50
            bg-indigo-600 text-white
            p-3 rounded-full shadow-lg
            hover:bg-indigo-700
            transition duration-300
          "
        >
          <FiArrowUp size={22} />
        </button>
      )}


    </>

  )
}

export default Banner