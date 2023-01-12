import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "./";

export const Carousel = ({ data = [], title = "Title" }) => {
  const track = useRef(null);
  const [trackWidth, setTrackWidth] = useState({});

  let index = 0;

  const onNextSlide = () => {
    if (index >= trackWidth.totalWidth / trackWidth.width - 1) return;

    index++;

    if (index * trackWidth.width > trackWidth.adaptiveWidth) {
      track.current.style.transform = `translateX(-${trackWidth.adaptiveWidth}px)`;
      return;
    }

    track.current.style.transform = `translateX(-${
      index * trackWidth.width
    }px)`;
  };

  const onPrevSlide = () => {
    if (index === 0) return;
    index--;
    track.current.style.transform = `translateX(-${
      index * trackWidth.width
    }px)`;
  };

  useLayoutEffect(() => {
    if (data.length === 0) return;

    const width = track.current.offsetWidth;
    const totalWidth = track.current.scrollWidth;
    setTrackWidth({
      ...trackWidth,
      width,
      totalWidth,
      adaptiveWidth: width * (totalWidth / width - 1),
    });
  }, [data]);

  return (
    <>
      <div className="mb-10 lg:mb-20">
        {/* Carousel container */}
        <div className="mx-auto mb-3 flex justify-between px-5 md:container ">
          <h2 className="text-2xl font-bold text-white lg:text-3xl">{title}</h2>
        </div>
        <div className="relative mx-auto px-5 md:container">
          {/* Carousel container inner */}
          <div className="overflow-x-scroll sm:overflow-x-hidden">
            {/* Track (elements container) */}
            <div
              ref={track}
              className="track flex transition-transform duration-700 ease-in-out"
            >
              {data.map((movie) => {
                return (
                  //Card container
                  <div
                    key={movie.id}
                    className="w-1/3 shrink-0 sm:w-1/4 lg:w-1/5 xl:w-1/6"
                  >
                    {/* Card */}
                    <div className="w-full sm:px-1 ">
                      <Movie movie={movie} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Nav buttons */}
          <div className="hidden md:block">
            <button
              onClick={onPrevSlide}
              className="absolute top-0 bottom-0 left-[21px] w-16 bg-black text-4xl font-bold text-white"
            >
              {"<"}
            </button>
            <button
              onClick={onNextSlide}
              className="absolute top-0 bottom-0 right-[21px] w-16 bg-black text-4xl font-bold text-white"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
