"use client"

import { useState, useEffect } from "react"

// Interface para as propriedades do componente
interface PropriedadesEfeitoMaquinaEscrever {
  text: string // Texto a ser exibido
  typingSpeed?: number // Velocidade de digitação (ms)
  deletingSpeed?: number // Velocidade de apagamento (ms)
  delayBeforeDelete?: number // Tempo de espera antes de apagar (ms)
  delayBeforeType?: number // Tempo de espera antes de digitar (ms)
  loop?: boolean // Se deve repetir o efeito
}

export function EfeitoMaquinaEscrever({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBeforeDelete = 2000,
  delayBeforeType = 500,
  loop = true,
}: PropriedadesEfeitoMaquinaEscrever) {
  // Estado para o texto que será exibido
  const [textoExibido, setTextoExibido] = useState("")
  // Estados para controlar o fluxo da animação
  const [estaDigitando, setEstaDigitando] = useState(true)
  const [estaApagando, setEstaApagando] = useState(false)
  const [estaEsperando, setEstaEsperando] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Se estiver no estado de espera
    if (estaEsperando) {
      timeout = setTimeout(
        () => {
          setEstaEsperando(false)
          if (textoExibido === text) {
            setEstaApagando(true)
          } else {
            setEstaDigitando(true)
          }
        },
        textoExibido === text ? delayBeforeDelete : delayBeforeType,
      )
      return () => clearTimeout(timeout)
    }

    // Se estiver digitando
    if (estaDigitando) {
      if (textoExibido.length < text.length) {
        // Adiciona um caractere por vez
        timeout = setTimeout(() => {
          setTextoExibido(text.substring(0, textoExibido.length + 1))
        }, typingSpeed)
      } else {
        // Terminou de digitar
        setEstaDigitando(false)
        if (loop) {
          setEstaEsperando(true)
        }
      }
      return () => clearTimeout(timeout)
    }

    // Se estiver apagando
    if (estaApagando) {
      if (textoExibido.length > 0) {
        // Remove um caractere por vez
        timeout = setTimeout(() => {
          setTextoExibido(text.substring(0, textoExibido.length - 1))
        }, deletingSpeed)
      } else {
        // Terminou de apagar
        setEstaApagando(false)
        setEstaEsperando(true)
      }
      return () => clearTimeout(timeout)
    }
  }, [
    textoExibido,
    estaDigitando,
    estaApagando,
    estaEsperando,
    text,
    typingSpeed,
    deletingSpeed,
    delayBeforeDelete,
    delayBeforeType,
    loop,
  ])

  return (
    <>
      {textoExibido}
      <span className="inline-block w-[2px] h-[1em] bg-blue-400 ml-1 animate-cursor-blink align-middle"></span>
    </>
  )
}

