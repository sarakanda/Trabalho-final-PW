// powerups.js — spawna e gerencia os power-ups coletáveis

import { POWERUP_SPAWN_CHANCE, POWERUP_DURATION, SLOW_FACTOR } from './config.js'
import { WORLD_WIDTH } from './config.js'

const POWERUP_CONFIG = {
  shield: { icon: '🛡', label: '🛡 Escudo ativo' },
  slow:   { icon: '⏳', label: '⏳ Tempo lento' },
  life:   { icon: '❤', label: '' }
}

class Powerup {
  constructor(type, speed) {
    this.type = type
    this.speed = speed
    this.removed = false
    this.element = this._buildElement()
    document.getElementById('world').appendChild(this.element)
  }

  _buildElement() {
    const el = document.createElement('div')
    el.classList.add('powerup', this.type)
    el.textContent = POWERUP_CONFIG[this.type].icon
    el.style.left = `${WORLD_WIDTH}px`
    return el
  }

  // Move da direita para a esquerda
  move() {
    const currentLeft = parseFloat(this.element.style.left)
    this.element.style.left = `${currentLeft - this.speed}px`
  }

  getBounds() {
    return this.element.getBoundingClientRect()
  }

  isOffScreen() {
    const rect = this.element.getBoundingClientRect()
    return rect.right < 0
  }

  remove() {
    if (this.removed) return
    this.element.remove()
    this.removed = true
  }
}

// ── Gerenciador ──────────────────────────────────────
let powerups = []
let currentSpeed = 4
let isSlowActive = false
let slowTimer = null

export const initPowerups = (speed) => {
  currentSpeed = speed
  powerups = []
  isSlowActive = false
}

export const updatePowerupSpeed = (speed) => {
  currentSpeed = speed
}

export const trySpawnPowerup = () => {
  if (Math.random() < POWERUP_SPAWN_CHANCE) {
    const types = Object.keys(POWERUP_CONFIG)
    const type = types[Math.floor(Math.random() * types.length)]
    powerups.push(new Powerup(type, currentSpeed))
  }
}

export const movePowerups = () => {
  powerups.forEach(p => p.move())
}

export const getPowerups = () => powerups

export const removeOffScreenPowerups = () => {
  powerups = powerups.filter(p => {
    if (p.isOffScreen()) { p.remove(); return false }
    return true
  })
}

export const removePowerup = (powerup) => {
  powerup.remove()
  powerups = powerups.filter(p => p !== powerup)
}

export const activateSlow = (onEnd) => {
  isSlowActive = true
  document.body.classList.add('slow-active')
  clearTimeout(slowTimer)
  slowTimer = setTimeout(() => {
    isSlowActive = false
    document.body.classList.remove('slow-active')
    onEnd()
  }, POWERUP_DURATION.slow)
}

export const getSlowFactor = () => isSlowActive ? SLOW_FACTOR : 1

export const getPowerupLabel = (type) => POWERUP_CONFIG[type]?.label || ''

export const clearPowerups = () => {
  clearTimeout(slowTimer)
  isSlowActive = false
  document.body.classList.remove('slow-active')
  powerups.forEach(p => p.remove())
  powerups = []
}
