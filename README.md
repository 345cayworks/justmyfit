# Just My Fit Clothing Store — Website

A modern, minimal, mobile-friendly website for **Just My Fit Clothing Store**, George Town, Cayman Islands.

Owner: Angella Barrett · Phone: 345-329-0984 · Email: barrettangella@yahoo.com

---

## What's included

```
JUST MY FIT/
├── index.html              # Home page
├── products.html           # Services / Products page
├── gallery.html            # Gallery / Lookbook (with lightbox)
├── faq.html                # FAQ page
├── css/
│   └── styles.css          # All styling (one shared stylesheet)
├── js/
│   └── main.js             # Mobile menu, scroll reveal, FAQ accordion
├── assets/
│   └── just-my-fit-logo.jpeg   # Store logo (header, hero, footer)
├── robots.txt              # SEO crawl rules
├── sitemap.xml             # SEO sitemap
└── README.md               # This file
```

It is a **static website** — pure HTML, CSS and JavaScript. No build step, no server software required. It can be hosted anywhere (Netlify, Cloudflare Pages, GitHub Pages, cPanel, any web host).

---

## How to preview locally

Just double-click `index.html` to open it in any web browser. All pages link together.

---

## How to publish

1. Upload the **entire folder** (keeping the structure above) to your web host's public folder (often `public_html`, `www`, or the site root).
2. Make sure `index.html` is at the top level so it loads as the home page.

### Free / easy hosting options
- **Netlify** or **Cloudflare Pages** — drag-and-drop the folder, done in minutes.
- **cPanel / traditional host** — upload via the File Manager or FTP.

---

## Connecting the domain (when ready)

The client does not yet have a domain. The site currently uses the placeholder:

```
justmyfit.ky
```

### Step 1 — Register the domain
`.ky` domains are managed through the Cayman Islands registry. A local provider (e.g. a Cayman web/IT company) can register `justmyfit.ky` or a similar name. A `.com` can also be used if preferred.

### Step 2 — Update the placeholder domain in the code
Once the real domain is known, find-and-replace `justmyfit.ky` across the project. It appears in:

- `index.html`, `products.html`, `faq.html` → the `<link rel="canonical">` tags, the Open Graph (`og:url`, `og:image`) tags, the footer line, and the structured-data (`application/ld+json`) blocks.
- `robots.txt` → the `Sitemap:` line.
- `sitemap.xml` → every `<loc>` URL.

A simple Find & Replace All (`justmyfit.ky` → `yournewdomain.ky`) in a code editor updates everything at once.

### Step 3 — Point the domain at the host
Set the domain's DNS to your chosen host (the host provides the records). Then enable HTTPS/SSL (free with Netlify, Cloudflare Pages, and most hosts).

---

## Updating content

Everything is plain text inside the HTML files — open them in any editor to change wording, phone number, address, or hours.

### Replacing the placeholder photos with real store photos
The fashion images are **placeholders** loaded from Unsplash (royalty-free). To use real store photos:

1. Drop your photos into the `assets/` folder (e.g. `assets/ladies-1.jpg`).
2. In the HTML, replace the image URL `https://images.unsplash.com/...` with your file path, e.g. `assets/ladies-1.jpg`.
3. Keep the `alt="..."` text descriptive — it helps SEO and accessibility.

### Adding more photos to the Gallery
The **Gallery page** (`gallery.html`) showcases store photos and links to Instagram
([@just.my.fit](https://www.instagram.com/just.my.fit/)). To add a new photo:

1. Drop the image into `assets/` (use a simple lowercase name with no spaces, e.g. `gallery-new-dress.jpeg`).
2. In `gallery.html`, copy one existing `<button class="g-item" ...>` block and update:
   - `data-full` and the `<img src>` → your new file path
   - `data-title` / `data-sub` and the `<img alt>` / `.g-overlay` text → a short description
3. The lightbox (click-to-zoom) and responsive grid pick it up automatically.

Note: Instagram photos can't be pulled in automatically, so the gallery uses photos
saved into `assets/`. Refresh it whenever new styles come in.

### Adding the real social media links
Social icons currently link to `#` (placeholder). When the accounts are live, replace each `href="#"` with the real profile URLs (Facebook, Instagram, WhatsApp) in the footer and the Home page "Stay Connected" section.

### Updating the map
The Home page embeds a Google Map centered on George Town. To pin the exact store, open Google Maps, search the precise address, choose **Share → Embed a map**, and paste the new `src` into the `<iframe>` in `index.html`.

---

## Favicons (browser tab icon)

The favicon was generated from the store logo (cropped to the figure so it stays
clear at small sizes). Files live in the project: `favicon.ico` (root) plus
`assets/favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`,
`apple-touch-icon.png`, `icon-192.png`, and `icon-512.png`.

To regenerate them (e.g. after changing the logo):

```
npm install
node build-favicons.js
```

---

## Performance & SEO

- **Images** are optimized for fast mobile loading: full photos are capped at 1100px
  (used in the lightbox) and the grid loads 640px thumbnails from `assets/thumb/`
  (the grid payload dropped ~82%). After adding new gallery photos, re-run:
  ```
  npm install
  node build-image-optim.js
  ```
- **SEO** per page: unique titles + ~150-char meta descriptions, Open Graph + Twitter
  cards, `robots` and `geo` meta, canonical URLs, and structured data —
  `ClothingStore` (home), `BreadcrumbList` (inner pages), `ItemList` (products),
  `ImageGallery` (gallery) and `FAQPage` (FAQ). Sitemap + robots.txt included.
- When the real domain is set, the find-and-replace for `justmyfit.ky`
  (see above) also updates all the SEO/structured-data URLs.

---

## Brand & design notes

- **Colors:** deep charcoal/black base, with pink + purple from the logo as accents and royal blue as a secondary accent, on soft neutral backgrounds for readability.
- **Fonts:** Playfair Display (headings) + Poppins (body), loaded from Google Fonts.
- **Responsive:** adapts to desktop, tablet and mobile, with a slide-down mobile menu and a floating call button on phones.
- **SEO:** unique titles & meta descriptions per page, Open Graph tags, `ClothingStore` + `FAQPage` structured data, sitemap and robots.txt.
- **Accessibility:** semantic markup, keyboard-friendly menu/accordion, descriptive alt text, and reduced-motion support.

Contact details appear in the header (call button), a contact section, and the footer of **every page**.
