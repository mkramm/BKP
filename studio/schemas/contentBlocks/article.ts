export default {
    name: 'article',
    type: 'object',
    extends: [{ type: 'contentBlock' }],
    fields: [
      { name: 'Headline', type: 'string', title: 'Überschrift' },
      { name: 'content', type: 'text', title: 'Inhalt' },
    ],
  }
  