# KIUT Dental - Content Management System

This project uses Sanity CMS to manage content for the KIUT Dental website.

## Project Structure

- `/` - Sanity Studio (CMS)
- `/web` - Next.js frontend application

## Getting Started

### Running the Development Servers

1. **Start Sanity Studio** (in one terminal):
   ```bash
   yarn dev
   ```
   This will start Sanity Studio at `http://localhost:3333`

2. **Start Next.js Frontend** (in another terminal):
   ```bash
   cd web
   yarn dev
   ```
   This will start the frontend at `http://localhost:3000`

## Managing Hero Section Content

The Hero section is now connected to Sanity CMS. Here's how to update it:

### Step 1: Access Sanity Studio

1. Open your browser and go to `http://localhost:3333`
2. Sign in with your Sanity account

### Step 2: Create/Edit a Page

1. In Sanity Studio, look for **"Page"** in the left sidebar
2. Create a new page or edit an existing one
3. Set the following fields:
   - **Title**: Home
   - **Slug**: `/` (for the homepage)
   - **Locale**: Choose `en` (English) or `ru` (Russian)

### Step 3: Add Hero Section

1. In the **Sections** field, click "Add item"
2. Select **"Hero Section"**
3. Choose **Display mode**:
   - **Single hero (no slider)**: Shows one static hero section
   - **Slider (multiple slides)**: Full-page slider with navigation arrows and dots

### Step 4: Configure Hero Slide(s)

1. Click "Add item" in the **Slides** field
2. Select a slide type:
   - **Hero slide – image right**: Image on the right, content on the left
   - **Hero slide – image left**: Image on the left, content on the right
   - **Hero slide – background image**: Full-screen background image with content overlay
   - **Hero slide – image banner**: Full-width image with optional CTA buttons (minimal design)
3. Fill in the fields (varies by slide type):
   - **Tagline**: e.g., "Premium Dental Care from Uzbekistan"
   - **Heading**: e.g., "World-Class Smiles at Half the Price" (required for most types)
   - **Body text**: Your main description
   - **Primary CTA label**: e.g., "Get Free Consultation"
   - **Primary CTA link**: e.g., "#contact" (use # for page sections)
   - **Secondary CTA label**: e.g., "View Treatments"
   - **Secondary CTA link**: e.g., "#services"
   - **Main image**: Upload or select an image from your media library
   - **Stats**: Add up to 3 statistics (value + label) - Left/Right slides only
   - **Badge title**: e.g., "ISO Certified" - Left/Right slides only
   - **Badge subtitle**: e.g., "International Standards"

### Step 5: Add More Slides (Optional - For Slider Mode)

If you chose **"Slider"** display mode:

1. Click "Add item" again in the **Slides** field
2. Choose a different slide type for variety
3. Fill in the content for the second slide
4. Repeat for as many slides as you want (recommended: 3-5 slides)

**Note**: Slider controls (arrows and dots) only appear if you have 2+ slides AND display mode is "Slider"

### Step 6: Publish

1. Click the **"Publish"** button in the bottom bar
2. Your changes will appear on the frontend immediately!

## Features

### Hero Section Layouts

The hero section supports **four different slide layouts**:

1. **Image Right** (Default)
   - Content on the left, image on the right
   - Stats displayed below content
   - Floating badge on the image
   - Best for: Standard landing pages, detailed content

2. **Image Left**
   - Image on the left, content on the right
   - Perfect for alternating layouts in slider mode
   - Stats displayed below content
   - Best for: Visual variety, portfolio pieces

3. **Background Image**
   - Full-screen background image with dark overlay
   - Content centered or left-aligned
   - White text for contrast
   - Great for dramatic hero sections
   - Best for: Impact, emotional connection

4. **Image Banner** (NEW!)
   - Full-width image with optional CTA buttons only
   - Minimal design, maximum visual impact
   - Optional overlay darkness control
   - Flexible button positioning (top/center/bottom)
   - Best for: Clean designs, photography-first, events, promotions

### Slider Mode

When display mode is set to **"Slider"**:
- Full-page carousel with smooth transitions
- Left/right navigation arrows
- Dot indicators at the bottom
- Automatic slide detection (shows controls only with 2+ slides)
- Loop enabled (goes back to first slide after last)
- Mix different slide layouts for visual variety

### Single Mode

When display mode is set to **"Single"**:
- Shows only the first slide
- No navigation controls
- Perfect for simple landing pages

### Multilingual Support

Create separate pages for each language:
- Set `slug: /` and `locale: en` for English
- Set `slug: /` and `locale: ru` for Russian

### Dynamic Content

**IMPORTANT**: The Hero section is now 100% managed by Sanity CMS. It will **not display** unless you create content in Sanity Studio. There are no fallback values.

To see the Hero section on your website:
1. Open Sanity Studio at `http://localhost:3333`
2. Create a Page with slug `/` and locale `en` (or `ru`)
3. Add a Hero Section with at least one slide
4. Fill in the required fields (heading is required)
5. Publish the page

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Join the Sanity Community](https://www.sanity.io/community/join)
