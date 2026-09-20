"use client";
import Close from "@/assets/close";
import Instagram from "@/assets/Instagram";
import Phone from "@/assets/Phone";
import { Telegram } from "@/assets/Telegram";
import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const PHONE = "+994 70 222 88 86";
const HANDLE = "omgcyberzone";

const dateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

type SelectOption = { value: string; label: string };

const CustomSelect = ({
  name,
  label,
  value,
  options,
  open,
  onToggle,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  options: SelectOption[];
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) => {
  const selected = options.find((option) => option.value === value) ?? options[0];

  return (
    <div className="relative flex flex-col gap-1.5 text-sm text-gray-300">
      <span>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
        className="booking-input flex items-center justify-between text-left"
      >
        <span>{selected?.label}</span>
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>
          v
        </span>
      </button>
      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-56 overflow-y-auto rounded-lg border border-white/10 bg-[#22282f] p-1 shadow-xl"
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                onToggle();
              }}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                option.value === value
                  ? "bg-mainRed text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const BookModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const bookingDates = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);
    return { value: dateValue(date), label: date.toLocaleDateString() };
  });
  const [bookingDate, setBookingDate] = useState(bookingDates[0].value);
  const [bookingTime, setBookingTime] = useState("12:00");
  const [bookingRoom, setBookingRoom] = useState("STANDART");
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const closeModal = () => {
    setSubmitted(false);
    handleClose();
  };

  // Every caller passes a fresh arrow, so depending on handleClose directly
  // would re-run the effect on each parent render — re-reading the body
  // overflow it had just set itself. Read it through a ref instead and key
  // the effect purely on `open`.
  const closeRef = useRef(handleClose);
  useEffect(() => {
    closeRef.current = closeModal;
  });

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.addEventListener("keydown", onKeyDown);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const details = [
      `${t.modal.name}: ${form.get("name")}`,
      `${t.modal.phone}: ${form.get("phone")}`,
      `${t.modal.date}: ${form.get("date")}`,
      `${t.modal.time}: ${form.get("time")}`,
      `${t.modal.guests}: ${form.get("guests")}`,
      `${t.modal.room}: ${form.get("room")}`,
    ].join("\n");
    window.open(
      `http://wa.me/+994702228886?text=${encodeURIComponent(details)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
  };

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
  const roomOptions = ["STANDART", "VIP", "PRO", "PREMIUM", "PLAYSTATION"].map(
    (room) => ({ value: room, label: room }),
  );

  return (
    <div
      className="modal-backdrop z-50 bg-boxColor/60 fixed inset-0 flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-[min(620px,92vw)] overflow-y-auto rounded-2xl bg-boxColor p-5 shadow-2xl shadow-black/40 max-md:p-4"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="book-modal-title" className="text-2xl font-semibold text-white">
            {t.modal.title}
          </h2>
          <button
            type="button"
            aria-label={t.modal.close}
            onClick={closeModal}
            className="rounded-full bg-foreground p-2 text-white transition-colors hover:bg-mainRed"
          >
            <Close className="size-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-gray-300">
            {t.modal.name}
            <input name="name" required className="booking-input" />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-gray-300">
            {t.modal.phone}
            <input name="phone" type="tel" required className="booking-input" />
          </label>
          <CustomSelect
            name="date"
            label={t.modal.date}
            value={bookingDate}
            options={bookingDates}
            open={openSelect === "date"}
            onToggle={() => setOpenSelect(openSelect === "date" ? null : "date")}
            onChange={setBookingDate}
          />
          <CustomSelect
            name="time"
            label={t.modal.time}
            value={bookingTime}
            options={timeOptions.map((time) => ({ value: time, label: time }))}
            open={openSelect === "time"}
            onToggle={() => setOpenSelect(openSelect === "time" ? null : "time")}
            onChange={setBookingTime}
          />
          <label className="flex flex-col gap-1.5 text-sm text-gray-300">
            {t.modal.guests}
            <input name="guests" type="number" min="1" max="50" defaultValue="1" required className="booking-input" />
          </label>
          <CustomSelect
            name="room"
            label={t.modal.room}
            value={bookingRoom}
            options={roomOptions}
            open={openSelect === "room"}
            onToggle={() => setOpenSelect(openSelect === "room" ? null : "room")}
            onChange={setBookingRoom}
          />
          <button
            type="submit"
            className="mt-2 rounded-lg bg-mainRed px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 sm:col-span-2"
          >
            {t.modal.submit}
          </button>
          {submitted && (
            <p className="text-sm text-green-400 sm:col-span-2">{t.modal.success}</p>
          )}
        </form>
        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5">
          <p className="text-sm text-gray-400">{t.modal.directContact}</p>
          {contacts.map((c) => (
            <a
              key={c.key}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex items-center gap-4 text-sm"
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
