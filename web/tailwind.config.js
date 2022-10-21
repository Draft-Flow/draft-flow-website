module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md'],
  theme: {
    extend: {
      colors: {
        'pg-lime': {
          DEFAULT: '#99BF10',
          dark: '#293304'
        },
        'pg-blue': {
          DEFAULT: '#049DE0',
          dark: '#012433'
        },
        'pg-green': {
          DEFAULT: '#0D892D',
          dark: '#053311'
        },
        'pg-tan': {
          lightest: '#FFFCF3',
          light: '#F3F0E8',
          DEFAULT: '#EDEAE0',
          dark: '#B2B0AA'
        }
      },
      backgroundImage: {
        'tread': "url('/static/images/bartread.webp')",
        'tread-white': "url('/static/images/bartread-white.webp')",
        'email': "url('/static/images/email.webp')",
      },
      backgroundSize: {
        '72': '18rem',
        '96': '24rem'
      },
      spacing: {
        '200': '50rem',
      }
    },
    fontFamily: {
      'pg': ['"Jost"', 'sans-serif']
    }
  },
  plugins: [],
}
