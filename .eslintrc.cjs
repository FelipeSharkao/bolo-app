module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:solid/typescript",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "ie11", "solid"],
    root: true,
    rules: {
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-import-type-side-effects": "error",
    },
}
