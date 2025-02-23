import { Rule } from 'sanity';

export default {
  name: 'page',
  type: 'document',
  title: 'Seite',
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    {
      name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'blocks',
      type: 'array',
      title: 'Blöcke',
      of: [{ type: 'hero' }, { type: 'article' }, { type: 'contact' }, { type: 'timeline' }],
    },
  ],
}
