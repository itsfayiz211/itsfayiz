"use client";

import { motion } from "framer-motion";
import { Search, Layout, Code2, Rocket, Share2 } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <Search size={22} />,
      title: "Understand Problem",
      desc: "Deep dive into business logic and user needs.",
    },
    {
      icon: <Share2 size={22} />,
      title: "Design System",
      desc: "Plan APIs, database schema, and architecture.",
    },
    {
      icon: <Code2 size={22} />,
      title: "Build Backend",
      desc: "Develop scalable APIs and services.",
    },
    {
      icon: <Layout size={22} />,
      title: "Create UI",
      desc: "Craft modern and responsive interfaces.",
    },
    {
      icon: <Rocket size={22} />,
      title: "Launch",
      desc: "Optimize, secure, and deploy.",
    },
  ];

  return (
    <section  id="process" className="py-20 md:py-28 px-4 sm:px-6 bg-black text-white overflow-hidden">
      
      {/* TITLE */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold">
          My <span className="text-cyan-400">Process</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">
          From idea to production with a structured workflow.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        
        {/* BASE LINE */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gray-800" />

        {/* ANIMATED LINE */}
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 1.4 }}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] bg-cyan-400"
        />

        {/* STEPS */}
        <div className="flex flex-col gap-16 md:gap-20">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`flex items-center ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                
                {/* CARD */}
                <div className="w-[44%] sm:w-[46%]">
                  <div
                    className="
                    bg-white/5 backdrop-blur-md
                    border border-white/10
                    p-4 sm:p-6
                    rounded-xl
                    transition-all duration-300
                    hover:border-cyan-400/50
                    hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]
                  "
                  >
                    <h3 className="text-base sm:text-lg font-semibold">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* ICON NODE */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="
                    w-12 h-12 sm:w-14 sm:h-14
                    rounded-full
                    bg-gray-900 border border-gray-700
                    flex items-center justify-center
                    transition-all duration-300
                    shadow-md shadow-cyan-500/10
                    hover:shadow-cyan-400/40
                  "
                  >
                    <div className="text-cyan-400">
                      {step.icon}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}