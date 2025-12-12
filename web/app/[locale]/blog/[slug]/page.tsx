import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/sanity';
import { Navbar } from '@/components/Navbar';
import { isLocale, getLocalizedPath, getSupportedLocales } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const locale = resolvedParams?.locale;
  
  if (!slug || !locale || !isLocale(locale)) {
    return {
      title: 'Post Not Found',
    };
  }
  
  let post;
  try {
    post = await getBlogPost(slug, locale);
    if (post) {
      post = transformSanityPost(post);
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | UzDental Blog`,
    description: post.excerpt,
    alternates: {
      canonical: getLocalizedPath(`/blog/${slug}`, locale),
    },
  };
}

function transformSanityPost(post: any) {
  // Debug: log the image structure
  if (process.env.NODE_ENV === 'development') {
    console.log('Post featuredImage structure:', JSON.stringify(post.featuredImage, null, 2));
  }
  
  // Get featured image URL from Sanity - handle multiple possible structures
  let featuredImageUrl = null;
  if (post.featuredImage?.asset?.url) {
    featuredImageUrl = post.featuredImage.asset.url;
  } else if (post.featuredImage?.asset?._ref) {
    console.warn('Image reference found but not resolved:', post.featuredImage.asset._ref);
  } else if (typeof post.featuredImage === 'string') {
    featuredImageUrl = post.featuredImage;
  }
  
  const validImage = featuredImageUrl && typeof featuredImageUrl === 'string' && featuredImageUrl.trim() !== '' 
    ? featuredImageUrl 
    : null;
  
  // Transform content images
  const transformedContent = post.content?.map((block: any) => {
    if (block._type === 'image' && block.asset) {
      return {
        ...block,
        asset: {
          url: block.asset.url || null,
          _id: block.asset._id,
        },
      };
    }
    return block;
  }) || post.content;
  
  // Get author image URL
  let authorImageUrl = null;
  if (post.author?.image?.asset?.url) {
    authorImageUrl = post.author.image.asset.url;
  } else if (typeof post.author?.image === 'string') {
    authorImageUrl = post.author.image;
  }
  
  const validAuthorImage = authorImageUrl && typeof authorImageUrl === 'string' && authorImageUrl.trim() !== '' 
    ? authorImageUrl 
    : null;
  
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
    featuredImage: validImage,
    author: {
      name: post.author?.name || 'Unknown Author',
      image: validAuthorImage,
    },
    publishedAt: post.publishedAt,
    categories,
    content: transformedContent,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const locale = resolvedParams?.locale;
  
  if (!slug || !locale || !(await isLocale(locale))) {
    notFound();
  }
  
  // Fetch data from Sanity
  const [sanityPost, locales] = await Promise.all([
    getBlogPost(slug, locale),
    getSupportedLocales(),
  ]);
  
  let post;
  if (sanityPost) {
    post = transformSanityPost(sanityPost);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar locale={locale} locales={locales} />
      {/* Back Button */}
      <div className="container mx-auto px-6 pt-8">
        <Link
          href={getLocalizedPath('/blog', locale)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
          {post.categories && post.categories.length > 0 && post.categories.map((category) => (
              <span
                key={category._id}
                className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
            <div className="flex items-center gap-3">
              {post.author.image ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featuredImage && typeof post.featuredImage === 'string' && post.featuredImage.trim() !== '' ? (
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ) : (
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🦷</div>
                <div className="text-gray-600">No featured image</div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content && Array.isArray(post.content) ? (
              post.content.map((block: any, index: number) => {
                if (block._type === 'block') {
                  const text = block.children?.map((child: any) => child.text).join('') || '';
                  
                  if (block.style === 'h1') {
                    return (
                      <h1 key={index} className="text-4xl font-bold mt-12 mb-6">
                        {text}
                      </h1>
                    );
                  }
                  if (block.style === 'h2') {
                    return (
                      <h2 key={index} className="text-3xl font-bold mt-12 mb-6">
                        {text}
                      </h2>
                    );
                  }
                  if (block.style === 'h3') {
                    return (
                      <h3 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {text}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                      {text}
                    </p>
                  );
                }
                if (block._type === 'image' && block.asset?.url) {
                  return (
                    <div key={index} className="my-8">
                      <Image
                        src={block.asset.url}
                        alt={block.alt || post.title}
                        width={800}
                        height={600}
                        className="rounded-xl w-full"
                      />
                      {block.caption && (
                        <p className="text-sm text-gray-500 text-center mt-2">{block.caption}</p>
                      )}
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <p className="text-gray-700 leading-relaxed mb-6">
                Content coming soon...
              </p>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Smile?</h3>
            <p className="text-gray-600 mb-6">
              Get a free consultation and personalized treatment plan from our expert team.
            </p>
            <Link
              href={getLocalizedPath('/#contact', locale)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
            >
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
