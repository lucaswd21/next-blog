# Next Blog

Este é um projeto de dashboard para administração de posts de um blog, desenvolvido com **Next.js**, **Tailwind CSS**, **Redux Toolkit**, e **TypeScript**. O projeto inclui funcionalidades de CRUD para gerenciar posts, com suporte a ordenação, paginação, e pesquisa.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)

## Funcionalidades

- **CRUD de Posts**: Criação, edição e exclusão de posts.
- **Ordenação**: Ordenação dos posts por diferentes critérios (ex: título, data de criação).
- **Pesquisa**: Filtragem de posts através de um campo de pesquisa.
- **Paginação**: Navegação através de múltiplas páginas de posts.
- **Responsividade**: Layout adaptado para dispositivos móveis e desktop.
- **Notificações**: Sistema de notificações temporárias para feedback de ações (ex: sucesso, erro).

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **Tailwind CSS**: Framework CSS utilitário para estilização.
- **Redux Toolkit**: Gerenciamento de estado global.
- **Heroicons**: Ícones SVG para botões e outros elementos visuais.
- **TypeScript**: Superset do JavaScript, adicionando tipagem estática.

## Instalação e Execução

### Pré-requisitos

- **Node.js** (>= 14.x)
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/lucas-wd/next-blog.git
   cd next-blog

2. Instale as depedências:

   ```bash
   npm install
    # ou
    yarn install

3. Execução:

   ```bash
   npm run dev
    # ou
    yarn dev

4. Build para produção(remova o strictmode):

   ```bash
   npm run build
    # ou
    yarn build