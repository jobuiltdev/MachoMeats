"use client";

import { useEffect, useState } from "react";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function PaymentTimer({ minutes }: { minutes: number }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const expired = secondsLeft <= 0;

  return (
    <div className="flex flex-col items-start gap-1">
      <p className="font-utility text-xs text-olive-mute">
        {expired ? "Reservation window closed" : "Complete your transfer within"}
      </p>
      <p className={`font-display text-3xl ${expired ? "text-olive-mute" : "text-chili"}`}>
        {formatTime(secondsLeft)}
      </p>
      {expired ? (
        <p className="font-body text-sm text-olive-mute max-w-sm">
          No problem if you&apos;re still sending it — the price simply isn&apos;t held after
          the timer runs out. Send your transfer and payment screenshot on WhatsApp and
          we&apos;ll confirm your order.
        </p>
      ) : null}
    </div>
  );
}
