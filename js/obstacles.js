//Spawna e move os três tipos de obstáculos

import { WORLD_WIDTH } from './config.js'


class Obstacle {
  constructor(type, speed) {
    this.type = type
    this.speed = speed
    this.removed = false
    this.element = this._buildElement(type)
    document.getElementById('world').appendChild(this.element)
  }

  _buildElement(type) {
    const el = document.createElement('div')
    el.classList.add('obstacle', type)

    //Começa fora da tela pela direita, usando left
    if (type === 'pit') {
      const width = 50 + Math.floor(Math.random() * 30)
      el.style.width = `${width}px`
      el.style.left = `${WORLD_WIDTH}px`
    } else {
      el.style.left = `${WORLD_WIDTH}px`
    }

    return el
  }

  //Move da direita para a esquerda
  move() {
    const currentLeft = parseFloat(this.element.style.left)
    this.element.style.left = `${currentLeft - this.speed}px`
  }

  getBounds() {
    const rect = this.element.getBoundingClientRect()
    const margin = this.type === 'kunai' ? 6 : 3
    return {
      left:   rect.left   + margin,
      right:  rect.right  - margin,
      top:    rect.top    + margin,
      bottom: rect.bottom - margin
    }
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

//Gerenciador
let obstacles = []
let spawnTimer = null
let currentSpeed = 4
let currentInterval = 1600

export const initObstacles = (speed, interval) => {
  currentSpeed = speed
  currentInterval = interval
  obstacles = []
  _scheduleNextSpawn()
}

export const updateObstacleSpeed = (speed) => {
  currentSpeed = speed
}

const _scheduleNextSpawn = () => {
  const jitter = 0.7 + Math.random() * 0.6
  spawnTimer = setTimeout(() => {
    _spawnObstacle()
    _scheduleNextSpawn()
  }, currentInterval * jitter)
}

const _spawnObstacle = () => {
  const roll = Math.random()
  let type
  if (roll < 0.45)      type = 'bamboo'
  else if (roll < 0.75) type = 'kunai'
  else                  type = 'pit'

  obstacles.push(new Obstacle(type, currentSpeed))
}

export const moveObstacles = () => {
  obstacles.forEach(o => o.move())
}

export const getObstacles = () => obstacles

export const removeOffScreenObstacles = () => {
  obstacles = obstacles.filter(o => {
    if (o.isOffScreen()) { o.remove(); return false }
    return true
  })
}

export const clearObstacles = () => {
  clearTimeout(spawnTimer)
  obstacles.forEach(o => o.remove())
  obstacles = []
}
