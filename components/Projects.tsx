'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

// Import your images
import portfolioImage from "@/public/assets/portfolio.png";
import projectManagementImage from "@/public/assets/projectmanagement.png";
import tradingJournalImage from "@/public/assets/crypto.png";
import cateringImage from "@/public/assets/catering.png";
import chatAppImage from "@/public/assets/chatAppImage.png";
import WeddingInvitationImage from "@/public/assets/weddingCard.png";
const projects = [
  {
    title: "Trading Journal App",
    description:
      "A web application for tracking trading activities and analyzing performance.",
    image: tradingJournalImage,
    github: "https://github.com/fayispachu/TradingJournal",
    demo: "https://bcz-tradingjournal.onrender.com/",
  },
   {
    title: "Catering Service Website",
    description:
      "A web application for branding and managing catering services, built with MERN stack.",
    image: cateringImage,
    github: "https://github.com/fayispachu/Catering-frontend",
    demo: "https://canopuscatering.netlify.app/",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern personal portfolio built with React, NextJs & Tailwind CSS.",
    image: portfolioImage,
    github: "https://github.com/fayispachu/ProfileCard",
    demo: "https://bcziamfayiz.vercel.app",
  },
   {
    title: "Public Chat App",
    description: "A Public chat app built with MERN and Socket.IO.",
    image: chatAppImage,
    github: "#",
    demo: "https://teambcz.netlify.app/",
  },
   
  {
    title: "Wedding Invitation Card",
    description: "A smart invitation platform where guests scan a QR code to access a personalized event page, RSVP instantly, and interact with event features.",
    image: WeddingInvitationImage,
    github: "#",
    demo: "https://teambcz.netlify.app/",
  },
  {
    title: "Project Management App",
    description:
      "A full-featured MERN stack app with role-based access control and real-time updates.",
    image: projectManagementImage,
    github: "https://github.com/fayispachu/Project-Management-App-New",
    demo: "https://project-management-app-new-pshf.onrender.com/",
  },
 
];

export default function Projects() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const currentProjects = projects;

  return (
    <section
      id="projects"
      className="bg-black text-white py-16 px-6 md:px-20 lg:px-32 min-h-[140vh]"
    >
      {/* Heading */}
      <div  className="text-center mb-12">
        <h2 className="font-bold text-4xl  font-serif">
          Projects
        </h2>
        <p data-aos="fade-up" className="mt-4 text-lg text-gray-400">
          A showcase of my work — blending clean code with creative design.
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <ScrollStack
          className="w-full"
          itemDistance={70}
          itemScale={0.035}
          itemStackDistance={35}
          baseScale={0.88}
          stackPosition="18%"
          scaleEndPosition="10%"
          useWindowScroll={true}
        >
          {currentProjects.map((project, index) => (
            <ScrollStackItem
              key={project.title}
              itemClassName="overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950"
            >
              <article
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative h-88 w-full overflow-hidden rounded-[28px] bg-neutral-950 sm:h-96"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={420}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/85 to-black/20" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-5 text-left md:p-6">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-200/90">Featured project</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
                  <p className="mt-3 max-w-md text-sm text-gray-200 md:text-[15px]">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-600"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </article>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

    </section>
  );
}
