import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([S.listItem()
      .title('Homepage')
      .id('homepage')
      .child(
        S.document()
          .schemaType('index')
          .documentId('index')
      ),
    // Divider
    S.divider(),
    // Other document types
    ...S.documentTypeListItems().filter(
      (listItem) => !['pageMeta', 'homepageMeta', 'contact', 'mux.videoAsset', 'mux.assetData', 'mux.track', 'mux.playbackId', 'mux.staticRenditions', 'mux.staticRenditionFile', 'index'].includes(listItem.getId() as string)
    )])
