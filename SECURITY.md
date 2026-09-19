# Security notes — omgcyberzone

Deployment target: **Vercel**, as a normal Next.js app (not `output: 'export'`).
Everything in code is done. What is left is dashboard work, listed under
[Manual checklist](#manual-checklist).

## Threat surface

Small, and worth keeping that way:

- No API routes, no Server Actions, no middleware.
- **No forms.** Nothing in the site performs `fetch`, `XHR` or a form POST.
  Contact happens through `tel:`, `instagram.com` and `t.me` links.
- No third-party scripts: no analytics, chat widget, embed or iframe.
- Inter is self-hosted by `next/font`; there is no Google Fonts request.
- All images are local to `/public`.
- The only environment variable is `NEXT_PUBLIC_SITE_URL`, which is a public
  URL and correctly public.

The only HTML-injection sink is the three `dangerouslySetInnerHTML` calls in
`components/seo/jsonLd.tsx`. They render JSON-LD built from dictionary files
and `data/rooms.ts` at build time, and `serialize()` escapes `<`, `>` and `&`
so a stray `</script>` in a translation cannot break out of the tag.
**Never feed those components anything a visitor can influence.**

## Headers

Set in `next.config.ts` → `headers()`, applied to `/:path*`. On Vercel these
are served at the edge for both HTML and static assets.

| Header | Why |
|---|---|
| `Content-Security-Policy` | See below. |
| `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` | Forces HTTPS for two years. **`preload` is a commitment — read the checklist before submitting.** |
| `X-Content-Type-Options: nosniff` | Stops the browser executing a mistyped response as script. |
| `X-Frame-Options: DENY` | Clickjacking. Redundant with `frame-ancestors` but covers old browsers. |
| `Referrer-Policy: strict-origin-when-cross-origin` | Full URL same-origin, origin only cross-origin, nothing over plain HTTP. |
| `Permissions-Policy` | Every unused browser feature switched off explicitly. |
| `Cross-Origin-Opener-Policy: same-origin` | Severs `window.opener`. Safe — the site opens no popups it needs to talk to. |
| `poweredByHeader: false` | Removes `X-Powered-By: Next.js`. |

### The CSP, and the one compromise in it

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self';
worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self';
form-action 'self'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
```

`instagram.com` and `t.me` are **not** allowlisted, deliberately. They are link
targets, and CSP does not govern top-level navigation — only subresources, and
forms via `form-action`. Listing them would widen the policy for nothing.

**`script-src 'unsafe-inline'` is the compromise.** The App Router boots with
inline `self.__next_f.push(...)` scripts whose contents change per page and per
build, so static hashes cannot cover them. The alternative is a per-request
nonce, which needs middleware and forces dynamic rendering — all 16 prerendered
pages would become SSR. For a brochure site with no user input reaching the
DOM, no third-party JS and no runtime HTML injection, keeping the static render
is the better trade.

**Revisit that decision if any of these become true:** you add a form, accept
any user input that gets rendered, embed a third-party widget, or start
rendering content from an API. At that point switch to nonces:

1. Add `middleware.ts` that generates a nonce per request and sets it on both
   the CSP header and a request header.
2. Read it in the layout via `headers()` and pass it to `<Script nonce={…}>`.
3. Replace `'unsafe-inline'` with `'nonce-{value}' 'strict-dynamic'`.
4. Accept that pages now render per request.

`'unsafe-eval'` is absent and must stay absent. `style-src 'unsafe-inline'` is
required by Next's injected `<style>` blocks and the hero's inline
`animation-delay` attributes; inline styles are a far weaker vector.

## Rate limiting and DDoS — Vercel

Your code cannot rate limit; there is no server of yours in the path. This is
all dashboard configuration under **Project → Firewall**.

Vercel changes plan boundaries, so **confirm each item against your own
dashboard** — the paid/free split below is a guide, not a guarantee.

### Free on every plan

1. **Automatic DDoS mitigation** — always on at the platform level, nothing to
   configure.
2. **Attack Challenge Mode** — Firewall → toggle on. Puts a JS challenge in
   front of every visitor. This is an *incident* switch, not a steady state: it
   costs real conversions. Turn it on when under attack, off afterwards.
3. **IP blocking** — Firewall → add specific IPs or CIDRs. Reactive only.

### Paid (Pro or above) — confirm before relying on these

4. **WAF custom rules with a `Rate Limit` action.** This is the real rate
   limiting, and it is a **metered, paid feature**. Suggested starting rules:

   | Rule | Match | Limit | Action |
   |---|---|---|---|
   | Document flood | `path` does not start with `/_next/` | 30 req / 10s per IP | Challenge |
   | Global ceiling | all paths | 300 req / 10s per IP | Challenge |
   | Bad-path probing | `path` matches `/wp-admin`, `/.env`, `/.git`, `/admin` | 5 req / 60s per IP | Deny |

   The split matters: one page load pulls 40–60 requests once JS, CSS, fonts
   and images are counted, so a single all-paths limit tuned for documents
   would block ordinary visitors on their first view. Rate-limit documents,
   not assets.

   Start with **Challenge**, not **Deny** — a mistuned Deny rule locks out real
   people silently. Watch the Firewall logs for a week, then tighten.

5. **Bot Filter / managed bot protection** — Pro add-on. Worth it if you see
   scraper traffic; not needed on day one for a venue landing page.

### Alternative: Cloudflare in front of Vercel

If the paid Firewall is not worth it yet, Cloudflare's free tier gives you
rate limiting rules, Bot Fight Mode and managed WAF rules. Point the domain's
nameservers at Cloudflare, proxy the record (orange cloud) to your Vercel
target, and set the same limits as the table above.

**Two caveats before you do this.** You end up with two CDNs in series, which
makes cache invalidation and debugging harder and can add latency. And
Cloudflare's SSL mode must be **Full (strict)** — anything less re-introduces
an unencrypted hop and quietly defeats the HSTS header above.

## Forms — when you add one

There are none today. When the first one lands:

- Use a provider with its own abuse controls (Formspree, Web3Forms, Getform).
  **Restrict allowed origins to your domain in their dashboard** and enable
  their spam filtering and rate limits. That is where the real protection is.
- Add **Cloudflare Turnstile** if the provider verifies it server-side.
  Otherwise add a honeypot field — a visually hidden input that humans leave
  empty and bots fill.
- Client-side validation (zod or otherwise) is for UX only. Anyone can POST
  straight to the provider endpoint and skip it entirely.
- Add the provider's origin to `form-action` **and** `connect-src` in the CSP,
  and nothing else.
- The provider's public key may live in the frontend. A private/server key
  must never be in this repo — every `NEXT_PUBLIC_` value ships to the browser
  in plain text.

## Verify

```bash
# Headers, live
curl -I https://<your-domain>

# Just the CSP
curl -sI https://<your-domain> | grep -i content-security-policy

# Confirm the framework header is gone (should print nothing)
curl -sI https://<your-domain> | grep -i x-powered-by

# Confirm HTTP redirects to HTTPS
curl -sI http://<your-domain> | grep -i '^location'
```

Then:

- **https://securityheaders.com** — expect A or A+.
- **https://observatory.mozilla.org** — it will deduct points for
  `script-src 'unsafe-inline'`. That is the known, documented trade above.
- **DevTools → Console** on every page — any `Refused to …` line is a CSP
  violation. Fix the cause; do not widen the policy reflexively.
- `npm audit` before each deploy.

A local check of all of this is in
`scratchpad/pw/csp.mjs` (9 page sweeps incl. modal, carousel and language menu)
and `scratchpad/pw/test.mjs` (63 functional assertions).

## Manual checklist

- [ ] **Set `NEXT_PUBLIC_SITE_URL`** in Vercel → Settings → Environment
      Variables, for Production and Preview. Without it, every canonical URL,
      `og:url`, hreflang and sitemap entry ships pointing at
      `http://localhost:3000`.
- [ ] Vercel → Firewall → enable **Attack Challenge Mode** and confirm you
      know where the switch is *before* you need it.
- [ ] Vercel → Firewall → add the three custom rules above (paid; confirm
      plan first). Start on **Challenge**, review logs for a week.
- [ ] Decide on **HSTS preload**. `includeSubDomains; preload` means *every*
      subdomain must serve valid HTTPS, forever-ish — removal from the browser
      preload list takes months. Only submit at
      https://hstspreload.org once you are sure. **If you are not sure, drop
      `; preload` from the header in `next.config.ts` and keep the rest.**
- [ ] Vercel → Settings → Deployment Protection: decide whether preview
      deployments should be publicly reachable. They are indexable otherwise.
- [ ] Confirm the apex and `www` both resolve and one redirects to the other.
- [ ] GitHub → Settings → enable Dependabot alerts and security updates.
- [ ] Re-run `npm audit` and the two Playwright scripts before each release.

## Remaining risks

1. **`script-src 'unsafe-inline'`** — documented above. Mitigated by the fact
   that nothing user-controlled reaches the DOM. Re-evaluate the moment that
   changes.
2. **No rate limiting until you configure it in the dashboard.** Nothing in
   this repo can provide it.
3. **`sharp` runs at runtime** because this is a Node deployment with
   `next/image` optimisation. It is patched today; it has a history of CVEs
   through libvips/libheif, so keep Next current. Switching to
   `output: 'export'` would remove it from the runtime entirely, at the cost
   of `redirects()` and image optimisation.
4. **Dependencies drift.** `npm audit` was clean at the time of writing;
   that is a snapshot, not a state.
5. **No Subresource Integrity anywhere** — correct, because there are no
   external scripts to pin. If you ever add one from a CDN, use a versioned
   URL plus `integrity` and `crossorigin`, loaded via `next/script`.
