# Arman & Co Engineering Services: website

A static, bilingual website (English and Arabic, with right-to-left layout). No build step and no server needed.

```
index.html, services.html, projects.html, about.html, contact.html   English
ar/…same five pages…                                                  Arabic (RTL)
assets/style.css, site.js, favicon.svg
```

All links are relative, so the folder works at a root domain or under a sub-path such as `username.github.io/arman-co/`.

## Publish for free (pick one)

**Cloudflare Pages or Netlify (easiest):** create a free account, choose "Deploy a site / Upload assets", and drag in this whole folder (or the zip).

**GitHub Pages:** create a repository, upload the contents of this folder, then Settings, Pages, deploy from the `main` branch, root folder.

## Move to your own domain later

1. Buy the domain, then add it in your host's "Custom domain" setting and follow the DNS steps it shows.
2. Add a `sitemap.xml` and absolute `<link rel="alternate" hreflang>` tags between each English page and its Arabic twin (these need the final domain, so they are left out for now).
3. Add the firm's registration or licence number to the footer once you have it.

## Things to edit

- **Contact details** are in `contact.html` and `ar/contact.html` (search for the email addresses and phone numbers). Replace with a firm email when you have one.
- **Contact form:** it prepares an email in the visitor's email app. To receive submissions directly instead, create a free Formspree or Netlify Forms form and point the `<form>` at it.
- **Projects** are listed as the principals' past experience. Check with former employers and clients before naming projects publicly, and add real Arman & Co projects as you win them.
- **Arabic text** should be read once by a native Arabic-speaking engineer before launch.
- **Photos and logo:** the logo is a simple truss mark and the drawings are schematic. Swap in your own logo and project photos whenever you have them.
