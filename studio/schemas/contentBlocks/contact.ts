export default {
    name: 'contact',
    type: 'object',
    extends: [{ type: 'contentBlock' }],
    fields: [
      { name: 'email', type: 'string', title: 'E-Mail' },
      { name: 'phone', type: 'string', title: 'Telefon' },
    ],
  }
  