import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { currentMovie, modalState } from "@/atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { Element, Genre, Movie } from "@/typings";
import { AiOutlineClose, AiFillLike } from "react-icons/ai";
import { GiPauseButton } from "react-icons/gi";
import {
  BsPlayFill,
  BsPlusCircle,
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
} from "react-icons/bs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MovieModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [trailer, setTrailer] = useState("");
  const [movie, setMovie] = useRecoilState(currentMovie);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const handleClose = () => setOpen(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [movie]);

  console.log(movie);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide  "
      >
        <div className="relative top-[10vh]  max-w-[90vw]  mx-auto">
          <button
            onClick={handleClose}
            className="modalButton absolute right-5 top-3 !z-40 h-9 w-9 border-none bg-{#181818] hover:bg-[#181818]"
          >
            <AiOutlineClose className="h-6 w-6" />
          </button>
          <div className="relative pt-[56.25%]  ">
            <ReactPlayer
              className="absolute top-0  bottom-0 object-cover left-0 right-0 "
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${trailer}`}
              muted={muted}
              playing={playing}
            />
            <div className="z-99 absolute bottom-5 left-5 flex items-center space-x-3">
              <button
                onClick={() => setPlaying(!playing)}
                className="button-primary bg-[#ffffff] text-black text-lg px-3 md:px-6 font-medium	hover:bg-[rgb(216,31,38)] py-1 fkex items-center  hover:text-white"
              >
                {playing ? (
                  <>
                    <GiPauseButton className="icon-lg" />
                    Pause
                  </>
                ) : (
                  <>
                    <BsPlayFill className="icon-lg" />
                    Play
                  </>
                )}
              </button>
              <button>
                <BsPlusCircle className="icon-lg" />
              </button>
              <button>
                <AiFillLike className="icon-lg" />
              </button>
              <button onClick={() => setMuted(!muted)}>
                {muted ? (
                  <BsVolumeMuteFill className="icon-lg" />
                ) : (
                  <BsFillVolumeUpFill className="icon-lg" />
                )}
              </button>
            </div>
          </div>
          <div className="bg-[#181818] space-y-3 p-6 md:p-10">
            <div className="flex space-x-3">
              {movie?.popularity && (
                <span className="text-[#4ACF54] font-medium">
                  {Math.floor(movie?.popularity)}% Match
                </span>
              )}
              <span className="text-[#ffffff90]">{movie?.release_date}</span>
              <span className="text-sm border px-2 rounded">HD</span>
            </div>
            <div className="flex flex-col md:flex-row mt-3 md:mt-0 gap-2">
              <p className="font-light w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-2">
                <div className="text-xs">
                  <span className="title-sm">Genres: </span>
                  {genres.map((genre) => (
                    <p className="inline-block mr-1">{genre.name},</p>
                  ))}
                </div>
                <div>
                  <span className="title-sm">Original language: </span>
                  <p className="inline-block "> {movie?.original_language}</p>
                </div>
                <div>
                  <span className="title-sm">Total votes: </span>
                  <p className="inline-block "> {movie?.vote_count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
