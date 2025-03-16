"use client"

import { useEffect, useRef } from "react"

// Tipo para as partículas de confete
type Particula = {
  x: number // Posição X
  y: number // Posição Y
  tamanho: number // Tamanho da partícula
  cor: string // Cor do confete
  velocidadeX: number // Velocidade horizontal
  velocidadeY: number // Velocidade vertical
  gravidade: number // Gravidade aplicada à partícula
  rotacao: number // Rotação em graus
  velocidadeRotacao: number // Velocidade de rotação
  opacidade: number // Transparência
  velocidadeFade: number // Velocidade de desaparecimento
  forma: 'retangulo' | 'circulo' // Forma da partícula
}

export function ConfeteSucesso() {
  // Referência para o elemento canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Referência para armazenar o ID da animação
  const idAnimacaoRef = useRef<number | undefined>(undefined)
  // Referência para armazenar o timeout
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configura as dimensões do canvas para preencher a tela
    const redimensionarCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      
      // Ajusta o contexto para o DPR
      ctx.scale(dpr, dpr)
      
      // Redefine o estilo para manter o tamanho visual
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    redimensionarCanvas()
    window.addEventListener("resize", redimensionarCanvas)

    // Cria as partículas de confete
    const particulas: Particula[] = []
    // Paleta de cores expandida com tons de azul, roxo e cores festivas
    const cores = [
      "#4da3ff", "#0066ff", "#0044a8", "#ffffff", "#a3d0ff", "#6495ED", "#1E90FF", 
      "#8A2BE2", "#9370DB", "#7B68EE", "#6A5ACD", "#FFD700", "#FFC0CB", "#FF69B4",
      "#FF1493", "#00FFFF", "#7FFFD4", "#32CD32", "#FF4500", "#FF8C00", "#FFFF00"
    ]

    // Função para criar as partículas iniciais
    const criarParticulas = (quantidade?: number, origem?: 'topo' | 'centro' | 'explosao' | 'lateral' | 'chuva') => {
      // Número de partículas baseado na largura da tela
      const larguraTela = window.innerWidth
      const alturaTela = window.innerHeight
      const quantidadeBase = Math.min(Math.floor(larguraTela / 10), 150) // Reduzido de 5 para 10, e máximo de 350 para 150
      
      // Ajusta a quantidade de partículas com base no tamanho da tela
      const quantidadeParticulas = quantidade || (larguraTela < 768 ? Math.floor(quantidadeBase * 0.8) : quantidadeBase)
      const origemEfeito = origem || 'chuva'

      for (let i = 0; i < quantidadeParticulas; i++) {
        const tamanho = Math.random() * 12 + 5 // Tamanho entre 5 e 17
        let x, y, velocidadeX, velocidadeY

        if (origemEfeito === 'topo') {
          // Partículas caindo do topo da tela
          x = Math.random() * larguraTela
          y = -tamanho * 2
          velocidadeX = (Math.random() - 0.5) * 10
          velocidadeY = Math.random() * 7 + 2
        } else if (origemEfeito === 'centro') {
          // Partículas explodindo do centro
          x = larguraTela / 2 + (Math.random() - 0.5) * 200
          y = alturaTela / 2 + (Math.random() - 0.5) * 200
          const angulo = Math.random() * Math.PI * 2
          const forca = Math.random() * 20 + 5
          velocidadeX = Math.cos(angulo) * forca
          velocidadeY = Math.sin(angulo) * forca
        } else if (origemEfeito === 'lateral') {
          // Partículas entrando pelas laterais
          const ladoEsquerdo = Math.random() > 0.5
          x = ladoEsquerdo ? -tamanho : larguraTela + tamanho
          y = Math.random() * alturaTela
          velocidadeX = ladoEsquerdo ? Math.random() * 10 + 5 : -(Math.random() * 10 + 5)
          velocidadeY = (Math.random() - 0.5) * 10
        } else if (origemEfeito === 'chuva') {
          // Partículas distribuídas uniformemente no topo da tela
          x = Math.random() * larguraTela
          y = -tamanho - Math.random() * alturaTela * 0.5 // Distribuídas acima da tela
          velocidadeX = (Math.random() - 0.5) * 3 // Movimento lateral suave
          velocidadeY = Math.random() * 5 + 3 // Queda mais rápida
        } else { // explosao
          // Partículas explodindo de vários pontos
          // Criar múltiplos pontos de origem para uma explosão mais distribuída
          const numPontosOrigem = 7 // Aumentado para mais pontos
          const pontoIndex = Math.floor(Math.random() * numPontosOrigem)
          
          // Distribuir pontos de origem pela tela
          const pontosOrigemX = [
            larguraTela * 0.1 + Math.random() * 100,
            larguraTela * 0.3 + Math.random() * 100,
            larguraTela * 0.5 + Math.random() * 100,
            larguraTela * 0.7 + Math.random() * 100,
            larguraTela * 0.9 + Math.random() * 100,
            larguraTela * 0.25 + Math.random() * 100,
            larguraTela * 0.75 + Math.random() * 100
          ]
          
          const pontosOrigemY = [
            alturaTela * 0.2 + Math.random() * 100,
            alturaTela * 0.4 + Math.random() * 100,
            alturaTela * 0.6 + Math.random() * 100,
            alturaTela * 0.8 + Math.random() * 100,
            alturaTela * 0.3 + Math.random() * 100,
            alturaTela * 0.5 + Math.random() * 100,
            alturaTela * 0.7 + Math.random() * 100
          ]
          
          x = pontosOrigemX[pontoIndex]
          y = pontosOrigemY[pontoIndex]
          
          const angulo = Math.random() * Math.PI * 2
          const forca = Math.random() * 15 + 5
          velocidadeX = Math.cos(angulo) * forca
          velocidadeY = Math.sin(angulo) * forca - Math.random() * 7 // Impulso para cima aumentado
        }

        particulas.push({
          x,
          y,
          tamanho,
          cor: cores[Math.floor(Math.random() * cores.length)], // Cor aleatória da paleta
          velocidadeX,
          velocidadeY,
          gravidade: 0.12 + Math.random() * 0.08, // Gravidade reduzida para queda mais lenta
          rotacao: Math.random() * 360, // Rotação inicial aleatória
          velocidadeRotacao: (Math.random() - 0.5) * 10, // Velocidade de rotação aumentada
          opacidade: 1, // Começa totalmente visível
          velocidadeFade: 0.002 + Math.random() * 0.005, // Velocidade de desaparecimento mais lenta
          forma: Math.random() > 0.25 ? 'retangulo' : 'circulo' // 75% retângulos, 25% círculos
        })
      }
    }

    // Cria as partículas iniciais - chuva de confete por toda a tela
    criarParticulas(120, 'chuva') // Reduzido de 300 para 120

    // Função de animação que atualiza e desenha as partículas
    const animar = () => {
      // Limpa o canvas para o próximo frame
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Atualiza e desenha cada partícula
      for (let i = 0; i < particulas.length; i++) {
        const p = particulas[i]

        // Atualiza posição com física básica
        p.x += p.velocidadeX
        p.y += p.velocidadeY
        p.velocidadeY += p.gravidade // Aplica gravidade
        
        // Adiciona um pouco de resistência do ar para desacelerar gradualmente
        p.velocidadeX *= 0.99
        p.velocidadeY *= 0.99

        // Atualiza rotação
        p.rotacao += p.velocidadeRotacao

        // Diminui a opacidade gradualmente
        p.opacidade -= p.velocidadeFade

        // Desenha a partícula se ainda estiver visível
        if (p.opacidade > 0) {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotacao * Math.PI) / 180)
          ctx.globalAlpha = p.opacidade
          ctx.fillStyle = p.cor

          if (p.forma === 'retangulo') {
            // Desenha um retângulo para simular confete
            ctx.fillRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho / 3)
          } else {
            // Desenha um círculo
            ctx.beginPath()
            ctx.arc(0, 0, p.tamanho / 3, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.restore()
        }
      }

      // Remove partículas que desapareceram completamente
      for (let i = particulas.length - 1; i >= 0; i--) {
        if (particulas[i].opacidade <= 0) {
          particulas.splice(i, 1)
        }
      }

      // Adiciona novas partículas continuamente para manter o efeito
      // Removido para que o confete caia apenas uma vez
      // if (particulas.length < 50) {
      //   criarParticulas(30, 'chuva')
      // }

      // Continua a animação enquanto houver partículas
      if (particulas.length > 0) {
        idAnimacaoRef.current = requestAnimationFrame(animar)
      } else {
        // Para a animação quando todas as partículas desaparecerem
        cancelAnimationFrame(idAnimacaoRef.current as number)
      }
    }

    // Inicia a animação
    animar()

    // Sequência de efeitos para criar uma celebração mais intensa
    // Primeira onda - chuva de confete
    timeoutRef.current = setTimeout(() => {
      criarParticulas(80, 'chuva') // Reduzido de 200 para 80
    }, 300)

    // Segunda onda - explosão do centro
    const timeoutCentro = setTimeout(() => {
      criarParticulas(60, 'centro') // Reduzido de 150 para 60
    }, 800) // Aumentado de 600 para 800 para espaçar mais as animações

    // Terceira onda - mais chuva de confete
    const timeoutChuva = setTimeout(() => {
      criarParticulas(70, 'chuva') // Reduzido de 200 para 70
    }, 1500) // Aumentado de 900 para 1500

    // Quarta onda - explosão adicional
    const timeoutExplosao = setTimeout(() => {
      criarParticulas(60, 'explosao') // Reduzido de 180 para 60
    }, 2200) // Aumentado de 1200 para 2200

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("resize", redimensionarCanvas)
      if (idAnimacaoRef.current) {
        cancelAnimationFrame(idAnimacaoRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      clearTimeout(timeoutCentro)
      clearTimeout(timeoutChuva)
      clearTimeout(timeoutExplosao)
    }
  }, []) // Executa apenas uma vez na montagem do componente

  // Renderiza o canvas que ocupará toda a tela sem interceptar eventos do mouse
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}

