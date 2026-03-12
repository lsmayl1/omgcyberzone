import Instagram from "@/assets/Instagram";
import Phone from "@/assets/Phone";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full flex-col gap-8 px-12  pt-8">
      <h1 className="text-white text-4xl font-bold text-center">Контакты</h1>
      <div className="flex gap-2 py-8">
        <div className="flex-1 bg-boxColor rounded-[60px] flex gap-12 flex-col p-8">
          <h1 className="capitalize text-white font-bold text-4xl">
            проспект Азадлыг 103, Баку, Азербайджан
          </h1>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Phone />
              <div className="flex flex-col ">
                <h1 className="text-white">Phone</h1>
                <span className="text-[#66676D]">+994 70 222 88 86</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Instagram />
              <div className="flex flex-col ">
                <h1 className="text-white">Instagram</h1>
                <span className="text-[#66676D]">@omgcyberzone</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <img src="/footer_map.png" alt="" className="w-full rounded-4xl" />
        </div>
      </div>
	  <h1 className="text-center text-white">© 2025 OMG Cyber Zone.</h1>
    </div>
  );
};
