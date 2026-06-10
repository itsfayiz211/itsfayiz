'use client';

import ComputersCanvas from "./canvas/ComputersCanvas";

export default function About() {
  return (
    <section
      id="about"
      className="bg-neutral-950 text-white py-16 px-5 sm:px-8 md:px-12 flex flex-col items-center"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-center mb-10">
        About Me
      </h1>

      <div className="flex flex-col-reverse md:flex-row gap-12 w-full max-w-6xl items-center">
        
        {/* Text Content */}
        <div className="md:w-1/2 w-full space-y-6 text-center md:text-left">

          <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose">
            As a skilled <span className="text-violet-400 font-semibold">MERN Stack & Next.js Developer</span> with 1+ year of experience building real-world projects, I specialize in creating scalable, efficient, and user-friendly web applications. I’m eager to bring my expertise in full-stack development and problem-solving to innovative projects that drive business success and improve user experiences.
          </p>

        </div>

        {/* Canvas */}
        <div className="md:w-1/2 w-full h-72 sm:h-80 md:h-[50vh] flex justify-center items-center">
          <ComputersCanvas />
        </div>

      </div>
    </section>
  );
}