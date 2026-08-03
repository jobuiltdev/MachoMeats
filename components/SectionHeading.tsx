type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const eyebrowColor = tone === "dark" ? "text-gold" : "text-chili";
  const ruleColor = tone === "dark" ? "bg-gold/50" : "bg-chili/50";
  const descriptionColor = tone === "dark" ? "text-kraft/80" : "text-olive";

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow ? (
        <div className="flex items-center gap-3">
          <span className={`h-px w-6 ${ruleColor}`} aria-hidden="true" />
          <p className={`font-utility text-xs ${eyebrowColor}`}>{eyebrow}</p>
        </div>
      ) : null}
      <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
      {description ? (
        <p className={`font-body text-base md:text-lg max-w-xl ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
