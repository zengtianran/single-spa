module.exports = {
    globals: {
        window
    },
    rules: {
        "no-extra-semi": "off",
        "semi-before-function-paren": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: 10,
        parser: '@typescript-eslint/parser',
    }
}
