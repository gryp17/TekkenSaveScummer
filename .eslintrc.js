module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true
	},
	extends: 'airbnb-base',
	globals: {
		__static: true
	},
	plugins: [
		'html'
	],
	'rules': {
		'global-require': 0,
		'import/no-unresolved': 0,
		'no-param-reassign': 0,
		'no-shadow': 0,
		'import/extensions': 0,
		'import/newline-after-import': 0,
		'no-multi-assign': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
   		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'max-len': 0,
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'comma-dangle': ["error", "never"],
		'spaced-comment': 0,
		'import/no-dynamic-require': 0,
		'consistent-return': 0,
		radix: 0,
		'no-labels': 0,
		'no-continue': 0,
		'no-restricted-syntax': 0,
		'guard-for-in': 0,
		'no-plusplus': 0,
		'prefer-destructuring': 0,
		'arrow-body-style': 0,
		'no-unused-vars': ['error', { args: 'none' }],
		'no-param-reassign': ['error', { props: false }],
		'global-require': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'no-underscore-dangle': 0,
		'object-curly-newline': 0,
		'semi': [2, "always"],
		'import/no-extraneous-dependencies': 0
	}
}
