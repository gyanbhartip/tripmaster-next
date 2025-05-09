/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ['prettier-plugin-tailwindcss'],
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    printWidth: 80,
};

export default config;
