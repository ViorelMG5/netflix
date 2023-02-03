import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.svg";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import pingu from "../public/pingu.png";
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [windowWidth, setWindowWitdh] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWitdh(window.innerWidth);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuLinks = (
    <ul className="list-none flex space-x-4 mr-auto ml-10 text-[#ffffff90]">
      <li className="link">Home</li>
      <li className="link">Tv Shows</li>
      <li className="link">Movies</li>
      <li className="link">News & Popular</li>
      <li className="link">My List</li>
    </ul>
  );
  return (
    <header
      className={`flex justify-between items-center  fixed w-full top-0 py-5 px-3 md:px-10 ${
        scrolled && "bg-[#141414]"
      }`}
    >
      <Link href="/" className="shrink-0">
        <Image src={logo} alt={"netflix logo"} width={100} height={100} />
      </Link>
      {windowWidth > 991 ? menuLinks : <DropdownMenu />}
      <div className="flex space-x-5 items-center text-white">
        <AiOutlineSearch className="icon link" />
        <p className="link">Kids</p>
        <AiOutlineBell className="icon link" />
        <Image src={pingu} className="icon cursor-pointer" alt="user icon" />
      </div>
    </header>
  );
}
