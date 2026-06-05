# Just My Fit Clothing Store — Website

A modern, minimal, mobile-friendly website for **Just My Fit Clothing Store**, George Town, Cayman Islands.

Owner: Angella Barrett · Phone: 345-329-0984 · Email: barrettangella@yahoo.com

---

## What's included

```
JUST MY FIT/
├── index.html              # Home page
├── products.html           # Services / Products page
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
justmyfitclothing.ky
```

### Step 1 — Register the domain
`.ky` domains are managed through the Cayman Islands registry. A local provider (e.g. a Cayman web/IT company) can register `justmyfitclothing.ky` or a similar name. A `.com` can also be used if preferred.

### Step 2 — Update the placeholder domain in the code
Once the real domain is known, find-and-replace `justmyfitclothing.ky` across the project. It appears in:

- `index.html`, `products.html`, `faq.html` → the `<link rel="canonical">` tags, the Open Graph (`og:url`, `og:image`) tags, the footer line, and the structured-data (`application/ld+json`) blocks.
- `robots.txt` → the `Sitemap:` line.
- `sitemap.xml` → every `<loc>` URL.

A simple Find & Replace All (`justmyfitclothing.ky` → `yournewdomain.ky`) in a code editor updates everything at once.

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

### Adding the real social media links
Social icons currently link to `#` (placeholder). When the accounts are live, replace each `href="#"` with the real profile URLs (Facebook, Instagram, WhatsApp) in the footer and the Home page "Stay Connected" section.

### Updating the map
The Home page embeds a Google Map centered on George Town. To pin the exact store, open Google Maps, search the precise address, choose **Share → Embed a map**, and paste the new `src` into the `<iframe>` in `index.html`.

---

## Brand & design notes

- **Colors:** deep charcoal/black base, with pink + purple from the logo as accents and royal blue as a secondary accent, on soft neutral backgrounds for readability.
- **Fonts:** Playfair Display (headings) + Poppins (body), loaded from Google Fonts.
- **Responsive:** adapts to desktop, tablet and mobile, with a slide-down mobile menu and a floating call button on phones.
- **SEO:** unique titles & meta descriptions per page, Open Graph tags, `ClothingStore` + `FAQPage` structured data, sitemap and robots.txt.
- **Accessibility:** semantic markup, keyboard-friendly menu/accordion, descriptive alt text, and reduced-motion support.

Contact details appear in the header (call button), a contact section, and the footer of **every page**.
