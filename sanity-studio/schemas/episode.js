// schemas/episode.js
// GMJ Podcast — Episode document type

export default {
  name: 'episode',
  title: 'Episode',
  type: 'document',
  icon: () => '🎙️',
  fields: [
    {
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(120),
    },
    {
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      validation: Rule => Rule.required().integer().positive(),
    },
    {
      name: 'series',
      title: 'Series / Theme',
      type: 'string',
      description: 'e.g. "Faith Series", "Prayer Week", "Worship Night"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Teaching',    value: 'teaching'    },
          { title: 'Worship',     value: 'worship'     },
          { title: 'Testimony',   value: 'testimony'   },
          { title: 'Counselling', value: 'counselling' },
          { title: 'Prayer',      value: 'prayer'      },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short summary shown under the episode title on the website.',
      validation: Rule => Rule.max(300),
    },
    {
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      description: 'Upload MP3, M4A, or WAV. Max recommended: 150 MB.',
      options: {
        accept: 'audio/*',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Human-readable duration, e.g. "42 min" or "1h 05min"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Feature this episode',
      type: 'boolean',
      description: 'Show this episode in the hero "Latest Episode" card on the podcast page.',
      initialValue: false,
    },
  ],

  // Preview in Sanity Studio
  preview: {
    select: {
      title:  'title',
      num:    'episodeNumber',
      series: 'series',
      cat:    'category',
    },
    prepare({ title, num, series, cat }) {
      const icons = { teaching: '📖', worship: '🎵', testimony: '✨', counselling: '💬', prayer: '🙏' };
      return {
        title:    `Ep ${num} — ${title}`,
        subtitle: `${series} · ${cat}`,
        media:    () => icons[cat] || '🎙️',
      };
    },
  },

  orderings: [
    {
      title: 'Newest First',
      name:  'publishedAtDesc',
      by:    [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Episode Number (Newest)',
      name:  'epNumDesc',
      by:    [{ field: 'episodeNumber', direction: 'desc' }],
    },
  ],
};
