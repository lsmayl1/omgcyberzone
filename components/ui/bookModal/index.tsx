"use client";
import Close from "@/assets/close";
import Instagram from "@/assets/Instagram";
import Phone from "@/assets/Phone";
import { Telegram } from "@/assets/Telegram";
import React, { useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const PHONE = "+994 70 222 88 86";
const HANDLE = "omgcyberzone";

export const BookModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, handleClose]);

  if (!open) return null;

  const contacts = [
    {
      key: "phone",
      icon: <Phone />,
      label: t.footer.phone,
      value: PHONE,
      href: `tel:${PHONE.replace(/\s/g, "")}`,
      external: false,
    },
    {
      key: "instagram",
      icon: <Instagram />,
      label: t.footer.instagram,
      value: `@${HANDLE}`,
      href: `https://instagram.com/${HANDLE}`,
      external: true,
    },
    {
      key: "telegram",
      icon: <Telegram className="size-8 text-white" />,
      label: t.footer.telegram,
      value: `@${HANDLE}`,
      href: `https://t.me/${HANDLE}`,
      external: true,
    },
  ];

  return (
    <div
      className="modal-backdrop z-50 bg-boxColor/60 fixed inset-0 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-boxColor p-4 rounded-lg w-1/3 flex-col flex gap-8 max-md:w-9/12"
      >
        <div className="flex justify-between items-center">
          <h2 id="book-modal-title" className="text-2xl font-semibold text-white">
            {t.modal.title}
          </h2>
          <button
            type="button"
            aria-label={t.modal.close}
            onClick={handleClose}
            className="bg-foreground px-2 py-2 rounded-full text-white"
          >
            <Close className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-8">
          {contacts.map((c) => (
            <a
              key={c.key}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex items-center gap-4"
            >
              {c.icon}
              <span className="flex flex-col ">
                <span className="text-white">{c.label}</span>
                <span className="text-[#66676D]">{c.value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
