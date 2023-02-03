import { Movie } from "@/typings";
import React, { useEffect, useState } from "react";
import { baseUrl } from "@/constants/movie";
import { BsPlayFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import Image from "next/image";

interface Props {
  topRated: Movie[];
}
export default function Banner({ topRated }: Props) {
  const [show, setShow] = useState<Movie | null>();
  //   const [currentShow, setCurrentShow] = useState();

  useEffect(() => {
    setShow(topRated[Math.floor(Math.random() * topRated.length)]);
  }, []);
  console.log();
  return (
    <div className="px-3 md:px-10 h-screen pt-20 bg-cover ">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          alt={`${baseUrl}${show?.title}`}
          fill
          src={`${baseUrl}${show?.backdrop_path || show?.poster_path}`}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="mt-[20vh] md:max-w-[60vw] lg:max-w-[40vw]">
        <h1 className="font-bold mb-2">{show?.title}</h1>
        <p className="description">{show?.overview}</p>
        <div className="flex gap-2 mt-5">
          <button className="button-primary bg-[#ffffff] text-black text-lg	hover:bg-[rgb(216,31,38)] hover:text-white">
            <BsPlayFill className="h-7 w-7" />
            Play
          </button>
          <button className="button-primary bg-[#ffffff40] text-lg hover:bg-[#000]	">
            More info
            <AiFillInfoCircle className="h-7 w-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
