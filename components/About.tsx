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
            I&apos;m a <span className="text-violet-400 font-semibold">Full-Stack Developer</span>{" "}
            building practical, user-friendly applications with the MERN stack and Next.js. Alongside development, I&apos;ve spent approximately two years studying and trading cryptocurrency and forex markets. Exploring both disciplines keeps me curious about how thoughtful technology can support better decisions.
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