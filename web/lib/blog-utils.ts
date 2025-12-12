// Blog post type
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  author: {
    name: string;
    image: string | null;
  };
  publishedAt: string;
  categories: Array<{
    _id: string;
    name: string;
    slug?: {
      current: string;
    };
  }>;
}

// Helper function to transform Sanity blog post data
export function transformBlogPost(post: any): BlogPost {
  // Extract image URL - handle both direct asset reference and nested structure
  let imageUrl = null;
  if (post.featuredImage?.asset?.url) {
    imageUrl = post.featuredImage.asset.url;
  } else if (post.featuredImage?.asset?._ref) {
    // If we have a reference, we need to fetch it separately or use the URL builder
    // For now, we'll skip it and log a warning
    console.warn('Image reference found but not resolved:', post.featuredImage.asset._ref);
  } else if (typeof post.featuredImage === 'string') {
    imageUrl = post.featuredImage;
  }
  
  // Extract author image URL
  let authorImageUrl = null;
  if (post.author?.image?.asset?.url) {
    authorImageUrl = post.author.image.asset.url;
  } else if (typeof post.author?.image === 'string') {
    authorImageUrl = post.author.image;
  }
  
  // Transform categories - handle both treatment objects and legacy string format
  let categories = [];
  if (post.categories && Array.isArray(post.categories)) {
    categories = post.categories.map((cat: any) => {
      // If it's already a treatment object with _id and name
      if (cat && typeof cat === 'object' && cat._id && cat.name) {
        return {
          _id: cat._id,
          name: cat.name,
          slug: cat.slug,
        };
      }
      // Legacy string format (for backward compatibility)
      if (typeof cat === 'string') {
        return {
          _id: cat,
          name: cat.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          slug: { current: cat },
        };
      }
      return null;
    }).filter(Boolean);
  }

  return {
    slug: post.slug?.current || post.slug,
    title: post.title,
    excerpt: post.excerpt,
    featuredImage: imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '' ? imageUrl : null,
    author: {
      name: post.author?.name || 'Unknown Author',
      image: authorImageUrl && typeof authorImageUrl === 'string' && authorImageUrl.trim() !== '' ? authorImageUrl : null,
    },
    publishedAt: post.publishedAt,
    categories,
  };
}

export function transformBlogPosts(posts: any[]) {
  return posts.map(transformBlogPost);
}

