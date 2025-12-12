# Hero Slide – Image Banner

## Overview

The **Image Banner** slide type is the simplest and most minimalist hero option. It features a full-width image with optional CTA buttons overlaid on top. Perfect for clean, modern designs that let the imagery speak for itself.

---

## When to Use

✅ **Perfect for:**
- Clean, minimal hero sections
- Photography-focused designs
- Simple call-to-action scenarios
- Event announcements or promotions
- When you want maximum visual impact with minimal text
- Landing pages with a single, clear goal

❌ **Not ideal for:**
- Content-heavy sections (use Background or Left/Right slides instead)
- Multiple statistics or detailed information
- When you need taglines or descriptive text

---

## Features

### Banner Image
- **Full-width background**: Image fills the entire hero section
- **Recommended size**: 1920x1080px (16:9 aspect ratio)
- **Auto-optimization**: Next.js optimizes image loading
- **Responsive**: Scales beautifully on all devices

### Overlay Options
Control the darkness of the overlay to ensure buttons are visible:

- **None**: No overlay (best for dark images)
- **Light (10%)**: Subtle darkening
- **Medium (30%)**: Moderate darkening (recommended)
- **Dark (50%)**: Strong darkening (best for bright images)

### Button Position
Choose where the CTA buttons appear vertically:

- **Top**: Buttons near the top of the banner
- **Center**: Buttons centered (default)
- **Bottom**: Buttons near the bottom

### Optional CTAs
- Primary button (e.g., "Book Now")
- Secondary button (e.g., "Learn More")
- Both are optional - you can have a pure image banner!

---

## Configuration in Sanity Studio

### Step 1: Add the Slide

1. In your Hero Section, click **"Add item"** in Slides
2. Select **"Hero slide – image banner"**

### Step 2: Upload Banner Image

1. Click **"Banner image"** field
2. Upload or select an image
   - Recommended: 1920x1080px
   - Format: JPG or PNG
   - Keep file size under 2MB for best performance
3. Add **Alt text** for accessibility

### Step 3: Set Overlay (Optional)

Choose overlay darkness:
- **None**: For dark/moody images
- **Light**: Subtle effect
- **Medium**: Recommended for most cases
- **Dark**: For very bright images

### Step 4: Position Buttons (Optional)

Choose vertical position:
- **Top**: Professional, header-like
- **Center**: Balanced, focused
- **Bottom**: Modern, spacious

### Step 5: Add CTA Buttons (Optional)

**Primary CTA:**
- Label: e.g., "Book Appointment"
- Link: e.g., "#contact" or "/booking"

**Secondary CTA:**
- Label: e.g., "View Services"
- Link: e.g., "#services" or "/services"

*Note: You can add just one button, both, or none at all!*

---

## Layout Examples

### Example 1: Pure Image Banner (No Buttons)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                                 │
│                                                 │
│         [  FULL-WIDTH IMAGE ONLY  ]            │
│                                                 │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Use case**: Brand imagery, atmosphere shots, visual storytelling

---

### Example 2: Center Positioned CTAs

