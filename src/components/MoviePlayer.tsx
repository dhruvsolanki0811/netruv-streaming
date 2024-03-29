'use client'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'

function MoviePlayer({imdb}:{imdb:string|number}) {
       
      
  return (
    <>
    <div className="w-full   bg-black flex justify-center ">
    <div
        className="player-wrapper  w-[70vw] h-[60vh]"
      >
        {/* <div className="bg-white w-full h-full"></div> */}
       <iframe src={`https://vidsrc.xyz/embed/movie/${imdb}`} allowFullScreen className=' w-full h-full' ></iframe>
      </div>
      </div>
    </>
  )
}

export default MoviePlayer