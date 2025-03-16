# Formulário - Aplicação Next.js

Este é um projeto desenvolvido com Next.js, React e Tailwind CSS.

## Requisitos

- Node.js (versão recomendada: 18.x ou superior)
- npm, yarn ou pnpm

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd formulario
```

2. Instale as dependências:

Com npm:
```bash
npm install
```

Com yarn:
```bash
yarn
```

Com pnpm:
```bash
pnpm install
```

## Executando a aplicação

### Ambiente de desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

### Build para produção

Para criar uma versão otimizada para produção:

```bash
npm run build
# ou
yarn build
# ou
pnpm build
```

### Executando em produção

Após gerar o build, você pode iniciar o servidor de produção:

```bash
npm run start
# ou
yarn start
# ou
pnpm start
```

## Estrutura do projeto

- `/app` - Contém as páginas e rotas da aplicação
- `/components` - Componentes reutilizáveis
- `/lib` - Utilitários e funções auxiliares
- `/public` - Arquivos estáticos
- `/styles` - Estilos globais

## Tecnologias utilizadas

- Next.js 15
- React 19
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod (validação)
- TypeScript 