```
┌─────────────────────────────────────────────────┐
│                                                 │
│            [  IMAGE BANNER  ]                  │
│                                                 │
│          [Primary]  [Secondary]                │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Use case**: Landing pages, promotional campaigns, event registration

---

### Example 3: Bottom Positioned CTAs

```
┌─────────────────────────────────────────────────┐
│                                                 │
│            [  IMAGE BANNER  ]                  │
│                                                 │
│                                                 │
│                                                 │
│          [Primary]  [Secondary]                │
└─────────────────────────────────────────────────┘
```

**Use case**: Modern, spacious designs with emphasis on imagery

---

## Best Practices

### Image Selection

**✅ Good image choices:**
- High resolution (1920px+ wide)
- Clear focal point
- Professional quality
- Matches your brand aesthetic
- Has visual breathing room for buttons

**❌ Avoid:**
- Busy or cluttered images
- Images with important text (will be covered by buttons)
- Very bright images without overlay
- Low resolution or pixelated images

### Overlay Guidelines

| Image Brightness | Recommended Overlay |
|------------------|---------------------|
| Very dark (night scenes) | None or Light |
| Medium brightness | Light or Medium |
| Bright (daytime, white backgrounds) | Medium or Dark |
| Very bright/white | Dark |

### Button Positioning

**Top position:**
- Professional, corporate feel
- Doesn't compete with image focal point
- Works well with bottom-heavy images

**Center position:**
- Maximum visibility
- Classic, balanced
- Best for conversion-focused pages

**Bottom position:**
- Modern, editorial feel
- Lets image breathe
- Works well with top-heavy images

---

## Slider Combinations

Mix Image Banner with other slide types for variety:

### Minimalist Slider
```
Slide 1: Image Banner (no buttons) - Pure visual impact
Slide 2: Image Banner (center buttons) - Call to action
Slide 3: Image Banner (no buttons) - Closing visual
```

### Mixed Slider
```
Slide 1: Image Banner (center) - Simple opening
Slide 2: Image Right - Detailed information
Slide 3: Background - Rich content with overlay
Slide 4: Image Banner (bottom) - Final CTA
```

---

## Use Cases

### 1. Event Promotion

```
Image: Event venue or crowd
Overlay: Medium
Position: Center
Primary CTA: "Register Now"
Secondary CTA: "View Schedule"
```

### 2. Service Launch

```
Image: New service/product
Overlay: Light
Position: Bottom
Primary CTA: "Learn More"
Secondary CTA: "Contact Us"
```

### 3. Brand Story

```
Image: Team or clinic photo
Overlay: None
Position: None (pure image)
CTAs: None
```

### 4. Limited Time Offer

```
Image: Promotional imagery
Overlay: Dark
Position: Center
Primary CTA: "Claim Offer"
Secondary CTA: "Terms & Conditions"
```

---

## Technical Details

### Performance
- Images automatically optimized by Next.js
- Lazy loading for off-screen images
- Responsive sizes for different devices
- WebP format when browser supports

### Accessibility
- Alt text required for all images
- Button focus states
- Keyboard navigation support
- Screen reader compatible

### SEO
- Image alt text indexed
- Proper heading hierarchy
- Fast loading times
- Mobile-friendly

---

## Comparison with Other Slide Types

| Feature | Image Banner | Background Slide | Image Left/Right |
|---------|--------------|------------------|------------------|
| Text content | None | Full (tagline, heading, body, stats) | Full |
| Image style | Full background | Full background with content box | Side image |
| Best for | Visual impact | Content-rich | Balanced layout |
| Complexity | Simple | Complex | Medium |
| CTAs | Optional 2 buttons | Full buttons section | Full buttons section |

---

## Tips & Tricks

1. **Pure Image Banner**: Skip all CTAs for a clean, magazine-style look
2. **Contrast Check**: Always preview buttons on your image to ensure readability
3. **Mobile Testing**: Banner images scale differently on mobile - test thoroughly
4. **Autoplay Note**: Works great in sliders with 3-5 second intervals
5. **Accessibility**: Always add meaningful alt text for images

---

## Quick Setup Checklist

- [ ] Upload high-quality banner image (1920x1080px recommended)
- [ ] Add descriptive alt text
- [ ] Choose overlay darkness (test visibility of buttons)
- [ ] Select button position (top/center/bottom)
- [ ] Add primary CTA label and link (optional)
- [ ] Add secondary CTA label and link (optional)
- [ ] Preview on desktop and mobile
- [ ] Publish and test on live site

---

## Need Help?

- See **HERO_LAYOUTS_GUIDE.md** for all slide types
- See **QUICK_START.md** for basic setup
- See **CONTENT_POSITION_GUIDE.md** for Background slide positioning
