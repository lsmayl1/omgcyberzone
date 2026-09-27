"use client";
import Close from "@/assets/close";
import { Wifi } from "lucide-react";
import React, { useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

/**
 * A web page cannot join a Wi-Fi network on the visitor's behalf — there is
 * no browser API for it. The QR code is the closest thing: phone cameras on
 * iOS and Android read the WIFI: payload and offer to connect in one tap.
 * The copy button covers the visitor who opened the footer on the very phone
 * they want to connect, and so has nothing to scan it with.
 */
export const WifiButton = ({
  t,
  ssid,
  password,
  qrSvg,
}: {
  t: Dictionary;
  ssid: string;
  password: string;
  /** Rendered on the server so the QR encoder stays out of the client bundle. */
  qrSvg: string;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is blocked on plain http and in some in-app browsers; the
      // password is on screen right above the button either way.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
      >
        <Wifi className="size-4" aria-hidden="true" />
        {t.footer.wifi}
      </button>

      {/* Native <dialog>: Esc, focus trapping and the backdrop come free. */}
      <dialog
        ref={dialogRef}
        aria-labelledby="wifi-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-boxColor p-6 text-white backdrop:bg-black/70"
      >
        <div className="flex items-center justify-between">
          <h2 id="wifi-title" className="text-lg font-bold">
            {t.footer.wifiTitle}
          </h2>
          <button
            type="button"
            aria-label={t.modal.close}
            onClick={() => dialogRef.current?.close()}
            className="rounded-md p-1 text-gray-400 transition-colors hover:text-white"
          >
            <Close className="size-5" />
          </button>
        </div>

        <div
          className="mx-auto mt-5 w-56 rounded-xl bg-white p-3"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
        <p className="mt-3 text-center text-sm text-gray-400">
          {t.footer.wifiScan}
        </p>

        <dl className="mt-5 flex flex-col gap-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">{t.footer.wifiNetwork}</dt>
            <dd className="font-semibold">{ssid}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-gray-500">{t.footer.wifiPassword}</dt>
            <dd className="font-mono font-semibold">{password}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={copy}
          className="mt-5 w-full rounded-lg bg-mainRed px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-mainRed/85"
        >
          {copied ? t.footer.wifiCopied : t.footer.wifiCopy}
        </button>
      </dialog>
    </>
  );
};
