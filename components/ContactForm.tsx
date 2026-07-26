"use client";

import { useState, type FormEvent } from "react";
import { buildContactWhatsAppUrl } from "@/lib/checkout";
import Button from "@/components/Button";

const INPUT_CLASSES =
  "w-full border border-olive-mute bg-paper px-4 py-3 font-body text-base focus:outline-none";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = buildContactWhatsAppUrl(name, phone, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label htmlFor="contact-name" className="font-utility text-xs text-olive-mute">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${INPUT_CLASSES} mt-2`}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className="font-utility text-xs text-olive-mute">
          Phone
        </label>
        <input
          id="contact-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${INPUT_CLASSES} mt-2`}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="font-utility text-xs text-olive-mute">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${INPUT_CLASSES} mt-2 resize-none`}
        />
      </div>
      <Button type="submit" variant="primary" className="w-fit">
        Send on WhatsApp
      </Button>
    </form>
  );
}
