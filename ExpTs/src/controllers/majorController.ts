import { Request, Response } from 'express'
import { majorService } from '../services/majorService'

// GET /majors — lista todos os majors
export async function listMajors(req: Request, res: Response) {
  const majors = await majorService.findAll()
  res.render('majors/list', { title: 'Cursos', majors })
}

// GET /majors/new — formulário de criação
export function newMajorForm(req: Request, res: Response) {
  res.render('majors/form', { title: 'Novo Curso' })
}

// POST /majors — cria um novo major
export async function createMajor(req: Request, res: Response) {
  const { name } = req.body

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).render('majors/form', {
      title: 'Novo Curso',
      error: 'O nome do curso é obrigatório.'
    })
    return
  }

  await majorService.create({ name: name.trim() })
  res.redirect('/majors')
}

// GET /majors/:id/edit — formulário de edição
export async function editMajorForm(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10)
  const major = await majorService.findById(id)

  if (!major) {
    res.status(404).send('Curso não encontrado.')
    return
  }

  res.render('majors/form', { title: 'Editar Curso', major })
}

// POST /majors/:id — atualiza um major existente
export async function updateMajor(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10)
  const { name } = req.body

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    res.status(400).send('O nome do curso é obrigatório.')
    return
  }

  await majorService.update(id, { name: name.trim() })
  res.redirect('/majors')
}

// POST /majors/:id/delete — exclui um major (chamado via Ajax)
export async function deleteMajor(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10)

  try {
    await majorService.delete(id)
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao excluir o curso.' })
  }
}
