const TORN_PATH =
  "M0,41 L36,59 L61,41 L104,60 L132,61 L162,24 L208,15 L228,26 L253,55 L272,22 L310,57 L346,43 L374,48 L404,53 L442,24 L472,17 L517,50 L538,64 L594,6 L631,46 L653,52 L682,74 L704,67 L759,36 L791,45 L838,29 L890,51 L943,36 L973,18 L1003,55 L1025,39 L1048,74 L1075,59 L1102,47 L1133,56 L1156,60 L1174,53 L1227,62 L1270,39 L1289,51 L1319,28 L1338,25 L1379,39 L1409,34 L1440,50";

type TornDividerProps = {
  /** Tailwind fill-* class for the colour bleeding through the tear */
  fillClassName: string;
  /** Mirrors the tear so it reads as a top edge instead of a bottom edge */
  flip?: boolean;
  className?: string;
};

/**
 * The brand's signature torn-paper/torn-meat edge. One hand-authored irregular
 * path, reused for section transitions, the hero's bottom edge, and product
 * card hover states — never a smooth wave, never a symmetrical zigzag.
 */
export default function TornDivider({
  fillClassName,
  flip = false,
  className = "",
}: TornDividerProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-x-0 h-6 w-full sm:h-10 md:h-14 ${
        flip ? "top-0 -translate-y-px rotate-180" : "bottom-0 translate-y-px"
      } ${className}`}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
    >
      <path d={`${TORN_PATH} L1440,80 L0,80 Z`} className={fillClassName} />
    </svg>
  );
}
