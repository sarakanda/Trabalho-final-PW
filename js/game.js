// game.js — orquestrador principal do jogo

import { DIFFICULTIES, POINTS_PER_SECOND, POWERUP_DURATION } from './config.js'
import { world } from './world.js'
import { player } from './player.js'
import {
  initObstacles, moveObstacles, getObstacles,
  removeOffScreenObstacles, clearObstacles, updateObstacleSpeed
} from './obstacles.js'
import {
  initPowerups, trySpawnPowerup, movePowerups, getPowerups,
  removeOffScreenPowerups, removePowerup, clearPowerups,
  activateSlow, getSlowFactor, updatePowerupSpeed, getPowerupLabel
} from './powerups.js'
import { checkCollisionWithList } from './collision.js'
import { saveScore } from './storage.js'
import { playSound } from './audio.js'
import {
  updateScore, updateLives, showPowerupHud, clearPowerupHud,
  showMenu, showGame, showGameOver, showPause, hidePause
} from './ui.js'

// ── Estado ──────────────────────────────────────────
let state = 'menu'
let score = 0
let speed = 0
let loopId = null
let selectedDifficulty = 'medium'

// ── Bootstrap — espera o DOM estar pronto ───────────
document.addEventListener('DOMContentLoaded', () => {
  player.init()
  showMenu()
  _bindMenuEvents()
})

function _bindMenuEvents() {
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'))
      btn.classList.add('selected')
      selectedDifficulty = btn.dataset.diff
    })
  })

  document.getElementById('btn-start').addEventListener('click', startGame)
  document.getElementById('btn-resume').addEventListener('click', resumeGame)
  document.getElementById('btn-menu-pause').addEventListener('click', () => { hidePause(); goToMenu() })
  document.getElementById('btn-restart').addEventListener('click', startGame)
  document.getElementById('btn-menu-over').addEventListener('click', goToMenu)
}

// ── Input ───────────────────────────────────────────
window.addEventListener('keydown', (e) => {
  if (state === 'playing') {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault()
      player.jump()
    }
    if (e.code === 'Escape' || e.code === 'KeyP') pauseGame()
  } else if (state === 'paused') {
    if (e.code === 'Escape' || e.code === 'KeyP') resumeGame()
  }
})

document.getElementById('game-screen').addEventListener('click', () => {
  if (state === 'playing') player.jump()
})

// ── Fluxo ───────────────────────────────────────────
function startGame() {
  _resetGame()
  state = 'playing'
  showGame()
  _startLoop()
}

function pauseGame() {
  state = 'paused'
  showPause()
  cancelAnimationFrame(loopId)
}

function resumeGame() {
  state = 'playing'
  hidePause()
  _startLoop()
}

function goToMenu() {
  state = 'menu'
  cancelAnimationFrame(loopId)
  clearObstacles()
  clearPowerups()
  world.reset()
  showMenu()
}

function _resetGame() {
  cancelAnimationFrame(loopId)
  clearObstacles()
  clearPowerups()
  world.reset()
  player.reset()

  const diff = DIFFICULTIES[selectedDifficulty]
  score = 0
  speed = diff.baseSpeed

  initObstacles(speed, diff.spawnInterval)
  initPowerups(speed)

  updateScore(0)
  updateLives(player.lives)
  clearPowerupHud()
}

// ── Loop principal ───────────────────────────────────
let lastTime = 0
let scoreAccum = 0

function _startLoop() {
  lastTime = performance.now()

  const tick = (now) => {
    if (state !== 'playing') return

    const delta = now - lastTime
    lastTime = now

    _update(delta)
    loopId = requestAnimationFrame(tick)
  }

  loopId = requestAnimationFrame(tick)
}

function _update(delta) {
  const diff = DIFFICULTIES[selectedDifficulty]

  speed += diff.speedIncrement
  const effectiveSpeed = speed * getSlowFactor()

  updateObstacleSpeed(effectiveSpeed)
  updatePowerupSpeed(effectiveSpeed)

  world.move(effectiveSpeed)
  player.applyGravity()
  moveObstacles()
  movePowerups()
  trySpawnPowerup()

  removeOffScreenObstacles()
  removeOffScreenPowerups()

  // Pontuação por tempo
  scoreAccum += delta
  if (scoreAccum >= 1000 / POINTS_PER_SECOND) {
    score++
    scoreAccum = 0
    updateScore(score)
  }

  // Colisões
  const playerBounds = player.getBounds()

  const hitObstacle = checkCollisionWithList(playerBounds, getObstacles())
  if (hitObstacle) {
    const tookDamage = player.takeDamage()
    if (tookDamage) {
      playSound('hit')
      updateLives(player.lives)
      hitObstacle.remove()
      if (player.lives <= 0) { _endGame(); return }
    }
  }

  const collected = checkCollisionWithList(playerBounds, getPowerups())
  if (collected) {
    playSound('powerup')
    _applyPowerup(collected.type)
    removePowerup(collected)
  }
}

function _applyPowerup(type) {
  if (type === 'shield') {
    player.activatePowerup('shield', POWERUP_DURATION.shield)
    showPowerupHud(getPowerupLabel('shield'))
    setTimeout(clearPowerupHud, POWERUP_DURATION.shield)
  } else if (type === 'slow') {
    showPowerupHud(getPowerupLabel('slow'))
    activateSlow(clearPowerupHud)
  } else if (type === 'life') {
    player.lives = Math.min(player.lives + 1, 5)
    updateLives(player.lives)
  }
}

function _endGame() {
  playSound('gameover')
  state = 'gameover'
  cancelAnimationFrame(loopId)
  clearObstacles()
  clearPowerups()
  const isBest = saveScore(score)
  showGameOver(score, isBest)
}
