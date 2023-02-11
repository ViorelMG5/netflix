import { currentMovie, modalState } from "@/atoms/atoms";
import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";

export default function Search() {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [searchlist, setSearchList] = useState([]);
  const [modalSt, setModalSt] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(currentMovie);

  const handleInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(e.target.value);
  };
  const debouncedChangeHandler = useCallback(debounce(handleInput, 400), []);
  const handleClick = (item: Movie) => {
    setModalSt(true);
    setMovie(item);
  };
  const data = async (title: string) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&include_adult=false&query=${title}&page=1&include_video=false&sort_by=popularity.desc&with_genres=10749%2C%2016&with_original_language=en`
      );
      const json = await res.json();
      return setSearchList(json.results);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    data(title);
  }, [title]);

  const list = (
    <ul className="space-y-2 bg-black rounded absolute lg:w-[300px]  top-9 max-h-[500px] overflow-hidden overflow-y-auto">
      {searchlist.map((item: Movie) => (
        <li
          key={item.id}
          onClick={() => handleClick(item)}
          className="flex items-center gap-3 cursor-pointer hover:bg-[#141414]  px-4 py-1"
        >
          <Image
            className="object-cover object-center shrink-0 w-[60px] block h-[50px]"
            alt={item.name || item.original_name || item.title}
            width={100}
            height={100}
            src={`${baseUrl}${item?.backdrop_path || item?.poster_path}`}
          />
          <p>{item.name || item.original_name || item.title}</p>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="flex items-center relative">
      <AiOutlineSearch
        onClick={() => setShowInput(!showInput)}
        className="icon link w-[18px] left-2 absolute"
      />
      <input
        defaultValue={title}
        onChange={debouncedChangeHandler}
        className={`${
          showInput && "!w-[240px] border-white !bg-black !pl-9"
        } w-0 h-8 bg-transparent text-white rounded pl-6 border border-solid border-transparent outline-none ease-linear transition-all `}
        type="text"
        aria-label="Filter projects"
        placeholder="Search"
      />
      {searchlist.length > 0 && showInput && list}
    </div>
  );
}
