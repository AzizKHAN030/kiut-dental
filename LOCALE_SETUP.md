# Locale Configuration Guide

## Overview

The website uses a fully dynamic internationalization (i18n) system. Locales are configured in Sanity Studio, and the frontend automatically adapts to show all active locales.

## Setting Up a New Locale

### Step 1: Create a Locale in Sanity Studio

1. Open Sanity Studio
2. Go to **Locales** in the sidebar
3. Click **Create new Locale**
4. Fill in the fields:
   - **Locale Code**: Enter the ISO 639-1 language code (e.g., `uz`, `de`, `fr`)
   - **Display Name**: Enter the language name in its native form (e.g., "O'zbek", "Deutsch", "Français")
   - **Flag Emoji**: Optional - Click "Choose Flag" button to select from 50+ country flags
     - Search by country name or locale code
     - Click "Clear" to remove the flag
   - **Default Locale**: Check this for ONE locale only (usually English)
   - **Active**: Keep checked to make it visible on the website
5. Click **Publish**

### Step 2: Create Content for the New Locale

#### For Home Page:
1. Go to **Pages** → **[Flag] [Language Name] Pages**
2. Click **Create new Page**
3. Fill in:
   - **Title**: "Home" (or any title)
   - **Slug**: Enter `home` (will automatically become `home-uz`, `home-de`, etc. when you publish)
   - **Locale**: Select your new locale (e.g., Uzbek)
   - **Sections**: Add Hero, Features, etc.
4. Click **Publish**

#### For Blog Posts:
1. Go to **Blog Posts** → **[Flag] [Language Name] Posts**
2. Click **Create new Blog Post**
3. Fill in all fields
4. **Locale**: Select your new locale
5. Click **Publish**

### Step 3: Access on Frontend

The frontend will automatically:
- Show the new locale in the language selector
- Support URLs like `/uz`, `/uz/blog`, `/uz/blog/my-post`
- Filter content by the selected locale

**No code changes needed!**

## How It Works

### Sanity Schema:
- **Locale Document**: Stores configuration for each language
- **Page & BlogPost**: Reference the locale document
- **Auto-Slug Plugin**: Automatically appends locale to slugs (e.g., `home` → `home-uz`)
- **Flag Picker**: Interactive popup to choose from 50+ country flags

### Frontend:
- **Middleware**: Fetches active locales from Sanity (cached for 1 minute)
- **Pages**: Validate locale and fetch content filtered by locale
- **Navbar**: Shows all active locales in the language selector
- **URLs**: All routes are prefixed with locale (e.g., `/en`, `/ru`, `/uz`)

## Available Flags

The flag picker includes 50+ country flags including:
- 🇬🇧 United Kingdom (en, en-GB)
- 🇺🇸 United States (en-US)
- 🇷🇺 Russia (ru, ru-RU)
- 🇺🇿 Uzbekistan (uz, uz-UZ)
- 🇩🇪 Germany (de, de-DE)
- 🇫🇷 France (fr, fr-FR)
- 🇪🇸 Spain (es, es-ES)
- 🇮🇹 Italy (it, it-IT)
- 🇵🇹 Portugal (pt, pt-PT)
- 🇧🇷 Brazil (pt-BR)
- 🇨🇳 China (zh, zh-CN)
- 🇯🇵 Japan (ja, ja-JP)
- 🇰🇷 South Korea (ko, ko-KR)
- 🇸🇦 Saudi Arabia (ar, ar-SA)
- 🇹🇷 Turkey (tr, tr-TR)
- 🇵🇱 Poland (pl, pl-PL)
- 🇳🇱 Netherlands (nl, nl-NL)
- 🇸🇪 Sweden (sv, sv-SE)
- 🇰🇿 Kazakhstan (kk, kk-KZ)
- 🇹🇯 Tajikistan (tg, tg-TJ)
- 🇰🇬 Kyrgyzstan (ky, ky-KG)
- 🇹🇲 Turkmenistan (tk, tk-TM)
- 🇦🇿 Azerbaijan (az, az-AZ)
- 🇦🇲 Armenia (hy, hy-AM)
- 🇬🇪 Georgia (ka, ka-GE)
- And many more...

**Features:**
- Search by country name or locale code
- Visual flag preview
- Hover effect for better UX
- Optional field - can be left empty

## Deactivating a Locale

1. Go to **Locales** in Sanity Studio
2. Find the locale you want to deactivate
3. Uncheck **Active**
4. Click **Publish**

The locale will be hidden from the language selector and inaccessible on the frontend.

## Changing the Default Locale

1. Go to **Locales** in Sanity Studio
2. Find the current default locale and uncheck **Default Locale**
3. Find the new default locale and check **Default Locale**
4. Publish both documents

The new default locale will be used when users visit the root URL (`/`).

## Technical Details

### Slug Format
- Pages use slugs with locale suffix: `home-en`, `home-ru`, `home-uz`
- This ensures uniqueness in Sanity
- Frontend routing uses clean URLs: `/en`, `/ru`, `/uz`

### Querying Content
All Sanity queries filter by locale using either:
- Reference: `locale._ref == *[_type == "locale" && code == $locale][0]._id`
- Direct reference: `locale->code == $locale`
- String (backward compatibility): `locale == $locale`

### Caching
- Locales are cached in middleware for 1 minute
- This reduces Sanity API calls while keeping locales up-to-date
- Add or change locales in Sanity and they'll appear within 1 minute

## Troubleshooting

**Issue**: New locale doesn't appear in language selector
- **Solution**: Wait up to 1 minute for cache to refresh, or restart the dev server

**Issue**: 404 error for new locale
- **Solution**: Ensure you created a page with slug "home" and selected the correct locale

**Issue**: Content not showing in new locale
- **Solution**: Make sure content is published with the correct locale selected

**Issue**: Flag not showing correctly
- **Solution**: Click "Choose Flag" button and select the correct flag from the picker, or click "Clear" and leave it empty

