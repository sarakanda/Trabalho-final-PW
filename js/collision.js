// collision.js — detecção de colisão AABB (Axis-Aligned Bounding Box)
// Recebe dois objetos com { left, right, top, bottom } e retorna true se colidem

export const isColliding = (boundsA, boundsB) => {
  return (
    boundsA.left   < boundsB.right  &&
    boundsA.right  > boundsB.left   &&
    boundsA.top    < boundsB.bottom &&
    boundsA.bottom > boundsB.top
  )
}

// Verifica colisão do ninja com uma lista de elementos e
// retorna o primeiro que colidiu (ou null)
export const checkCollisionWithList = (playerBounds, elements) => {
  for (const el of elements) {
    if (isColliding(playerBounds, el.getBounds())) {
      return el
    }
  }
  return null
}
