//Controla o ninja com sprite de imagem

import { GROUND_Y, NINJA_START_LIVES, JUMP_FORCE, GRAVITY } from './config.js'
import { playSound } from './audio.js'

const SPRITE_FRAMES = [
  'assets/run_0.png',
  'assets/run_1.png',
  'assets/run_2.png',
]
const FRAME_DURATION = 100  // ms por frame da animação de corrida

class Player {
  constructor() {
    this.element = null
    this.lives = NINJA_START_LIVES
    this.velocityY = 0
    this.isOnGround = true
    this.isShielded = false
    this.isInvincible = false
    this._powerupTimer = null
    this._frameIndex = 0
    this._frameTimer = null
  }

  init() {
    if (this.element) return
    this.element = this._buildElement()
    this._startRunAnimation()
  }

  _buildElement() {
    const img = document.createElement('img')
    img.id = 'ninja'
    img.src = SPRITE_FRAMES[0]
    img.style.bottom = `${GROUND_Y}px`
    document.getElementById('world').appendChild(img)
    return img
  }

  // Cicla pelos frames de corrida
  _startRunAnimation() {
    this._stopAnimation()
    this._frameTimer = setInterval(() => {
      if (!this.isOnGround) return  // congela no ar
      this._frameIndex = (this._frameIndex + 1) % SPRITE_FRAMES.length
      this.element.src = SPRITE_FRAMES[this._frameIndex]
    }, FRAME_DURATION)
  }

  _stopAnimation() {
    clearInterval(this._frameTimer)
  }

  jump() {
    if (!this.isOnGround) return
    this.velocityY = JUMP_FORCE
    this.isOnGround = false
    playSound('jump')
    // Usa o frame 1 como pose de pulo
    this.element.src = SPRITE_FRAMES[1]
  }

  applyGravity() {
    if (this.isOnGround) return

    this.velocityY -= GRAVITY
    const currentBottom = parseFloat(this.element.style.bottom) || GROUND_Y
    const newBottom = currentBottom + this.velocityY

    if (newBottom <= GROUND_Y) {
      this.element.style.bottom = `${GROUND_Y}px`
      this.velocityY = 0
      this.isOnGround = true
    } else {
      this.element.style.bottom = `${newBottom}px`
    }
  }

  getBounds() {
    const rect = this.element.getBoundingClientRect()
    return {
      left:   rect.left   + 8,
      right:  rect.right  - 8,
      top:    rect.top    + 6,
      bottom: rect.bottom - 4
    }
  }

  takeDamage() {
    if (this.isShielded || this.isInvincible) return false
    this.lives--
    this._flashHit()
    return true
  }

  _flashHit() {
    this.isInvincible = true
    this.element.classList.add('hit')
    setTimeout(() => {
      this.element.classList.remove('hit')
      this.isInvincible = false
    }, 1200)
  }

  activatePowerup(type, duration) {
    clearTimeout(this._powerupTimer)
    if (type === 'shield') {
      this.isShielded = true
      this.element.classList.add('shielded')
      this._powerupTimer = setTimeout(() => {
        this.isShielded = false
        this.element.classList.remove('shielded')
      }, duration)
    }
  }

  reset() {
    this.lives = NINJA_START_LIVES
    this.velocityY = 0
    this.isOnGround = true
    this.isShielded = false
    this.isInvincible = false
    this._frameIndex = 0
    clearTimeout(this._powerupTimer)
    this._stopAnimation()
    this.element.src = SPRITE_FRAMES[0]
    this.element.style.bottom = `${GROUND_Y}px`
    this.element.classList.remove('hit', 'shielded')
    this._startRunAnimation()
  }
}

export const player = new Player()
