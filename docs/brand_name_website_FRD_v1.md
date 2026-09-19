# Functional Requirements Document (FRD)

## brand_name --- AI Image Prompt + Personalised Sticker Website

**Version:** 1.0\
**Product:** Web MVP\
**Launch focus:** Kerala-first\
**Primary conversion:** `Print with [brand_name]` → Google Form

------------------------------------------------------------------------

## 1. Product Overview

brand_name is a visual discovery website for ready-made AI image
prompts. A visitor browses original visual concepts, opens a prompt,
copies the prompt, pastes it into an AI image tool such as Gemini with
their own reference image, generates the final artwork, and can then
submit that artwork through a Google Form to order a personalised
sticker.

The MVP is deliberately lightweight:

-   Two pages only
-   No account system
-   No search
-   No sidebar
-   No built-in AI image generator
-   No native website checkout/payment
-   Google Form used for print-order intake

The visual direction is inspired by the supplied Pixvu screenshots:
editorial typography, vivid indigo areas, large visual cards, rounded
corners, generous whitespace and a masonry-like gallery.

## 2. Goals

1.  Create a premium, visual-first prompt discovery experience.
2.  Make each prompt understandable before the visitor copies it.
3.  Provide a clear workflow from prompt to generated image to printed
    sticker.
4.  Drive the primary conversion to `Print with [brand_name]`.
5.  Keep the MVP simple enough to launch and iterate quickly.
6.  Use original or rights-cleared reference artwork.
7.  Make the experience mobile-first.

## 3. Explicit MVP Exclusions

-   Search bar, search page or search suggestions
-   Join Now, Login, Sign in, profile, notification or account dashboard
-   Sidebar navigation
-   Prompt generator
-   Built-in AI image generation
-   Likes, comments, favourites or community uploads
-   Public user profiles
-   Native checkout/payment
-   Public user-image gallery

## 4. Information Architecture

  -----------------------------------------------------------------------
  Page              Purpose           Primary CTA       Major Sections
  ----------------- ----------------- ----------------- -----------------
  Home Page         Discover prompt   View Prompt       Header, Hero,
                    concepts                            Feature Tiles,
                                                        Categories,
                                                        Prompt Gallery,
                                                        Footer

  Copy Prompt       Use prompt and    Copy Prompt /     Preview,
  Screen            order print       Print with        Metadata, Prompt,
                                      \[brand_name\]    Workflow,
                                                        Pricing, Print
                                                        CTA, Related
                                                        Prompts
  -----------------------------------------------------------------------

## 5. Global Visual Theme

The design should feel like an editorial creative library rather than a
conventional e-commerce store.

-   Warm off-white page canvas
-   Vivid indigo hero areas
-   Near-black typography
-   Large visual cards
-   Subtle borders
-   Rounded corners
-   Generous whitespace
-   Masonry-style visual gallery
-   Premium editorial typography
-   Minimal shadows
-   Strong image-first presentation

The website should be visually inspired by Pixvu, but must use
brand_name branding, copy, original/licensed images and original UI
implementation.

## 6. Color System

  Token            Value       Usage
  ---------------- ----------- ------------------------------------
  Primary Indigo   `#4F46E5`   Hero, primary CTA, selected states
  Deep Indigo      `#4338CA`   Hover/active states
  Canvas           `#F7F7F5`   Main page background
  Surface          `#FFFFFF`   Cards and panels
  Ink              `#111111`   Headings and primary body text
  Muted Ink        `#6B7280`   Secondary text and metadata
  Border           `#E5E7EB`   Borders and dividers
  Soft Gray        `#F1F2F4`   Skeletons and inactive controls
  Premium Gold     `#F59E0B`   Optional Premium/crown badge

``` css
:root {
  --color-primary: #4F46E5;
  --color-primary-dark: #4338CA;
  --color-canvas: #F7F7F5;
  --color-surface: #FFFFFF;
  --color-ink: #111111;
  --color-muted: #6B7280;
  --color-border: #E5E7EB;
  --color-soft-gray: #F1F2F4;
  --color-premium: #F59E0B;
}
```

## 7. Typography & CSS

-   Display font: Playfair Display, DM Serif Display or Cormorant
    Garamond
