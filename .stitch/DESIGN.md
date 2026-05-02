# Design System: Beanstalk Coffee
**Project ID:** (to be created via Stitch MCP)

## 1. Visual Theme & Atmosphere
Nature-Boutique with Frosted Luxury. Dense and moody — dark espresso grounds contrasted by jewel-toned forest greens and warm parchment cream. Glassmorphism surfaces float above the darkness like morning mist over coffee. Every surface breathes: grain overlays on deep backgrounds, soft glows on golden accents, blur-driven depth on text overlays. The atmosphere is "cozy luxury boutique" — premium coffee bar meets Japanese garden.

## 2. Color Palette & Roles
- **Rich Espresso Brown** (#2C1B18) — Primary dark background, hero, reviews section
- **Jewel Forest Green** (#1E3D33) — Accent, TheVibe section background, CTA buttons
- **Warm Parchment Cream** (#F9F4EE) — Light text, card backgrounds, menu section bg
- **Aged Gold** (#C9A96E) — Stars, price tags, italic "Coffee" heading, highlights
- **Dark Bark Brown** (#5C3D2E) — Secondary text on light parchment sections
- **Sage Mist** (#7BA68C) — Section overline labels, subtle decorative accents
- **Deep Smoke** (#1A1210) — Footer, the absolute darkest background layer

## 3. Typography Rules
Display headings use Playfair Display serif — bold and compressed at large sizes (leading-[0.9]), italic normal-weight for emphasis words. Body and UI use Inter sans-serif at weight 400–500. Overlines are uppercase Inter, tracked widely (letter-spacing: 0.3em), at 11–13px.

## 4. Component Stylings
- **Buttons**: Pill-shaped (fully rounded), gold border, parchment text, transitions to gold fill on hover
- **Cards/Containers**: Generously rounded (border-radius: 16px), frosted glass (semi-transparent white 10% opacity with backdrop blur 12px), thin parchment border at 20% opacity
- **Busy Meter Badge**: Translucent espresso brown (60% opacity), backdrop blur, thin border, pulsing dot indicator
- **Menu Items**: On hover — 3D tilt up to 8 degrees, CSS steam animation rises from item
- **Floating Action Button**: Circle, solid gold, espresso text, heavy drop shadow

## 5. Layout Principles
Generous whitespace with sections padded 128–176px vertically. Max-width container of 1152px centered with 24px horizontal padding. Three-column grids for menus, vibe features, and testimonials. The floating cup is fixed-positioned at z-index 50, pointer-events disabled so it never blocks interactions.

## 6. Design System Notes for Stitch Generation
Generate screens using: espresso brown (#2C1B18) as the default background. Use forest green (#1E3D33) for accent sections. Typography: Playfair Display for all headings, Inter for body. Cards use frosted glass (bg-white/10 backdrop-blur-md). Gold (#C9A96E) only for ratings, prices, and italic heading accents. Section labels are uppercase sage (#7BA68C) with wide tracking. The mood is "premium café in a living garden" — botanical luxury.
