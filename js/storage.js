//Persistência de recordes com localStorage

import { MAX_RECORDS } from './config.js'

const STORAGE_KEY = 'kagerun_records'

//Retorna a lista de recordes
export const getRecords = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

//Salva uma nova pontuação e retorna se bateu recorde
export const saveScore = (score) => {
  const records = getRecords()
  records.push(score)
  records.sort((a, b) => b - a)           // ordena do maior para o menor
  const trimmed = records.slice(0, MAX_RECORDS)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))

  const isBestScore = trimmed[0] === score && records.indexOf(score) === 0
  return isBestScore
}

//Retorna a melhor pontuação registrada (ou 0 se não houver)
export const getBestScore = () => {
  const records = getRecords()
  return records.length > 0 ? records[0] : 0
}
