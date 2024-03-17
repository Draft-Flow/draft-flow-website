module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md', './src/**/*.html', './src/utils/shortcodes/**/*.js', './src/utils/serializers.js', './src/_data/**/*.js'],
  theme: {
    extend: {
      colors: {
        'df-black': {
          DEFAULT: '#131319',
          light: '#333333'
        },
        'df-blue': {
          DEFAULT: '#1F3579',
          dark: '#121E44',
          light: '#2A3C77'
        },
        'df-yellow': {
          DEFAULT: '#E8AD14'
        },
        'df-orange':  {
          DEFAULT: '#F85707',
          dark: '#C24D13',
          xdark: '#A14010'
        },
        'df-gray': {
          DEFAULT: '#2f2f2f',
          dark: '#282829',
          light: '#636363'
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
        df: ['Norwester', 'Arial', 'sans-serif'],
        'df-sans': ['Overpass', 'sans-serif'],
        script: ['Yellowtail', '"Brush Script MT"', 'cursive']
      },
    },
  },
  plugins: [],
}
