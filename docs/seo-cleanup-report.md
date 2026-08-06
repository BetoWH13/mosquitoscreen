# MosquitoScreen.net SEO Preservation & Cleanup Report

Date: 2026-08-06
Baseline commit: `699875dc7a097dc63db28921d08b642d9731aee9`
Canonical host: `https://www.mosquitoscreen.net`

## Preservation baseline

- 42 pre-cleanup HTML URLs captured.
- 25 Amazon affiliate placements captured across 6 unique destinations.
- Every original HTML route is retained, except `/bed-nets.html`, which is preserved through a one-hop 301 to `/mosquito-net-for-bed.html` to consolidate duplicate intent.
- `/index.html` is preserved through a one-hop 301 to `/`.
- No affiliate destination changed.

The machine-readable baseline is `docs/preservation-manifest.json`.

## Crawl and indexation repairs

- Standardized canonicals, Open Graph URLs, structured-data URLs, `robots.txt`, and `sitemap.xml` on the `www` host.
- Added a forced 301 from the non-`www` host to the matching `www` path.
- Removed the catch-all homepage rewrite that returned HTTP 200 for nonexistent URLs.
- Added a crawlable, `noindex, follow` `404.html` page.
- Rebuilt the sitemap with 41 canonical, existing, indexable URLs.
- Added missing descriptions and the missing legacy-page canonical.
- Normalized every HTML document to one topical H1; the site name is now non-heading brand text.
- Added `rel="sponsored noopener"` to all 25 Amazon placements.
- Removed two nonexistent article-image claims from JSON-LD and corrected two publisher-logo URLs to the existing SVG asset.
- Removed user-visible operational-language leaks found by the QA sweep (none remained after validation).

## Validation

- Page-level SEO: 43/43 HTML documents passed title, description, viewport, and single-H1 checks; all indexable documents have canonicals.
- Affiliate preservation: 25 expected placements, 25 present, 6 unique expected, 6 unique present, zero destination differences.
- Sitemap: valid XML, 41 URLs, zero non-`www` URLs, zero missing local files.
- Structured data: zero JSON-LD parse errors.
- Netlify configuration: valid TOML.
- Git whitespace/error check: clean.
- Lychee offline: 638 links checked, 566 local checks passed, zero errors, 72 network links excluded as expected.
- Lychee online: 638 links checked, 638 passed, zero errors; 10 ordinary redirects followed.

## Deploy-preview verification

Preview: `https://deploy-preview-1--mosquitoscreen.netlify.app`

- `/` returned HTTP 200 and the canonical points to `https://www.mosquitoscreen.net/`.
- `/index.html` returned a one-hop 301 to `/`.
- `/bed-nets.html` returned a one-hop 301 to `/mosquito-net-for-bed.html`.
- A random nonexistent URL returned HTTP 404, rendered `404.html`, and included `noindex, follow`.
- Preview `robots.txt` points to the `www` sitemap.
- Preview `sitemap.xml` returned HTTP 200 with 41 URLs and zero non-`www` locations.
- Netlify header, redirect-rule, and deploy-preview checks passed.

## Remaining post-merge checks

1. Confirm `https://mosquitoscreen.net/*` returns one 301 to the equivalent `https://www.mosquitoscreen.net/*` custom-domain path. Netlify validated the rule, but deploy previews cannot exercise the production apex hostname.
2. Confirm the Search Console domain property monitors both host variants during consolidation.

Production `main` remains unchanged until the draft pull request is reviewed and merged.