# Trabalho-final-PW
Repositório criado para o trabalho final da disciplina Programação Web do curso de Engenharia de Software da Universidade Federal do Amazonas

影 Kage Run
Endless runner com tema ninja japonês desenvolvido para a disciplina de Programação Web.

-> Como jogar
Espaço ou ↑ — pular
P ou Esc — pausar
Toque na tela (mobile) — pular
Desvie dos obstáculos o maior tempo possível. A velocidade aumenta progressivamente.

-> Obstáculos
Obstáculo	Comportamento
🎋 Bambu	No chão — pule por cima
🗡 Kunai	Voando em altura média
⬛ Fosso	Buraco no chão — pule com antecedência

-> Power-ups
Power-up	Efeito
🛡 Escudo	Invulnerabilidade por 5 segundos
⏳ Lentidão	Obstáculos ficam mais lentos por 4 segundos
❤ Vida extra	Recupera uma vida (máximo 5)
Funcionalidades
✅ Estados do jogo: menu, jogando, pausado, game over
✅ 3 dificuldades (Fácil / Médio / Difícil)
✅ 3 tipos de obstáculos com comportamentos distintos
✅ 3 tipos de power-ups
✅ Sistema de vidas e pontuação
✅ Dificuldade crescente (velocidade aumenta com o tempo)
✅ Top 5 recordes salvos com localStorage
✅ Paralaxe CSS no cenário
✅ Colisão AABB justa (com margem interna)
✅ Efeitos sonoros (pulo, dano, power-up e game over)


-> Execução
Abra `index.html` diretamente no navegador — não requer servidor.
> Nota: por usar ES Modules (`type="module"`), alguns navegadores podem bloquear ao abrir via `file://`. Nesses casos, use uma extensão como **Live Server** (VS Code) ou rode `npx serve .` na pasta `/game`.
Estrutura de arquivos
```
game/
├── index.html
├── css/
│   └── style.css          # Visual completo com tema japonês
└── js/
    ├── game.js            # Loop principal e orquestração de estados
    ├── config.js          # Constantes globais e configurações de dificuldade
    ├── world.js           # Cenário com efeito de paralaxe
    ├── player.js          # Ninja: pulo, vidas, power-ups e hitbox
    ├── obstacles.js       # Spawn e movimento dos 3 tipos de obstáculos
    ├── powerups.js        # Spawn e efeitos dos power-ups
    ├── collision.js       # Detecção de colisão AABB
    ├── ui.js              # HUD, menus e telas
    ├── storage.js         # Recordes com localStorage
    └── audio.js           # Gerenciamento de efeitos sonoros
```
Divisão de responsabilidades
Membro	Responsabilidades
Gabriel Brito	`game.js`, `player.js`, `collision.js`, `world.js`, `ui.js`
Sara Kanda	`obstacles.js`, `powerups.js`, `config.js`, `storage.js`, `style.css`

