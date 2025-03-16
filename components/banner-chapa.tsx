"use client"

import { useState, useEffect } from "react"
import { Code, Users, Lightbulb, ChevronRight, Star, Sparkles, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usarMobile } from "@/hooks/usar-mobile"
import { EfeitoMaquinaEscrever } from "@/components/efeito-maquina-escrever"

export function BannerChapa() {
  // Estado para controlar a animação de entrada
  const [estaVisivel, setEstaVisivel] = useState(false)
  // Detecta se é dispositivo móvel
  const ehMobile = usarMobile()

  // Ativa a animação de entrada após o componente ser montado
  useEffect(() => {
    setEstaVisivel(true)
  }, [])

  // Função para rolar até o formulário
  const rolarParaFormulario = () => {
    const formularioElement = document.getElementById('formulario-feedback')
    if (formularioElement) {
      formularioElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    // Container principal com efeitos de brilho
    <div
      className={`mb-8 md:mb-12 bg-gradient-to-b from-[#111936] to-[#0d1429] rounded-xl overflow-hidden border-0 shadow-[0_0_30px_rgba(0,102,255,0.15)] relative transition-all duration-700 transform ${estaVisivel ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      {/* Efeitos de luz nos cantos - melhorados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] opacity-15 -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-[100px] opacity-15 translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>
      
      {/* Partículas decorativas */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-70"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-70" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-10 right-40 w-2 h-2 bg-blue-300 rounded-full animate-float opacity-70" style={{ animationDelay: "2s" }}></div>

      {/* Cabeçalho do banner - redesenhado */}
      <div className="bg-gradient-to-r from-[#0d1429] via-[#0c1328] to-[#0a1225] p-5 md:p-7 border-b border-[#1a2547] relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          {/* Título com efeito de máquina de escrever e decoração */}
          <div className="flex items-center gap-3">
            {/* Ícone decorativo */}
            <div className="hidden md:flex h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse-slow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            
            <div>
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold relative group">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent inline-block">
                    <EfeitoMaquinaEscrever
                      text="#INCLUDE <MUDANÇA>"
                      typingSpeed={80}
                      deletingSpeed={40}
                      delayBeforeDelete={3000}
                      delayBeforeType={1000}
                    />
                  </span>
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse-slow"></div>
                </h2>
                <div className="absolute -inset-1 bg-blue-500 opacity-20 blur-md filter z-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <p className="text-gray-300 text-sm md:text-base mt-1 flex items-center gap-2">
                <Star className="h-3 w-3 text-yellow-400 inline" />
                Chapa para Engenharia da Computação
                <Star className="h-3 w-3 text-yellow-400 inline" />
              </p>
            </div>
          </div>
          
          {/* Botões de ação */}
          <div className="flex flex-wrap gap-3 md:gap-4 self-start">
            {/* Botão para ir ao formulário */}
            <Button 
              onClick={rolarParaFormulario}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg px-4 py-2.5 shadow-[0_4px_10px_rgba(79,70,229,0.3)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_6px_15px_rgba(79,70,229,0.4)] flex items-center gap-2 group"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium">Enviar Feedback</span>
            </Button>
            
            {/* Botão de conhecer propostas */}
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2.5 shadow-[0_4px_10px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_6px_15px_rgba(37,99,235,0.4)] flex items-center gap-2 group">
              <span className="font-medium">Conheça nossas propostas</span>
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Corpo do banner com descrição e cards */}
      <div className="p-5 md:p-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Descrição com destaque visual */}
          <div className="relative mb-7 md:mb-9 p-4 md:p-5 bg-[#0a1225]/50 rounded-lg border-l-4 border-blue-500 shadow-inner">
            <p className="text-gray-200 text-sm md:text-lg leading-relaxed">
              A chapa{" "}
              <span className="text-blue-400 font-semibold inline-block relative">
                #INCLUDE <span className="text-blue-400">&lt;MUDANÇA&gt;</span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500/50"></span>
              </span>{" "}
              tem como objetivo transformar a experiência acadêmica dos estudantes de Engenharia da Computação, promovendo
              inovação, inclusão e desenvolvimento técnico através de iniciativas que conectam teoria e prática.
            </p>
          </div>

          {/* Cards com os pilares da chapa - redesenhados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Card de Inovação */}
            <div
              className="bg-gradient-to-b from-[#0c1328] to-[#0a1225] rounded-xl border border-[#1a2547] shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-fade-in opacity-0 overflow-hidden group"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="p-5">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">Inovação</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Promover eventos, hackathons e projetos que incentivem a inovação e o desenvolvimento tecnológico
                  entre os estudantes.
                </p>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            {/* Card de Inclusão */}
            <div
              className="bg-gradient-to-b from-[#0c1328] to-[#0a1225] rounded-xl border border-[#1a2547] shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-fade-in opacity-0 overflow-hidden group"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="p-5">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">Inclusão</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Garantir que todos os estudantes tenham voz ativa e oportunidades iguais no ambiente acadêmico e
                  profissional.
                </p>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>

            {/* Card de Desenvolvimento */}
            <div
              className="bg-gradient-to-b from-[#0c1328] to-[#0a1225] rounded-xl border border-[#1a2547] shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-fade-in opacity-0 overflow-hidden group"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="p-5">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(96,165,250,0.3)] group-hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] transition-all duration-300">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">Desenvolvimento</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Criar oportunidades de aprendizado, networking e crescimento profissional para preparar os estudantes
                  para o mercado.
                </p>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

