import S from "@sanity/desk-tool/structure-builder"
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

import { FaFile, FaTags } from "react-icons/fa"

const hiddenDocTypes = listItem => !["siteSettings", "staticPages", "category"].includes(listItem.getId())

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
              S.listItem()
                .title('Routes')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.routes')
                ),
              S.listItem()
                .title('Map')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.map')
                ),
              S.listItem()
                .title('Architects')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.architects')
                ),
              S.listItem()
                .title('Resources')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.resources')
                ),
              S.listItem()
                .title('About')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.about')
                ),
              S.listItem()
                .title('Press & Media')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.pressMedia')
                ),
              S.listItem()
                .title('Annual Reports')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.annualReports')
                ),
              S.listItem()
                .title('Categories')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.categories')
                ),
              S.listItem()
                .title('FAQs')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.faqs')
                ),
              S.listItem()
                .title('Outdoor Access')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.outdoorAccess')
                ),
              S.listItem()
                .title('Contact')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.contact')
                ),
              S.listItem()
                .title('Supporters')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.supporters')
                ),
              S.listItem()
                .title('Privacy Policy')
                .icon(FaFile)
                .child(
                  S.document()
                    .schemaType('staticPages')
                    .documentId('staticPages.privacyPolicy')
                )
            ])
        ),
      orderableDocumentListDeskItem({type: 'category', icon: FaTags, title: "Difficulty Ratings" }),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
