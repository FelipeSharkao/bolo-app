module.exports = {
    printWidth: 100,
    tabWidth: 4,
    trailingComma: "all",
    singleQuote: false,
    semi: false,
    importOrder: ["^@/", "^\\."],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    plugins: [
        "prettier-plugin-astro",
        "@trivago/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
}
