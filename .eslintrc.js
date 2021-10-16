module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'prettier'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: ['prettier'],
    rules: {
        'no-debugger': 'off',
        'comma-dangle': [2, 'never'],
        'space-before-function-paren': ['warn', 'never']
    }
};
