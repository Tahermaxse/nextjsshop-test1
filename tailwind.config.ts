import type { Config } from 'tailwindcss';

const {
	default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./registry/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			maxWidth: {
				content: '1280px',
				post: '720px',
				'screen-minus-scrollbar': 'calc(100vw - 17px)',
			},
			fontSize: {
				'compact-small-plus': ['13px', '150%'],
				'compact-medium-plus': ['14px', '20px'],
				'xlarge-plus': ['18px', '150%'],
				'compact-xsmall': ['12px', '20px'],
				'compact-large-plus': ['16px', '150%'],

			},
			fontFamily: {
				sans: [
					'General Sans',
					'sans-serif'
				],
				mono: [
					'JetBrains Mono',
					'monospace'
				],
				inter: ['Inter', 'sans-serif'],
			},
			'-webkit-tap-highlight-color': {
				'tap-highlight-transparent': 'transparent'
			},
			screens: {
				xs: '475px',
				'custom': '288px',
			},
			backgroundImage: {
				'loginbg':"url('/images/loginbg.png')",
				'login':"url('https://cdn.prod.website-files.com/66cc2bd703ccf308a49a6188/66e9eaa5aae0bf000ce55162_hero-bg-light.avif')",
				stripes:
					'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC")',
					noise: "url('/images/noise.png')",
					'stripesdark':
        'url("https://docs.medusajs.com/images/bg-stripes-dark.png")',
				'gradient-radial': 'radial-gradient(closest-side, var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at center, var(--tw-gradient-stops))',
				'custom-gradient': 'linear-gradient(90deg, #86efac, #4ade80 50%, #22c55e)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'elevation-card-rest': '0px 0px 0px 1px rgba(0, 0, 0, .08), 0px 1px 2px -1px rgba(0, 0, 0, .08), 0px 2px 4px 0px rgba(0, 0, 0, .04)',
				'elevation-card-hover': '0px 0px 0px 1px rgba(0, 0, 0, .08), 0px 1px 2px -1px rgba(0, 0, 0, .08), 0px 2px 8px 0px rgba(0, 0, 0, .1)',
				'buttons-neutral': '0px 1px 2px 0px rgba(0, 0, 0, .12), 0px 0px 0px 1px rgba(0, 0, 0, .08)',
				'buttons-inverted': 'inset 0px 0.75px 0px 0px hsla(0, 0%, 100%, .2), 0px 1px 2px 0px rgba(0, 0, 0, .4), 0px 0px 0px 1px #18181b',
				'elevation-tooltip':
					'0px 0px 0px 1px rgba(0, 0, 0, .08), 0px 2px 4px 0px rgba(0, 0, 0, .08), 0px 4px 8px 0px rgba(0, 0, 0, .08)',
			},

			colors: {
				'ui-bg-subtle-hover': '#f4f4f5',
				'ui-border-base': '#e4e4e7',
				'theme-border-base': 'rgb(230 232 235 / <alpha-value>)',
				'ui-fg-base': '#18181b',
				'ui-fg-subtle': '#52525b',
				'ui-fg-disabled': '#a1a1aa',
				'ui-fg-muted': '#71717a',
				'ui-button-neutral': '#fff',
				'ui-button-neutral-hover': '#f4f4f5',
				'ui-button-inverted': '#27272a',
				'ui-button-inverted-hover': '#3f3f46',
				'contrast-fg-primary': 'hsla(0, 0%, 100%, .88)',
				'ui-border-strong': '#d4d4d8',

				'ui-bg-component': '#fafafa',
				'ui-button-transparent': 'hsla(0, 0%, 100%, 0)',
				'ui-button-transparent-hover': '#f4f4f5',
				'ui-fg-interactive': '#3b82f6',
				'ui-fg-interactive-hover': '#2563eb',
				white: '#fafafa',
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
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			animation: {
				ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
				'shiny-text': 'shiny-text 8s infinite',
				'accordion-down': 'accordion-down 0.3s ease-out',
				'accordion-up': 'accordion-up 0.3s ease-out'
			},
			aspectRatio: {
				post: '544 / 284',
			},
			translate: {
				'-1/2': '-50%',
			},
			scale: {
				75: '.75',
			},
			keyframes: {
				ripple: {
					'0%, 100%': {
						transform: 'translate(-50%, -50%) scale(1)'
					},
					'50%': {
						transform: 'translate(-50%, -50%) scale(0.9)'
					}
				},
				'shiny-text': {
					'0%, 90%, 100%': {
						'background-position': 'calc(-100% - var(--shiny-width)) 0'
					},
					'30%, 60%': {
						'background-position': 'calc(100% + var(--shiny-width)) 0'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			}
		}
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')({ nocompatible: true }), addVariablesForColors],
};

export default config;


// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}