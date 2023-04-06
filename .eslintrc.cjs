module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:solid/typescript",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "ie11", "solid"],
    root: true,
}
