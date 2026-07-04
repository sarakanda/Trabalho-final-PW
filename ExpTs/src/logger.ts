import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'

export type LogFormat = 'simple' | 'full'

// Middleware factory: recebe o formato do log ('simple' ou 'full')
// e retorna o middleware configurado.
//
// Formato simples: hora do acesso, URL e método HTTP.
// Formato completo: os dados acima + versão do protocolo HTTP + User-Agent.
export function logger(format: LogFormat = 'simple') {
  const logsPath = process.env.LOGS_PATH || 'logs/access.log'
  const resolvedPath = path.resolve(process.cwd(), logsPath)

  // Garante que o diretório de logs existe
  const dir = path.dirname(resolvedPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString()
    const { method, originalUrl, httpVersion, headers } = req

    let logLine = `[${timestamp}] ${method} ${originalUrl}`

    if (format === 'full') {
      const userAgent = headers['user-agent'] || 'desconhecido'
      logLine += ` HTTP/${httpVersion} "${userAgent}"`
    }

    logLine += '\n'

    fs.appendFile(resolvedPath, logLine, (err) => {
      if (err) console.error('Erro ao escrever no arquivo de log:', err)
    })

    next()
  }
}
