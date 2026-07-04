# Kage Run — Aplicação Web (Parte 2)

Aplicação Web em **Express + TypeScript + Prisma** que permite jogar o
endless runner **Kage Run** (desenvolvido na Parte 1), com sistema de
contas de usuário, login e ranking de pontuações.

## ⚠️ Passo obrigatório antes de rodar

Este projeto foi desenvolvido em um ambiente sem acesso à internet para
baixar os *engines* binários do Prisma. **Antes de rodar pela primeira
vez**, execute na raiz do projeto:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
```

Isso vai gerar o Prisma Client e criar o banco SQLite (`dev.db`) com as
tabelas `majors`, `users` e `game_sessions`.

## 🎨 Assets do jogo — placeholders

Os seguintes arquivos são **placeholders temporários** (formas simples/
sons silenciosos), pois os assets originais (sprites e sons do jogo)
não estavam disponíveis neste ambiente. Substitua pelos arquivos reais
do jogo, mantendo os mesmos nomes/caminhos:

- `public/assets/run_0.png`, `run_1.png`, `run_2.png` — sprites do ninja
- `public/assets/sounds/jump.wav`, `hit.wav`, `powerup.wav`, `gameover.wav`
- `public/img/kagerun-screenshot.png`, `ninja-icon.png` — imagens da página About

## Como rodar

```bash
# Ambiente de desenvolvimento (hot reload com nodemon)
npm run start

# Gerar build de produção (transpila TS para /build)
npm run deploy

# Rodar a versão de produção já transpilada
npm run start:prod
```

A aplicação sobe por padrão em `http://localhost:3000`.

## Popular a tabela de cursos (Majors)

Antes de criar contas de usuário, é preciso ter ao menos um curso
cadastrado. Você pode:

1. Acessar `http://localhost:3000/majors/new` e cadastrar manualmente, ou
2. Usar o Prisma Studio: `npx prisma studio`

## Estrutura do projeto

```
kagerun-web/
├── prisma/
│   └── schema.prisma        # Modelos Major, User, GameSession
├── public/
│   ├── css/                 # style.css (gerado por SASS) + game.css
│   ├── js/                  # Código do jogo (adaptado para Ajax)
│   ├── img/                 # Imagens da página About
│   └── assets/               # Sprites e sons do jogo
├── src/
│   ├── controllers/         # mainController, authController, majorController, gameController
│   ├── services/            # majorService, userService, gameSessionService
│   ├── middlewares/         # logger, requireAuth
│   ├── router/               # router.ts — todas as rotas centralizadas
│   ├── scss/                 # main.scss — fonte do SASS
│   ├── types/                 # DTOs e extensão de tipos de sessão
│   ├── utils/                 # validateEnv, prisma (singleton), helpers (Handlebars)
│   ├── views/                 # Templates Handlebars (layout + páginas)
│   └── index.ts               # Bootstrap da aplicação
├── .env.example
├── nodemon.json
├── tsconfig.json
└── package.json
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário:

| Variável         | Descrição                                       |
|------------------|--------------------------------------------------|
| `NODE_ENV`       | `development` ou `production`                    |
| `PORT`           | Porta do servidor Express                         |
| `LOGS_PATH`      | Caminho do arquivo de log de acessos              |
| `SESSION_SECRET` | Segredo usado para assinar o cookie de sessão     |
| `DATABASE_URL`   | Connection string do banco (SQLite por padrão)    |

## Rotas principais

| Rota                  | Método | Descrição                                      | Protegida? |
|------------------------|--------|-------------------------------------------------|------------|
| `/`                    | GET    | Página do jogo                                  | ✅ Login   |
| `/api/scores`          | POST   | Salva a pontuação da partida (Ajax)             | ✅ Login   |
| `/ranking`              | GET    | Top 10 pontuações                               | ❌         |
| `/about`                | GET    | Sobre o jogo                                    | ❌         |
| `/register`             | GET/POST | Cadastro de usuário                           | ❌         |
| `/login`                | GET/POST | Login                                         | ❌         |
| `/logout`               | GET    | Encerra a sessão                                | ❌         |
| `/majors`               | GET    | Lista de cursos (CRUD)                          | ❌         |
| `/lorem/:qtd`           | GET    | Gera N parágrafos de lorem ipsum                | ❌         |
| `/hb1`, `/hb2`, `/hb3`, `/hb4` | GET | Exemplos de uso do Handlebars           | ❌         |
