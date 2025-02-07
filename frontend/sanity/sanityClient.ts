// frontend/utils/sanityClient.ts
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lejqr88f',
  dataset: 'bkp_production',
  apiVersion: '2023-04-01',
  useCdn: false,
})

export default client