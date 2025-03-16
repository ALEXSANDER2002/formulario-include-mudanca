"use client"

import { useState, useEffect } from "react"
import { Code, Users, Lightbulb, ChevronRight } from "lucide-react"
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

  return (
    // Container principal com efeitos de brilho
    <div
      className={`mb-8 md:mb-12 bg-gradient-to-b from-[#111936] to-[#0d1429] rounded-xl overflow-hidden border-0 shadow-[0_0_30px_rgba(0,102,255,0.15)] relative transition-all duration-700 transform ${estaVisivel ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      {/* Efeitos de luz nos cantos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>

      {/* Cabeçalho do banner */}
      <div className="bg-gradient-to-r from-[#0d1429] to-[#0a1225] p-4 md:p-6 border-b border-[#1a2547] relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Título com efeito de máquina de escrever */}
          <div>
            <div className="relative">
              <h2 className="text-xl md:text-3xl font-bold relative group">
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent inline-block">
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
            <p className="text-gray-400 text-sm md:text-base mt-1">Chapa para Engenharia da Computação</p>
          </div>
          {/* Botão de conhecer propostas */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 self-start group">
            <span>Conheça nossas propostas</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Corpo do banner com descrição e cards */}
      <div className="p-4 md:p-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
            A chapa{" "}
            <span className="text-blue-400 font-semibold inline-block relative">
              #INCLUDE <span className="text-blue-400">&lt;MUDANÇA&gt;</span>
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-blue-500/50"></span>
            </span>{" "}
            tem como objetivo transformar a experiência acadêmica dos estudantes de Engenharia da Computação, promovendo
            inovação, inclusão e desenvolvimento técnico através de iniciativas que conectam teoria e prática.
          </p>

          {/* Cards com os pilares da chapa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Card de Inovação */}
            <div
              className="bg-[#0a1225] rounded-xl border border-[#1a2547] shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-fade-in opacity-0 overflow-hidden flex flex-col sm:flex-row"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-blue-600 flex items-center justify-center p-3 sm:px-4 sm:py-6 sm:h-auto">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white mb-1 sm:mb-2">Inovação</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Promover eventos, hackathons e projetos que incentivem a inovação e o desenvolvimento tecnológico
                  entre os estudantes.
                </p>
              </div>
            </div>

            {/* Card de Inclusão */}
            <div
              className="bg-[#0a1225] rounded-xl border border-[#1a2547] shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-fade-in opacity-0 overflow-hidden flex flex-col sm:flex-row"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-blue-600 flex items-center justify-center p-3 sm:px-4 sm:py-6 sm:h-auto">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white mb-1 sm:mb-2">Inclusão</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Garantir que todos os estudantes tenham voz ativa e oportunidades iguais no ambiente acadêmico e
                  profissional.
                </p>
              </div>
            </div>

            {/* Card de Desenvolvimento */}
            <div
              className="bg-[#0a1225] rounded-xl border border-[#1a2547] shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] animate-fade-in opacity-0 overflow-hidden flex flex-col sm:flex-row"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-blue-600 flex items-center justify-center p-3 sm:px-4 sm:py-6 sm:h-auto">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg text-white mb-1 sm:mb-2">Desenvolvimento</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  Criar oportunidades de aprendizado, networking e crescimento profissional para preparar os estudantes
                  para o mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

