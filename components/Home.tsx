'use client';

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Header from "./Header";

const About = dynamic(() => import("./About"));
const Projects = dynamic(() => import("./Projects"));
const Skills = dynamic(() => import("./Skills"));
const Process = dynamic(() => import("./Process"));
const Contact = dynamic(() => import("./Contact"));
import { FaLinkedin, FaInstagram, FaGithub, FaDiscord } from "react-icons/fa";
import Chatbot from "./Chatbot";
import { ArrowDown, Sparkles } from "lucide-react";
import fayizPhoto from "@/public/images/Fayiz.png";
import fayizMobile from "@/public/images/FayizSM.jpeg";

// ─── Main Component ─────────────────────────────────
export default function HomeClient() {
  const [chatOpen, setChatOpen] = useState(false);

  const socials = [
    {
      href: "https://linkedin.com/in/fayis-k-1641122b6",
      label: "LinkedIn",
      icon: <FaLinkedin />,
    },
    {
      href: "https://instagram.com/itsfayiz_",
      label: "Instagram",
      icon: <FaInstagram />,
    },
    {
      href: "https://github.com/fayispachu",
      label: "GitHub",
      icon: <FaGithub />,
    },
    {
      href: "https://discord.gg/yourinvite",
      label: "Discord",
      icon: <FaDiscord />,
    },
  ];


  return (
    <>
      <Header />

      <section id="home" className="relative isolate overflow-hidden bg-stone-950 text-stone-100">
        <div className="absolute inset-0">
          <Image
            src={fayizPhoto}
            alt="Fayis K — Best Full Stack Developer in Calicut and Kozhikode"
            fill
            priority
            sizes="(min-width: 768px) 100vw, 100vw"
            className="hidden object-cover object-center opacity-30 md:block"
          />
          <Image
            src={fayizMobile}
            alt="Fayis K — Best Full Stack Developer in Calicut and Kozhikode"
            fill
            priority
            sizes="100vw"
            className="block object-cover object-center opacity-45 md:hidden"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-28 text-stone-100 sm:px-6 lg:px-8">
          <div className="grid items-center gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone-300/25 bg-stone-100/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-stone-100 shadow-[0_18px_35px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                The best full stack developer
              </span>
              <h1 className="mt-4 text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-[4.5rem]">
                Fayis K
              </h1>
              <p className="mt-3 max-w-xl text-lg text-stone-100/95 sm:text-xl md:text-2xl">
                Best Full Stack Developer in Calicut and Kozhikode — building fast, conversion-focused websites with Next.js, MERN, and clean SEO foundations.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-full bg-stone-100 px-5 py-3 text-sm font-semibold text-stone-950 shadow-[0_18px_35px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
                >
                  View projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-stone-300/25 bg-stone-100/10 px-5 py-3 text-sm font-semibold text-stone-100 backdrop-blur-md transition hover:border-stone-200/60 hover:bg-stone-100/15"
                >
                  Let&apos;s build your site
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-stone-100/85">
                {['Next.js', 'React', 'Node.js', 'SEO', 'MERN'].map((item) => (
                  <span key={item} className="rounded-full border border-stone-300/20 bg-stone-100/10 px-3 py-2 shadow-[0_12px_25px_rgba(0,0,0,0.18)] backdrop-blur-md">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 text-stone-100/90">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300/20 bg-stone-100/10 text-lg shadow-[0_12px_25px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:border-stone-100/50 hover:bg-stone-100/15"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-slate-200/90">
            <span className="text-[0.65rem] uppercase tracking-[0.45em]">Scroll to begin</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </div>
        </div>
      </section>

      <About />
      <Projects />
      <Skills />
      <Process />
      {/* <Certificate /> */}
      <Contact />

      <Chatbot
        isOpen={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}