import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'mh9vfjvg',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Blog post queries
export async function getBlogPosts(locale: string = 'en') {
  const query = `*[_type == "blogPost" && locale == $locale] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    categories,
    featured
  }`;
  
  return await client.fetch(query, { locale });
}

export async function getBlogPost(slug: string, locale: string = 'en') {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug provided');
  }

  const query = `*[_type == "blogPost" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      caption
    },
    categories,
    content[] {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    seo
  }`;
  
  try {
    return await client.fetch(query, { slug, locale });
  } catch (error) {
    console.error('Error fetching blog post from Sanity:', error);
    throw error;
  }
}

export async function getFeaturedBlogPosts(locale: string = 'en') {
  const query = `*[_type == "blogPost" && featured == true && locale == $locale] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    categories
  }`;
  
  return await client.fetch(query, { locale });
}

export async function getLatestBlogPosts(limit: number = 4, locale: string = 'en') {
  const query = `*[_type == "blogPost" && locale == $locale] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    locale,
    author {
      name,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    categories
  }`;
  
  return await client.fetch(query, { locale });
}

