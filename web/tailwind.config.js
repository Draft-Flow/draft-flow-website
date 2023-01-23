module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md'],
  theme: {
    extend: {
      colors: {
        'df-blue': {
          DEFAULT: '#121E44',
          dark: '#121E44'
        },
        'df-tan': {
          lightest: '#FFFCF3',
          light: '#F3F0E8',
          DEFAULT: '#EDEAE0',
          dark: '#B2B0AA',
        },
      },
      backgroundImage: {
        tread: "url('/static/images/bartread.webp')",
        'tread-white': "url('/static/images/bartread-white.webp')",
        email: "url('/static/images/email.webp')",
      },
      backgroundSize: {
        72: '18rem',
        96: '24rem',
      },
      spacing: {
        200: '50rem',
      },
    },
    fontFamily: {
      pg: ['"Jost"', '"Franklin Gothic Medium"', '"Franklin Gothic"', '"ITC Franklin Gothic"', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}
