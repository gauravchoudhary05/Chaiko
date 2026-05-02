# SUBURB - Product Requirements Document

## 1. Project Overview
A complete rebranding and website redesign for **SUBURB**, a popular cafe and restaurant in Shillong offering a cozy, warm, and earthy atmosphere, a pool table, and an extensive pan-Asian and continental menu. The platform features an interactive 3D WebGL background integrated with smooth framer-motion scroll animations to provide a premium digital experience.

## 2. Brand Identity
- **Name:** SUBURB
- **Tagline:** Shillong's Cozy Cafe & Restaurant
- **Aesthetic:** Cozy, Warm, Earthy Tone with aesthetic decor
- **Vibe:** Casual, trendy, great for groups and solo working. Features a pool table, smoking area, and diverse food options.

## 3. Key Components
1. **Hero Section (`Hero.tsx`)**
   - Main bold headline: SUBURB
   - Highlights the cafe's aesthetic and diverse menu
   - Floating 3D Coffee Cup model behind glassmorphism
2. **The Vibe (`TheVibe.tsx`)**
   - Details USPs: Aesthetic Decor, Pool Table, Extensive Menu
   - Masked text overlay that interacts with the 3D scroll position
3. **Menu (`Menu.tsx`)**
   - Categorized menu system displaying: All Day Brunch, Sushi & Dimsum, Ramen, Rice Bowls, Currys, Pasta & Spaghetti, Continental, and Beverages.
4. **Social Proof (`SocialProof.tsx`)**
   - Displays a 4.3-star rating out of 424 reviews.
   - Showcases authentic customer reviews praising the ambience, food, and friendly staff.
5. **Footer (`Footer.tsx`)**
   - Location: Presbyterian Church, Old Supercare Building, opposite Laitumkhrah, Shillong
   - Phone: 060096 71917
   - Hours: Open · Closes 9 pm

## 4. Technical Architecture
- **Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion
- **3D Engine:** React Three Fiber (`@react-three/fiber`), Three.js
- **Key 3D Assets:** 
  - `Cup3D`: A dynamically generated Three.js Lathe geometry representing a warm ceramic coffee cup with a custom "SUBURB" decal.
  - `CoffeeParticles3D`: Subtle floating coffee beans/particles.
  - `Steam3D`: Procedural steam particle system.
