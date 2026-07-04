import { Request, Response } from 'express'
import { userService } from '../services/userService'
import { majorService } from '../services/majorService'

// GET /register — exibe formulário de cadastro
export async function registerForm(req: Request, res: Response) {
  res.render('auth/register', { title: 'Criar Conta' })
}

// POST /register — processa o cadastro de um novo usuário
export async function register(req: Request, res: Response) {
  const { name, email, password, confirmPassword } = req.body

  // Validações básicas
  if (!name || !email || !password || !confirmPassword) {
    res.status(400).render('auth/register', {
      title: 'Criar Conta',
      error: 'Todos os campos são obrigatórios.'
    })
    return
  }

  if (password !== confirmPassword) {
    res.status(400).render('auth/register', {
      title: 'Criar Conta',
      error: 'As senhas não coincidem.'
    })
    return
  }

  if (password.length < 6) {
    res.status(400).render('auth/register', {
      title: 'Criar Conta',
      error: 'A senha deve ter pelo menos 6 caracteres.'
    })
    return
  }

  const existingUser = await userService.findByEmail(email)
  if (existingUser) {
    res.status(400).render('auth/register', {
      title: 'Criar Conta',
      error: 'Já existe uma conta cadastrada com este email.'
    })
    return
  }

  const user = await userService.create({
    name,
    email,
    password
  })

  // Loga o usuário automaticamente após o cadastro
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  }

  res.redirect('/')
}

// GET /login — exibe formulário de login
export function loginForm(req: Request, res: Response) {
  res.render('auth/login', { title: 'Login' })
}

// POST /login — processa o login
export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).render('auth/login', {
      title: 'Login',
      error: 'Informe email e senha.'
    })
    return
  }

  const user = await userService.findByEmail(email)
  if (!user) {
    res.status(401).render('auth/login', {
      title: 'Login',
      error: 'Email ou senha inválidos.'
    })
    return
  }

  const passwordMatches = await userService.verifyPassword(password, user.password)
  if (!passwordMatches) {
    res.status(401).render('auth/login', {
      title: 'Login',
      error: 'Email ou senha inválidos.'
    })
    return
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  }

  res.redirect('/')
}

// GET /logout — encerra a sessão do usuário
export function logout(req: Request, res: Response) {
  req.session.destroy(() => {
    res.redirect('/')
  })
}