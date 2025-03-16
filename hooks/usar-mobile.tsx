"use client"

import { useState, useEffect } from "react"

export function usarMobile() {
  // Estado para armazenar se é dispositivo móvel
  const [ehMobile, setEhMobile] = useState(false)

  useEffect(() => {
    // Função para verificar se a largura da tela é de um dispositivo móvel
    const verificarSeMobile = () => {
      setEhMobile(window.innerWidth < 768)
    }

    // Verificação inicial
    verificarSeMobile()

    // Adiciona evento de redimensionamento
    window.addEventListener("resize", verificarSeMobile)

    // Limpeza ao desmontar
    return () => window.removeEventListener("resize", verificarSeMobile)
  }, [])

  return ehMobile
}

