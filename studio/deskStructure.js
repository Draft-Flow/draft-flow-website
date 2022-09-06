import S from "@sanity/desk-tool/structure-builder"

const hiddenDocTypes = listItem => !["siteSettings"].includes(listItem.getId())

export default () =>
  S.list()
    .title("Content")
    .items([
      S.documentListItem()
        .schemaType("siteSettings")
        .title("Site settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("21987cfd-3189-4b89-82e9-b3df24e1f332")
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
