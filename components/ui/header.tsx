"use client";
import Logo from "@/assets/Logo";
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { HamburgerMenu } from "@/assets/hamburger-menu";
import { BookModal } from "./bookModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "./languageSwitcher";

export const Header = () => {
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const home = `/${locale}`;

  // Transparent over the hero, frosted once the page scrolls under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // handle loads that start part-way down (e.g. #anchor links)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menu: { name: string; href: string }[] = [
    { name: t.nav.home, href: home },
    { name: t.nav.plans, href: `${home}#plans` },
    { name: t.nav.games, href: `${home}#games` },
    { name: t.nav.menu, href: `${home}/menu` },
    { name: t.nav.gallery, href: `${home}#gallery` },
    { name: t.nav.faq, href: `${home}#faq` },
    // The footer lives in the locale layout, so this is always same-page.
    { name: t.nav.contacts, href: "#footer" },
  ];

  // The mobile overlay covers the viewport; stop the page behind it scrolling.
  useEffect(() => {
    if (!hamburgerMenu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [hamburgerMenu]);

  useEffect(() => {
    if (!hamburgerMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHamburgerMenu(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hamburgerMenu]);

  /**
   * Anchor links pointing at the page we are already on are handled here so we
   * get smooth scrolling. Everything else falls through to Next, which scrolls
   * to the hash itself once the target route has rendered.
   */
  const handleNavClick = (
    e: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setHamburgerMenu(false);

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;

    const path = href.slice(0, hashIndex);
    const hash = href.slice(hashIndex + 1);
    const samePage = path === "" || path === pathname;
    if (!samePage) return;

    const target = document.getElementById(hash);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="flex fixed z-40 w-full h-24 justify-between items-center max-md:h-14 max-md:gap-4">
      {/*
        The frosted background lives on its own layer rather than on <header>.
        An element with backdrop-filter becomes the containing block for its
        fixed-position descendants — putting it on <header> trapped the booking
        modal and the mobile menu inside the 96px bar instead of the viewport.
      */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 border-b transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
          scrolled || hamburgerMenu
            ? "bg-foreground/70 backdrop-blur-xl border-white/10 shadow-lg shadow-black/30"
            : "bg-transparent border-transparent"
        }`}
      />
      {/* No overflow-hidden here: the language dropdown is absolutely
          positioned below the header bar and would be clipped by it. */}
      <div className="flex  container-custom z-40  w-full   justify-between items-center max-md:gap-4">
        <BookModal open={bookModal} handleClose={() => setBookModal(false)} />
        <Link href={home} aria-label={t.nav.toHome}>
          <Logo className="size-24 max-md:w-22 h-12 cursor-pointer" />
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={t.nav.openMenu}
            aria-expanded={hamburgerMenu}
            onClick={() => setHamburgerMenu(true)}
          >
            <HamburgerMenu className="size-10 text-white rotate-180" />
          </button>
        </div>

        {hamburgerMenu ? (
          <div className="fixed w-screen h-screen  z-50 left-0 top-0 ">
            <div className=" bg-foreground gap-8 h-full p-1.5 flex  flex-col w-full ">
              <div className="flex justify-between items-center container-custom  ">
                <Link
                  href={home}
                  aria-label={t.nav.toHome}
                  onClick={() => setHamburgerMenu(false)}
                >
                  <Logo className="size-24 max-md:w-22 h-12 cursor-pointer" />
                </Link>
                <button
                  type="button"
                  aria-label={t.nav.closeMenu}
                  onClick={() => setHamburgerMenu(false)}
                >
                  <HamburgerMenu className="size-10 text-white rotate-180 " />
                </button>
              </div>
              <div className="flex flex-col gap-12 font-bold max-md:gap-12 container-custom ">
                {menu.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    onClick={(e) => handleNavClick(e, m.href)}
                    className="cursor-pointer text-white max-md:text-lg"
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
              <button
                onClick={() => {
                  setHamburgerMenu(false);
                  setBookModal(true);
                }}
                className="bg-mainRed w-fit text-lg container-custom   px-8 py-4 rounded-xl font-semibold cursor-pointer max-md:text-sm max-md:px-4 max-md:py-1 text-white uppercase text-nowrap max-md:rounded-sm"
              >
                {t.nav.book}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-8 items-center max-lg:hidden ">
            <div className="flex gap-8 font-bold items-center max-md:gap-4  ">
              {menu.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  onClick={(e) => handleNavClick(e, m.href)}
                  aria-current={pathname === m.href ? "page" : undefined}
                  className={`cursor-pointer text-white max-md:text-sm ${pathname === m.href ? "border-b" : ""}`}
                >
                  {m.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <button
                onClick={() => setBookModal(true)}
                className="bg-mainRed p-2 rounded-lg text-white font-semibold px-4"
              >
                {t.nav.book}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
