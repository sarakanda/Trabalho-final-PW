import { Request, Response, NextFunction } from 'express'

// Middleware que garante que o usuário está autenticado.
// Para rotas de página, redireciona para o login.
// Para rotas de API (prefixo /api), retorna 401 em JSON.
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    if (req.originalUrl.startsWith('/api')) {
      res.status(401).json({ success: false, message: 'Usuário não autenticado.' })
      return
    }
    res.redirect('/login')
    return
  }
  next()
}
