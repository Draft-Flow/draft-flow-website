import { FaFile, FaShoppingCart, FaTags } from 'react-icons/fa'
import {TreeView} from 'sanity-plugin-taxonomy-manager' 

export default (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Concept Schemes')
        .schemaType('skosConceptScheme')
        .child(
          S.documentTypeList('skosConceptScheme')
            .title('Concept Schemes')
            .child(id =>
              S.document()
                .schemaType('skosConceptScheme')
                .documentId(id)
                .views([
                  S.view.component(TreeView).title('Tree View'),
                  S.view.form()
                ]) 
            )
      ),
      S.documentTypeListItem("skosConcept").title("Concepts"),
      S.divider(),
      S.listItem()
        .title('Shop')
        .icon(FaShoppingCart)
        .schemaType('shop')
        .child(id => 
            S.documentTypeList('shop')
            .title('Product')
        ),
      S.documentListItem()
        .schemaType('siteSettings')
        .title('Site settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('21987cfd-3189-4b89-82e9-b3df24e1f332')
        ),
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
        (listItem) => !['siteSettings', 'shop', 'staticPages', 'category','skosConcept', 'skosConceptScheme'].includes(listItem.getId())
      )
    ])
