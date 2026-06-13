"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";
import { FaLinkedin, FaInstagram, FaGithub, FaDiscord } from "react-icons/fa";

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [contactData, setContactData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    emailjs
      .sendForm(
        "service_5pfpid2",
        "template_dam4kbt",
        form,
        "qtuJxG_01ueHLqeJ6"
      )
      .then(
        () => {
          setShowSuccess(true);
          setContactData({ from_name: "", from_email: "", message: "" });

          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        },
        (error) => {
          console.error(error);
          alert("Failed to send message");
        }
      );
  };

  return (
    <section
      id="contact"
      className="bg-neutral-950 flex items-center justify-center text-white relative"
    >
      <div
        data-aos="fade-up"
        className="bg-neutral-950 p-6 sm:p-8 md:p-12 shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
      >
        {/* Left */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold font-serif mb-4">
            Let’s Connect
          </h2>
          <p className="text-neutral-400 mb-6 text-sm sm:text-base leading-relaxed">
            Have a project in mind or just want to say hello? I’m always open to
            discussing new ideas or opportunities.
          </p>

          <div className="space-y-3 text-sm sm:text-base">
            <p><span className="font-semibold">Location:</span> Kozhikode, India</p>
            <p><span className="font-semibold">Email:</span> fayizpachu217@gmail.com</p>


            <div className="flex gap-6 mt-6 text-3xl text-white">
              <a
                href="https://linkedin.com/in/fayis-k-1641122b6"
                target="_blank"
                rel="noreferrer"
                className="hover:text-violet-400 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://instagram.com/itsfayiz_"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fuchsia-400 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://github.com/fayispachu"
                target="_blank"
                rel="noreferrer"
                className="hover:text-violet-200 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://discord.gg/yourinvite"
                target="_blank"
                rel="noreferrer"
                className="hover:text-violet-300 transition"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="flex flex-col justify-center">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 font-serif">
            Contact Me
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="from_name"
                value={contactData.from_name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="from_email"
                value={contactData.from_email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <input type="hidden" name="reply_to" value={contactData.from_email} />

            <div>
              <label className="block mb-1 font-semibold">Message</label>
              <textarea
                name="message"
                value={contactData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
            </div>

            <button
              type="submit"
                className="w-full hover:bg-white bg-violet-600 hover:text-neutral-800 text-white transition p-3 rounded-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 w-[90%] max-w-md text-center animate-scaleIn">
            
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2">Success!</h2>
            <p className="text-neutral-400">
              Your message has been sent successfully.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 px-6 py-2 bg-white text-black rounded-lg hover:bg-violet-600 hover:text-white transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}