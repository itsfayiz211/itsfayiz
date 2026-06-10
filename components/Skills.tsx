"use client";

import { useState } from "react";
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
  const marqueeSkills = [...skills, ...skills];

  return (
    <section
      id="skills"
      className="bg-neutral-950 w-full py-20 md:py-28 px-4 sm:px-6 md:px-20 lg:px-36 flex flex-col items-center gap-10"
    >
      <h1 className="font-bold text-3xl sm:text-4xl font-serif text-white mb-6 md:mb-10 text-center">
        Skills
      </h1>

      {/* ── Skills Marquee ── */}
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_35px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <div
          className="flex w-max gap-4 md:gap-6"
          style={{ animation: "marquee 24s linear infinite" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {marqueeSkills.map((skill, index) => {
            const isActive = activeSkill === skill.name;

            return (
              <button
                type="button"
                key={`${skill.id}-${index}`}
                onClick={() => setActiveSkill(skill.name)}
                className="flex w-24 shrink-0 flex-col items-center rounded-2xl border border-white/10 bg-black/60 px-3 py-3 text-center transition duration-200 hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-black/80 sm:w-28 md:w-32"
              >
                <div
                  className={`relative h-14 w-14 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 sm:h-16 sm:w-16 md:h-18 md:w-18 ${skill.bgClass || ""} ${
                    isActive
                      ? "ring-2 ring-violet-400 shadow-[0_0_20px_rgba(192,132,252,0.55)]"
                      : "shadow-lg hover:shadow-xl"
                  }`}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    sizes="56px"
                    className="object-contain p-2"
                  />
                </div>

                <span
                  className={`mt-2 text-[11px] font-medium sm:text-xs md:text-sm ${
                    isActive ? "text-violet-400" : "text-gray-200"
                  }`}
                >
                  {skill.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Description ── */}
      {activeSkill && (
        <div className="mt-8 md:mt-10 max-w-xl text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-violet-400 mb-2">
            {activeSkill}
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {skillDescriptions[activeSkill]}
          </p>
        </div>
      )}
    </section>
  );
}