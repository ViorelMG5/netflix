import { currentMovie, modalState } from "@/atoms/atoms";
import { baseUrl } from "@/constants/movie";
import { db } from "@/firebase";
import { Movie } from "@/typings";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRecoilState } from "recoil";

interface Props {
  title: String;
  shows: Movie[] | DocumentData;
}

export default function Row({ title, shows }: Props) {
  const [isMoved, setIsMoved] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const [modalSt, setModalSt] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(currentMovie);

  const handleScroll = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleClick = (show: Movie) => {
    setModalSt(true);
    setMovie(show);
  };
  return (
    <div className="relative">
      {isMoved && (
        <FaChevronLeft
          onClick={() => handleScroll("left")}
          className="arrow left-2"
        />
      )}
      <h2 className="font-medium text-xl mb-2">{title}</h2>
      <div
        ref={rowRef}
        className="flex space-x-2  overflow-x-auto scrollbar-hide"
      >
        {shows.map((show: Movie) => (
          <Image
            onClick={() => handleClick(show)}
            key={show.id}
            alt={`${baseUrl}${show?.title}`}
            src={`${baseUrl}${show?.backdrop_path || show?.poster_path}`}
            width={150}
            height={150}
            className="object-cover w-[300px] h-[150px] rounded hover:scale-[1.04] transition-all hover:transition-all cursor-pointer"
          />
        ))}
      </div>
      <FaChevronRight
        onClick={() => handleScroll("right")}
        className="arrow right-2"
      />
    </div>
  );
}
