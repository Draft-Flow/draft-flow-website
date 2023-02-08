module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md'],
  theme: {
    extend: {
      colors: {
        'df-blue': {
          DEFAULT: '#121E44',
          dark: '#121E44'
        },
        'df-yellow': {
          DEFAULT: '#E8AD14'
        },
        'df-orange':  {
          DEFAULT: '#F85707'
        },
        'df-gray': {
          DEFAULT: '#2f2f2f',
          dark: '#282829'
        },
        'df-tan': {
          DEFAULT: '#f0eee3',
          dark: '#EBE8E1',
          darkest: '#B2AC9F'
        },
      },
      backgroundImage: {
      },
      backgroundSize: {
        72: '18rem',
        96: '24rem',
      },
      spacing: {
        200: '50rem',
      },
      fontFamily: {
        df: ['"Roundlane"', '"Franklin Gothic Medium"', '"Franklin Gothic"', '"ITC Franklin Gothic"', 'Arial', 'sans-serif'],
        gill: ['"Gill Sans"', '"Gill Sans MT"', 'Calibri', 'sans-serif']
      },
    },
  },
  plugins: [],
}
