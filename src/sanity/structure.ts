import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('index')
            .documentId('index')
        ),
      S.listItem()
        .title('About Page')
        .id('about')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      // Divider
      S.divider(),
      // Other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['pageMeta', 'homepageMeta', 'contact', 'mux.videoAsset', 'mux.assetData', 'mux.track', 'mux.playbackId', 'mux.staticRenditions', 'mux.staticRenditionFile', 'index', 'about'].includes(listItem.getId() as string)
      )
    ])
