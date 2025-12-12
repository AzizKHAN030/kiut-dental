import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    // Check if any pages exist
    const pages = await client.fetch(`*[_type == "page"] {
      _id,
      title,
      "slug": slug.current,
      locale,
      "hasSections": defined(sections),
      "sectionsCount": count(sections)
    }`);

    // Check for hero sections specifically
    // Note: Slugs are stored with locale suffix (e.g., "home-en", "home-ru")
    const heroQuery = await client.fetch(`*[_type == "page" && slug.current == "home-en" && locale == "en"][0] {
      _id,
      title,
      sections[] {
        _type == "heroSection" => {
          _type,
          displayMode,
          "slidesCount": count(slides),
          slides[] {
            _type,
            heading,
            tagline
          }
        }
      }
    }`);

    return NextResponse.json({
      success: true,
      totalPages: pages.length,
      pages,
      heroData: heroQuery,
      message: heroQuery 
        ? '✅ Hero content found!' 
        : '❌ No hero content found. Please create a page with slug "home" (will be stored as "home-en") and locale "en" in Sanity Studio.'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

