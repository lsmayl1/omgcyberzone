import Instagram from "@/assets/Instagram";
import Phone from "@/assets/Phone";
import { Telegram } from "@/assets/Telegram";
import React from "react";

export const Footer = () => {
  return (
    <div id="footer" className="w-full flex-col gap-8   pt-8 bg-boxColor">
      <div className="flex gap-2 py-8 max-md:flex-col-reverse container-custom">
        <div className="flex-1  rounded-[60px] max-md:rounded-2xl flex gap-12 flex-col p-8">
          <h1 className="capitalize text-white font-bold text-4xl max-md:text-2xl">
            проспект Азадлыг 103E, Баку, Азербайджан
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
            <div className="flex items-center gap-4">
              <Telegram className="size-8 text-white" />
              <div className="flex flex-col ">
                <h1 className="text-white">Telegram</h1>
                <span className="text-[#66676D]">@omgcyberzone</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <img src="/footer_map.png" alt="" className="w-full rounded-4xl transition-transform duration-300 hover:scale-120" />
        </div>
      </div>
      <h1 className="text-center text-white uppercase">© 2025 OMG Cyber Zone.</h1>
    </div>
  );
};
