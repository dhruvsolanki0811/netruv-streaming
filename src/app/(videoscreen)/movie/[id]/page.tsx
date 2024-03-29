"use client";
import Loader from "@/components/Loader";
import MoviePlayer from "@/components/MoviePlayer";
import MovieTrailerModal from "@/components/MovieTrailerModal";
import SearchGrid from "@/components/SearchGrid";
import unknownPlaceholder from "../../../../assets/placeholder.jpg";
import { useFetchSingleMovie } from "@/hooks/useMovieData";
import { useModalStore } from "@/store/modalStore";
import { useSearchStore } from "@/store/searchstore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

function Page() {
  const { id } = useParams();

  const [movieId, setMovieId] = useState(Array.isArray(id) ? id[0] : id);
  const { setQuery, query, shows: queryShows } = useSearchStore();
  const { data: show, isLoading } = useFetchSingleMovie(movieId);
  const { setOpen, open, setShow } = useModalStore();
  useEffect(() => {
    toast.warning(
      "Due to 3rd party library beaware of ads while streaming. Enjoy **Winks**!"
    );
    setOpen(false);
    setQuery("");
  }, []);

  if (isLoading) {
    <div className="w-[100vw] h-[80vh] flex items-center justify-center ">
      <Loader></Loader>
    </div>;
  }

  if (query.length > 0) {
    return (
      <>
        <SearchGrid />
      </>
    );
  }

  return (
    <>
      <ToastContainer theme="colored"></ToastContainer>
      <MoviePlayer imdb={movieId}></MoviePlayer>
      <div className="movie-info-container grid grid-cols-5	pt-8 mb-8">
        <div className="thumbnail-container flex flex-col font-bold justify-start items-end ">
          {show?.poster_path ? (
            <img
              style={{
                boxShadow: "19px 11px 15px -3px rgba(0,0,0,41%)",
              }}
              src={`https://image.tmdb.org/t/p/original/${show?.poster_path}`}
              width={100}
              height={100}
              alt=""
              className="hover:scale-110 transition-transform duration-300 ease-in-out transform   cursor-pointer"
            />
          ) : (
            <Image
              style={{
                boxShadow: "19px 11px 15px -3px rgba(0,0,0,41%)",
              }}
              src={unknownPlaceholder}
              width={100}
              height={100}
              alt=""
              className="object-fill hover:scale-110 transition-transform duration-300 ease-in-out transform   cursor-pointer"
            />
          )}
        </div>

        <div className="movie-info col-span-4 flex flex-col  gap-2   ms-[2.5rem] me-[2.5rem]">
          <div className="movie-title text-[1.6rem] font-extrabold">
            {show?.title
              ? show.title
              : show?.name
              ? show.name
              : show?.original_title
              ? show.original_title
              : "N/A"}
          </div>
          <div className="popularity-tab flex flex-nowrap	 gap-2 justify-cener items-center">
            <div className="popularity text-[#16A34A] text-xs font-medium	 ">
              {show?.vote_average} Average Votes
            </div>
            <div className="popularity text-xs font-medium">
              {show?.release_date
                ? show?.release_date
                : show?.first_air_date
                ? show.first_air_date
                : show?.last_air_date}
            </div>
          </div>
          <div className="banner-play flex gap-1">
            <div
              onClick={() => {
                setOpen(true);
                if (show) setShow(show);
              }}
              className="play-btn cursor-pointer text-[11px] flex flex-nowrap pt-1 pb-1 ps-3 pe-3 gap-1 justify-center items-center font-bold  mt-2 text-black bg-transparent text-white rounded-[3px] border-[1px] border-solid border-[var(--border-btn)] hover:bg-[var(--border-btn)]"
            >
              <FaInfoCircle className="text-[12px] "></FaInfoCircle>
              More Info
            </div>
          </div>
          <div className="movie-title pt-2 text-[0.6rem] text-justify ">
            {show?.overview}
          </div>
        </div>
      </div>
      {open && <MovieTrailerModal></MovieTrailerModal>}
    </>
  );
}

export default Page;
