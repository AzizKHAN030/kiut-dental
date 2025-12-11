import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLatestBlogPosts } from '@/lib/sanity';
import { transformBlogPosts, type BlogPost } from '@/lib/blog-utils';
import { BlogPostCard } from './BlogPostCard';
import { getLocale } from '@/lib/locale';
import { getLocalizedPath } from '@/lib/i18n';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export async function Blog() {
  // Get current locale
  const locale = await getLocale();
  
  // Fetch latest 4 blog posts
  let posts: BlogPost[] = [];
  try {
    const sanityPosts = await getLatestBlogPosts(4, locale);
    posts = transformBlogPosts(sanityPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // posts will remain empty array
  }

  // Don't render if no posts
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-gray-600 text-lg">
              Expert insights, treatment guides, and tips for maintaining your dental health
            </p>
          </div>
          <Link
            href={getLocalizedPath('/blog', locale)}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all mt-4 md:mt-0"
          >
            View All Posts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Desktop Grid - Hidden on mobile/tablet */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>

        {/* Mobile/Tablet Carousel - Visible on small/medium screens */}
        <div className="lg:hidden relative">
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {posts.map((post) => (
                <CarouselItem key={post.slug} className="pl-2 md:pl-4 basis-full sm:basis-1/2">
                  <BlogPostCard post={post} locale={locale} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

