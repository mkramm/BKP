import {Rule, defineField} from 'sanity'

type HeroFields = {
  title?: string
  titleImage?: string
  subtitle?: string
  image?: string
}

export default {
  name: 'hero',
  type: 'object',
  extends: [{type: 'contentBlock'}],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titel',
      readOnly: ({value, parent}) => !value && parent?.titleImage !== undefined,
    }),
    defineField({
      name: 'titleImage',
      type: 'image',
      title: 'Titelbild',
      readOnly: ({value, parent}) => !value && parent?.title !== undefined,
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && (context?.parent as HeroFields)?.title !== undefined) {
            return 'Only in-person events can have a venue'
          }
    
          return true
        }),
    }),
    defineField({name: 'subtitle', type: 'string', title: 'Untertitel'}),
    defineField({name: 'image', type: 'image', title: 'Bild'}),
  ],
  validation: (Rule: Rule) =>
    Rule.custom((fields: HeroFields) => {
      if (fields.title && fields.titleImage) {
        return 'Es darf nur entweder Titel oder Bild angegeben werden, nicht beides.'
      }
      return true
    }),
}
