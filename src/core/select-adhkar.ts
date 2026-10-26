import { adhkar } from "../data/adhkar";
import type { Adhkar } from "../types";

export function selectAdhkar(
  items: readonly Adhkar[] = adhkar,
  previousId?: string,
): Adhkar | null {
  if (items.length === 0) {
    return null;
  }

  const candidates =
    items.length > 1 && previousId
      ? items.filter((item) => item.id !== previousId)
      : items;
  const pool = candidates.length > 0 ? candidates : items;

  return pool[Math.floor(Math.random() * pool.length)];
}
