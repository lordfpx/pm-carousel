// vite.config.js
const path = require("path")

const resolvePath = (absolutePath) => path.resolve(__dirname, absolutePath)

export default {
	build: {
		outDir: "dist",
		lib: {
			entry: resolvePath("./main.js"),
			name: "pm-carousel",
		},
	},
}