-   UI/body font: Inter, Geist or Manrope
-   Hero desktop: 64--88px; mobile: 42--54px
-   Section headings: 32--44px desktop; 28--34px mobile
-   Body: 14--16px with 1.45--1.6 line-height
-   Prompt: 13--14px
-   Controls: 44px minimum touch height
-   Radius: 12px controls, 16px cards, 20--24px media containers
-   Use subtle borders and very soft shadows
-   Use 150--250ms ease-out transitions

Recommended container:

``` css
.container {
  width: min(100% - 48px, 1400px);
  margin-inline: auto;
}
```

## 8. Header

  -----------------------------------------------------------------------
  Element                 Desktop                 Mobile
  ----------------------- ----------------------- -----------------------
  Logo                    Left                    Left

  Navigation              Optional Home / How It  Minimal navigation
                          Works / Pricing         

  Search                  Not present             Not present

  Login                   Not present             Not present

  Join Now                Not present             Not present

  Get Started             Not present             Not present

  Notification            Not present             Not present

  Profile                 Not present             Not present

  Sidebar                 Not present             Not present
  -----------------------------------------------------------------------

The logo links to Home.

## 9. Home Page

### 9.1 Hero

**Eyebrow:** `BRAND_NAME / PERSONALISED VISUALS`

**Headline:**\
\> Make a photo worth keeping.

**Supporting copy:**\
\> Choose a visual direction, create the image with your preferred AI
tool, then turn the result into a personalised sticker.

**Primary CTA:** `View Designs`

**Secondary CTA:** `How It Works`

Do not use "Explore", "Generate Image" or "Get Started" as the main CTA
language.

Use 3--4 original example images in an editorial collage.

### 9.2 Featured Visual Tiles

  Tile   Label       Purpose
  ------ ----------- ------------------------------------------------
  01     Cinematic   Poster-like and cinematic transformations
  02     Clay & 3D   Handcrafted, collectible and dimensional looks
  03     Cartoon     Illustrated and expressive portraits

### 9.3 Category Filters

-   All
-   Cinematic
-   Cartoon
-   Anime-Inspired
-   Clay & 3D
-   Comic
-   Poster
-   Photo Effects

### 9.4 Prompt Gallery

Each card contains:

1.  Cover image
2.  Optional Premium badge
3.  Category label
4.  Prompt title
5.  View Prompt interaction

Desktop: 3--4 column masonry-style gallery.\
Mobile: two-column gallery.

``` css
.prompt-card img {
  transition: transform 220ms ease-out;
}

.prompt-card:hover img {
  transform: scale(1.025);
}
```

### 9.5 Home Copy

**Pick a look.**

> Original visual directions made for photos, posters, characters and
> keepsakes.

**Made for your photos.**

> Found your favourite? Create it, then print it with \[brand_name\].

## 10. Copy Prompt Screen

### Desktop

Two-column layout:

-   Left: \~45% media
-   Right: \~55% content

### Mobile

1.  Image
2.  Title / metadata
3.  Prompt
4.  Workflow
5.  Pricing
6.  Print CTA
7.  Related designs

### 10.1 Header

`← Back to designs`

No search, login, profile, notification or sidebar.

### 10.2 Media Panel

-   Primary preview image
-   Optional reference images
-   Thumbnail strip when needed
-   Image counter when appropriate
-   Original/licensed reference images only
-   Meaningful alt text

### 10.3 Prompt Metadata

  Field            Example
  ---------------- ---------------------------------------
  Title            Handcrafted Clay Stop-Motion Portrait
  Category         CLAY & 3D
  Supported Tool   Gemini
  Type             Photo Transformation
  Access           Free / Premium

### 10.4 Prompt Panel

Heading: `Prompt`

Primary action: `Copy Prompt`

Success state: `Prompt Copied`

For long prompts, use Show More / Show Less.

Provide a manual-copy fallback if clipboard access fails.

### 10.5 Required Workflow

  -----------------------------------------------------------------------
  Step                    Heading                 User-facing copy
  ----------------------- ----------------------- -----------------------
  01                      Copy the prompt         Tap "Copy prompt" to
                                                  copy the ready-to-use
                                                  prompt.

  02                      Open Gemini             Paste the prompt into
                                                  Gemini and attach your
                                                  reference image.

  03                      Create your image       Generate the image and
                                                  make any final changes
                                                  you want.

  04                      Print it                Click "Print with
                                                  \[brand_name\]" and
                                                  submit your generated
                                                  image through our
                                                  Google Form.
  -----------------------------------------------------------------------

### 10.6 Print CTA

