"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigation, site } from "@/lib/site-content";
import { Brand } from "./Brand";

export function Header({ homePath = "" }: { homePath?: "" | "/" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const pendingAnchor = useRef<string | null>(null);

  function navigateFromMenu(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (homePath) {
      setOpen(false);
      return;
    }
    event.preventDefault();
    pendingAnchor.current = href;
    setActiveSection(href);
    setOpen(false);
  }

  useEffect(() => {
    const updateHeader = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 80) setActiveSection("#inicio");
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeAtDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeAtDesktop);

    const sections = navigation
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    const visibleSections = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.set(entry.target.id, entry);
          else visibleSections.delete(entry.target.id);
        });
        const current = [...visibleSections.values()].sort(
          (a, b) => b.boundingClientRect.top - a.boundingClientRect.top,
        )[0];
        if (current) setActiveSection(`#${current.target.id}`);
      },
      { rootMargin: "-16% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", updateHeader);
      desktop.removeEventListener("change", closeAtDesktop);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <a
          className="site-header__brand"
          href={`${homePath}#inicio`}
          aria-label={`${site.name}, início`}
          onClick={() => setActiveSection("#inicio")}
        >
          <Brand tone="dark" decorative />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(({ label, href }) => (
            <a
              key={href}
              href={`${homePath}${href}`}
              aria-current={activeSection === href ? "location" : undefined}
              onClick={() => setActiveSection(href)}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="button button-dark site-header__cta"
          href={`${homePath}#contato`}
        >
          Contato
          <ArrowUpRight size={17} strokeWidth={1.3} aria-hidden="true" />
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="menu-trigger"
              aria-label="Abrir menu"
            >
              <span>Menu</span>
              <Menu size={25} strokeWidth={1.3} aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent
            className="mobile-menu"
            overlayClassName="mobile-menu-overlay"
            showCloseButton={false}
            onCloseAutoFocus={(event) => {
              const href = pendingAnchor.current;
              pendingAnchor.current = null;
              if (!href) return;
              const section = document.getElementById(href.slice(1));
              const target =
                section?.querySelector<HTMLElement>("h1, h2") ?? section;
              if (!target || !section) return;
              event.preventDefault();
              target.tabIndex = -1;
              target.focus({ preventScroll: true });
              requestAnimationFrame(() => {
                window.history.replaceState(null, "", href);
                section.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "start",
                });
              });
            }}
          >
            <div className="mobile-menu__top">
              <SheetClose asChild>
                <a
                  href={`${homePath}#inicio`}
                  aria-label={`${site.name}, início`}
                  onClick={(event) => navigateFromMenu(event, "#inicio")}
                >
                  <Brand variant="monogram" tone="light" decorative />
                </a>
              </SheetClose>
              <SheetClose
                className="mobile-menu__close"
                aria-label="Fechar menu"
              >
                <X size={25} strokeWidth={1.3} aria-hidden="true" />
              </SheetClose>
            </div>
            <SheetTitle className="sr-only">Navegação principal</SheetTitle>
            <SheetDescription className="sr-only">
              Conheça o escritório, as áreas de atuação, os profissionais e os
              canais de contato.
            </SheetDescription>
            <div className="mobile-menu__body">
              <nav className="mobile-nav" aria-label="Navegação mobile">
                {navigation.map(({ label, href }) => (
                  <SheetClose asChild key={href}>
                    <a
                      href={`${homePath}${href}`}
                      aria-current={
                        activeSection === href ? "location" : undefined
                      }
                      onClick={(event) => navigateFromMenu(event, href)}
                    >
                      <span>{label}</span>
                      <ArrowUpRight
                        size={23}
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mobile-menu__contact">
                <SheetClose asChild>
                  <a
                    className="button button-light"
                    href={`${homePath}#contato`}
                    onClick={(event) => navigateFromMenu(event, "#contato")}
                  >
                    Falar com o escritório
                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.3}
                      aria-hidden="true"
                    />
                  </a>
                </SheetClose>
                <p>
                  {site.fullName}
                  <span>{site.location}</span>
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
