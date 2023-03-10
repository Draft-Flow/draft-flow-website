export default {
  name: 'review',
  type: 'object',
  title: 'Review',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule =>Rule.required()
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      validation: Rule =>Rule.required()
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating',
      validation: Rule => Rule.required().min(0).max(5)
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: Rule =>Rule.required()
    },
    {
      name: 'date',
      type: 'date',
      rows: 1,
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
      validation: Rule =>Rule.required()
    },
  ],
}
