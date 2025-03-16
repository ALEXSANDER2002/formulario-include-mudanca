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
}

export function ConfeteSucesso() {
  // Referência para o elemento canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configura as dimensões do canvas para preencher a tela
    const redimensionarCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    redimensionarCanvas()
    window.addEventListener("resize", redimensionarCanvas)

    // Cria as partículas de confete
    const particulas: Particula[] = []
    // Paleta de cores em tons de azul para combinar com o tema
    const cores = ["#4da3ff", "#0066ff", "#0044a8", "#ffffff", "#a3d0ff"]

    // Função para criar as partículas iniciais
    const criarParticulas = () => {
      // Número de partículas baseado na largura da tela
      const quantidadeParticulas = Math.min(Math.floor(window.innerWidth / 10), 150)

      for (let i = 0; i < quantidadeParticulas; i++) {
        const tamanho = Math.random() * 10 + 5 // Tamanho entre 5 e 15
        particulas.push({
          // Posição inicial próxima ao centro da tela com alguma variação
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
          tamanho,
          cor: cores[Math.floor(Math.random() * cores.length)], // Cor aleatória da paleta
          velocidadeX: (Math.random() - 0.5) * 15, // Velocidade horizontal aleatória
          velocidadeY: Math.random() * -15 - 5, // Velocidade vertical inicial (para cima)
          gravidade: 0.2 + Math.random() * 0.1, // Gravidade para puxar as partículas para baixo
          rotacao: Math.random() * 360, // Rotação inicial aleatória
          velocidadeRotacao: (Math.random() - 0.5) * 5, // Velocidade de rotação
          opacidade: 1, // Começa totalmente visível
          velocidadeFade: 0.005 + Math.random() * 0.01, // Velocidade de desaparecimento
        })
      }
    }

    // Cria as partículas iniciais
    criarParticulas()

    // Variável para armazenar o ID da animação
    let idAnimacao: number

    // Função de animação que atualiza e desenha as partículas
    const animar = () => {
      // Limpa o canvas para o próximo frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Atualiza e desenha cada partícula
      for (let i = 0; i < particulas.length; i++) {
        const p = particulas[i]

        // Atualiza posição com física básica
        p.x += p.velocidadeX
        p.y += p.velocidadeY
        p.velocidadeY += p.gravidade // Aplica gravidade

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

          // Desenha um retângulo para simular confete
          ctx.fillRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho / 2)

          ctx.restore()
        }
      }

      // Remove partículas que desapareceram completamente
      for (let i = particulas.length - 1; i >= 0; i--) {
        if (particulas[i].opacidade <= 0) {
          particulas.splice(i, 1)
        }
      }

      // Continua a animação se ainda houver partículas
      if (particulas.length > 0) {
        idAnimacao = requestAnimationFrame(animar)
      }
    }

    // Inicia a animação
    animar()

    // Adiciona mais partículas após um pequeno atraso para criar um efeito de explosão contínua
    const timeout = setTimeout(() => {
      criarParticulas()
      animar()
    }, 500)

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("resize", redimensionarCanvas)
      cancelAnimationFrame(idAnimacao)
      clearTimeout(timeout)
    }
  }, []) // Executa apenas uma vez na montagem do componente

  // Renderiza o canvas que ocupará toda a tela sem interceptar eventos do mouse
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />
}

