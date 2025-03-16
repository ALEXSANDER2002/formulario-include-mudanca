"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ConfeteSucesso } from "@/components/confete-sucesso"
import { EfeitoMaquinaEscrever } from "@/components/efeito-maquina-escrever"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PaginaSucesso() {
  const [mostrarConteudo, setMostrarConteudo] = useState(false)
  const router = useRouter()

  // Efeito para animar a entrada do conteúdo
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarConteudo(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Função para voltar à página inicial
  const voltarParaInicio = () => {
    router.push("/pagina")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050a1c] to-[#0a1632] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Efeito de confete */}
      <ConfeteSucesso />

      {/* Efeitos de luz/brilho */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-[120px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>

      {/* Card principal */}
      <Card
        className={`w-full max-w-lg border-0 bg-gradient-to-b from-[#111936] to-[#0d1429] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,102,255,0.2)] transition-all duration-1000 transform ${
          mostrarConteudo ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Cabeçalho com ícone de sucesso */}
        <div className="p-6 md:p-8 text-center">
          {/* Ícone de sucesso animado */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(74,222,128,0.5)] animate-pulse-slow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Título com efeito de máquina de escrever */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <EfeitoMaquinaEscrever text="Feedback Enviado!" typingSpeed={80} delayBeforeType={800} />
          </h1>

          {/* Mensagem de agradecimento */}
          <p
            className="text-gray-300 mb-8 max-w-md mx-auto text-base md:text-lg opacity-0 animate-fade-in"
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          >
            Obrigado por compartilhar sua opinião! Sua contribuição é muito importante para melhorarmos o Centro
            Acadêmico.
          </p>

          {/* Botão para voltar */}
          <div
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
          >
            <Button
              onClick={voltarParaInicio}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]"
            >
              Voltar para o início
            </Button>
          </div>
        </div>

        {/* Rodapé com informações adicionais */}
        <div
          className="bg-[#0a1225] border-t border-[#1a2547] p-4 text-center text-gray-400 text-sm opacity-0 animate-fade-in"
          style={{ animationDelay: "3s", animationFillMode: "forwards" }}
        >
          <p>
            Sua mensagem será analisada pela equipe do #INCLUDE &lt;MUDANÇA&gt; e poderá ser implementada em futuras
            ações.
          </p>
        </div>
      </Card>

      {/* Rodapé com copyright */}
      <div
        className="mt-8 text-center text-gray-500 text-sm opacity-0 animate-fade-in"
        style={{ animationDelay: "3.5s", animationFillMode: "forwards" }}
      >
        <p>© 2025 #INCLUDE &lt;MUDANÇA&gt; - Todos os direitos reservados</p>
      </div>
    </main>
  )
} 