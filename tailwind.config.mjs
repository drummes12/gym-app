/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				dseg14: ['DSEG14 Classic', 'sans-serif'],
			}
		},
	},
	plugins: [],
}
