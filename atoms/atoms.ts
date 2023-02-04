import { Movie } from "@/typings";
import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const currentMovie = atom<Movie | null>({
  key: "currentMovie",
  default: null,
});
