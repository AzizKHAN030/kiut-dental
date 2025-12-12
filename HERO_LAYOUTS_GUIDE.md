# Hero Section Layouts Guide

This guide explains the three different hero slide layouts and when to use each one.

---

## 1. Hero Slide – Image Right

**Best for**: Standard landing pages, professional services, product showcases

### Layout Structure
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Tagline]                        ┌───────────┐│
│                                   │           ││
│  Large Heading Text               │  Image    ││
│                                   │           ││
│  Body description text...         │           ││
│                                   └───────────┘│
│  [Primary Button] [Secondary]                  │
│                                   [Badge]      │
│  ─────────────────                             │
│  Stat 1  Stat 2  Stat 3                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Features
- Content on left, image on right
- Badge floats over bottom-left of image
- Stats appear below content in a row
- Best for text-heavy content with supporting image

### Example Use Case
```
Tagline: "Premium Dental Care from Uzbekistan"
Heading: "World-Class Smiles at Half the Price"
Body: "Experience premium dental treatments..."
Image: Modern dental clinic interior
Stats: 70% Cost Savings | 15K+ Patients | 24/7 Support
Badge: ISO Certified | International Standards
```

---

## 2. Hero Slide – Image Left

**Best for**: Alternating layouts in sliders, visual-first content, portfolio pieces

### Layout Structure
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌───────────┐                [Tagline]        │
│  │           │                                  │
│  │  Image    │                Large Heading    │
│  │           │                                  │
│  │           │                Body text...      │
│  └───────────┘                                  │
│   [Badge]                     [Buttons]         │
│                                                 │
│                               ──────────────    │
│                               Stat 1  Stat 2    │
└─────────────────────────────────────────────────┘
```

### Features
- Image on left, content on right
- Badge floats over bottom-right of image
- Perfect for creating visual rhythm in slider mode
- Mirror layout of "Image Right"

### When to Use
- In slider mode, alternate with "Image Right" for visual variety
- When you want the image to grab attention first
- For showcasing before/after photos or results

### Example Use Case
```
Heading: "State-of-the-Art Equipment"
Body: "Our clinic features the latest dental technology..."
Image: Close-up of dental equipment
```

---

## 3. Hero Slide – Background Image

**Best for**: Dramatic impact, emotional connection, lifestyle imagery, brand storytelling

### Layout Structure
```
┌─────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│ ░░                                        ░░░░ │
│ ░░  [Tagline]                             ░░░░ │
│ ░░                                        ░░░░ │
│ ░░  Large Heading Text (White)            ░░░░ │
│ ░░                                        ░░░░ │
│ ░░  Body text in white...                 ░░░░ │
│ ░░                                        ░░░░ │
│ ░░  [Buttons]                             ░░░░ │
│ ░░                                        ░░░░ │
│ ░░  ──────────────                        ░░░░ │
│ ░░  Stat 1  Stat 2  Stat 3                ░░░░ │
│ ░░                                        ░░░░ │
│ ░░  [Badge Card]                          ░░░░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────┘
     Background image with dark overlay
```

### Features
- Full-screen background image
- Dark gradient overlay (70% to 50% transparency)
- All text appears in white for contrast
- Content is left-aligned or centered
- Badge appears as white card at bottom

### When to Use
- First slide to make immediate impact
- Lifestyle/brand imagery (happy patients, clinic atmosphere)
- When you have a high-quality, wide hero image
- To create emotional connection

### Image Requirements
- High resolution (1920px+ wide)
- Interesting but not too busy (content must be readable)
- Avoid images with text or important details on the left side
- Horizontal/landscape orientation works best

### Example Use Case
```
Tagline: "Your Journey to a Perfect Smile"
Heading: "Transform Your Confidence"
Body: "Join thousands of satisfied patients..."
Image: Happy patient smiling (full-width background)
```

---

## Slider Mode: Combining Layouts

When using slider mode, mix different layouts for maximum visual impact:

### Example 3-Slide Sequence

**Slide 1: Background Image**
- Strong opening with full-screen impact
- Image: Clinic exterior or happy patient
- Message: Brand promise

**Slide 2: Image Right**
- Detailed information about services
- Image: Treatment room or procedure
- Message: What you offer

**Slide 3: Image Left**
- Social proof or results
- Image: Before/after or testimonial
- Message: Why choose you

---

## Layout Decision Tree

```
Start: What's your main goal?
│
├─ Create immediate impact → Background Image
│
├─ Show product/service clearly → Image Right or Image Left
│
├─ Multiple messages → Slider Mode
│   │
│   └─ Mix layouts:
│       • Start with Background
│       • Alternate Image Right/Left
│       • End with strongest layout
│
└─ Simple, focused message → Single Mode (Image Right)
```

---

## Best Practices

### For All Layouts
1. **Heading**: Keep it under 10 words, punchy and clear
2. **Body**: 1-2 sentences maximum (20-30 words)
3. **Images**: High quality, professional, relevant
4. **Stats**: Use round numbers, keep labels short
5. **CTAs**: Primary = action word (Get, Start, Book), Secondary = info (Learn, View)

### For Slider Mode
1. Limit to 3-5 slides (too many = viewers lose interest)
2. Each slide should tell part of a story
3. Mix layouts for visual variety
4. Keep consistent tone/style across slides
5. Most important message on first slide

### For Background Images
1. Ensure text is always readable
2. Test on different screen sizes
3. Avoid busy backgrounds
4. Use high-contrast images
5. Dark overlay helps readability

---

## Technical Notes

- All images are automatically optimized by Next.js
- Lazy loading for images not in viewport
- Responsive on all screen sizes
- Smooth transitions in slider mode (300ms)
- Accessibility: All images require alt text
- SEO: First slide heading used for page SEO

---

## Need Help?

- See README.md for setup instructions
- See QUICK_START.md for step-by-step guide
- Check http://localhost:3000/api/check-hero to debug

