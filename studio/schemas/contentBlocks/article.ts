export default {
  name: 'article',
  type: 'object',
  extends: [{ type: 'contentBlock' }],
  fields: [
    { name: 'Headline', type: 'string', title: 'Überschrift' },
    {
      name: 'content', title: 'Inhalt', type: 'array',
      of: [{ type: 'block' }]
    },
  ],
}
