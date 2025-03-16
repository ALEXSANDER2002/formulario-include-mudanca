"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Home, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { FundoParticulas } from "@/components/fundo-particulas"
import { ConfeteSucesso } from "@/components/confete-sucesso"
import { ElementosFlutuantes } from "@/components/elementos-flutuantes"

export default function PaginaSucesso() {
  // Estado para controlar a animação de entrada
  const [estaVisivel, setEstaVisivel] = useState(false)

  // Ativa a animação de entrada após o componente ser montado
  useEffect(() => {
    setEstaVisivel(true)
  }, [])

  return (
    // Container principal com gradiente de fundo escuro
    <main className="min-h-screen bg-gradient-to-b from-[#050a1c] to-[#0a1632] text-white py-6 px-4 md:py-12 md:px-6 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Efeitos de fundo */}
      <FundoParticulas /> {/* Partículas conectadas no fundo */}
      <ConfeteSucesso /> {/* Efeito de confete para celebração */}
      <ElementosFlutuantes /> {/* Ícones tecnológicos flutuantes */}
      {/* Conteúdo principal centralizado */}
      <div className="max-w-4xl w-full mx-auto relative z-10">
        {/* Efeitos de luz/brilho nos cantos */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

        {/* Card principal com mensagem de sucesso */}
        <Card
          className={`w-full border-0 bg-gradient-to-b from-[#111936] to-[#0d1429] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all duration-700 transform ${estaVisivel ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              {/* Ícone de sucesso com efeito de brilho e animação */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-full p-6 relative z-10 shadow-[0_0_20px_rgba(0,102,255,0.4)] animate-bounce-slow">
                  <CheckCircle2 className="h-10 w-10 md:h-14 md:w-14 text-white" />
                </div>
              </div>

              {/* Mensagem de sucesso e agradecimento */}
              <div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-4">
                  Contribuição Enviada com Sucesso!
                </h1>
                <div className="bg-[#0a1225] p-5 md:p-6 rounded-lg border border-[#1a2547] max-w-2xl mx-auto mb-6">
                  <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                    Agradecemos sua participação! Sua contribuição será analisada pela equipe da chapa{" "}
                    <span className="text-blue-400 font-semibold">#INCLUDE &lt;MUDANÇA&gt;</span> e ajudará a construir
                    um Centro Acadêmico melhor para todos.
                  </p>
                </div>

                {/* Botões de ação */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  {/* Botão para voltar à página inicial */}
                  <Link href="/" className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group">
                      <Home className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Voltar ao Início</span>
                    </Button>
                  </Link>

                  {/* Botão para enviar nova contribuição */}
                  <Link href="/" className="w-full">
                    <Button className="w-full bg-[#1a2547] hover:bg-[#243260] text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group">
                      <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
                      <span>Nova Contribuição</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Rodapé com links para redes sociais */}
              <div className="pt-8 border-t border-[#1a2547] w-full max-w-md mx-auto">
                <p className="text-gray-400 text-sm">
                  Acompanhe nossas redes sociais para ficar por dentro das novidades e atualizações da chapa.
                </p>
                {/* Ícones de redes sociais */}
                <div className="flex justify-center space-x-4 mt-4">
                  {/* Twitter */}
                  <a
                    href="#"
                    className="bg-[#0a1225] p-3 rounded-full border border-[#1a2547] hover:bg-blue-900/30 transition-colors"
                  >
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="#"
                    className="bg-[#0a1225] p-3 rounded-full border border-[#1a2547] hover:bg-blue-900/30 transition-colors"
                  >
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.85-.07zm0 2.122c-3.159 0-3.53.014-4.779.069-2.57.117-3.753 1.326-3.869 3.87-.055 1.249-.069 1.62-.069 4.778 0 3.159.014 3.53.069 4.779.116 2.543 1.299 3.752 3.869 3.869 1.249.055 1.62.069 4.779.069 3.159 0 3.53-.014 4.779-.069 2.57-.117 3.753-1.326 3.869-3.87.055-1.249.069-1.62.069-4.778 0-3.159-.014-3.53-.069-4.779-.116-2.543-1.299-3.752-3.869-3.869-1.249-.055-1.62-.069-4.779-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="#"
                    className="bg-[#0a1225] p-3 rounded-full border border-[#1a2547] hover:bg-blue-900/30 transition-colors"
                  >
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

