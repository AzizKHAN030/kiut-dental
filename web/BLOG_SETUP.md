# Blog Setup Instructions

## Sanity Client Installation

To connect the blog to Sanity CMS, you need to install the Sanity client:

```bash
cd web
npm install @sanity/client
```

Or with yarn:

```bash
cd web
yarn add @sanity/client
```

## Sanity Configuration

The Sanity client is configured in `web/lib/sanity.ts` with:
- Project ID: `mh9vfjvg`
- Dataset: `production`

If you need to change these, update the configuration in `web/lib/sanity.ts`.

## Blog Schema

The blog post schema is defined in `schemaTypes/blogPost.ts` and includes:
- Title and slug
- Author information
- Published date
- Featured image
- Excerpt
- Categories
- Rich text content (Portable Text)
- SEO fields
- Featured post flag

## Blog Pages

- **Blog Listing**: `/blog` - Shows all blog posts
- **Blog Post**: `/blog/[slug]` - Individual blog post page

## Features

- ✅ Server-side rendering (SSR) for SEO
- ✅ Fallback to mock data if Sanity is not configured
- ✅ Responsive design
- ✅ Category tags
- ✅ Author and date information
- ✅ Featured image support
- ✅ Rich text content rendering

## Adding Blog Link to Navbar

The blog link has been added to the navbar. It appears between "Testimonials" and "Contact".




