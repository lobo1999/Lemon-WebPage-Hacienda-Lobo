# SEO update and launch checklist

This remains a static HTML/CSS/JavaScript website. No build command or framework is required. Serve the repository root. Test with `python -m http.server 8000` and open http://localhost:8000 (do not open nested pages with file:// URLs).

## Included

- Homepage: descriptive Spanish title, main heading, description, canonical URL, social sharing metadata, visible location and phone, and links to product pages.
- Four crawlable landing pages: `/limon-mandarina/`, `/limon-mesino/`, `/zumo-de-limon/`, `/limones-al-por-mayor/`. Each has distinct buying information, a canonical URL, breadcrumbs, related links, and a prefilled WhatsApp quotation link.
- `robots.txt` and `sitemap.xml` list the production domain. No fabricated last-modified dates.
- Organization JSON-LD on the homepage and WebPage/BreadcrumbList on landing pages. LocalBusiness rich-result markup is intentionally deferred until the actual public business address and eligibility are confirmed. No fabricated ratings, prices, stock claims, or product offers.
- Product images have 480px and 960px WebP versions, responsive sources and explicit dimensions. Original PNGs are retained as source assets but no longer loaded by the HTML.
- Homepage content remains readable with JavaScript disabled.
- WhatsApp clicks push `whatsapp_click` with `page_path` and `link_text` to the existing Google Tag Manager data layer. A click is not proof of a message or sale.

## Owner setup after deployment

1. Add a Domain property for `limonesloboretana.com` at https://search.google.com/search-console/ and verify it with the DNS TXT record Google provides. Do not replace other DNS records. No verification token is included in this source package.
2. Submit `https://limonesloboretana.com/sitemap.xml`. Use URL Inspection to test and request indexing for the homepage and new landing pages. Submission does not guarantee indexing or ranking.
3. On the existing host, confirm HTTP redirects to HTTPS and www redirects to the preferred hostname `limonesloboretana.com`. If an older duplicate public deployment exists, redirect it to this domain when supported. This package does not change hosting settings.
4. Verify all five canonical URLs return HTTP 200, `/robots.txt` and `/sitemap.xml` return their actual contents, and a nonexistent URL returns 404. Do not configure a catch-all rewrite to the homepage. Folder index files support the trailing-slash URLs used in this package.
5. Configure a GTM Custom Event trigger named `whatsapp_click` and an appropriate GA4 Event tag connected to your actual GA4 property. Preview and confirm one event per click before publishing your container. Retain your existing consent controls; no analytics ID has been invented here.
6. If eligible, claim or verify a Google Business Profile using the real business name, correct category, customer-facing hours, service area, phone, and website. Only show a customer-facing address if customers can actually visit. Ask customers for honest reviews.
7. Review Search Console clicks, impressions, search queries, indexing, and Core Web Vitals after launch. Also track qualified WhatsApp inquiries and actual orders.

## Business details to confirm before adding more claims

- Public address or pickup instructions; actual delivery areas, costs, and schedule.
- Order minimums, presentations, prices, and typical availability for each product.
- Juice ingredients, bottle sizes, storage instructions, and verified shelf life.
- Actual customer-facing hours and official social profile URLs.
- Real farm/product photos and any customer testimonials used with permission.

The pages currently direct customers to confirm these details when ordering. They do not claim nationwide delivery, organic certification, preservative-free juice, fixed prices, or a specific shelf life.

## References

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/monitor-debug/search-console-start
- https://support.google.com/business/answer/7091

## Scope

These changes are a source-code update, not a completed Google account configuration or an SEO ranking guarantee. Hosting publication, Search Console verification, Business Profile verification, and GTM publishing require the respective account access.

## Install this package

Extract the ZIP, then copy the contents of `Lemon-WebPage-Hacienda-Lobo-SEO/` into the root of your existing repository. Review the changes in a new branch before merging. Keep the four new page directories and the WebP image files; uploading only index.html would leave broken links and missing assets. No framework, package installation, or build step is needed.

The updated source files are `index.html` and `script.js`. Added files are `seo-pages.css`, `robots.txt`, `sitemap.xml`, this guide, four page directories and six WebP images. The existing `styles.css` and original PNG assets are retained.

## Validation performed

- Passed JavaScript syntax check and Git whitespace/error check.
- Parsed all five HTML pages: one H1 each, title, description, matching canonical URL, valid JSON-LD, existing internal link/fragment targets and referenced images with dimensions.
- Parsed sitemap XML and verified all five listed pages exist.
- Desktop product image payload decreased from 5,320,248 bytes to 399,800 bytes (92.5%); smaller responsive sources are also included. This is not a measured page-speed or ranking score.
- Automated browser execution was blocked by the editing environment's socket restrictions. Responsive visual checks and live Google Rich Results/PageSpeed checks remain to be performed on a preview or deployed site. Do not interpret the source checks as completed browser testing.
