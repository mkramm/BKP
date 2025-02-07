export default {
    name: 'hero',
    type: 'object',
    extends: [{ type: 'contentBlock' }],
    fields: [
      { name: 'title', type: 'string', title: 'Titel' },
      { name: 'subtitle', type: 'string', title: 'Untertitel' },
      { name: 'image', type: 'image', title: 'Bild' },
    ],
  }
  