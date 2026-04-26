"use client";

import { useState, FormEvent } from "react";
import { Mail } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    // Dark zone of the gradient — white text on left, white card on right
    <section id="contact" className="scroll-mt-24 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left column — white text on dark gradient */}
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[#7ed957] font-medium">
              Get in touch
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-light tracking-wide text-white mb-4">
              Let&apos;s talk.
            </h2>
            <p className="text-white/65 leading-relaxed mb-6">
              For direct enquiries, email Erica or Nathan. Or use the form and
              we&apos;ll be in touch shortly.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:erica@guyadvisory.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  erica@guyadvisory.com
                </span>
              </a>
              <a
                href="mailto:nathan@guyadvisory.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                  nathan@guyadvisory.com
                </span>
              </a>
            </div>
          </div>

          {/* Right column — white card keeps form readable on dark background */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[200px]">
                <div className="w-10 h-0.5 bg-[#0ea5a4] mb-6" />
                <p className="text-[#0f4c5c] text-lg font-light">
                  Thanks — we&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs tracking-wide text-[#0f4c5c]/60 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#0f4c5c] placeholder:text-[#0f4c5c]/30 focus:outline-none focus:border-[#0ea5a4] transition-colors bg-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs tracking-wide text-[#0f4c5c]/60 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#0f4c5c] placeholder:text-[#0f4c5c]/30 focus:outline-none focus:border-[#0ea5a4] transition-colors bg-white"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="organisation"
                    className="block text-xs tracking-wide text-[#0f4c5c]/60 mb-1.5"
                  >
                    Organisation
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#0f4c5c] placeholder:text-[#0f4c5c]/30 focus:outline-none focus:border-[#0ea5a4] transition-colors bg-white"
                    placeholder="Your organisation (optional)"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-wide text-[#0f4c5c]/60 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#0f4c5c] placeholder:text-[#0f4c5c]/30 focus:outline-none focus:border-[#0ea5a4] transition-colors resize-none bg-white"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-medium tracking-wide text-white bg-[#0ea5a4] hover:bg-[#0f4c5c] transition-colors duration-200"
                >
                  Send message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
