export default {
  name: 'page',
  type: 'document',
  title: 'Seite',
  fields: [
    {name: 'title', type: 'string', title: 'Titel'},
    {name: 'slug', type: 'slug', title: 'Slug'},
    {
      name: 'blocks',
      type: 'array',
      title: 'Blöcke',
      of: [{type: 'hero'}, {type: 'article'}, {type: 'contact'}],
    },
    {
      name: 'darkMode',
      type: 'boolean',
      title: 'Dark Mode',
      description: 'Soll die Seite im Dark Mode angezeigt werden?',
    },
  ],
}
