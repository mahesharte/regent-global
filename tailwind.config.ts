import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

const rem = (px: number) => `${px/16}rem`

const gradients = {
  'r-gradient': 'linear-gradient(90deg, #0D3E62 0%, #AD1C44 100%)',
  'r-gradient-transparent': 'linear-gradient(90deg, #0D3E62 0%, #AD1C44 50.57%, rgba(173, 28, 68, 0.00) 77.17%)'
}

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sanity/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'serif']
    },
    extend: {
      colors: {
        blue: '#0d3e62',
        red: '#ac1c44'
      },
      textUnderlineOffset: {
        10: '10px'
      },
      fontSize: {
        'hero': [rem(78), {
          lineHeight: `${96/78}`,
          fontWeight: 900
        }]
      },
      backgroundImage: {
        ...gradients
      },
      backgroundColor: {
        ...gradients
      }
    },
  },
  plugins: [
    forms,
    typography
  ],
} satisfies Config
export default config
