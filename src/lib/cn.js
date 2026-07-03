/**
 * Merges class names, filtering falsy values.
 * Lightweight alternative to clsx — no extra dependency.
 * @param {...(string|undefined|null|false)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
