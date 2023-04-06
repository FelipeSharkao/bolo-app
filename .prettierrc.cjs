module.exports = {
    printWidth: 100,
    tabWidth: 4,
    trailingComma: "all",
    singleQuote: false,
    semi: false,
    plugins: [
        require("prettier-plugin-astro"),
        require("@trivago/prettier-plugin-sort-imports"),
        require("prettier-plugin-tailwindcss"),
    ],
    importOrder: ["<THIRD_PARTY_MODULES>", "^@", ".*"],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}
