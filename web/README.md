# React + TypeScript + Vite

# Bibliotecas Baixadas
- Tailwind Css
- Shadcn/ui
- Prettier com Eslint (config da Rocketseat)
- React Router DOM 
- Helmet (SEO)

## Configuração ESLINT (Rocketset) + Prettier
 Primeire rode o comando `npm i eslint @rocketseat/eslint-config -D` e com isso no arquivo .eslintrc.json, cole o comando: <br>
 `"extends": ["@rocketseat/eslint-config/react"],`

 TailwindCss com Prettier: `npm install -D prettier prettier-plugin-tailwindcss`
 <br>
 crie o arquivo prettier.config.cjs com o seguinte código dentro: <br>
 `module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
}`

Use o eslint-plugin-simple-import-sort
`npm install --save-dev eslint-plugin-simple-import-sort`
<br>Cole no arquivo .eslintrc.json: <br>
` "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },`