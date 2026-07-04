// storage.js — comunicação com o servidor para salvar a pontuação da partida
// (substitui a persistência local por localStorage da versão original)

// Envia a pontuação final ao servidor via Ajax (fetch + POST).
// Retorna true se o salvamento foi bem-sucedido, false caso contrário.
export const saveScore = async (score) => {
  try {
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
    })

    if (!response.ok) return false

    const data = await response.json()
    return !!data.success
  } catch (err) {
    console.warn('Erro ao salvar pontuação:', err)
    return false
  }
}
