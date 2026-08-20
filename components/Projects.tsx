'use client';

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

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
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const totalPages = Math.ceil(projects.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + cardsPerPage);

  return (
    <section
      id="projects"
      className="bg-black text-white py-16 px-6 md:px-20 lg:px-32 min-h-screen"
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {currentProjects.map((project, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="relative bg-neutral-950 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Image */}
            <Image
              src={project.image}
              alt={project.title}
              // data-aos="fade-up"
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />

            {/* Always-visible overlay */}
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
              <h3 className="text-xl font-bold mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                                  className="px-4 py-2 border border-violet-400/30 bg-violet-500/10  backdrop-blur-md hover:border-violet-300/70 hover:bg-violet-500/15 inline-flex text-white rounded-md text-sm shadow-lg shadow-emerald-500/30 transition"
                >
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
  className="px-4 py-2 inline-flex items-center rounded-md bg-linear-to-r from-violet-500 to-fuchsia-500  text-sm font-semibold text-white shadow-[0_18px_35px_rgba(139,92,246,0.35)]   hover:from-violet-600 hover:to-fuchsia-600"

>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            // data-aos="zoom-in"
            // data-aos-delay={index * 100}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              currentPage === index + 1
                ? "bg-white text-black border-neutral-500"
                : "bg-black text-white border-gray-300 hover:bg-neutral-900"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
