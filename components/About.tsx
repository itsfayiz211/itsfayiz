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
            I’m a{" "}
            <span className="text-cyan-400 font-semibold">
              MERN Stack Developer
            </span>{" "}
            who focuses on building real-world applications rather than just UI demos. I’ve developed full-stack projects like a{" "}
            <span className="text-cyan-400 font-semibold">
              trading journal with authentication and analytics
            </span>{" "}
            and a{" "}
            <span className="text-cyan-400 font-semibold">
              real-time chat application using Socket.IO
            </span>.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed sm:leading-loose">
            I enjoy solving practical problems, working with live data, and building features that simulate real production systems. My experience includes designing secure APIs, handling authentication, and developing responsive, user-friendly interfaces.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed sm:leading-loose">
            Beyond coding, I focus on improving performance, refining UI/UX, and continuously learning better ways to build scalable and maintainable applications.
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