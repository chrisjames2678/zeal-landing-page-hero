import {defineField, defineType, defineArrayMember} from 'sanity'

/**
 * ZEAL TRIP schema
 * Built from zeal-sanity-field-reference.md + review round 2 (11 changes)
 *
 * Structure:
 *  - internal: object, Section 0 — NEVER queried by the frontend, NEVER in JSON-LD
 *  - everything else: published fields
 *
 * Field groups (tabs in the Studio) mirror the intake template sections.
 */

const STANDARD_FAQS = [
  {_type: 'qa', question: 'Do I need any experience?', type: 'standard'},
  {_type: 'qa', question: 'What makes this different from a normal tour?', type: 'standard'},
  {_type: 'qa', question: 'How many people are in the group?', type: 'standard'},
  {_type: 'qa', question: "What's included in the price?", type: 'standard'},
  {_type: 'qa', question: 'Who is this trip for?', type: 'standard'},
  {_type: 'qa', question: 'When does it run?', type: 'standard'},
  {_type: 'qa', question: 'How do I get there?', type: 'standard'},
]

export default defineType({
  name: 'trip',
  title: 'Trip',
  type: 'document',

  groups: [
    {name: 'internal', title: '0. Internal (not published)'},
    {name: 'identity', title: '1. Core identity'},
    {name: 'edge', title: '2. The Zeal edge'},
    {name: 'facts', title: '3. Practical facts'},
    {name: 'itinerary', title: '4. Day-by-day'},
    {name: 'highlights', title: '5. Highlights & feel'},
    {name: 'faq', title: '6. FAQ'},
    {name: 'testimonials', title: '7. Testimonials'},
    {name: 'meta', title: '8. Meta & freshness'},
  ],

  fields: [
    // ---------- 0. INTERNAL — never published, never in JSON-LD ----------
    defineField({
      name: 'internal',
      title: 'Internal only — NOT published, NOT in JSON-LD',
      type: 'object',
      group: 'internal',
      description:
        'Everything in this box must never be queried by the frontend or emitted in structured data.',
      fields: [
        defineField({name: 'workingName', title: 'Trip working name', type: 'string'}),
        defineField({
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {list: ['live', 'coming soon'], layout: 'radio'},
        }),
        defineField({name: 'sourceNotes', title: 'Source notes', type: 'text'}),
        defineField({name: 'dmcContact', title: 'DMC / partner contact', type: 'text'}),
        defineField({
          name: 'netPricingNotes',
          title: 'Net pricing & cost notes',
          type: 'text',
          description: 'DMC net prices, retail "from" working, exclusions, payment terms. NEVER expose.',
        }),
        defineField({name: 'filledInBy', title: 'Filled in by / date', type: 'string'}),
        defineField({name: 'stillDraft', title: 'Still draft / placeholder', type: 'text'}),
      ],
    }),

    // ---------- 1. CORE IDENTITY ----------
    defineField({
      name: 'tripName',
      title: 'Trip name',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      group: 'identity',
      description: 'The single passion at the heart of the trip, e.g. "Coffee"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'identity',
      description: 'ONE category per trip — what kind of thing this is. From the Zeal Topic Universe.',
      options: {
        list: [
          'Food & Drink',
          'Arts & Crafts',
          'Design',
          'Fashion & Beauty',
          'Music',
          'Performance & Screen',
          'Photography',
          'Writing',
          'Health & Wellness',
          'Outdoors',
          'Sports & Games',
          'Nature & Knowledge',
          'Collecting',
          'Tech & Making',
          'Vehicles',
          'Home & Garden',
          'Spirituality',
          'Business',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experienceTags',
      title: 'Experience tags',
      type: 'array',
      group: 'identity',
      description:
        'Characteristics of HOW the trip works (not what it\'s about — that\'s Category). Pick all that apply. Keep wording consistent across trips — maps to schema.org keywords.',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Immersive', value: 'immersive'},
          {title: 'Hands-on / active', value: 'hands-on'},
          {title: 'Expert-led', value: 'expert-led'},
          {title: 'Small-group', value: 'small-group'},
          {title: 'Behind-the-scenes / privileged access', value: 'privileged-access'},
          {title: 'At-source / origin', value: 'at-source'},
          {title: 'Learning / skill-building', value: 'skill-building'},
        ],
      },
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'object',
      group: 'identity',
      description:
        'Stops = the towns/cities/regions visited, in order. A single-destination trip is a list of one; a route (e.g. Bogotá → Medellín) is a list of several.',
      fields: [
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
        defineField({
          name: 'stops',
          title: 'Stops (towns / cities / regions, in order)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'stop',
              fields: [
                defineField({name: 'name', title: 'Name', type: 'string'}),
                defineField({name: 'region', title: 'Region (optional)', type: 'string'}),
                defineField({
                  name: 'lat',
                  title: 'Latitude',
                  type: 'number',
                  description:
                    'Only needed for stops shown on the route map — typically overnight-stop locations, not every specific place visited.',
                }),
                defineField({
                  name: 'lng',
                  title: 'Longitude',
                  type: 'number',
                }),
              ],
              preview: {select: {title: 'name', subtitle: 'region'}},
            }),
          ],
        }),
        defineField({
          name: 'specificPlaces',
          title: 'Specific places visited (attractions / venues)',
          type: 'array',
          description:
            'The venues within those stops — farms, museums, labs, studios. Different from Stops: this is what you visit, not where you stay.',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'whyThisDestination',
      title: 'Why this destination',
      type: 'array',
      group: 'identity',
      of: [defineArrayMember({type: 'block'})],
      description: 'Why HERE and nowhere else — ideally the highest level in the world for this subject.',
    }),
    defineField({
      name: 'oneLineSummary',
      title: 'One-line summary',
      type: 'text',
      rows: 2,
      group: 'identity',
      description:
        'Your answer-first snippet. Keep it short, literal, and standalone — the sentence most likely to be quoted whole. Should make sense with zero surrounding context.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'identity',
      options: {source: 'tripName', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    // ---------- 2. THE ZEAL EDGE ----------
    defineField({
      name: 'whoYouLearnFrom',
      title: 'Who you learn from',
      type: 'array',
      group: 'edge',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'expert',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'credentials', title: 'Credentials / role', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'credentials'}},
        }),
      ],
    }),
    defineField({
      name: 'privilegedAccess',
      title: 'Privileged access',
      type: 'array',
      group: 'edge',
      of: [defineArrayMember({type: 'block'})],
      description: "Exactly what a guest gets that an ordinary enthusiast/tourist could NOT buy themselves.",
    }),
    defineField({
      name: 'whatYouDo',
      title: 'What you do',
      type: 'array',
      group: 'edge',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'whatYoullLeaveAbleToDo',
      title: "What you'll leave able to do",
      type: 'text',
      group: 'edge',
    }),
    defineField({
      name: 'skillsAndTechniques',
      title: 'Skills & techniques you\'ll practice',
      type: 'array',
      group: 'edge',
      of: [defineArrayMember({type: 'string'})],
      description: 'e.g. "Cupping & scoring", "Fermentation & processing". Answers "where can I learn to [X]".',
    }),

    // ---------- 3. PRACTICAL FACTS ----------
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'object',
      group: 'facts',
      fields: [
        defineField({name: 'days', title: 'Days', type: 'number'}),
        defineField({name: 'nights', title: 'Nights', type: 'number'}),
      ],
    }),
    defineField({
      name: 'groupSize',
      title: 'Group size',
      type: 'object',
      group: 'facts',
      fields: [
        defineField({name: 'min', title: 'Min', type: 'number'}),
        defineField({name: 'max', title: 'Max', type: 'number'}),
      ],
    }),
    defineField({name: 'whoItsFor', title: "Who it's for / level", type: 'text', group: 'facts'}),
    defineField({name: 'whoItsNotFor', title: "Who it's NOT for", type: 'text', group: 'facts'}),
    defineField({
      name: 'physicalLevel',
      title: 'Physical level / pace',
      type: 'string',
      group: 'facts',
      options: {list: ['easy', 'moderate', 'challenging'], layout: 'radio'},
    }),
    defineField({
      name: 'accommodationComfort',
      title: 'Accommodation comfort level',
      type: 'string',
      group: 'facts',
      options: {list: ['basic', 'standard', 'upgraded'], layout: 'radio'},
    }),
    defineField({
      name: 'priceFrom',
      title: 'Price from (retail — NOT net)',
      type: 'object',
      group: 'facts',
      fields: [
        defineField({name: 'amount', title: 'Amount', type: 'number'}),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {list: ['GBP', 'USD', 'EUR']},
        }),
      ],
    }),
    defineField({
      name: 'singleSupplement',
      title: 'Single supplement (solo traveller surcharge)',
      type: 'object',
      group: 'facts',
      description: 'Kept separate from Optional extras — it\'s a near-universal, financially significant cost.',
      fields: [
        defineField({name: 'amount', title: 'Amount', type: 'number'}),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {list: ['GBP', 'USD', 'EUR']},
        }),
      ],
    }),
    defineField({
      name: 'departures',
      title: 'Confirmed dates / departures',
      type: 'array',
      group: 'facts',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'departure',
          fields: [
            defineField({name: 'startDate', title: 'Start date', type: 'date'}),
            defineField({name: 'endDate', title: 'End date', type: 'date'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'season',
      title: 'Season (placeholder until dates are confirmed)',
      type: 'string',
      group: 'facts',
      description:
        'Use this only when you don\'t have real departure dates yet, e.g. "Low Season 2027". Once dates are confirmed, use Departures above instead.',
    }),
    defineField({
      name: 'whyThisSeason',
      title: 'Why this season / what\'s happening then',
      type: 'text',
      group: 'facts',
      description:
        'The qualitative reason this timing matters, tied to the subject — e.g. "harvest season, when farms are picking and processing". Separate from Season above: this is the reason, that is the placeholder date.',
    }),
    defineField({
      name: 'startPoint',
      title: 'Start point (hotel / meeting point)',
      type: 'string',
      group: 'facts',
      description: 'Be explicit — name the actual hotel or meeting point, not just a city.',
    }),
    defineField({
      name: 'endPoint',
      title: 'End point (hotel / meeting point)',
      type: 'string',
      group: 'facts',
      description: 'Be explicit — name the actual hotel or meeting point, not just a city.',
    }),
    defineField({
      name: 'arrivalAirport',
      title: 'Arrival airport (nearest to start)',
      type: 'string',
      group: 'facts',
    }),
    defineField({
      name: 'departureAirport',
      title: 'Departure airport (nearest to end)',
      type: 'string',
      group: 'facts',
      description: 'Often the same as arrival airport, but not always — e.g. a route trip.',
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      group: 'facts',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      group: 'facts',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'optionalExtras',
      title: 'Optional extras (trip-level)',
      type: 'array',
      group: 'facts',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'extra',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'price', title: 'Price (optional)', type: 'string'}),
          ],
        }),
      ],
    }),

    // ---------- 4. DAY-BY-DAY ITINERARY ----------
    defineField({
      name: 'itinerary',
      title: 'Day-by-day itinerary',
      type: 'array',
      group: 'itinerary',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'day',
          fields: [
            defineField({name: 'dayNumber', title: 'Day number', type: 'number', validation: (Rule) => Rule.required()}),
            defineField({name: 'title', title: 'Day title', type: 'string'}),
            defineField({
              name: 'whatHappens',
              title: 'What happens',
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
            }),
            defineField({name: 'accommodation', title: 'Accommodation', type: 'string'}),
            defineField({
              name: 'meals',
              title: 'Meals included',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              options: {list: ['B', 'L', 'D']},
            }),
            defineField({name: 'travelTime', title: 'Travel / transfer time', type: 'string'}),
            defineField({
              name: 'inclusions',
              title: 'Inclusions (this day)',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              description: 'What\'s covered specifically on this day, if worth calling out separately from the trip-level list.',
            }),
            defineField({
              name: 'optionalExtras',
              title: 'Optional extras (this day)',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              description: 'e.g. optional biking / birdwatching available this day only.',
            }),
          ],
          preview: {
            select: {dayNumber: 'dayNumber', title: 'title'},
            prepare({dayNumber, title}) {
              return {title: `Day ${dayNumber ?? '?'} — ${title ?? 'untitled'}`}
            },
          },
        }),
      ],
    }),

    // ---------- 5. HIGHLIGHTS & FEEL ----------
    defineField({
      name: 'tripHighlights',
      title: 'Trip highlights',
      type: 'array',
      group: 'highlights',
      of: [defineArrayMember({type: 'string'})],
      description: '4–6 short, concrete standout moments.',
    }),
    defineField({
      name: 'heroFeel',
      title: 'Hero / feel of the trip',
      type: 'text',
      group: 'highlights',
    }),
    defineField({
      name: 'notableDataPoints',
      title: 'Notable data points',
      type: 'array',
      group: 'highlights',
      of: [defineArrayMember({type: 'string'})],
      description:
        '3–6 short, scannable, trip-specific stats an AI can lift as a block, e.g. "5th-generation producers", "1,650m altitude", "exports to 60+ countries".',
    }),
    defineField({
      name: 'comparedTo',
      title: 'Compared to',
      type: 'string',
      group: 'highlights',
      description:
        'State the baseline ONCE, e.g. "a typical small-group adventure tour in Colombia". Each row below then reads as: aspect / [this baseline] / this Zeal trip.',
    }),
    defineField({
      name: 'howThisCompares',
      title: 'How this compares',
      type: 'array',
      group: 'highlights',
      description: 'Same substance as "what makes this different" in the FAQ, reshaped as a two-column comparison table against "Compared to" above.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'comparisonRow',
          fields: [
            defineField({
              name: 'aspect',
              title: 'Aspect',
              type: 'string',
              description:
                'Internal organising label only — confirmed NOT to be rendered on the frontend. Kept here to help whoever fills in Sanity understand what each comparison row is about.',
            }),
            defineField({name: 'typicalTour', title: 'Typical (per "Compared to")', type: 'string'}),
            defineField({name: 'zealTrip', title: 'This Zeal trip', type: 'string'}),
          ],
        }),
      ],
    }),

    // ---------- 6. FAQ ----------
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'faq',
      description:
        'Highest-weighted field for AI citation in this schema — do not dilute. The 7 standard questions are pre-populated on a new trip; add 3–5 trip-specific ones below them.',
      initialValue: STANDARD_FAQS,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'qa',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {list: ['standard', 'trip-specific']},
            }),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),

    // ---------- 7. TESTIMONIALS & RATING ----------
    defineField({
      name: 'overallRating',
      title: 'Overall rating',
      type: 'number',
      group: 'testimonials',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'guestQuotes',
      title: 'Guest quotes',
      type: 'array',
      group: 'testimonials',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'quote',
          fields: [
            defineField({name: 'quote', title: 'Quote', type: 'text'}),
            defineField({name: 'name', title: 'Guest name', type: 'string'}),
          ],
        }),
      ],
    }),

    // ---------- 8. META & FRESHNESS ----------
    defineField({name: 'metaTitle', title: 'Meta title', type: 'string', group: 'meta'}),
    defineField({name: 'metaDescription', title: 'Meta description', type: 'text', group: 'meta'}),
    defineField({
      name: 'lastReviewed',
      title: 'Last reviewed',
      type: 'datetime',
      group: 'meta',
      description:
        'Set manually when you\'ve actually fact-checked this trip — not on every edit. Feeds JSON-LD dateModified.',
    }),
  ],

  preview: {
    select: {title: 'tripName', subtitle: 'internal.status', subject: 'subject'},
    prepare({title, subtitle, subject}) {
      return {
        title: title || 'Untitled trip',
        subtitle: [subject, subtitle].filter(Boolean).join(' · '),
      }
    },
  },
})
