import { Request, Response } from 'express'
import { gameSessionService } from '../services/gameSessionService'

// GET / — página principal, exibe o jogo (apenas usuários logados)
export function playGame(req: Request, res: Response) {
  res.render('game', { title: 'Jogar', hideLayout: false })
}

// POST /api/scores — salva a pontuação do usuário ao final de uma partida
export async function saveScore(req: Request, res: Response) {
  const { score } = req.body
  const user = req.session.user

  if (!user) {
    res.status(401).json({ success: false, message: 'Usuário não autenticado.' })
    return
  }

  if (typeof score !== 'number' || score < 0 || !Number.isFinite(score)) {
    res.status(400).json({ success: false, message: 'Pontuação inválida.' })
    return
  }

  await gameSessionService.saveScore({ userId: user.id, score: Math.floor(score) })
  res.status(201).json({ success: true })
}

// GET /ranking — página com o top 10 de pontuações
export async function ranking(req: Request, res: Response) {
  const topScores = await gameSessionService.getTopRanking(10)
  res.render('ranking', { title: 'Ranking', topScores })
}
