export default defineAppConfig({
  global: {
    picture: {
      dark: '/avatar.jpg',
      light: '/avatar.jpg',
      alt: 'Iván Álvarez'
    },
    meetingLink: 'https://calendar.app.google/mdouT7hy7xS8XUcd9',
    email: 'alvarezlopezivanenrique@gmail.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'zinc',
      neutral: 'neutral',
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Ivan Over Time • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/ivanovertime',
      'target': '_blank',
      'aria-label': 'Iván Álvarez on GitHub'
    }, {
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/ialvarez93/',
      'target': '_blank',
      'aria-label': 'Iván Álvarez on LinkedIn'
    }]
  }
})
