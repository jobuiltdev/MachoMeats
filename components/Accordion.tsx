"use client";

import { useId, useState, useRef, type KeyboardEvent } from "react";

export type AccordionEntry = {
  question: string;
  answer: string;
};

function AccordionItem({
  entry,
  isOpen,
  onToggle,
}: {
  entry: AccordionEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape" && isOpen) {
      onToggle();
      buttonRef.current?.focus();
    }
  }

  return (
    <div className="border-b border-olive-mute/40">
      <h3>
        <button
          ref={buttonRef}
          type="button"
          id={`${id}-trigger`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          className="w-full flex items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-lg md:text-xl">{entry.question}</span>
          <span
            aria-hidden="true"
            className={`shrink-0 font-display text-2xl leading-none text-chili transition-transform duration-300 ease-brand ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className="grid transition-[grid-template-rows] duration-300 ease-brand"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="font-body text-base text-olive pb-6 max-w-2xl">{entry.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ entries }: { entries: AccordionEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-olive-mute/40">
      {entries.map((entry, index) => (
        <AccordionItem
          key={entry.question}
          entry={entry}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}
