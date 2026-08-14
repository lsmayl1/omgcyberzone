import React from "react";
import type { Dictionary } from "@/i18n/types";

/** Static copy — a server component, so none of this ships as JS. */
export const About = ({ t }: { t: Dictionary }) => {
  return (
    <section
      id="about"
      className="py-16 scroll-mt-28 max-md:scroll-mt-20 flex flex-col gap-8 max-md:gap-6 container-custom border-b border-white/10"
    >
      <h2 className="text-white text-4xl font-bold max-md:text-xl uppercase border-l-4 border-mainRed pl-4">
        {t.about.heading}
      </h2>

      <div className="grid grid-cols-2 gap-12 max-lg:grid-cols-1 max-lg:gap-6">
        <div className="flex flex-col gap-5 max-md:gap-3">
          {/* Plain text, so it wraps as prose. The only flourish is the red
              full stop — word-order independent, unlike colouring a word. */}
          <p className="text-white uppercase font-black tracking-tight text-5xl leading-[1.05] text-balance max-lg:text-4xl max-md:text-3xl">
            {t.about.title}
            <span className="text-mainRed">.</span>
          </p>
          <p className="text-gray-400 text-base leading-relaxed max-md:text-sm">
            {t.about.lead}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {t.about.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-gray-300 text-base leading-relaxed max-md:text-sm"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
