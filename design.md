# SUBURB - Design System

## 1. Core Principles
- **Cozy & Earthy:** A warm, neutral palette that echoes modern aesthetic cafe interiors (wood, warm lighting, dark accents).
- **Dynamic 3D Integration:** A subtle coffee cup (and ambient elements) positioned behind glassmorphic UI components.
- **Premium Typography:** A sophisticated mix of serif display fonts and clean sans-serif body text.

## 2. Typography
- **Display Typeface:** *Playfair Display*, Georgia, serif. Used for massive hero titles and key headers.
- **Body Typeface:** *Inter*, system-ui, sans-serif. Used for readable menu items, reviews, and UI elements.

## 3. Color Palette
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--color-espresso` | `#221F1E` | Deep earthy background (almost black with warm undertone) |
| `--color-forest` | `#2F2A28` | Slightly lighter warm dark-mode panels |
| `--color-parchment`| `#F5EFEB` | Primary text and light surfaces |
| `--color-gold` | `#DCA54C` | Warm amber accents, hover states, rating stars |
| `--color-bark` | `#4A3E39` | Secondary UI borders and elements |
| `--color-sage` | `#93857B` | Muted text and tertiary details |
| `--color-smoke` | `#141211` | Deepest shadows and scrollbar track |

## 4. 3D WebGL Engine (`@react-three/fiber`)
- **Cup3D:** A procedural Lathe geometry cup (ceramic off-white/beige) with the `SUBURB` logo etched on the side.
- **CoffeeParticles3D:** Floating ambient coffee beans to reinforce the cafe atmosphere.
- **Steam3D:** Fluid, procedural smoke/steam shader rising from the cup.
- **Scroll Synchronization:** The 3D models translate and rotate continuously based on the user's scroll position via Framer Motion's `useScroll` hook.

## 5. UI Elements
- **Glassmorphism:** Navigation menus, floating action buttons (QuickOrderFAB), and content cards use deep blurs (`backdrop-blur-md` or `backdrop-blur-lg`) with thin borders.
- **Scroll Snapping:** The layout allows smooth navigation through sections with a fixed 3D background behind.
- **Animations:** Custom CSS keyframes for floating `steam` and ambient `float` effects.
