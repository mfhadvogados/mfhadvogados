"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

type Step = { readonly title: string; readonly description: string };

export function StrategyFlow({
  id,
  label,
  steps,
}: {
  id: string;
  label: string;
  steps: readonly Step[];
}) {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % steps.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + steps.length) % steps.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = steps.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  }
  return (
    <div className="strategy-flow">
      <div className="strategy-flow__steps" role="tablist" aria-label={label}>
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            ref={(element) => {
              buttons.current[index] = element;
            }}
          >
            <span className="strategy-flow__index">0{index + 1}</span>
            <span>{step.title}</span>
            {index < steps.length - 1 && (
              <ArrowRight aria-hidden="true" size={18} />
            )}
          </button>
        ))}
      </div>
      {steps.map((step, index) => (
        <div
          key={step.title}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={selected !== index}
          tabIndex={0}
          className="strategy-flow__panel"
        >
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
}
