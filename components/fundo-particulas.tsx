"use client"

import { useEffect, useRef } from "react"

// Tipo para as partículas
type Particula = {
  x: number
  y: number
  tamanho: number
  velocidadeX: number
  velocidadeY: number
  opacidade: number
}

export function FundoParticulas() {
  // Referência para o elemento canvas
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let idAnimacao: number
    let particulas: Particula[] = []

    // Função para redimensionar o canvas quando a janela muda de tamanho
    const redimensionarCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      iniciarParticulas()
    }

    // Inicializa as partículas com base no tamanho da tela
    const iniciarParticulas = () => {
      particulas = []
      // Limita o número de partículas em telas maiores para melhor desempenho
      const quantidadeParticulas = Math.min(Math.floor(window.innerWidth / 10), 100)

      // Cria cada partícula com propriedades aleatórias
      for (let i = 0; i < quantidadeParticulas; i++) {
        particulas.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          tamanho: Math.random() * 2 + 0.5,
          velocidadeX: (Math.random() - 0.5) * 0.3,
          velocidadeY: (Math.random() - 0.5) * 0.3,
          opacidade: Math.random() * 0.5 + 0.1,
        })
      }
    }

    // Desenha as partículas e suas conexões
    const desenharParticulas = () => {
      // Limpa o canvas para o próximo frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Atualiza e desenha cada partícula
      particulas.forEach((particula, i) => {
        // Atualiza posição
        particula.x += particula.velocidadeX
        particula.y += particula.velocidadeY

        // Faz as partículas voltarem ao início quando saem da tela
        if (particula.x < 0) particula.x = canvas.width
        if (particula.x > canvas.width) particula.x = 0
        if (particula.y < 0) particula.y = canvas.height
        if (particula.y > canvas.height) particula.y = 0

        // Desenha a partícula como um círculo
        ctx.beginPath()
        ctx.arc(particula.x, particula.y, particula.tamanho, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 102, 255, ${particula.opacidade})`
        ctx.fill()

        // Desenha conexões com outras partículas
        conectarParticulas(particula, i)
      })
    }

    // Conecta partículas próximas com linhas
    const conectarParticulas = (particula: Particula, indice: number) => {
      for (let j = indice + 1; j < particulas.length; j++) {
        const outraParticula = particulas[j]
        // Calcula a distância entre as partículas
        const distancia = Math.sqrt(
          Math.pow(particula.x - outraParticula.x, 2) + Math.pow(particula.y - outraParticula.y, 2),
        )

        // Se estiverem próximas, desenha uma linha entre elas
        // A opacidade da linha diminui com a distância
        if (distancia < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(0, 102, 255, ${0.1 * (1 - distancia / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particula.x, particula.y)
          ctx.lineTo(outraParticula.x, outraParticula.y)
          ctx.stroke()
        }
      }
    }

    // Função de animação principal
    const animar = () => {
      desenharParticulas()
      idAnimacao = requestAnimationFrame(animar)
    }

    // Adiciona o listener de redimensionamento
    window.addEventListener("resize", redimensionarCanvas)
    // Inicializa o canvas e as partículas
    redimensionarCanvas()
    // Inicia a animação
    animar()

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("resize", redimensionarCanvas)
      cancelAnimationFrame(idAnimacao)
    }
  }, [])

  // Renderiza o canvas que ocupará toda a tela sem interceptar eventos do mouse
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

