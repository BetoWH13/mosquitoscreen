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

## Deployment checks still required

After deploying to a preview or production branch, verify:

1. `https://mosquitoscreen.net/*` returns one 301 to the equivalent `https://www.mosquitoscreen.net/*` path.
2. `/index.html` and `/bed-nets.html` return their intended one-hop 301s.
3. A random nonexistent URL returns HTTP 404 and renders `404.html`.
4. The deployed sitemap and robots file use `www` exclusively.
5. Google Search Console uses the domain property or has both host variants monitored during consolidation.

No deployment, commit, push, or GitHub mutation was performed in this pass.