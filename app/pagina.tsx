import { FormularioFeedback } from "@/components/formulario-feedback"
import { BannerChapa } from "@/components/banner-chapa"
import { FundoParticulas } from "@/components/fundo-particulas"
import { ElementosFlutuantes } from "@/components/elementos-flutuantes"

export default function Inicio() {
  return (
    // Container principal com gradiente de fundo escuro
    <main className="min-h-screen bg-gradient-to-b from-[#050a1c] to-[#0a1632] text-white py-6 px-4 md:py-12 md:px-6 relative overflow-hidden">
      {/* Efeito de partículas no fundo */}
      <FundoParticulas />

      {/* Elementos flutuantes (ícones tecnológicos) */}
      <ElementosFlutuantes />

      {/* Conteúdo principal centralizado */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Efeitos de luz/brilho nos cantos */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

        {/* Banner da chapa com informações */}
        <BannerChapa />

        {/* Título da seção de sugestões */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-block relative">
            {/* Efeito de brilho atrás do título */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25"></div>
            <h1 className="relative text-3xl md:text-5xl font-bold mb-3 text-white tracking-tight animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              <span className="inline-block animate-slide-up">Sugestões</span>
            </h1>
          </div>
          <p
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Compartilhe suas ideias, sugestões ou reclamações para ajudar a melhorar nosso Centro Acadêmico
          </p>
        </div>

        {/* Formulário de feedback */}
        <FormularioFeedback />

        {/* Rodapé com copyright */}
        <div
          className="mt-10 text-center text-gray-500 text-sm animate-fade-in opacity-0"
          style={{ animationDelay: "0.8s" }}
        >
          <p>© 2025 #INCLUDE &lt;MUDANÇA&gt; - Todos os direitos reservados</p>
        </div>
      </div>
    </main>
  )
}

