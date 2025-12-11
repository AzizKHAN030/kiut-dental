import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { colorInput } from '@sanity/color-input';

import {schemaTypes} from './schemaTypes'
import {autoSlugOnPublish} from './plugins/autoSlugOnPublish'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'kiut-dental',

  projectId: 'mh9vfjvg',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool(), colorInput(), autoSlugOnPublish()],

  schema: {
    types: schemaTypes,
  },
})
