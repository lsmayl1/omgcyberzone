"use client";
import Close from "@/assets/close";
import { Plus } from "@/assets/Plus";
import React, { useState } from "react";

type faq = {
  id: number | null;
  answer: string;
  question: string;
};

export const FAQ = () => {
  const data = [
    {
      id: 1,
      question: "Можно ли прийти со своей едой и напитками?",
      answer:
        "К сожалению, посещение клуба со своими едой и напитками запрещено. Вы можете не переживать по поводу этого, потому что у нас очень широкий ассортимент напитков и закусок по демократичным ценам.",
    },
    {
      id: 2,
      question:
        "Можно ли подключить свои девайсы (мышка, клавиатура, наушники)?",
      answer:
        "К сожалению, посещение клуба со своими едой и напитками запрещено. Вы можете не переживать по поводу этого, потому что у нас очень широкий ассортимент напитков и закусок по демократичным ценам.",
    },
    {
      id: 3,
      question: "Какие у вас часы работы?",
      answer: "Мы работаем круглосуточно, 24/7.",
    },
    {
      id: 4,
      question: "Есть ли возрастные ограничения?",
      answer: "Нет, возрастных ограничений нет.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<faq | null>(null);

  const handleOpenFaq = (dt: faq) => {
    if (openFaq?.id === dt.id) {
      setOpenFaq(null);
    } else {
      setOpenFaq(dt);
    }
  };
  return (
    <div
      id="faq"
      className="flex scroll-mt-20 flex-col gap-2 container-custom py-4"
    >
      <h1 className="text-white text-4xl font-bold max-md:text-xl mb-8 max-md:mb-2 text-center ">
        FAQ
      </h1>
      {data?.map((dt, i) => (
        <div
          key={i}
          className="bg-boxColor text-white p-4 rounded-xl text-xl flex flex-col gap-2 transition"
        >
          <div className="flex justify-between">
            <h1>{dt.question}</h1>
            <button
              className="bg-foreground rounded-full size-8 items-center flex justify-center"
              onClick={() => handleOpenFaq(dt)}
            >
              {openFaq?.id === dt.id ? <Close className="size-6" /> : <Plus />}
            </button>
          </div>
          {openFaq?.id === dt.id && (
            <div>
              <span className="text-md text-gray-300">{openFaq.answer}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
