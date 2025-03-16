"use client"

import { useEffect, useState } from "react"
import { Code, Database, Cpu, Server, Wifi, Layers, HardDrive } from "lucide-react"

// Tipo para os elementos flutuantes
type ElementoFlutuante = {
  id: number // Identificador único
  icone: JSX.Element // Ícone a ser exibido
  x: number // Posição X na tela
  y: number // Posição Y na tela
  tamanho: number // Tamanho do elemento (escala)
  velocidade: number // Velocidade de movimento
  opacidade: number // Transparência
  rotacao: number // Rotação em graus
  velocidadeRotacao: number // Velocidade de rotação
}

export function ElementosFlutuantes() {
  // Estado para armazenar os elementos flutuantes
  const [elementos, setElementos] = useState<ElementoFlutuante[]>([])
  // Estado para armazenar as dimensões da tela
  const [dimensoes, setDimensoes] = useState({ largura: 0, altura: 0 })

  useEffect(() => {
    // Define as dimensões iniciais da tela
    setDimensoes({
      largura: window.innerWidth,
      altura: window.innerHeight,
    })

    // Cria os ícones que serão usados nos elementos flutuantes
    // Cada ícone representa um conceito tecnológico
    const icones = [
      <Code key="code" size={24} />, // Ícone de código
      <Database key="database" size={24} />, // Ícone de banco de dados
      <Cpu key="cpu" size={24} />, // Ícone de processador
      <Server key="server" size={24} />, // Ícone de servidor
      <Wifi key="wifi" size={24} />, // Ícone de wifi/rede
      <Layers key="layers" size={24} />, // Ícone de camadas
      <HardDrive key="harddrive" size={24} />, // Ícone de disco rígido
    ]

    // Array para armazenar os novos elementos
    const novosElementos: ElementoFlutuante[] = []
    // Calcula quantos elementos criar com base na largura da tela
    // Limita a no máximo 7 elementos para não sobrecarregar visualmente
    const quantidadeElementos = Math.min(Math.floor(window.innerWidth / 200), 7)

    // Cria cada elemento com propriedades aleatórias
    for (let i = 0; i < quantidadeElementos; i++) {
      novosElementos.push({
        id: i,
        icone: icones[i % icones.length], // Distribui os ícones disponíveis
        x: Math.random() * window.innerWidth, // Posição X aleatória
        y: Math.random() * window.innerHeight, // Posição Y aleatória
        tamanho: Math.random() * 0.5 + 0.5, // Tamanho entre 0.5 e 1
        velocidade: (Math.random() * 0.5 + 0.2) * 0.3, // Velocidade lenta para movimento suave
        opacidade: Math.random() * 0.07 + 0.03, // Opacidade muito sutil (3% a 10%)
        rotacao: Math.random() * 360, // Rotação inicial aleatória
        velocidadeRotacao: (Math.random() - 0.5) * 0.5, // Velocidade de rotação (positiva ou negativa)
      })
    }

    // Atualiza o estado com os elementos criados
    setElementos(novosElementos)

    // Função para lidar com o redimensionamento da janela
    const aoRedimensionar = () => {
      setDimensoes({
        largura: window.innerWidth,
        altura: window.innerHeight,
      })
    }

    // Adiciona o listener de redimensionamento
    window.addEventListener("resize", aoRedimensionar)

    // Loop de animação para mover os elementos
    let idAnimacao: number
    const animar = () => {
      // Atualiza a posição e rotação de cada elemento
      setElementos((elementosAnteriores) =>
        elementosAnteriores.map((elemento) => {
          // Atualiza posição X e Y
          let novoX = elemento.x + elemento.velocidade
          let novoY = elemento.y + elemento.velocidade * 0.8

          // Faz os elementos voltarem ao início quando saem da tela
          if (novoX > window.innerWidth + 50) novoX = -50
          if (novoY > window.innerHeight + 50) novoY = -50

          // Atualiza a rotação
          let novaRotacao = elemento.rotacao + elemento.velocidadeRotacao
          if (novaRotacao > 360) novaRotacao -= 360

          return {
            ...elemento,
            x: novoX,
            y: novoY,
            rotacao: novaRotacao,
          }
        }),
      )

      // Continua a animação
      idAnimacao = requestAnimationFrame(animar)
    }

    // Inicia a animação
    animar()

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("resize", aoRedimensionar)
      cancelAnimationFrame(idAnimacao)
    }
  }, []) // Executa apenas uma vez na montagem do componente

  return (
    // Container que cobre toda a tela, sem interceptar eventos do mouse
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Renderiza cada elemento flutuante */}
      {elementos.map((elemento) => (
        <div
          key={elemento.id}
          className="absolute text-blue-500/30 transform transition-opacity"
          style={{
            left: `${elemento.x}px`,
            top: `${elemento.y}px`,
            transform: `scale(${elemento.tamanho}) rotate(${elemento.rotacao}deg)`,
            opacity: elemento.opacidade,
          }}
        >
          {elemento.icone}
        </div>
      ))}
    </div>
  )
}

