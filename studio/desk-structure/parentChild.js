import { useDocumentStore } from 'sanity'
import {map} from 'rxjs/operators'
import {FaTags, FaTag} from 'react-icons/fa'


export default function parentChild(S, documentStore, schemaType = 'category') {
  const categoryParents = `_type == "${schemaType}" && !defined(parent) && !(_id in path("drafts.**"))`
  const views = [S.view.form()]

  return S.listItem(schemaType)
    .title('Categories')
    .icon(FaTags)
    .child(() =>
      documentStore.listenQuery(`*[${categoryParents}]`).pipe(
        map((parents) =>
          S.list()
            .title('All Categories')
            .menuItems([
              S.menuItem()
                .title('Add Category')
                .icon(FaTag)
                .intent({type: 'create', params: {type: schemaType}}),
            ])
            .items([
              S.listItem()
                .title('Parent Categories')
                .schemaType(schemaType)
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType)
                    .title('Parent Categories')
                    .filter(categoryParents)
                    .canHandleIntent(() => S.documentTypeList(schemaType).getCanHandleIntent())
                    .child((id) => S.document().documentId(id).views(views).schemaType(schemaType))
                ),
              S.divider(),
              ...parents.map((parent) =>
                S.listItem({
                  id: parent._id,
                  title: parent.title,
                  schemaType,
                  child: () =>
                    S.documentTypeList(schemaType)
                      .title('Child Categories')
                      .filter(`_type == "${schemaType}" && parent._ref == $parentId`)
                      .params({parentId: parent._id})
                      .initialValueTemplates([
                        S.initialValueTemplateItem('category-child', {
                          parentId: parent._id,
                        }),
                      ]),
                })
              ),
            ])
        )
      )
    )
}
