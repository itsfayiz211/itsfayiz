'use client';

import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import me from "@/public/images/FayizP.jpeg";
// ok
export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = ["home", "about", "projects", "skills", "process", "contact"];

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full border-b border-stone-300/10 bg-stone-950/85 py-4 px-6 text-stone-100 shadow-[0_14px_35px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-300 sm:px-12 md:px-24 ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="rounded-full border border-stone-300/20 bg-stone-900/80 p-1 shadow-[0_10px_25px_rgba(12,10,9,0.35)]">
            <Image src={me} alt="Fayis K" width={48} height={48} className="rounded-full object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-white sm:text-xl">Fayis K</h2>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-stone-200/80">Best Full Stack Developer</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-lg font-semibold items-center">
          {links.map((link) => (
            <li key={link}>
              <Link to={link} smooth={true} duration={400} offset={-70} className="cursor-pointer text-stone-100/90 transition-colors duration-200 hover:text-stone-200">
                {link.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex w-full flex-col gap-4 rounded-xl border border-stone-300/10 bg-stone-900/95 p-4 shadow-[0_18px_35px_rgba(12,10,9,0.35)]">
          {links.map((link) => (
            <li key={link}>
              <Link to={link} smooth={true} duration={500} offset={-70} onClick={() => setMenuOpen(false)} className="block rounded-md p-2 text-stone-100 transition-all hover:bg-stone-800/80 hover:text-stone-50 cursor-pointer">
                {link.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
