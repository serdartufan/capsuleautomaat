/** basePath van de app (zie next.config.ts). Leeg als niet gezet. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Bouwt een absoluut pad inclusief basePath, voor client-side fetch naar
 * route handlers (fetch past basePath niet automatisch toe, Link wel).
 */
export function apiPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
