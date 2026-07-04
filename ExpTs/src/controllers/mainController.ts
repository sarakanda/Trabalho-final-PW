import { Request, Response } from 'express'
import { LoremIpsum } from 'lorem-ipsum'
import { technologies } from '../utils/helpers'

const lorem = new LoremIpsum()

// #2 — Página Sobre
export function about(req: Request, res: Response) {
  res.render('about', { title: 'Sobre' })
}

// #6 — Rota /lorem/:qtd — gera N parágrafos de lorem ipsum
export function loremPage(req: Request, res: Response) {
  const qtdParam = req.params.qtd as string
  const qtd = parseInt(qtdParam, 10)

  if (isNaN(qtd) || qtd <= 0) {
    res.status(400).send('<p>Informe um número inteiro positivo. Exemplo: /lorem/5</p>')
    return
  }

  const paragraphs = Array.from({ length: qtd }, () => {
    const text = lorem.generateParagraphs(1)
    return `<p>${text}</p>`
  }).join('\n')

  res.send(`
    <html>
      <head><title>Lorem Ipsum</title></head>
      <body>
        <h1>${qtd} parágrafo(s) gerado(s)</h1>
        ${paragraphs}
      </body>
    </html>
  `)
}

// #7 — /hb1: imprime uma variável
export function hb1(req: Request, res: Response) {
  res.render('hb1', {
    title: 'hb1',
    message: 'O Kage Run está no ar! 影'
  })
}

// #7 — /hb2: uso do #if
export function hb2(req: Request, res: Response) {
  res.render('hb2', {
    title: 'hb2',
    isLoggedIn: !!req.session.user,
    hasHighScore: false
  })
}

// #7 — /hb3: uso do #each
export function hb3(req: Request, res: Response) {
  res.render('hb3', {
    title: 'hb3',
    obstacles: [
      { icon: '🎋', name: 'Bambu', description: 'no chão, pule por cima' },
      { icon: '🗡', name: 'Kunai', description: 'voa em altura média' },
      { icon: '⬛', name: 'Fosso', description: 'buraco no chão' }
    ]
  })
}

// #8 — /hb4: uso do helper customizado
export function hb4(req: Request, res: Response) {
  res.render('hb4', {
    title: 'hb4',
    technologies
  })
}
