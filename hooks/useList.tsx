import { db } from "@/firebase";
import { Movie } from "@/typings";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useList(uid: string | undefined) {
  const [list, setList] = useState<Movie[] | DocumentData>([]);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(
      collection(db, "customers", uid, "myList"),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, [db, uid]);
  return list;
}
