# Design System Specification: High-Tech AI/ML Analytics

## 1. Overview & Creative North Star: "The Neural Observatory"
This design system is built to move beyond standard dashboarding. Our Creative North Star is **"The Neural Observatory"**—a vision where complex AI data isn't just displayed; it is viewed through a high-precision, multi-layered lens. 

We reject the "flat" web. Instead, we embrace an editorial layout characterized by **intentional asymmetry** and **tonal depth**. By utilizing extreme typographic scale contrasts and overlapping glass surfaces, we create a sense of looking into a deep, three-dimensional space. The interface should feel like a high-end heads-up display (HUD) that is both authoritative and ethereal.

## 2. Colors & Surface Philosophy
The palette is rooted in the void of deep space, punctuated by high-energy neon pulses.

### Surface Hierarchy & Nesting
To achieve professional polish, we implement a strict **Nesting Tier** system. We treat the UI as a series of physical layers where light is trapped within frosted glass.

*   **Base Layer (`surface` / `#12121f`):** The infinite background.
*   **Section Layer (`surface_container_low` / `#1a1a27`):** Large structural regions.
*   **Interactive Layer (`surface_container` / `#1f1e2b`):** Standard card containers.
*   **Prominence Layer (`surface_container_high` / `#292936`):** Elements requiring immediate focus.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off areas. Structural boundaries must be defined solely through background shifts between the tiers above. Use the `surface_container_low` to `surface_container_lowest` transition to create natural visual breaks.

### The Glass & Gradient Rule
Floating elements must utilize **Glassmorphism**. 
*   **Fill:** Use `surface_container` at 60-80% opacity.
*   **Backdrop:** Apply a `blur` (12px to 20px).
*   **Signature Texture:** Use a subtle linear gradient on main CTAs transitioning from `primary_container` (#00f2ff) to `secondary_container` (#b600f8) at a 45-degree angle to provide a "liquid neon" feel.

## 3. Typography
We utilize a high-contrast pairing between **Space Grotesk** (Display/Headlines) for a technical, editorial feel, and **Inter** (Body/Labels) for maximum legibility.

*   **Display (`display-lg` / 3.5rem):** Reserved for hero metrics or impact statements. Use `primary` or `tertiary` tokens.
*   **Headline (`headline-md` / 1.75rem):** For major section headers. Always use `surface_bright` to ensure a "glowing" effect against dark backgrounds.
*   **Technical Data (Mono-spaced):** For logs and ML model outputs, use a mono-spaced variant of Inter or a system mono at `body-sm`.
*   **The Scale Philosophy:** Do not be afraid of "empty" space. A massive `display-lg` metric should often sit alone in a wide `surface_container_low` area to emphasize its importance.

## 4. Elevation & Depth
Depth is the soul of this system. We avoid traditional drop shadows in favor of **Ambient Glows**.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on `surface-container-low` sections. The shift in hex value creates a soft, natural lift without structural clutter.
*   **Ambient Shadows:** For floating modals, use a shadow with a large blur (40px+) at 8% opacity. The shadow color must be tinted with `primary` (#00f2ff), not black, to simulate light refracting through the glass.
*   **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the `outline_variant` token at **15% opacity**. High-contrast, 100% opaque borders are strictly forbidden.

## 5. Components

### Buttons
*   **Primary:** A "Neon-Border" style. Use `primary_container` for a 1.5px border with a soft `primary` outer glow. Background should be transparent or 10% `primary`.
*   **Secondary:** Glass-filled. Use `surface_container_highest` with backdrop-blur and `on_surface` text.
*   **States:** On hover, the primary button border should expand its glow radius (8px to 16px) using the `primary` token.

### Cards & Lists
*   **The Rule of Separation:** Forbid the use of divider lines. Use vertical white space from the **Spacing Scale (8, 10, or 12)** or subtle background shifts between `surface_container` tiers to separate content.
*   **Interactive Charts:** Line and radar charts should use `primary` (#00f2ff) for data paths with a `secondary` (#bc13fe) glow effect.

### Circular Gauges (Specialized)
*   **Track:** Use `surface_variant` at 20% opacity.
*   **Indicator:** Use a gradient from `primary` to `secondary`.
*   **Inner Glow:** Apply a subtle inner shadow to the gauge track to give it a "recessed" look into the glass surface.

### Inputs & Fields
*   **Style:** Minimalist. Only a bottom border using `outline_variant` at 20%. 
*   **Focus State:** The bottom border transforms into a `primary` neon line with a 4px glow. Label shifts to `primary` at `label-sm`.

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place high-level analytics in an off-center layout to create an editorial, bespoke feel.
*   **Layer Surfaces:** Think of the UI as physical layers of glass. An inner card should always be a different surface tier than its parent.
*   **Embrace the Glow:** Use the `primary` and `secondary` accents sparingly but intensely for "Status: Active" or "Critical Alert" states.

### Don’t:
*   **Don't use 100% White:** Use `on_surface` (#e3e0f3) or `on_surface_variant` (#b9cacb) for text to prevent harsh eye strain.
*   **Don't use Dividers:** Never use a horizontal line to separate list items. Use the `spacing-4` or `spacing-6` tokens to create breathing room.
*   **Don't Flatten the Glass:** Never disable backdrop-blur on cards. If the blur is gone, the "high-tech" illusion is broken.