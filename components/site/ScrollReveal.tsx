"use client";

import { useEffect } from "react";

/** Enhances the server-rendered content without changing its layout or semantics. */
export function ScrollReveal() {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (motionPreference.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          if (element.dataset.revealState !== "pending") continue;
          element.dataset.revealState = "entering";
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0 },
    );

    function show(element: HTMLElement) {
      element.dataset.revealState = "visible";
      observer.unobserve(element);
    }

    // Measure first. Content already on screen (including restored scroll
    // positions) stays visible, and a page without JavaScript stays readable.
    const belowFold = new Set(
      elements.filter(
        (element) => element.getBoundingClientRect().top >= window.innerHeight,
      ),
    );
    for (const element of elements) {
      if (belowFold.has(element)) {
        element.dataset.revealState = "pending";
        observer.observe(element);
      } else {
        show(element);
      }
    }

    function showContaining(target: EventTarget | null) {
      if (!(target instanceof Element)) return;
      for (const element of elements) {
        if (element.contains(target)) show(element);
      }
    }

    function onFocus(event: FocusEvent) {
      showContaining(event.target);
    }

    function onHashChange() {
      // IDs in this page use plain ASCII. getElementById also avoids treating
      // an arbitrary URL fragment as a CSS selector.
      showContaining(document.getElementById(window.location.hash.slice(1)));
    }

    function onAnimationEnd(event: AnimationEvent) {
      if (
        event.animationName === "section-reveal" &&
        event.target instanceof HTMLElement &&
        event.target.dataset.revealState === "entering"
      ) {
        show(event.target);
      }
    }

    function onMotionChange() {
      if (!motionPreference.matches) return;
      elements.forEach(show);
      observer.disconnect();
    }

    onHashChange();
    showContaining(document.activeElement);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("animationend", onAnimationEnd);
    window.addEventListener("hashchange", onHashChange);
    motionPreference.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("animationend", onAnimationEnd);
      window.removeEventListener("hashchange", onHashChange);
      motionPreference.removeEventListener("change", onMotionChange);
      elements.forEach((element) => delete element.dataset.revealState);
    };
  }, []);

  return null;
}
