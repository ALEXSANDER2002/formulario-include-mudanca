"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ConfeteSucesso } from "@/components/confete-sucesso"
import { EfeitoMaquinaEscrever } from "@/components/efeito-maquina-escrever"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, ChevronLeft, Star, Sparkles, ChevronRight } from "lucide-react"

export default function PaginaSucesso() {
  const [mostrarConteudo, setMostrarConteudo] = useState(false)
  const [mostrarConfete, setMostrarConfete] = useState(false)
  const router = useRouter()

  // Efeito para animar a entrada do conteúdo
  useEffect(() => {
    // Mostrar o confete imediatamente quando a página carrega
    setMostrarConfete(true)
    
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
    <main className="min-h-screen bg-gradient-to-b from-[#050a1c] to-[#0a1632] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Renderiza o confete quando mostrarConfete for true */}
      {mostrarConfete && <ConfeteSucesso />}

      {/* Efeitos de luz/brilho aprimorados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-15 -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-[120px] opacity-15 translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-[150px] opacity-10 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      
      {/* Partículas decorativas - visíveis apenas em telas maiores */}
      <div className="hidden md:block absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-70"></div>
      <div className="hidden md:block absolute top-20 right-20 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-70" style={{ animationDelay: "1s" }}></div>
      <div className="hidden md:block absolute bottom-10 right-40 w-2 h-2 bg-purple-300 rounded-full animate-float opacity-70" style={{ animationDelay: "2s" }}></div>
      <div className="hidden md:block absolute bottom-20 left-20 w-3 h-3 bg-blue-300 rounded-full animate-float opacity-70" style={{ animationDelay: "1.5s" }}></div>

      {/* Card principal com design aprimorado */}
      <Card
        className={`w-full max-w-xl border-0 bg-gradient-to-b from-[#111936] to-[#0d1429] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,102,255,0.25)] transition-all duration-1000 transform ${
          mostrarConteudo ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
        }`}
      >
        {/* Borda superior decorativa */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        {/* Cabeçalho com ícone de sucesso */}
        <div className="p-6 md:p-10 text-center relative">
          {/* Efeitos de luz no card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full filter blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          
          {/* Ícone de sucesso animado */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse-slow scale-125"></div>
            <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_25px_rgba(99,102,241,0.6)] animate-pulse-slow relative z-10">
              <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Estrelas decorativas - visíveis apenas em telas maiores */}
          <div className="hidden md:block absolute top-12 left-1/4 transform -translate-x-full">
            <Star className="h-5 w-5 text-indigo-400 animate-pulse-slow" fill="rgba(129, 140, 248, 0.5)" />
          </div>
          <div className="hidden md:block absolute top-20 right-1/4 transform translate-x-full">
            <Sparkles className="h-6 w-6 text-blue-400 animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Título com efeito de máquina de escrever */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 relative">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent inline-block">
              <EfeitoMaquinaEscrever text="Feedback Enviado!" typingSpeed={80} delayBeforeType={800} />
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse-slow"></div>
          </h1>

          {/* Mensagem de agradecimento */}
          <p
            className="text-gray-200 mb-8 md:mb-10 max-w-md mx-auto text-sm sm:text-base md:text-lg opacity-0 animate-fade-in leading-relaxed"
            style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          >
            Obrigado por compartilhar sua opinião! Sua contribuição é muito importante para melhorarmos o Centro
            Acadêmico e construirmos uma experiência acadêmica mais inclusiva e inovadora.
          </p>

          {/* Botões de ação */}
          <div
            className="opacity-0 animate-fade-in flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animationDelay: "2.5s", animationFillMode: "forwards" }}
          >
            {/* Botão para voltar */}
            <Button
              onClick={voltarParaInicio}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 text-white font-medium py-2.5 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] flex items-center justify-center gap-2 group"
            >
              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Voltar para o início</span>
            </Button>
            
            {/* Botão para conhecer propostas */}
            <Button
              onClick={() => window.open("https://include-mudanca.vercel.app/#propostas", "_blank")}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] flex items-center justify-center gap-2 group"
            >
              <span>Conheça nossas propostas</span>
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Rodapé com informações adicionais */}
        <div
          className="bg-gradient-to-r from-[#0a1225] via-[#0c1328] to-[#0a1225] border-t border-[#1a2547] p-4 md:p-5 text-center text-gray-300 text-xs sm:text-sm opacity-0 animate-fade-in"
          style={{ animationDelay: "3s", animationFillMode: "forwards" }}
        >
          <p className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-indigo-500 rounded-full opacity-70"></span>
            <span>Sua mensagem será analisada pela equipe do</span> 
            <span className="text-blue-400 font-semibold">#INCLUDE &lt;MUDANÇA&gt;</span> 
            <span>e poderá ser implementada em futuras ações.</span>
            <span className="inline-block h-1.5 w-1.5 bg-indigo-500 rounded-full opacity-70"></span>
          </p>
        </div>
      </Card>

      {/* Rodapé com copyright */}
      <div
        className="mt-6 md:mt-8 text-center text-gray-400 text-xs sm:text-sm opacity-0 animate-fade-in"
        style={{ animationDelay: "3.5s", animationFillMode: "forwards" }}
      >
        <p>© 2025 #INCLUDE &lt;MUDANÇA&gt; - Todos os direitos reservados</p>
      </div>
    </main>
  )
} 