import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-chili text-paper border border-chili hover:bg-olive-deep hover:border-olive-deep",
  secondary:
    "bg-transparent text-olive-deep border border-olive-deep hover:bg-olive-deep hover:text-paper",
  ghost:
    "bg-transparent text-current border border-transparent hover:border-current",
};

const SHARED_CLASSES =
  "font-utility text-xs sm:text-sm inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-colors duration-200 ease-brand disabled:opacity-40 disabled:pointer-events-none";

export default function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${SHARED_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, href: _href, ...buttonProps } = props as ButtonAsButton;

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
