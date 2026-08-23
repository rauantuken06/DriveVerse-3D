interface PrismMarkProps {
  className?: string
}

/**
 * The PRISM wordmark icon — a faceted triangle with a single light
 * split running through it. Used in TopNav and the Landing screen so
 * the brand mark stays exactly one component.
 */
export function PrismMark({ className }: PrismMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.5L21.5 19.5H2.5L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 2.5V19.5M6.8 19.5L12 10.2M17.2 19.5L12 10.2"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 2.5L15.6 12.8"
        stroke="var(--color-cyan)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}
