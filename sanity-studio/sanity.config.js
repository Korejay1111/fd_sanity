// sanity.config.js
// ─────────────────────────────────────────────────────────────────────
//  GMJ Podcast — Sanity Studio Configuration
//  Replace YOUR_PROJECT_ID and YOUR_DATASET below.
// ─────────────────────────────────────────────────────────────────────

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name:    'gmj-podcast',
  title:   'GMJ Podcast CMS',

  // ⬇️  Fill in your Sanity project details here
  projectId: '8ofs05v1',
  dataset:   'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('GMJ Podcast')
          .items([
            S.listItem()
              .title('🎙️ All Episodes')
              .child(
                S.documentList()
                  .title('Episodes')
                  .filter('_type == "episode"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('⭐ Featured Episode')
              .child(
                S.documentList()
                  .title('Featured Episodes')
                  .filter('_type == "episode" && featured == true')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'episode'
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
