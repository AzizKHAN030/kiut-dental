import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

export const structure = (S: StructureBuilder, context: StructureResolverContext) => {
  return S.list()
    .title('Content')
    .items([
      // Blog Posts organized by locale
      S.listItem()
        .title('Blog Posts')
        .child(
          S.list()
            .title('Blog Posts by Locale')
            .items([
              // English Blog Posts
              S.listItem()
                .title('🇬🇧 English Posts')
                .child(
                  S.documentList()
                    .title('English Blog Posts')
                    .filter('_type == "blogPost" && locale == "en"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
              // Russian Blog Posts
              S.listItem()
                .title('🇷🇺 Russian Posts')
                .child(
                  S.documentList()
                    .title('Russian Blog Posts')
                    .filter('_type == "blogPost" && locale == "ru"')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                ),
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
              // English Pages
              S.listItem()
                .title('🇬🇧 English Pages')
                .child(
                  S.documentList()
                    .title('English Pages')
                    .filter('_type == "page" && locale == "en"')
                ),
              // Russian Pages
              S.listItem()
                .title('🇷🇺 Russian Pages')
                .child(
                  S.documentList()
                    .title('Russian Pages')
                    .filter('_type == "page" && locale == "ru"')
                ),
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
          !['blogPost', 'page'].includes(listItem.getId() || '')
      ),
    ])
}
