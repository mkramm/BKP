import { defineField } from "sanity";

export default {
  name: 'timelineEntry',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Überschrift' }),
    defineField({ name: 'year', type: 'number', title: 'Jahr' }),
    defineField({ name: 'content', type: 'array', title: 'Inhalt', of: [{ type: 'block' }] }),
    defineField({ name: 'image', type: 'image', title: 'Bild' }),
  ],
}