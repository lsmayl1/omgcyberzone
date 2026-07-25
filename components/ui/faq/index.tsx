"use client";
import Close from "@/assets/close";
import { Plus } from "@/assets/Plus";
import React, { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

export const FAQ = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      id="faq"
      className="flex scroll-mt-28 max-md:scroll-mt-20 flex-col gap-8 container-custom py-16"
    >
      <h2 className="text-white text-4xl font-bold max-md:text-xl mb-4 max-md:mb-2  border-l-4 border-mainRed pl-4  ">
        {t.faq.heading}
      </h2>
      <div className="flex flex-col gap-4">
        {t.faq.items.map((dt, i) => {
          const open = openIndex === i;
          return (
            <div
              key={i}
              className="bg-boxColor text-white p-4 rounded-xl text-xl flex flex-col gap-2 transition"
            >
              <div className="flex justify-between gap-4">
                <h3 className="w-9/12 text-xl font-normal">{dt.question}</h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-answer-${i}`}
                  aria-label={dt.question}
                  className="bg-foreground rounded-full size-8 shrink-0 items-center flex justify-center"
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  {open ? <Close className="size-6" /> : <Plus />}
                </button>
              </div>
              {open && (
                <div id={`faq-answer-${i}`}>
                  <span className="text-md text-gray-300">{dt.answer}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
