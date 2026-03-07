# Project Review: Heritage Trail Web Application

**Review Date:** 2026-02-21

## Overview
This is a **SvelteKit 2.50.1** heritage trail interactive web application built with **Svelte 5**, **TypeScript**, and **Tailwind CSS 4**. It showcases Singapore's legal/heritage sites with an interactive map, 3D models, and detailed location pages.

---

## Tech Stack

| Technology | Version |
|------------|---------|
| SvelteKit | 2.50.1 |
| Svelte | 5.48.2 (with reactive runes) |
| TypeScript | 5.9.3 (strict mode) |
| Tailwind CSS | 4.1.18 |
| Vite | 7.3.1 |
| Leaflet | 1.9.4 (mapping) |
| Swiper | 12.1.0 (carousel) |
| AOS | 2.3.4 (scroll animations) |

---

## Directory Structure

```
/src
├── /lib
│   ├── /assets
│   │   ├── /fonts (Averia Libre, Poppins)
│   │   ├── /images (landing cards, site details, icons)
│   │   └── /socials (social media icons)
│   ├── /components
│   │   ├── /landing
│   │   │   └── stickyNotesCard.svelte
│   │   ├── /tutorial
│   │   │   └── TutorialItem.svelte
│   │   ├── mainButton.svelte
│   │   ├── mainHeader.svelte
│   │   ├── MainMenu.svelte
│   │   ├── MainMenuItem.svelte
│   │   ├── Tutorial.svelte
│   │   └── trailMap.svelte
│   ├── /state
│   │   └── popUpState.svelte.ts
│   ├── /utils
│   │   ├── DelayHelper.ts
│   │   └── DummyData.ts
│   └── index.ts
├── /routes
│   ├── +page.svelte (landing page)
│   ├── +layout.svelte (root layout)
│   ├── layout.css (global styles)
│   ├── /explore
│   │   ├── +page.svelte (map/trail page)
│   │   ├── +layout.svelte
│   │   └── /single
│   │       ├── +page.svelte (detailed site page)
│   │       └── +layout.svelte
│   └── /about
│       └── +page.svelte (placeholder)
└── /static (favicons, images, icons)
```

---

## Route Structure

| Route | Description |
|-------|-------------|
| `/` | Landing page (hero + activity cards) |
| `/explore` | Interactive trail map with markers |
| `/explore/single` | Detailed site page (scrollable) |
| `/about` | Placeholder (not implemented) |

---

## Strengths

1. **Modern framework** - Using latest Svelte 5 runes (`$state`, `$derived`, `$props`)
2. **Strong TypeScript** - Strict mode enabled with proper interfaces
3. **Well-organized structure** - Clear separation of components, state, and utilities
4. **Responsive design** - Mobile-first with proper breakpoints
5. **Cohesive design system** - Brown/cream/yellow palette with heritage aesthetic
6. **Component reusability** - Good use of reusable button/card components

---

## Areas for Improvement

### High Priority

1. **Component decomposition**
   - `trailMap.svelte` (416 lines) violates single responsibility principle
   - Should be split into: `MapContainer.svelte`, `LocationModal.svelte`, `ModelViewer.svelte`
   - Location: `src/lib/components/trailMap.svelte`

2. **Type safety issues**
   - `let swiperEl: any;` in `trailMap.svelte:10` - use proper Swiper type
   - Hardcoded fallback GLB URL in `trailMap.svelte:237`
   - Create `Location` interface instead of `any` for location data

3. **Debug code in production**
   - `console.log(page.url.pathname)` left in `MainMenuItem.svelte:16`
   - Remove before production deployment

4. **Naming inconsistency**
   - Mixed casing: `stickyNotesCard.svelte` (camelCase) vs `MainMenu.svelte` (PascalCase)
   - Standardize to PascalCase for all components

### Medium Priority

5. **Accessibility issues**
   - `svelte-ignore a11y_interactive_supports_focus` in `trailMap.svelte:199`
   - Missing ARIA labels for modals
   - Interactive divs need keyboard navigation support

6. **Placeholder data**
   - `DummyData.ts` has 8 locations with identical placeholder content (all "Court of Judicature")
   - Replace with actual data or proper loading mechanism

7. **Redundant initialization**
   - AOS library initialized twice (root layout and explore route)
   - Should only initialize once at root level

8. **Performance considerations**
   - Async dynamic import of Leaflet on every mount
   - Swiper instance management could be more robust
   - Consider lazy loading for 3D models

### Low Priority

9. **Magic numbers**
   - `DelayHelper.ts`: `BASE_DELAY = 300`, `STEP = 300` hardcoded
   - `trailMap.svelte`: `imageWidth = 3840`, `imageHeight = 2160` hardcoded
   - Create `src/lib/config/constants.ts` for configuration

10. **Unused code**
    - `TutorialItem.svelte` exists but appears unused
    - Commented-out code blocks (horizontal scroll handler, fallback code)
    - Clean up unused styles and imports

11. **Documentation**
    - Minimal inline comments
    - No component documentation
    - Consider adding JSDoc comments for complex functions

---

## Key Files to Review

| File | Lines | Priority | Notes |
|------|-------|----------|-------|
| `src/lib/components/trailMap.svelte` | 416 | High | Needs refactoring/decomposition |
| `src/routes/explore/single/+page.svelte` | 343 | Medium | Detail page, check for optimization |
| `src/lib/state/popUpState.svelte.ts` | - | Low | State management pattern |
| `src/routes/layout.css` | - | Low | Theme & global styles |
| `src/lib/utils/DummyData.ts` | - | Medium | Replace placeholder data |
| `src/lib/components/MainMenuItem.svelte` | 36 | High | Remove console.log |

---

## Component Summary

| Component | Size | Purpose |
|-----------|------|---------|
| `trailMap.svelte` | 416 lines | Map, markers, modals, 3D viewer |
| `Tutorial.svelte` | 310 lines | Tutorial carousel with Swiper |
| `+page.svelte` (landing) | 128 lines | Landing page |
| `MainMenu.svelte` | 67 lines | Full-screen navigation |
| `mainHeader.svelte` | 30 lines | Top header |
| `MainMenuItem.svelte` | 36 lines | Navigation item |
| `stickyNotesCard.svelte` | 30 lines | Landing card |
| `mainButton.svelte` | 22 lines | Reusable button |

---

## State Management

Current approach uses class-based reactive stores with Svelte 5 runes:

```typescript
// src/lib/state/popUpState.svelte.ts
class ToggleState {
  isOpen = $state(false);
  open = () => this.isOpen = true;
  close = () => this.isOpen = false;
  toggle = () => this.isOpen = !this.isOpen;
}

export const menuState = new ToggleState;
export const tutorialState = new ToggleState;
```

**Assessment:** Minimal but functional for current needs. May need scaling for complex state.

---

## Design System

| Element | Value |
|---------|-------|
| Primary Brown | `#70341E` |
| Primary Cream | `#FBE5C0` |
| Primary Yellow | `#FFC83D` |
| Secondary | `#424242` |
| Heading Font | Averia Libre, Caveat |
| Body Font | Poppins, Source Sans 3 |

---

## Summary

The project has solid foundations with modern technologies and good organization. The main technical debt is:
1. Oversized `trailMap.svelte` component needing decomposition
2. Debug code and type safety cleanup
3. Naming convention standardization
4. Accessibility improvements

The design system is cohesive and well-implemented with a heritage/nostalgic aesthetic.
