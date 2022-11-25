/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
		require('daisyui')
	],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: ['cupcake']
	}
};
