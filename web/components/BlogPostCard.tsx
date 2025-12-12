import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-utils';
import { getLocalizedPath } from '@/lib/i18n';

interface BlogPostCardProps {
  post: BlogPost;
  locale: string;
} 

export function BlogPostCard({ post, locale }: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col">
      <Link href={getLocalizedPath(`/blog/${post.slug}`, locale)} className="flex flex-col h-full">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🦷</div>
                <div className="text-sm text-gray-600">No image</div>
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4">
            {post.categories && post.categories.length > 0 && post.categories.map((category) => (
              <span
                key={category._id}
                className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mr-2"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-2">
              {post.author.image ? (
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
              ) : (
                <User className="w-4 h-4" />
              )}
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
          <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
            Read More
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
}

