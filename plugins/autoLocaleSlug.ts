import {definePlugin} from 'sanity'
import {useDocumentOperation} from 'sanity'
import React from 'react'
import {createClient} from '@sanity/client'

// Create a client for fetching locale references
const client = createClient({
  projectId: 'mh9vfjvg',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

export const autoLocaleSlug = definePlugin({
  name: 'auto-locale-slug',
  document: {
    actions: (prev, context) => {
      // Only apply to page documents
      if (context.schemaType !== 'page') {
        return prev
      }

      return prev.map((originalAction) => {
        // Modify both publish and unpublish actions to ensure slug has locale
        if (originalAction.action !== 'publish' && originalAction.action !== 'unpublish') {
          return originalAction
        }

        // Return a React component that wraps the original action
        return function AutoLocaleSlugAction(props: any) {
          const {patch, publish, unpublish} = useDocumentOperation(props.id, props.type)
          const originalResult = originalAction(props)

          if (!originalResult) {
            return originalResult
          }

          // Wrap the onHandle function
          const originalOnHandle = originalResult.onHandle

          return {
            ...originalResult,
            onHandle: async () => {
              const {draft, published} = props
              const document = draft || published

              // Only for page documents
              if (document?._type === 'page') {
                // Handle locale as reference or string
                let localeCode: string | null = null;
                const locale = document.locale;
                
                if (typeof locale === 'string') {
                  // Locale is a string (backward compatibility)
                  localeCode = locale;
                } else if (locale?._ref) {
                  // Locale is a reference - fetch the code from Sanity
                  try {
                    const localeDoc = await client.fetch(
                      `*[_id == $ref][0].code`,
                      { ref: locale._ref }
                    );
                    localeCode = localeDoc || null;
                  } catch (error) {
                    console.error('Error fetching locale code:', error);
                    localeCode = null;
                  }
                } else if (locale?.code) {
                  // Locale reference was resolved and has code property
                  localeCode = locale.code;
                } else if (locale && typeof locale === 'object' && '_type' in locale && locale._type === 'reference') {
                  // Handle reference object format
                  try {
                    const localeDoc = await client.fetch(
                      `*[_id == $ref][0].code`,
                      { ref: locale._ref }
                    );
                    localeCode = localeDoc || null;
                  } catch (error) {
                    console.error('Error fetching locale code from reference:', error);
                    localeCode = null;
                  }
                }
                
                const currentSlug = document.slug?.current

                // If slug exists and locale code is available and doesn't end with locale, append it
                if (currentSlug && localeCode && typeof localeCode === 'string' && !currentSlug.endsWith(`-${localeCode}`)) {
                  const slugWithLocale = `${currentSlug}-${localeCode}`

                  // Update the document with the locale-appended slug
                  patch.execute([
                    {
                      set: {
                        slug: {
                          _type: 'slug',
                          current: slugWithLocale,
                        },
                      },
                    },
                  ])

                  // Wait a bit for the patch to complete
                  await new Promise((resolve) => setTimeout(resolve, 300))
                }
              }

              // Call the original handler
              if (originalOnHandle) {
                return originalOnHandle()
              }

              // If no original handler, execute the action directly
              if (originalAction.action === 'publish') {
                publish.execute()
              } else if (originalAction.action === 'unpublish') {
                unpublish.execute()
              }
              props.onComplete?.()
            },
          }
        }
      })
    }
  },
})

