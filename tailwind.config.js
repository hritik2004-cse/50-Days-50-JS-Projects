import tailwindcssAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'glow-slow': 'glow 3s ease-in-out infinite',
  			'glow-slow-delayed': 'glow 3s ease-in-out infinite 1.5s',
  			'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
  			'pulse-glow-delayed': 'pulse-glow 4s ease-in-out infinite 2s'
  		},
  		keyframes: {
  			glow: {
  				'0%, 100%': {
  					opacity: '0.4',
  					transform: 'scale(1)',
  					filter: 'blur(48px)'
  				},
  				'50%': {
  					opacity: '0.8',
  					transform: 'scale(1.1)',
  					filter: 'blur(56px)'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					opacity: '0.3',
  					transform: 'scale(0.95)',
  					filter: 'blur(40px) brightness(1)'
  				},
  				'50%': {
  					opacity: '0.9',
  					transform: 'scale(1.15)',
  					filter: 'blur(60px) brightness(1.2)'
  				}
  			}
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}