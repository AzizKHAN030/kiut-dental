import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/sanity';
import { transformBlogPosts, type BlogPost } from '@/lib/blog-utils';
import { BlogPostCard } from '@/components/BlogPostCard';
import { Navbar } from '@/components/Navbar';
import { notFound } from 'next/navigation';
import { isLocale, getLocalizedPath, getSupportedLocales } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> | { locale: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale;
  
  // Fetch active locales for language alternates
  const locales = await getSupportedLocales();
  const languageAlternates = locales.reduce((acc, loc) => {
    acc[loc.code] = getLocalizedPath('/blog', loc.code);
    return acc;
  }, {} as Record<string, string>);
  
  return {
    title: 'Blog - Dental Care Articles & Tips | UzDental',
    description: 'Read our latest articles about dental care, treatments, and dental tourism in Uzbekistan.',
    alternates: {
      canonical: getLocalizedPath('/blog', locale || 'en'),
      languages: languageAlternates,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale;
  
  // Validate locale
  if (!locale || !(await isLocale(locale))) {
    notFound();
  }
  
  // Fetch data from Sanity
  const [sanityPosts, locales] = await Promise.all([
    getBlogPosts(locale),
    getSupportedLocales(),
  ]);
  
  let posts: BlogPost[] = [];
  try {
    posts = transformBlogPosts(sanityPosts);
  } catch (error) {
    console.error('Error transforming blog posts:', error);
    // posts will remain empty array
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar locale={locale} locales={locales} />
      <main>
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-blue-100">
              Expert insights, treatment guides, and tips for maintaining your dental health
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {posts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">No Blog Posts Yet</h2>
              <p className="text-gray-600 text-lg mb-8">
                We're working on creating valuable content for you. Check back soon for expert insights, treatment guides, and dental health tips.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
      </main>
    </div>
  );
}
