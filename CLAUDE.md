# Doka Rotterdam

Website for **Doka Rotterdam**, a professional black-and-white darkroom (doka) for hire at Studio Rik Versteeg, Hildegardisstraat 15, 3036 NS Rotterdam. It also sells a one-day analogue photography course (camera → film development → darkroom prints). Live at https://www.doka-rotterdam.nl (see `CNAME`; hosted as a static site, e.g. GitHub Pages).

All visitor-facing copy is **Dutch** (`lang="nl-NL"`). Keep new text in Dutch and match the existing tone (warm, direct, "je/jij").

## Stack

Plain static HTML + one CSS file + one small JS file. No build step, no framework, no package manager.

```
index.html        Home: full-screen sliding photo hero + logo, intro cards
impression.html   "DOKA" page: the darkroom, specs, inclusief/exclusief, photo/video gallery
cursus.html       "CURSUS" page: course info, day schedule, course dates, sign-up
reserveren.html   Prices (3 sessions), conditions, reviews, booking links
team.html         Rik Versteeg & Luca van Ruiten
contact.html      E-mail + address
terms.html        Algemene voorwaarden (terms)
style/main.css    All styling (design tokens in :root)
script/main.js    Mobile nav toggle + automatic course-date handling
images/           compressed/ (home slider), doka_img/compressed/, cursus_photos/web/,
                  team/web/, logo/, videos/ (.webm)
```

Preview locally: `python3 -m http.server 8123` from the repo root (also configured in `.claude/launch.json`). Opening the files via `file://` works too.

## Shared markup (copy-pasted, no includes)

Every page has the same `<header class="site-header">` nav and `<footer class="site-footer">`. **When changing nav links or footer content, update all 7 HTML files.** The current page's nav link gets `aria-current="page"`. The home page uses `site-header site-header--overlay` (transparent over the hero).

Each page's `<head>` has: Sora from Google Fonts, `style/main.css`, `script/main.js` (deferred), favicon, SEO title/description/keywords, canonical URL, Open Graph tags, and most have JSON-LD structured data. Keep these when editing.

## Design system

- Dark "darkroom" look; brand magenta `--accent: #ff0095` (safelight), secondary blue `--blue: #093496`, font **Sora**.
- Tokens live in `:root` in `style/main.css`. Use them, don't hard-code colours.
- Building blocks: `.wrap` (max-width container), `.section` / `.section--tight`, `.page-hero` (set the blurred background with `style="--hero-img: url('../images/…')"`; the path is relative to `style/`), `.eyebrow`, `.section-title`, `.card` / `.card--accent`, `.list` / `.list--minus`, `.grid-2` / `.grid-3` / `.split`, `.btn btn--primary` / `.btn btn--ghost`, `.photo` / `.photo--bw`.
- Breakpoints: 960px (3-col → 1-col, split stacks), 860px (hamburger menu), 700px (2-col → 1-col).
- Must work at phone width without horizontal scrolling.

## Common tasks

### Adding / removing course dates (cursus.html)
1. In the `#data` section, copy a `<li class="date-card">` and update **`datetime="YYYY-MM-DD"`**, `data-label` (e.g. `Zondag 9 mei 2027`) and the visible day/date/year.
2. Add a matching `CourseInstance` in the JSON-LD `hasCourseInstance` array in `<head>` (CET `+01:00` in winter, CEST `+02:00` in summer).
3. Update the static fallback text of `<dd data-next-course>` to the next date (shown if JS is off).

`script/main.js` automatically hides dates that have passed, badges the first upcoming one as "Eerstvolgende", and fills the "Eerstvolgende cursus" field. Old dates can still be deleted for tidiness. Courses are on Sundays, 09:30–16:00. Sign-up goes through the Eventbrite link on the "Meld je aan" button.

### Changing prices
Prices appear in several places — keep them in sync:
- `reserveren.html`: the price cards **and** the JSON-LD `offers` **and** the meta description / og:description
- `index.html`: "Vanaf €65 per dagdeel" feature card
- `terms.html` section 7 (see known issues)

### Images
Originals from the camera are huge (up to 15 MB). Always add a web-sized copy before using an image, e.g.
`sips -Z 1800 -s formatOptions 78 in.jpg --out images/…/web/out.jpg`. Use `loading="lazy"` below the fold.

## Known content inconsistencies (ask the owner before "fixing")

- `terms.html` §7 lists €55 / €65 / €100, while `reserveren.html` shows €65 / €75 / €110.
- Max print size: `impression.html` says 50×50 cm, `terms.html` says 60×60 cm.

## External links

- Booking: https://rikversteeg.com/nl/donkere-kamer-te-huur-rotterdam/
- Course sign-up: Eventbrite (link on cursus.html)
- Discount scheme: https://werktuigppo.nl/spelregels/
- Photo paper: FotoFilmFabriek
- Maps: https://maps.app.goo.gl/UmLGHMcnTGEYaz4e9
- Contact: info@doka-rotterdam.nl
