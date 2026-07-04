//Configurações gerais
export const FPS = 60
export const WORLD_WIDTH = 480
export const GROUND_Y = 60        // altura do chão em px

//Dificuldades
export const DIFFICULTIES = {
  easy: {
    baseSpeed: 3,
    spawnInterval: 2200,   // ms entre obstáculos
    speedIncrement: 0.0008 // aumento de velocidade por frame
  },
  medium: {
    baseSpeed: 4.5,
    spawnInterval: 1600,
    speedIncrement: 0.0015
  },
  hard: {
    baseSpeed: 6,
    spawnInterval: 1100,
    speedIncrement: 0.003
  }
}

//Ninja
export const NINJA_START_LIVES = 3
export const JUMP_FORCE = 14      // velocidade inicial do pulo
export const GRAVITY = 0.6        // aceleração da gravidade

//Power-ups
export const POWERUP_SPAWN_CHANCE = 0.0006  // chance por frame
export const POWERUP_DURATION = {
  shield: 5000,   // ms
  slow: 4000
}
export const SLOW_FACTOR = 0.4    // fator de velocidade no modo slow

//Pontuação
export const POINTS_PER_SECOND = 1
export const MAX_RECORDS = 5
