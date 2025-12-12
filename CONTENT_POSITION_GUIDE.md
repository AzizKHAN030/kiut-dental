# Content Position Guide - Background Slides

The background slide layout now supports three different content positions to give you more control over the visual layout.

---

## Overview

When using **Hero slide – background image**, you can now choose where the text content block appears:

- **Left** (default): Content aligned to the left side
- **Center**: Content centered on the screen
- **Right**: Content aligned to the right side

This allows you to position the content box where it looks best based on your background image composition.

---

## How to Set Content Position

### In Sanity Studio:

1. Open your Page with the Hero Section
2. Click on a **Hero slide – background image** slide
3. Look for the **"Content position"** field
4. Select one of three options:
   - **Left** (default)
   - **Center**
   - **Right**
5. Publish your changes

---

## Visual Examples

### Left Position (Default)

```
┌─────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░                                        ░░░░ │
│ ░░  ┌─────────────┐                      ░░░░ │
│ ░░  │ Tagline     │                      ░░░░ │
│ ░░  │             │                      ░░░░ │
│ ░░  │ Heading     │                      ░░░░ │
│ ░░  │             │                      ░░░░ │
│ ░░  │ Body text   │                      ░░░░ │
│ ░░  │             │                      ░░░░ │
│ ░░  │ [Buttons]   │                      ░░░░ │
│ ░░  │             │                      ░░░░ │
│ ░░  │ Stats       │                      ░░░░ │
│ ░░  └─────────────┘                      ░░░░ │
│ ░░  [Badge]                              ░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────┘
     Background image with fading borders
```

**Best for:**
- Images with important details on the right
- Standard left-to-right reading flow
- When you want to leave space for visual elements on the right

---

### Center Position

```
┌─────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░                                        ░░░░ │
│ ░░         ┌─────────────┐               ░░░░ │
│ ░░         │  Tagline    │               ░░░░ │
│ ░░         │             │               ░░░░ │
│ ░░         │  Heading    │               ░░░░ │
│ ░░         │             │               ░░░░ │
│ ░░         │  Body text  │               ░░░░ │
│ ░░         │             │               ░░░░ │
│ ░░         │  [Buttons]  │               ░░░░ │
│ ░░         │             │               ░░░░ │
│ ░░         │    Stats    │               ░░░░ │
│ ░░         └─────────────┘               ░░░░ │
│ ░░            [Badge]                    ░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────┘
     Background image with fading borders
```

**Best for:**
- Symmetrical background images
- Creating impact and focus
- Professional, balanced layouts
- Hero slides with people centered in the background
- When you want maximum attention on the message

**Note:** Center position also centers the buttons and badge for a cohesive look.

---

### Right Position

```
┌─────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░                                        ░░░░ │
│ ░░                      ┌─────────────┐  ░░░░ │
│ ░░                      │     Tagline │  ░░░░ │
│ ░░                      │             │  ░░░░ │
│ ░░                      │     Heading │  ░░░░ │
│ ░░                      │             │  ░░░░ │
│ ░░                      │   Body text │  ░░░░ │
│ ░░                      │             │  ░░░░ │
│ ░░                      │   [Buttons] │  ░░░░ │
│ ░░                      │             │  ░░░░ │
│ ░░                      │       Stats │  ░░░░ │
│ ░░                      └─────────────┘  ░░░░ │
│ ░░                              [Badge]  ░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────┘
     Background image with fading borders
```

**Best for:**
- Images with important details on the left
- Creating visual variety in multi-slide presentations
- Alternating with left-positioned slides in a slider
- Breaking conventional layout patterns

---

## Best Practices

### Image Selection by Position

**Left Position:**
- Choose images with visual interest on the right side
- Ensure left 40% of image is relatively clear
- Examples: City skylines, landscapes, room interiors with space on left

**Center Position:**
- Choose symmetrical or centered compositions
- Ensure center 50% has good contrast for text
- Examples: Centered portraits, symmetrical buildings, centered products

**Right Position:**
- Choose images with visual interest on the left side
- Ensure right 40% of image is relatively clear
- Examples: People looking left, objects positioned left, directional compositions

### Content Width

- **Left/Right**: Content box max-width is 672px (2xl)
- **Center**: Content box max-width is 768px (3xl) for better readability

### Slider Combinations

Create visual rhythm by mixing positions:

```
Slide 1: Background (Left)
Slide 2: Background (Center)
Slide 3: Background (Right)
```

Or alternate with other layouts:

```
Slide 1: Background (Center)
Slide 2: Image Right
Slide 3: Background (Left)
```

---

## Technical Details

### Responsive Behavior

- On mobile devices, all positions stack vertically with centered content
- Content box padding adjusts: 8 (mobile) → 12 (desktop)
- Buttons and badge automatically center on small screens

### Styling

The content block maintains:
- Semi-transparent black background (60% opacity)
- Backdrop blur for glassmorphism effect
- White border (10% opacity)
- Rounded corners (3xl = 24px)
- Shadow for depth

### Accessibility

- All positions maintain readable contrast ratios
- Text is always within a contrasting box
- Focus states work correctly for all button positions

---

## Quick Reference

| Position | Use When | Image Type | Visual Impact |
|----------|----------|------------|---------------|
| **Left** | Standard layout | Right-heavy composition | Familiar, safe |
| **Center** | Maximum impact | Symmetrical composition | Bold, focused |
| **Right** | Variety needed | Left-heavy composition | Unique, different |

---

## Examples

### Dental Clinic Use Cases

**Left Position:**
- Background: Clinic interior with equipment on right
- Message: "Modern Technology for Your Smile"

**Center Position:**
- Background: Patient smiling directly at camera
- Message: "Transform Your Confidence"

**Right Position:**
- Background: Dentist on left side
- Message: "Expert Care You Can Trust"

---

## Need Help?

- See **HERO_LAYOUTS_GUIDE.md** for general layout information
- See **QUICK_START.md** for basic setup
- Check http://localhost:3000/api/check-hero to debug your configuration

---

**Note:** Content position only applies to **Hero slide – background image** type. Other slide types (Image Left, Image Right) have fixed layouts.
