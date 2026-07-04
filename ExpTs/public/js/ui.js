// ui.js — controla toda a interface: HUD, menus e telas

// ── Elementos do DOM ────────────────────────────────
const elScore     = document.getElementById('hud-score')
const elLives     = document.getElementById('hud-lives')
const elPowerup   = document.getElementById('hud-powerup')
const elMenu      = document.getElementById('menu')
const elGame      = document.getElementById('game-screen')
const elGameover  = document.getElementById('gameover-screen')
const elPause     = document.getElementById('pause-overlay')
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
}

export const showGame = () => {
  elMenu.classList.add('hidden')
  elGame.classList.remove('hidden')
  elGameover.classList.add('hidden')
}

// isSaved indica se a pontuação já foi salva no servidor (via Ajax)
export const showGameOver = (score, isSaved) => {
  elGameover.classList.remove('hidden')
  elGOScore.textContent = `Sua pontuação: ${score}`
  elGORecord.textContent = isSaved
    ? '✅ Pontuação salva no seu ranking!'
    : '⚠ Não foi possível salvar sua pontuação.'
}

export const showPause = () => {
  elPause.classList.remove('hidden')
}

export const hidePause = () => {
  elPause.classList.add('hidden')
}
