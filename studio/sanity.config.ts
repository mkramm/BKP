import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Homepage',

  projectId: 'lejqr88f',
  dataset: 'bkp_production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
