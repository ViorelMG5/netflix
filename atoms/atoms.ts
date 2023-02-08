import { Movie } from "@/typings";
import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const currentMovie = atom<Movie | null | DocumentData>({
  key: "currentMovie",
  default: null,
});
