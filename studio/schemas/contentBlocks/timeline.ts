export default {
  name: 'timeline',
  type: 'object',
  extends: [{ type: 'contentBlock' }],
  fields: [
    { name: 'Headline', type: 'string', title: 'Überschrift' },
    {
      name: 'entries',
      type: 'array',
      title: 'Einträge',
      of: [{ type: 'timelineEntry' }],
    },
  ],
}
