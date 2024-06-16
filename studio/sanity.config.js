import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { colorInput } from "@sanity/color-input";

import schemas from './schemas/schema'
import eventsAction from './actions/events'
import deskStructure from './desk-structure/deskStructure'
import initialValueTemplates from './initial-value-templates'
import Logo from './logo/Logo'

export default defineConfig({
  name: 'default',
  title: 'Draft & Flow',
  projectId: '0y7bneb2',
  dataset: 'production',
  icon: Logo,
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool(),
    colorInput(),
  ],
  tools: (prev, context) => {
    const isAdmin = context.currentUser.roles
      .find(({ name }) => name === 'administrator')
    if (isAdmin) {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
  schema: {
    types: schemas,
    templates: initialValueTemplates
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'settings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
      }
      
      if (schemaType === 'events') {
        return prev.map((originalAction) =>
          originalAction.action === 'publish'
            ? eventsAction(originalAction)
            : originalAction
        )
      }

      return prev
    }
  },
})
