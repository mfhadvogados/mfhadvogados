"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Star, X } from "lucide-react";
import { reviews, type Review } from "@/lib/reviews";
import { ContactLink } from "./ContactChannels";
import { GoogleIcon } from "./SocialIcons";
import "./reviews.css";

function Rating() {
  return (
    <span className="review-rating" role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
      ))}
    </span>
  );
}

function ReviewCard({
  review,
  onRead,
}: {
  review: Review;
  onRead: (review: Review, trigger: HTMLButtonElement) => void;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;
    let active = true;
    const measure = () => {
      if (active) setTruncated(text.scrollHeight > text.clientHeight + 1);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(text);
    void document.fonts.ready.then(measure);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  return (
    <article className="review-card" aria-labelledby={`review-${review.id}`}>
      <div className="review-card__author">
        <Image src={review.avatar} alt="" width={44} height={44} sizes="44px" />
        <h3 id={`review-${review.id}`}>{review.name}</h3>
        <GoogleIcon size={18} className="review-card__google" />
      </div>
      <Rating />
      <blockquote>
        <p className="review-card__text" ref={textRef}>
          {review.text}
        </p>
      </blockquote>
      <div className="review-card__footer">
        {truncated && (
          <button
            type="button"
            className="review-card__read"
            aria-label={`Ler avaliação completa de ${review.name}`}
            aria-haspopup="dialog"
            onClick={(event) => onRead(review, event.currentTarget)}
          >
            Ler mais <ArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
}

export function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const readTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<Review | null>(null);
  const [progress, setProgress] = useState({
    first: 0,
    visible: 1,
    previous: false,
    next: true,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      const visible = Math.max(1, Math.round((track.clientWidth + gap) / step));
      const first = Math.min(
        Math.max(0, reviews.length - visible),
        Math.round(track.scrollLeft / step),
      );
      const previous = track.scrollLeft > 1;
      const next = track.scrollLeft + track.clientWidth < track.scrollWidth - 1;
      setProgress((current) =>
        current.first === first &&
        current.visible === visible &&
        current.previous === previous &&
        current.next === next
          ? current
          : { first, visible, previous, next },
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, []);

  function scrollTo(left: number) {
    trackRef.current?.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function move(direction: number) {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    scrollTo(track.scrollLeft + direction * (card.offsetWidth + gap));
  }

  function handleKey(event: KeyboardEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") scrollTo(0);
    else if (event.key === "End") scrollTo(event.currentTarget.scrollWidth);
    else move(event.key === "ArrowRight" ? 1 : -1);
  }

  return (
    <Dialog.Root
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) setSelected(null);
      }}
    >
      <section
        className="section reviews"
        id="avaliacoes"
        aria-labelledby="reviews-title"
      >
        <div className="container">
          <div className="reviews__heading">
            <div>
              <p className="reviews__source">
                <GoogleIcon size={17} /> Avaliações no Google
              </p>
              <h2 id="reviews-title">Experiências com o MFH.</h2>
            </div>
            <ContactLink channel="google" className="text-link">
              Ver no Google <ArrowRight size={17} aria-hidden="true" />
            </ContactLink>
          </div>
          <div
            role="region"
            aria-label="Avaliações de quem conhece o escritório"
            aria-roledescription="carrossel"
          >
            <p id="reviews-instructions" className="sr-only">
              Use as setas para percorrer as avaliações. No celular, deslize os
              cards para os lados.
            </p>
            <ul
              className="reviews__track"
              ref={trackRef}
              tabIndex={0}
              aria-label="Cinco avaliações no Google"
              aria-describedby="reviews-instructions"
              onKeyDown={handleKey}
            >
              {reviews.map((review) => (
                <li key={review.id}>
                  <ReviewCard
                    review={review}
                    onRead={(selectedReview, trigger) => {
                      readTriggerRef.current = trigger;
                      setSelected(selectedReview);
                    }}
                  />
                </li>
              ))}
            </ul>
            <div className="reviews__controls">
              <p aria-live="polite" aria-atomic="true">
                {progress.first + 1}
                {progress.visible > 1 &&
                  `–${Math.min(reviews.length, progress.first + progress.visible)}`}
                <span> de {reviews.length}</span>
              </p>
              <div>
                <button
                  type="button"
                  aria-label="Avaliação anterior"
                  disabled={!progress.previous}
                  onClick={() => move(-1)}
                >
                  <ArrowLeft size={20} strokeWidth={1.4} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Próxima avaliação"
                  disabled={!progress.next}
                  onClick={() => move(1)}
                >
                  <ArrowRight size={20} strokeWidth={1.4} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <noscript>
          <style>{`#avaliacoes .review-card { height: auto; } #avaliacoes .review-card__text { height: auto; display: block; overflow: visible; white-space: pre-line; } #avaliacoes .reviews__controls, #avaliacoes .review-card__footer { display: none; }`}</style>
        </noscript>
      </section>
      <Dialog.Portal>
        <Dialog.Overlay className="review-dialog__overlay" />
        <Dialog.Content
          className="review-dialog"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            readTriggerRef.current?.focus();
          }}
        >
          {selected && (
            <>
              <div className="review-dialog__header">
                <Image
                  src={selected.avatar}
                  alt=""
                  width={48}
                  height={48}
                  sizes="48px"
                />
                <div>
                  <Dialog.Title>{selected.name}</Dialog.Title>
                  <Dialog.Description>
                    Avaliação publicada no Google
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  className="review-dialog__close"
                  aria-label="Fechar avaliação"
                >
                  <X size={22} strokeWidth={1.4} aria-hidden="true" />
                </Dialog.Close>
              </div>
              <Rating />
              <blockquote className="review-dialog__body">
                <p>{selected.text}</p>
              </blockquote>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
