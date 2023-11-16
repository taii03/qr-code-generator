/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				whity: '#F2F5F9',
				primary: '#3662E3',
				secondary: '#4e80ee33',
				'dark-0': '#030617',
				'dark-1': '#111729',
				'dark-2': '#364153',
			},
		},
	},
	plugins: [],
};
