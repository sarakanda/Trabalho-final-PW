// ui.js — controla toda a interface: HUD, menus e telas

import { getRecords } from './storage.js'

// ── Elementos do DOM ────────────────────────────────
const elScore     = document.getElementById('hud-score')
const elLives     = document.getElementById('hud-lives')
const elPowerup   = document.getElementById('hud-powerup')
const elMenu      = document.getElementById('menu')
const elGame      = document.getElementById('game-screen')
const elGameover  = document.getElementById('gameover-screen')
const elPause     = document.getElementById('pause-overlay')
const elRecords   = document.getElementById('records-list')
const elGOScore   = document.getElementById('gameover-score')
const elGORecord  = document.getElementById('gameover-record')

// ── HUD ─────────────────────────────────────────────
export const updateScore = (score) => {
  elScore.textContent = `Pontos: ${score}`
}

export const updateLives = (lives) => {
  elLives.textContent = '❤ '.repeat(Math.max(lives, 0)).trim()
}

export const showPowerupHud = (label) => {
  elPowerup.textContent = label
}

export const clearPowerupHud = () => {
  elPowerup.textContent = ''
}

// ── Transições de tela ──────────────────────────────
export const showMenu = () => {
  elMenu.classList.remove('hidden')
  elGame.classList.add('hidden')
  elGameover.classList.add('hidden')
  _renderRecords()
}

export const showGame = () => {
  elMenu.classList.add('hidden')
  elGame.classList.remove('hidden')
  elGameover.classList.add('hidden')
}

export const showGameOver = (score, isBest) => {
  elGameover.classList.remove('hidden')
  elGOScore.textContent = `Sua pontuação: ${score}`
  elGORecord.textContent = isBest ? '🏆 Novo recorde!' : `Recorde: ${getRecords()[0] || 0}`
}

export const showPause = () => {
  elPause.classList.remove('hidden')
}

export const hidePause = () => {
  elPause.classList.add('hidden')
}

// ── Recordes no menu ────────────────────────────────
const _renderRecords = () => {
  const records = getRecords()
  if (records.length === 0) {
    elRecords.innerHTML = '<li style="color: rgba(255,255,255,0.3)">Nenhum recorde ainda</li>'
    return
  }
  elRecords.innerHTML = records
    .map((r, i) => `<li>${i + 1}. ${r} pontos</li>`)
    .join('')
}
