import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import { engine } from 'express-handlebars'
import path from 'path'

import { validateEnv } from './utils/validateEnv'
import { logger } from './middlewares/logger'
import { router } from './router/router'
import { handlebarsHelpers } from './utils/helpers'
import type {} from './types/express-session'

const env = validateEnv()

const app = express()

// ── View engine (Handlebars) ────────────────────────
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: handlebarsHelpers
  })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// ── Middlewares globais ──────────────────────────────
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 4 } // 4 horas
  })
)

// Disponibiliza o usuário logado para todas as views automaticamente
app.use((req, res, next) => {
  res.locals.user = req.session.user || null
  next()
})

app.use(logger(env.NODE_ENV === 'production' ? 'simple' : 'full'))

// ── Rotas ────────────────────────────────────────────
app.use('/', router)

app.listen(env.PORT, () => {
  console.log(`Servidor rodando em http://localhost:${env.PORT}`)
})
