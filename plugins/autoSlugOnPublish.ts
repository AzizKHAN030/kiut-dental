import {definePlugin} from 'sanity'
import {useDocumentOperation} from 'sanity'
import React from 'react'

export const autoSlugOnPublish = definePlugin({
  name: 'auto-slug-on-publish',
  document: {
    actions: (prev, context) => {
      // Only apply to blogPost documents
      if (context.schemaType !== 'blogPost') {
        return prev
      }

      return prev.map((originalAction) => {
        // Only modify the publish action
        if (originalAction.action !== 'publish') {
          return originalAction
        }

        // Return a React component that wraps the original action
        return function AutoSlugPublishAction(props: any) {
          const {patch, publish} = useDocumentOperation(props.id, props.type)
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

              // Only for blogPost documents
              if (document?._type === 'blogPost') {
                const title = document.title
                const currentSlug = document.slug?.current

                // If slug is empty and title exists, generate slug
                if (!currentSlug && title) {
                  const generatedSlug = title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                    .slice(0, 96)

                  // Update the document with the generated slug using patch
                  patch.execute([
                    {
                      set: {
                        slug: {
                          _type: 'slug',
                          current: generatedSlug,
                        },
                      },
                    },
                  ])

                  // Wait a bit for the patch to complete
                  await new Promise((resolve) => setTimeout(resolve, 300))
                }
              }

              // Call the original publish handler
              if (originalOnHandle) {
                return originalOnHandle()
              }

              // If no original handler, execute publish directly
              publish.execute()
              props.onComplete?.()
            },
          }
        }
      })
    },
  },
})

