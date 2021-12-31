module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'standard'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 3
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		indent: [2, 'tab'],
		quotes: [2, 'single'],
		semi: [2, 'always'],
		'no-tabs': 0,
		eqeqeq: 0
		// 'no-console': 0
	}
};