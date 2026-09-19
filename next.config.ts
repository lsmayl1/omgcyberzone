import path from "node:path";
import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * The allowlist is deliberately tiny because the site loads nothing from
 * anywhere else: Inter is self-hosted by next/font, every image is in
 * /public, there are no analytics, chat widgets, embeds or iframes, and no
 * first-party code performs fetch/XHR at all.
 *
 * instagram.com and t.me are NOT listed on purpose. They are link targets,
 * and CSP does not govern top-level navigation — only subresources (and
 * forms, via form-action). Allowlisting them would widen the policy for no
 * benefit.
 *
 * script-src 'unsafe-inline' — the one real compromise. The App Router
 * bootstraps with inline `self.__next_f.push(...)` scripts whose contents
 * differ per page and per build, so static hashes cannot cover them. The
 * alternative is a per-request nonce, which requires middleware and forces
 * every page to render dynamically — that would drop all 16 prerendered
 * pages to SSR. For a brochure site with no user input reaching the DOM, no
 * third-party JS and no dynamic HTML injection, keeping the static render is
 * the better trade. See SECURITY.md for how to switch if that changes.
 *
 * 'unsafe-eval' is deliberately absent: production Next does not need it.
 *
 * style-src 'unsafe-inline' is required by Next's injected <style> blocks and
 * by the inline style="animation-delay:…" attributes in the hero. Inline
 * styles are a far weaker vector than inline scripts.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // data: covers next/image placeholders and inline SVG data URIs.
  "img-src 'self' data:",
  "font-src 'self'",
  // Same-origin only: RSC payload fetches on client-side navigation.
  "connect-src 'self'",
  "media-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  // No form posts anywhere in the site; tighten to self.
  "form-action 'self'",
  // The footer embeds a Google Maps iframe. This is the only third-party
  // origin the site loads anything from, and frame-src governs only what may
  // be framed *by* us — X-Frame-Options and frame-ancestors still stop anyone
  // framing this site. Note the embed sets Google cookies as soon as the
  // footer scrolls into view.
  "frame-src https://www.google.com",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Everything the site does not use is switched off explicitly. */
const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "usb=()",
  "xr-spatial-tracking=()",
].join(", ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    // Two years, subdomains included, and flagged for the preload list.
    // NOTE: `preload` is a commitment — see the checklist in SECURITY.md
    // before submitting the domain to hstspreload.org.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Stops the browser second-guessing Content-Type, which is how a file that
  // is served as text ends up executed as script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Belt and braces with frame-ancestors 'none' for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  // Full URL to same-origin, origin only cross-origin, nothing over plain
  // HTTP. Keeps referral analytics working without leaking paths.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  // Severs window.opener between this document and cross-origin openers.
  // Safe here: the site opens no popups it needs to talk to.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Drops the `X-Powered-By: Next.js` response header, which otherwise tells
  // every scanner which framework to look up advisories for.
  poweredByHeader: false,

  // There is a stray package-lock.json in the parent directory, and without
  // this Next picks that directory as the workspace root and resolves modules
  // from the wrong tree. Pin the root to this project.
  turbopack: { root: path.resolve(".") },

  images: {
    // Every image is local to /public. An empty allowlist means next/image
    // will refuse any remote URL, so a future `<Image src="https://…">` fails
    // loudly in review instead of silently proxying a third-party origin.
    remotePatterns: [],
    // Never let next/image render an uploaded SVG: SVG can carry script.
    dangerouslyAllowSVG: false,
  },

  async headers() {
    return [
      {
        // Applies to every route, HTML and static assets alike.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // Locale root
      { source: "/", destination: "/ru", permanent: true },
      // Pre-i18n URLs, kept alive so existing links and any indexed pages
      // land on the Russian version instead of 404ing.
      { source: "/menu", destination: "/ru/menu", permanent: true },
      { source: "/plans", destination: "/ru/plans", permanent: true },
    ];
  },
};

export default nextConfig;
