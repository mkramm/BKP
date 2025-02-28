export default {
  name: 'sitemap',
  type: 'document',
  title: 'Sitemap',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
    },
    {
      name: 'page',
      type: 'reference',
      title: 'Seite',
      to: [{type: 'page'}],
    },
    {
      name: 'children', // For submenus
      type: 'array',
      of: [{type: 'reference', to: [{type: 'sitemap'}]}],
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Icon',
      options: {
        list: ['home', 'calendar', 'info', 'phone', 'music', 'church'],
      },
    },
  ],
}
