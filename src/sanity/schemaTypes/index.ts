import { type SchemaTypeDefinition } from 'sanity'
import { service } from './service'
import { processStep } from './processStep'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [service, processStep],
}
