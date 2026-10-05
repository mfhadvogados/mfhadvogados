"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { practiceAreas } from "@/lib/site-content";

export function PracticeAreas() {
  const [expanded, setExpanded] = useState<string | null>(practiceAreas[0].id);
  const [anchorNavigation, setAnchorNavigation] = useState<string | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function openLinkedArea(hash: string) {
      const area = practiceAreas.find(({ id }) => hash === `#atuacao-${id}`);
      if (!area) return;

      setAnchorNavigation(area.id);
      setExpanded(area.id);
    }

    const followHash = () => openLinkedArea(window.location.hash);
    function followAreaLink(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return;

      const link = event.target.closest<HTMLAnchorElement>(
        'a[href^="#atuacao-"]',
      );
      if (!link || link.target === "_blank") return;

      event.preventDefault();
      if (window.location.hash !== link.hash) {
        window.history.pushState(null, "", link.hash);
      }
      openLinkedArea(link.hash);
    }

    // Include same-hash links, which do not dispatch a hashchange event.
    document.addEventListener("click", followAreaLink);
    window.addEventListener("hashchange", followHash);
    const initialFrame = window.requestAnimationFrame(followHash);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      document.removeEventListener("click", followAreaLink);
      window.removeEventListener("hashchange", followHash);
    };
  }, []);

  useLayoutEffect(() => {
    if (!anchorNavigation) return;

    const index = practiceAreas.findIndex(({ id }) => id === anchorNavigation);
    const trigger = triggers.current[index];
    trigger?.focus({ preventScroll: true });
    document.getElementById(`atuacao-${anchorNavigation}`)?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });

    const frame = window.requestAnimationFrame(() => setAnchorNavigation(null));
    return () => window.cancelAnimationFrame(frame);
  }, [anchorNavigation, expanded]);

  function navigateAreas(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = (index + 1) % practiceAreas.length;
        break;
      case "ArrowUp":
        nextIndex = (index - 1 + practiceAreas.length) % practiceAreas.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = practiceAreas.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    triggers.current[nextIndex]?.focus();
  }

  return (
    <div
      className="practice-areas"
      data-anchor-navigation={Boolean(anchorNavigation)}
    >
      {practiceAreas.map((area, index) => {
        const isExpanded = expanded === area.id;
        const triggerId = `area-trigger-${area.id}`;
        const panelId = `area-panel-${area.id}`;

        return (
          <article
            className="practice-area"
            id={`atuacao-${area.id}`}
            key={area.id}
            data-expanded={isExpanded}
          >
            <h3 className="practice-area__heading">
              <button
                className="practice-area__trigger"
                type="button"
                id={triggerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                ref={(element) => {
                  triggers.current[index] = element;
                }}
                onKeyDown={(event) => navigateAreas(event, index)}
                onClick={() => setExpanded(isExpanded ? null : area.id)}
              >
                <span>{area.title}</span>
                <span className="practice-area__toggle" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="practice-area__panel"
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isExpanded}
              inert={!isExpanded}
            >
              <div className="practice-area__panel-inner">
                <div className="practice-area__content">
                  <p>{area.description}</p>
                  <ul className="practice-area__details">
                    {area.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
