import Close from "@/assets/close";
import Instagram from "@/assets/Instagram";
import Phone from "@/assets/Phone";
import { Telegram } from "@/assets/Telegram";
import React from "react";

export const BookModal = ({ open, handleClose }) => {
  if (!open) return null;
  return (
    <div
      className="modal-backdrop z-50 bg-boxColor/60 fixed inset-0 flex items-center justify-center"
      onClick={handleClose}
    >
      <div className="bg-boxColor p-4 rounded-lg w-1/3 flex-col flex gap-8 max-md:w-9/12">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Бронирование</h1>
          <button className="bg-foreground px-2 py-2 rounded-full text-white">
            <Close className="size-5" />
          </button>
        </div>
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
    </div>
  );
};
