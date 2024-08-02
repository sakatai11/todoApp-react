module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"airbnb-typescript",
		"plugin:import/typescript",
		"prettier",
		"plugin:react/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.app.json",
		extraFileExtensions: [".md", ".json"],
	},
	plugins: [
		"react-refresh",
		"react-hooks",
		"@typescript-eslint",
		"prettier",
		"import",
	],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		semi: [2, "always"],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/triple-slash-reference": "off",
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				ts: "never",
				tsx: "never",
			},
		],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
