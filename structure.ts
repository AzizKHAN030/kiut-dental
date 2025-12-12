import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

export const structure = async (S: StructureBuilder, context: StructureResolverContext) => {
  // Fetch locales dynamically from Sanity
  let locales: Array<{ code: string; name: string; flag: string; _id: string }> = [];
  
  try {
    locales = await context.getClient({ apiVersion: '2024-01-01' }).fetch(
      `*[_type == "locale" && isActive == true] | order(isDefault desc, code asc) {
        _id,
        code,
        name,
        flag
      }`
    );
  } catch (error) {
    console.error('Error fetching locales for structure:', error);
  }

  // Create locale filter items for Blog Posts
  const blogPostLocaleItems = locales.length > 0 
    ? locales.map(locale => 
        S.listItem()
          .title(`${locale.flag || ''} ${locale.name} Posts`)
          .child(
            S.documentList()
              .title(`${locale.name} Blog Posts`)
              .filter('_type == "blogPost" && locale._ref == $localeId')
              .params({ localeId: locale._id })
              .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
          )
      )
    : [];

  // Create locale filter items for Pages
  const pageLocaleItems = locales.length > 0
    ? locales.map(locale => 
        S.listItem()
          .title(`${locale.flag || ''} ${locale.name} Pages`)
          .child(
            S.documentList()
              .title(`${locale.name} Pages`)
              .filter('_type == "page" && locale._ref == $localeId')
              .params({ localeId: locale._id })
          )
      )
    : [];

  return S.list()
    .title('Content')
    .items([
      // Locale Configuration
      S.listItem()
        .title('Locales')
        .child(
          S.documentList()
            .title('Locale Configuration')
            .filter('_type == "locale"')
            .defaultOrdering([{ field: 'isDefault', direction: 'desc' }])
        )
        .icon(() => '🌐'),
      
      // Divider
      S.divider(),

      // Blog Posts organized by locale
      S.listItem()
        .title('Blog Posts')
        .child(
          S.list()
            .title('Blog Posts by Locale')
            .items([
              ...blogPostLocaleItems,
              // Divider
              S.divider(),
              // All Blog Posts (for overview)
              S.listItem()
                .title('All Blog Posts')
                .child(
                  S.documentList()
                    .title('All Blog Posts')
                    .filter('_type == "blogPost"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
            ])
        ),
      
      // Pages organized by locale
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages by Locale')
            .items([
              ...pageLocaleItems,
              // Divider
              S.divider(),
              // All Pages (for overview)
              S.listItem()
                .title('All Pages')
                .child(
                  S.documentList()
                    .title('All Pages')
                    .filter('_type == "page"')
                ),
            ])
        ),
      
      // Divider
      S.divider(),
      
      // All other document types (unchanged)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['blogPost', 'page', 'locale'].includes(listItem.getId() || '')
      ),
    ])
}
