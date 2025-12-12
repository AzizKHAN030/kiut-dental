# Quick Start: Make Your Hero Section Appear

Your hero section is hidden because there's no content in Sanity yet. Follow these steps:

## Step 1: Open Sanity Studio

1. Go to: **http://localhost:3333** in your browser
2. Sign in if prompted

## Step 2: Create a Page (5 minutes)

1. Look at the left sidebar and click on **"Page"** (it has a document icon)
2. Click the **"+ Create"** button (top right or center of screen)
3. You'll see a form. Fill it in:

   ```
   Title: Home
   ```

4. Click on the **"Generate"** button next to the Slug field (it will create the slug)
5. In the **Locale** field, select **"English"** (or type "en")

## Step 3: Add Hero Section

1. Scroll down to find the **"Sections"** field
2. Click **"Add item"** (or the "+" button)
3. A popup appears - select **"Hero Section"**
4. In **"Display mode"**, select **"Single hero (no slider)"**

## Step 4: Add a Slide

1. Under **"Slides"**, click **"Add item"**
2. A popup shows three options - select **"Hero slide – image right"**
3. Now fill in these fields:

   **Tagline** (optional):
   ```
   Premium Dental Care from Uzbekistan
   ```

   **Heading** (required - this is the big title):
   ```
   World-Class Smiles at Half the Price
   ```

   **Body text** (optional):
   ```
   Experience premium dental treatments in Uzbekistan. Save up to 70% compared to Western countries while receiving world-class care from internationally trained specialists.
   ```

   **Primary CTA label**:
   ```
   Get Free Consultation
   ```

   **Primary CTA link**:
   ```
   #contact
   ```

   **Secondary CTA label**:
   ```
   View Treatments
   ```

   **Secondary CTA link**:
   ```
   #services
   ```

## Step 5: Add Stats (Optional but Recommended)

1. Find **"Stats (under hero)"** field
2. Click **"Add item"** three times to add 3 stats:

   **Stat 1:**
   - Value: `70%`
   - Label: `Cost Savings`

   **Stat 2:**
   - Value: `15K+`
   - Label: `Happy Patients`

   **Stat 3:**
   - Value: `24/7`
   - Label: `Support`

## Step 6: Add Badge Info (Optional)

Scroll down and fill in:

**Badge title**:
```
ISO Certified
```

**Badge subtitle**:
```
International Standards
```

## Step 7: Add Image (Optional but Recommended)

1. Find the **"Main image"** field
2. Click **"Select..."** or **"Upload"**
3. Either:
   - Upload an image from your computer
   - Or use a placeholder for now (you can add it later)
4. Add **Alt text** (e.g., "Modern dental clinic")

## Step 8: PUBLISH!

1. Look at the bottom right corner
2. Click the big blue **"Publish"** button
3. Wait for the success message

## Step 9: See Your Hero Section

1. Go to: **http://localhost:3000/en**
2. Refresh the page (Cmd+R or Ctrl+R)
3. **Your hero section should now appear!** 🎉

---

## Troubleshooting

**Hero still not showing?**

1. Make sure you clicked **Publish** (not just Save)
2. Check the slug is exactly: `/`
3. Check the locale is: `en`
4. Refresh your browser with Cmd+Shift+R (hard refresh)
5. Check browser console for errors (F12)

**Need to make changes?**

1. Go back to Sanity Studio (http://localhost:3333)
2. Click on your "Home" page
3. Make changes
4. Click **Publish** again
5. Refresh your website

---

## What's Required vs Optional?

### Required (must have):
- ✅ Heading

### Optional (nice to have):
- Tagline
- Body text
- Buttons (CTAs)
- Image
- Stats
- Badge

The hero will show as long as you have at least a **heading**!

