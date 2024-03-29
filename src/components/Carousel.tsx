"use client";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Image from "next/image";
import CarouselCard from "./CarouselCard";
import { Show } from "@/types/type";

const Carousel = ({ shows, title }: { title: string; shows?: Show[] }) => {
  const [showBtn, setshowBtn] = useState(false);
  const showsRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState(false);

  const scrollToDirection = (direction: "left" | "right") => {
    if (!showsRef.current) return;

    setIsScrollable(true);
    const { scrollLeft, clientWidth } = showsRef.current;
    const offset =
      direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    showsRef.current.scrollTo({ left: offset, behavior: "smooth" });

    if (scrollLeft === 0 && direction === "left") {
      showsRef.current.scrollTo({
        left: showsRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <section className="Carousel of videos ms-[1.5rem] mt-7 mb-7  pe-[1.5rem] ps-[1rem] max-sm:ms-[1.4rem] max-sm:me-[0.8rem] max-sm:px-0  ">
        <h1 className="mb-2 text-[1.2rem] font-semibold">{title}</h1>
        <div
          className="group relative"
          onMouseEnter={() => setshowBtn(true)}
          onMouseLeave={() => setshowBtn(false)}
        >
          {showBtn && (
            <>
              <div
                onClick={() => scrollToDirection("left")}
                className="btn-scroll-right rounded-r-[10px] border-[1px] border-solid border-white cursor-pointer flex justify-center items-center font-bold text-xl h-full w-[50px] bg-black bg-opacity-50 h-[8rem] absolute z-[50] "
              >
                <FaChevronLeft></FaChevronLeft>
              </div>
              <div
                onClick={() => scrollToDirection("right")}
                className="btn-scroll-right rounded-l-[10px] border-[1px] border-solid border-white cursor-pointer flex justify-center items-center font-bold text-xl h-full w-[50px] bg-black bg-opacity-50 h-[8rem] absolute z-[50] right-0 "
              >
                <FaChevronRight></FaChevronRight>
              </div>
            </>
          )}
          {shows ? (
            <div
              ref={showsRef}
              className="carousel-container  no-scrollbar flex gap-2 overflow-x-auto overflow-y-hidden no-scrollbar"
            >
              {shows.map((a, i) => {
                return <CarouselCard key={i} show={a}></CarouselCard>;
              })}
            </div>
          ) : (
            <div
              className="carousel-container  no-scrollbar flex gap-2 overflow-x-auto overflow-y-hidden no-scrollbar"
            >
              {[1,2,3,4,5,6,7,8,9,10].map((_,i)=>
              <CarouselCard key={i} ></CarouselCard>)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Carousel;
