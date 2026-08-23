// Minimal classnames joiner — avoids pulling in clsx/tailwind-merge for
// something this small. Falsy values (false, undefined, null, '') are
// dropped, everything else is joined with a space.
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
