import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			keyframes: {
				"bg-pos": {
					"0%": {
						backgroundPosition: "10% 10%",
					},
					"25%": {
						backgroundPosition: "90% 10%",
					},
					"50%": {
						backgroundPosition: "90% 90%",
					},
					"100%": {
						backgroundPosition: "10% 10%",
					},
				},
			},
		},
	},
	plugins: [],
};
export default config;
