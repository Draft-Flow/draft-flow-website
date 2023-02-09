module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md'],
  theme: {
    extend: {
      colors: {
        'df-black': {
          DEFAULT: '#131319'
        },
        'df-blue': {
          DEFAULT: '#1F3579',
          dark: '#121E44'
        },
        'df-yellow': {
          DEFAULT: '#E8AD14'
        },
        'df-orange':  {
          DEFAULT: '#F85707',
          dark: '#C24D13'
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
        gill: ['Futura', '"Trebuchet MS"', 'Arial', 'sans-serif'],
        script: ['"Brush Script MT"', 'cursive']
      },
    },
  },
  plugins: [],
}
