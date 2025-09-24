import { Block } from 'payload'
import { HeroBlock } from './HeroBlock'
export const ExtendedBlock: Block = {
  slug: 'extendedBlock',
  fields: [
    ...HeroBlock.fields,
    {
      name: 'special',
      type: 'text',
    },
  ],
}
