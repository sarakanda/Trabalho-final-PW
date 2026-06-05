//Gerencia o cenário com paralaxe CSS

class World {
  constructor() {
    this.bgFar  = document.getElementById('bg-far')
    this.bgNear = document.getElementById('bg-near')
    this.farOffset  = 0
    this.nearOffset = 0
  }

  //Avança o scroll das camadas de fundo em velocidades diferentes
  move(speed) {
    this.farOffset  += speed * 0.3   // camada distante: mais lenta
    this.nearOffset += speed * 0.7   // camada próxima: mais rápida

    this.bgFar.style.backgroundPositionX  = `${this.farOffset}px`
    this.bgNear.style.backgroundPositionX = `${this.nearOffset}px`
  }

  reset() {
    this.farOffset  = 0
    this.nearOffset = 0
    this.bgFar.style.backgroundPositionX  = '0px'
    this.bgNear.style.backgroundPositionX = '0px'
  }
}

export const world = new World()
