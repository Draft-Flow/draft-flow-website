import { FaFile, FaShoppingCart } from 'react-icons/fa'
import parentChild from './parentChild'

export default (S, { documentStore }) =>
  S.list()
    .title('Content')
    .items([
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Site settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('21987cfd-3189-4b89-82e9-b3df24e1f332')
        ),
      S.divider(),
      parentChild(S, documentStore, 'category'),
      S.listItem()
        .title('Products')
        .icon(FaShoppingCart)
        .schemaType('shop')
        .child(id => 
            S.documentTypeList('shop')
            .title('Products')
        ),
      S.divider(),
      S.listItem()
        .title('Static Pages')
        .icon(FaFile)
        .child(
          S.list()
            // Sets a title for our new list
            .title('Static Pages')
            // Add items to the array
            // Each will pull one of our new singletons
            .items([
              S.listItem()
                .title('Home')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.home')
                ),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings', 'shop', 'staticPages', 'category'].includes(listItem.getId())
      )
    ])