**Button:** `Print with [brand_name]`

**Action:** Open configured Google Form in a new tab.

Optional tracking:

-   Prompt ID
-   Prompt title
-   Selected format

Supporting copy:

> Already generated your image? Send it to us and we'll turn it into a
> sticker.

## 11. Pricing Table

Prices should be configurable.

  Format       Starting Price Positioning
  ---------- ---------------- ---------------------
  2 × 2 in            ₹49--59 Mini sticker
  2 × 3 in            ₹59--69 Small portrait
  3 × 3 in            ₹79--89 Square character
  3 × 4 in           ₹89--109 Standard portrait
  4 × 4 in          ₹119--139 Large square
  4 × 5 in          ₹139--159 Large portrait
  4 × 6 in          ₹159--199 Poster-size sticker

Use "Starting at" when shipping or special finishing is separate.

Desktop: table.\
Mobile: stacked pricing cards.

## 12. Related Designs

Heading:

> More designs for your photos.

Show 4--8 related cards based on category/style.

## 13. Footer

**Brand**

> \[brand_name\] --- Personalised visual keepsakes.

**Navigation**

-   Home
-   How It Works
-   Pricing
-   Contact / Order

**Legal**

-   Privacy Policy
-   Terms of Service
-   Refund Policy

**Copyright**

> © \[year\] \[brand_name\]. All rights reserved.

## 14. Google Form Requirements

The Google Form should collect:

1.  Customer name
2.  WhatsApp/mobile number
3.  Email
4.  Prompt/design ID
5.  Sticker format
6.  Quantity
7.  Generated image upload
8.  Special instructions
9.  Confirmation that the customer owns or is authorised to use the
    submitted image
10. For children's images, confirmation of parent/guardian authority
11. Consent to process the submitted image for fulfilment

## 15. Prompt Content Data Model

  Field             Type          Purpose
  ----------------- ------------- --------------------------
  id                UUID/string   Unique prompt ID
  title             string        Prompt title
  slug              string        URL slug
  category          enum          Gallery filter
  coverImage        URL           Primary preview
  referenceImages   array         Reference images
  promptText        text          Copyable prompt
  supportedTool     string        Gemini / ChatGPT / Other
  isPremium         boolean       Premium badge/access
  tags              array         Related content
  published         boolean       Visibility
  sortOrder         number        Manual ordering

## 16. Functional Requirements

  -----------------------------------------------------------------------
  ID                Requirement       Priority          Acceptance
                                                        Criteria
  ----------------- ----------------- ----------------- -----------------
  FR-001            Render Home       Must              Published prompts
                    gallery                             appear as cards

  FR-002            Category          Must              Gallery updates
                    filtering                           without leaving
                                                        Home

  FR-003            Open prompt       Must              Correct prompt
                    detail                              loads

  FR-004            Copy prompt       Must              Exact prompt
                                                        reaches clipboard

  FR-005            Copy feedback     Must              Copied state
                                                        appears

  FR-006            Workflow          Must              Four steps are
                                                        visible

  FR-007            Google Form CTA   Must              Print CTA opens
                                                        configured form

  FR-008            Pricing           Must              Formats/prices
                                                        are visible

  FR-009            Responsive layout Must              No horizontal
                                                        overflow

  FR-010            No authentication Must              No login/account
                                                        UI

  FR-011            No sidebar        Must              No persistent
                                                        side navigation

  FR-012            Lazy loading      Should            Below-fold images
                                                        lazy-load

  FR-013            SEO metadata      Should            Unique metadata
                                                        per prompt

  FR-014            Analytics         Should            Views, copies,
                                                        CTA clicks and
                                                        filters tracked
  -----------------------------------------------------------------------

## 17. Responsive Breakpoints

  Breakpoint      Layout
  --------------- --------------------------------------------------
  `< 640px`       Mobile; two-column gallery; single-column detail
  `640–1023px`    Tablet; 2--3 column gallery
  `1024–1439px`   Desktop; 3--4 column gallery; two-column detail
  `≥ 1440px`      Max-width around 1400px; generous whitespace

## 18. Accessibility

-   Keyboard-accessible controls
-   Visible focus states
-   Minimum 44×44px touch targets
-   Meaningful image alt text
-   Readable contrast
-   No essential information conveyed only through images
-   Accessible Copy success/failure announcements

## 19. Performance

