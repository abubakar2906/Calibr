import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode — all data fetching happens client-side via useEffect + fetch
  // No server-side rendering needed, so Vercel can serve this as static files
  ssr: false,
} satisfies Config;
