"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const skills = [
  { id: 1, name: "HTML", icon: "/assets/html.png" },
  { id: 2, name: "CSS", icon: "/assets/css.png" },
  { id: 3, name: "JavaScript", icon: "/assets/js.png" },
  { id: 4, name: "React", icon: "/assets/react.png" },
  { id: 5, name: "Next js", icon: "/assets/nextjs.png", bgClass: "bg-white" },
  { id: 6, name: "Node.js", icon: "/assets/nodejs.png" },
  { id: 7, name: "Express.js", icon: "/assets/express.png" },
  { id: 8, name: "MongoDB", icon: "/assets/mongodb.png" },
  { id: 9, name: "MySQL", icon: "/assets/mysql.png" },
  { id: 10, name: "GitHub", icon: "/assets/github.png" },
  { id: 11, name: "Figma", icon: "/assets/figma.png" },
  { id: 12, name: "Tailwind CSS", icon: "/assets/tailwind.png" },
    { id: 13, name: "Capcut", icon: "/assets/capcutImage.png" },

];

const skillDescriptions: Record<string, string> = {
  HTML: "Strong semantic markup and SEO-friendly structure.",
  CSS: "Responsive layouts with Flexbox, Grid, and animations.",
  React: "Dynamic SPAs using hooks and modern patterns.",
  "Node.js": "Backend systems and scalable APIs.",
  "Express.js": "REST APIs, middleware, authentication.",
  MongoDB: "Schema design, aggregation, MERN stack usage.",
  MySQL: "Relational DB design and optimized queries.",
  GitHub: "Version control and collaboration workflows.",
  Figma: "UI/UX design and prototyping.",
  "Tailwind CSS": "Fast, scalable UI with utility-first styling.",
  "Next js": "SSR, routing, and performance optimization."
  ,
  Capcut: "Video editing and content creation for social media.",
};

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="bg-neutral-950 w-full py-20 md:py-28 px-4 sm:px-6 md:px-20 lg:px-36 flex flex-col items-center gap-10"
    >
      <h1 className="font-bold text-3xl sm:text-4xl font-serif text-white mb-6 md:mb-10 text-center">
        Skills
      </h1>

      {/* ── Skills Grid ── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 md:gap-8 w-full max-w-5xl">
        {skills.map((skill) => {
          const isActive = activeSkill === skill.name;

          return (
            <motion.div
              key={skill.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSkill(skill.name)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div
                className={`
                  relative
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                  rounded-xl overflow-hidden
                  flex items-center justify-center
                  transition-all duration-300
                  ${skill.bgClass || ""}
                  ${isActive
                    ? "ring-2 ring-cyan-400 shadow-[0_0_20px_#06b6d4]"
                    : "shadow-lg hover:shadow-xl"}
                `}
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  sizes="(max-width: 640px) 64px,
                         (max-width: 768px) 80px,
                         (max-width: 1024px) 96px,
                         96px"
                  className="object-contain p-2"
                />
              </div>

              <p
                className={`mt-2 text-xs sm:text-sm md:text-base transition ${
                  isActive ? "text-cyan-400" : "text-gray-300"
                }`}
              >
                {skill.name}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* ── Description ── */}
      {activeSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 md:mt-10 max-w-xl text-center px-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
            {activeSkill}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {skillDescriptions[activeSkill]}
          </p>
        </motion.div>
      )}
    </section>
  );
}