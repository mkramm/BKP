export default {
  name: 'timelineEntry',
  type: 'object',
  fields: [
    { name: 'year', type: 'number', title: 'Jahr' },
    { name: 'content', type: 'array', title: 'Inhalt', of: [{ type: 'block' }] },
    { name: 'image', type: 'image', title: 'Bild' },
  ],
}