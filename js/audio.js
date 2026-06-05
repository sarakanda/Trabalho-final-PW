// audio.js — gerenciador de efeitos sonoros

const sounds = {
  jump: new Audio('assets/sounds/jump.wav'),
  hit: new Audio('assets/sounds/hit.wav'),
  powerup: new Audio('assets/sounds/powerup.wav'),
  gameover: new Audio('assets/sounds/gameover.wav')
}

// Pré-carregamento e configuração de volume
Object.values(sounds).forEach(s => {
  s.load()
  s.volume = 0.5
})

export const playSound = (name) => {
  if (sounds[name]) {
    // Reinicia o som se já estiver tocando
    sounds[name].currentTime = 0
    sounds[name].play().catch(e => console.warn("Erro ao tocar som:", e))
  }
}