-   Use WebP/AVIF where supported
-   Lazy-load below-the-fold images
-   Preload only the hero/LCP image
-   Avoid autoplay video in MVP
-   Minimise third-party scripts
-   Target strong Core Web Vitals on mobile

## 20. SEO

### Home title

`[brand_name] — Personalised AI Image Prompts & Custom Stickers`

### Home meta description

`Create personalised images from ready-made AI prompts, then turn your favourite results into custom stickers with [brand_name].`

Each prompt should have:

-   Unique slug
-   Unique title
-   Unique meta description
-   OG image
-   Canonical URL
-   Descriptive alt text

Do not rely on third-party entertainment trademarks in titles or
metadata without a legitimate rights basis.

## 21. Content & IP Guardrails

Use original or properly licensed reference artwork.

Avoid publishing:

-   Third-party promotional posters
-   Movie screenshots
-   Game screenshots
-   Celebrity promotional photographs
-   Official logos
-   Unlicensed character artwork

Do not imply:

-   Sponsorship
-   Endorsement
-   Partnership
-   Official affiliation

Prefer concept/genre titles such as:

-   Open-World Crime Poster
-   Cinematic Action Poster
-   Korean Drama Portrait
-   Anime-Inspired Hero
-   Retro Comic Character

rather than relying on third-party franchise names.

For customer-submitted images, the Google Form should require
confirmation that the customer has the necessary rights/permission.

## 22. Analytics Events

  Event               Trigger                       Properties
  ------------------- ----------------------------- ------------------------
  `prompt_view`       Prompt card becomes visible   prompt_id, category
  `prompt_open`       Detail opened                 prompt_id
  `prompt_copy`       Copy succeeds                 prompt_id
  `print_cta_click`   Print CTA clicked             prompt_id
  `category_select`   Category selected             category
  `reference_view`    Reference opened              prompt_id, image_index

Avoid collecting unnecessary personal information in analytics.

## 23. Recommended Technical Architecture

-   **Frontend:** Next.js / React or equivalent SSR-capable framework
-   **Styling:** Tailwind CSS or token-based CSS
-   **Content:** Lightweight CMS or database-backed prompt collection
-   **Images:** Object storage + CDN + responsive transformations
-   **Order intake:** Google Forms
-   **Analytics:** Privacy-conscious analytics or GA4 with minimal event
    data
-   **Hosting:** HTTPS + CDN-backed deployment

## 24. Launch Acceptance Checklist

-   [ ] Only two pages exist
-   [ ] Home has no search
-   [ ] Home has no login
-   [ ] Home has no profile
-   [ ] Home has no notification icon
-   [ ] Home has no Join Now
-   [ ] Home has no Get Started
-   [ ] No sidebar exists
-   [ ] Hero communicates personalised images + stickers
-   [ ] Gallery follows the requested visual direction
-   [ ] Prompt screen shows preview
-   [ ] Prompt title is visible
-   [ ] Prompt is copyable
-   [ ] Four workflow steps are visible
-   [ ] Pricing is visible
-   [ ] Print with \[brand_name\] opens Google Form
-   [ ] Mobile layout works
-   [ ] No horizontal scrolling
-   [ ] Images are original or rights-cleared
-   [ ] Privacy Policy is linked
-   [ ] Terms are linked
-   [ ] Refund Policy is linked

## 25. Recommended Initial Prompt Categories

1.  Cinematic
2.  Cartoon
3.  Anime-Inspired
4.  Clay & 3D
5.  Comic
6.  Poster
7.  Photo Effects
8.  Fantasy
9.  Couple
10. Family
11. Gaming-Inspired
12. Retro

The catalogue should focus on original visual concepts rather than
reproducing specific copyrighted characters or promotional artwork.

## 26. Recommended Brand Positioning

> **Create it with AI. Make it yours. Print it with \[brand_name\].**

The complete experience is:

**Discover → Create → Personalise → Print**

The product is therefore not merely a sticker. It is a personalised
AI-art creation and physical-printing workflow.

## 27. Reference

The supplied screenshots were used as the primary visual reference.

The current Pixvu public website uses large editorial hero sections,
visual prompt cards, category controls and prompt-detail pages. This FRD
adapts those patterns to the brand_name use case while removing account,
search and generation functionality.

-   https://pixvu.net/
-   https://www.pixvu.net/about/
-   https://www.pixvu.net/prompts/

------------------------------------------------------------------------

**End of FRD**
