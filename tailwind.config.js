module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'top-lg': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        backOutToBottom: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
      animation: {
        backOutToBottom: 'backOutToBottom 0.8s ease-out forwards',
      },
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
      },
    },
    colors: {
      macDonald: '#FECA42',
      current: '#eb6825',
      paleBlue: '#e5f9fe',
      cyanBlue: '#0093b9',
      lightapricot: '#ffece6',
      coral: '#f47a51',
      gray0: '#cbd5e1',
      success: '#87D068',
      error: '#D92663',
      gray1: '#999',
      gainsboro: '#f6f7f8',
      iceBlue: '#e8ebee',
      lightGray: '#b1b1b1',
      grayish: '#a8abb3',
      misty: '#77798c',
    },
  },
  plugins: [require('flowbite/plugin')],
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
};
