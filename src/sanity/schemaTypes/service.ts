import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'External Image URL',
      type: 'url',
      description: 'Recommended: Use an external image URL (e.g., from Uploadfly)',
      validation: (Rule) => Rule.custom((value, context) => {
        const image = (context.document as any)?.image
        if (!value && !image) {
          return 'Either External Image URL or Upload Image must be provided'
        }
        return true
      }),
    }),
    defineField({
      name: 'image',
      title: 'Upload Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional: Upload an image instead of using external URL',
      validation: (Rule) => Rule.custom((value, context) => {
        const imageUrl = (context.document as any)?.imageUrl
        if (!value && !imageUrl) {
          return 'Either External Image URL or Upload Image must be provided'
        }
        return true
      }),
    }),
    defineField({
      name: 'adjustments',
      title: 'Image Adjustments',
      type: 'string',
      description: 'CSS class for image positioning (e.g., "object-center", "object-top")',
      options: {
        list: [
          { title: 'Center', value: 'object-center' },
          { title: 'Top', value: 'object-top' },
          { title: 'Bottom', value: 'object-bottom' },
        ],
      },
      initialValue: 'object-center',
    }),
    defineField({
      name: 'backgroundPosition',
      title: 'Background Position',
      type: 'string',
      description: 'CSS background position (e.g., "center 35%")',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'products',
      title: 'Products/Services Offered',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'process',
      title: 'Implementation Process',
      type: 'array',
      of: [{ type: 'processStep' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears on the page',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order',
    },
    prepare({ title, media, order }) {
      return {
        title: title,
        subtitle: `Order: ${order}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
