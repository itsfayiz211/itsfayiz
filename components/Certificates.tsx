"use client";

import { TestimonialsCard } from "@/components/ui/testimonials-card";
import interCertificate from "../public/assets/interncertificate.jpeg";
import demoCirtificate from "../public/assets/DemoCertificate.png";

const certificateItems = [
  {
    id: 1,
    title: "MERN Stack Developer",
    description: "Completed full-stack MERN training.",
    image: demoCirtificate.src,
  },
  {
    id: 2,
    title: "Internship Certificate",
    description: "Internship completion certificate.",
    image: interCertificate.src,
  },
  {
    id: 3,
    title: "JavaScript Mastery",
    description: "Advanced JavaScript concepts training.",
    image: demoCirtificate.src,
  },
];

export default function Certificate() {
  return (
    <section className="py-16 px-6 bg-black text-white md:px-20 lg:px-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-serif mb-2">
          Certificates
        </h2>
        <p className="text-lg">
          Showcasing my achievements and completed courses
        </p>
      </div>

      <div className="flex justify-center text-white">
        <TestimonialsCard items={certificateItems} />
      </div>
    </section>
  );
}
