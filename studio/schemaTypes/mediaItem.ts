import {defineField} from 'sanity'

// Shared across heroMedia and gallery — supports either an uploaded image
// or a Vimeo embed link, so photos and video clips can mix in one list.
export const mediaItem = {
  type: 'object',
  name: 'mediaItem',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      options: {list: ['image', 'video'], layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo URL',
      type: 'url',
      description: 'Paste the Vimeo share/embed link for this clip.',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'alt',
      title: 'Alt text / caption',
      type: 'string',
      description:
        "Describe what's shown — used for accessibility and readable by AI crawlers.",
    }),
  ],
  preview: {select: {title: 'alt', media: 'image'}},
}
