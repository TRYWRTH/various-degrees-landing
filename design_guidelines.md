# Design Guidelines: "Coming Soon" Art Publication Landing Page

## Design Approach
**Reference Inspiration**: Draw from experimental art portfolios and design-forward studios (Awwwards winners, art gallery sites like Artsy, museum digital experiences). Focus on atmospheric, immersive aesthetics that evoke mystery and anticipation.

**Core Principle**: Create a cinematic, mysterious experience that feels like stepping into an alternate timeline - minimal elements, maximum impact.

## Typography

**Headline ("Coming Soon...")**
- Primary: Elegant serif or experimental display font (e.g., Playfair Display, Cormorant Garamond, or Bodoni Moda)
- Size: Very large - text-6xl to text-8xl on desktop, text-4xl to text-5xl on mobile
- Weight: Light to regular (300-400) for ethereal quality
- Tracking: Wide letter-spacing (tracking-wider or tracking-widest)
- Transform: Consider all caps for dramatic effect

**Artist Names**
- Secondary: Refined sans-serif or matching serif at smaller weight
- Size: text-lg to text-xl, creating clear hierarchy below headline
- Style: Delicate appearance - potentially italic or light weight
- Spacing: Generous vertical spacing between names (space-y-3 or space-y-4)

**Contact Bubble Text**
- Size: text-sm to text-base
- Weight: Regular (400)

## Layout System

**Spacing Units**: Use Tailwind units of 4, 6, 8, and 16 for consistent rhythm
- Section padding: py-16 to py-24
- Element spacing: space-y-6 to space-y-8
- Contact bubble margin: m-6 or m-8 from viewport edges

**Viewport Strategy**
- Full viewport height (min-h-screen) for immersive experience
- Content vertically and horizontally centered
- Contact bubble positioned fixed in corner (top-right or bottom-right)

## Component Library

**Main Content Container**
- Centered flex container with vertical stacking
- Max-width: No restriction - content naturally sized
- Z-index layering: Content above background effects

**Artist List Component**
- Simple vertical stack with elegant spacing
- Optional: Staggered fade-in animation on load
- Optional: Subtle dividers or bullets between names
- Consider: Sequential reveal or typing effect

**Floating Contact Bubble**
- Fixed positioning in corner (e.g., top-8 right-8 or bottom-8 right-8)
- Circular or pill-shaped container
- Size: Compact but touchable (min 48px touch target)
- Backdrop blur effect: backdrop-blur-md to backdrop-blur-lg
- Semi-transparent background for glassmorphism effect
- Subtle drop shadow for depth
- Hover state: Gentle scale or glow effect
- Click reveals: Email address, social link, or simple "hello@publication.com" text
- Implementation: Can expand on hover/click or be permanently visible with icon + text

## Background Treatment & Effects

**Primary Background Image**
- Full viewport coverage (bg-cover or object-cover)
- Fixed attachment for parallax effect (bg-fixed) - optional
- Position: bg-center or strategic focal point

**Layered Effects** (applied in order):
1. **Gradient Overlay**: Dark gradient overlay (opacity 40-70%) for text legibility - consider radial gradient from center or linear from top
2. **Blur/Grain**: Subtle noise texture overlay or selective blur around edges (vignette effect)
3. **Color Treatment**: Slight desaturation or blue/purple tint for mysterious mood
4. **Optional Animation**: Very subtle ken-burns zoom or parallax scroll effect

**Text Legibility**
- Dark semi-transparent backdrop behind text (backdrop-blur-sm with bg-black/30)
- Or ensure overlay gradient provides sufficient contrast
- Text shadow for additional separation if needed

## Images

**Hero Background Image**
- **Location**: Full-screen background covering entire viewport
- **Description**: User-provided atmospheric image - should evoke mystery, alternate futures, artistic/surreal quality. Consider images with depth, abstract scenes, futuristic decay, or dreamlike landscapes
- **Treatment**: Will receive overlay effects as described above

## Interaction & Animation

**Page Load**
- Staggered entrance: Headline fades in first, then artist names sequentially, contact bubble last
- Duration: Smooth, elegant timing (0.6-1s per element)

**Scroll Behavior**
- Single viewport page - no scroll required
- If content overflows on small screens: Smooth scroll with maintained fixed background

**Contact Bubble**
- Hover: Subtle scale (1.05) or glow
- Click/Tap: Expands to show contact info or links to email/social
- Maintains glassmorphism aesthetic throughout states

## Responsive Behavior

**Desktop (lg:)**
- Full cinematic experience
- Large typography
- Contact bubble in corner

**Mobile (base to md:)**
- Maintain full-screen background
- Scale typography appropriately
- Stack content with adequate padding
- Contact bubble remains accessible but may reduce size
- Ensure artist names remain readable