"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MessageSquare, Send, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { enviarFeedback } from "@/lib/acoes"
import { usarMobile } from "@/hooks/usar-mobile"

// Esquema de validação do formulário usando Zod
// Define as regras para cada campo do formulário
const esquemaFormulario = z.object({
  nome: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  curso: z.string({
    required_error: "Por favor selecione seu curso.",
  }),
  semestre: z.string({
    required_error: "Por favor selecione seu semestre.",
  }),
  tipoContribuicao: z.string({
    required_error: "Por favor selecione o tipo de contribuição.",
  }),
  contribuicao: z
    .string()
    .min(10, {
      message: "A contribuição deve ter pelo menos 10 caracteres.",
    })
    .max(1000, {
      message: "A contribuição não pode ter mais de 1000 caracteres.",
    }),
})

export function FormularioFeedback() {
  // Estados para controlar o comportamento do formulário
  const [estaEnviando, setEstaEnviando] = useState(false) // Controla o estado de envio
  const [progressoFormulario, setProgressoFormulario] = useState(0) // Controla a barra de progresso
  const [estaVisivel, setEstaVisivel] = useState(false) // Controla a animação de entrada
  const ehMobile = usarMobile() // Detecta se é dispositivo móvel
  const roteador = useRouter() // Para navegação após envio

  // Configuração do formulário com React Hook Form e Zod
  const formulario = useForm<z.infer<typeof esquemaFormulario>>({
    resolver: zodResolver(esquemaFormulario),
    defaultValues: {
      nome: "",
      email: "",
      curso: "engcomp", // Valor padrão definido como Engenharia da Computação
      semestre: "",
      tipoContribuicao: "",
      contribuicao: "",
    },
    mode: "onChange", // Validação em tempo real ao alterar campos
  })

  // Calcula a porcentagem de preenchimento do formulário
  const calcularProgresso = () => {
    const valoresFormulario = formulario.getValues()
    // Removemos "curso" da lista de campos obrigatórios já que está preenchido por padrão
    const camposObrigatorios = ["nome", "email", "semestre", "tipoContribuicao", "contribuicao"]
    const camposPreenchidos = camposObrigatorios.filter((campo) => {
      const valor = valoresFormulario[campo as keyof typeof valoresFormulario]
      return valor && typeof valor === "string" && valor.trim().length > 0
    })

    return Math.round((camposPreenchidos.length / camposObrigatorios.length) * 100)
  }

  // Atualiza a barra de progresso quando o formulário muda
  useEffect(() => {
    const inscricao = formulario.watch(() => {
      setProgressoFormulario(calcularProgresso())
    })
    return () => inscricao.unsubscribe()
  }, [formulario.watch])

  // Animação de entrada ao montar o componente
  useEffect(() => {
    setEstaVisivel(true)
  }, [])

  // Função executada ao enviar o formulário
  async function aoEnviar(valores: z.infer<typeof esquemaFormulario>) {
    setEstaEnviando(true)
    try {
      // Envia os dados para o servidor via Server Action
      await enviarFeedback({
        name: valores.nome,
        email: valores.email,
        course: valores.curso,
        semester: valores.semestre,
        contributionType: valores.tipoContribuicao,
        contribution: valores.contribuicao,
      })
      // Redireciona para a página de sucesso
      roteador.push("/sucesso")
    } catch (erro) {
      console.error("Erro ao enviar feedback:", erro)
      setEstaEnviando(false)
    }
  }

  return (
    // Card principal com efeito de entrada suave
    <Card
      id="formulario-feedback"
      className={`w-full border-0 bg-gradient-to-b from-[#111936] to-[#0d1429] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,102,255,0.15)] transition-all duration-700 transform ${estaVisivel ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      <CardContent className="p-0">
        {/* Cabeçalho do card com título e barra de progresso */}
        <div className="bg-gradient-to-r from-[#0d1429] via-[#0c1328] to-[#0a1225] p-5 md:p-7 border-b border-[#1a2547] relative">
          {/* Efeito de luz no canto */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-15 -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
          
          {/* Partículas decorativas */}
          <div className="absolute top-5 left-10 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-70"></div>
          <div className="absolute bottom-5 right-20 w-2 h-2 bg-indigo-400 rounded-full animate-float opacity-70" style={{ animationDelay: "1.5s" }}></div>

          {/* Título e subtítulo */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-3 shadow-[0_0_15px_rgba(0,102,255,0.3)] animate-pulse-slow">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-xl md:text-2xl text-white bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Sua Opinião Importa</h3>
              <p className="text-sm md:text-base text-gray-300">Ajude-nos a construir um Centro Acadêmico melhor</p>
            </div>
          </div>

          {/* Barra de progresso do formulário */}
          <div className="mt-5 md:mt-6 relative z-10">
            <div className="flex justify-between text-xs md:text-sm mb-2">
              <span className="text-gray-300 font-medium">Progresso do formulário</span>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold">{progressoFormulario}%</span>
            </div>
            <div className="h-2 md:h-2.5 w-full bg-[#1a2547] rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 rounded-full transition-all duration-500 ease-out ${
                  progressoFormulario > 0 ? "shadow-[0_0_10px_rgba(0,102,255,0.5)]" : ""
                }`}
                style={{ width: `${progressoFormulario}%` }}
              />
            </div>
          </div>
        </div>

        {/* Corpo do formulário */}
        <div className="p-5 md:p-8 relative">
          {/* Efeito de luz no canto */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-[120px] opacity-5 translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-5 translate-x-1/2"></div>

          {/* Formulário */}
          <Form {...formulario}>
            <form onSubmit={formulario.handleSubmit(aoEnviar)} className="space-y-5 md:space-y-6 relative z-10">
              {/* Campo: Nome Completo */}
              <FormField
                control={formulario.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="animate-fade-in opacity-0 group" style={{ animationDelay: "0.1s" }}>
                    <FormLabel className="text-gray-300 font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full opacity-70"></span>
                      Nome Completo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        {...field}
                        className="bg-[#0a1225] border-[#1a2547] text-white focus:border-blue-500 focus:ring-blue-500 rounded-lg h-11 md:h-12 shadow-sm transition-all duration-200 group-hover:border-blue-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 flex items-center gap-1 text-xs md:text-sm mt-1">
                      {formulario.formState.errors.nome && (
                        <AlertCircle className="h-3 w-3 md:h-3.5 md:w-3.5 flex-shrink-0" />
                      )}
                      {formulario.formState.errors.nome?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Campo: Email Institucional */}
              <FormField
                control={formulario.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="animate-fade-in opacity-0 group" style={{ animationDelay: "0.2s" }}>
                    <FormLabel className="text-gray-300 font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full opacity-70"></span>
                      Email Institucional
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu.email@unifesp.edu.br"
                        {...field}
                        className="bg-[#0a1225] border-[#1a2547] text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-lg h-11 md:h-12 shadow-sm transition-all duration-200 group-hover:border-indigo-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 flex items-center gap-1 text-xs md:text-sm mt-1">
                      {formulario.formState.errors.email && (
                        <AlertCircle className="h-3 w-3 md:h-3.5 md:w-3.5 flex-shrink-0" />
                      )}
                      {formulario.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Campos lado a lado: Curso e Semestre */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {/* Campo: Curso */}
                <FormField
                  control={formulario.control}
                  name="curso"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in opacity-0 group" style={{ animationDelay: "0.3s" }}>
                      <FormLabel className="text-gray-300 font-medium flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-blue-400 rounded-full opacity-70"></span>
                        Curso
                      </FormLabel>
                      <FormControl>
                        <div className="bg-[#0a1225] border border-[#1a2547] text-white rounded-lg h-11 md:h-12 shadow-sm px-3 flex items-center text-sm">
                          Engenharia da Computação
                          <input type="hidden" {...field} value="engcomp" />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Campo: Semestre */}
                <FormField
                  control={formulario.control}
                  name="semestre"
                  render={({ field }) => (
                    <FormItem className="animate-fade-in opacity-0 group" style={{ animationDelay: "0.4s" }}>
                      <FormLabel className="text-gray-300 font-medium flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 bg-indigo-400 rounded-full opacity-70"></span>
                        Semestre
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#0a1225] border-[#1a2547] text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-lg h-11 md:h-12 shadow-sm transition-all duration-200 group-hover:border-indigo-500/50">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#0d1429] border-[#1a2547] text-white rounded-lg shadow-lg max-h-[40vh]">
                          {/* Gera opções de 1 a 10 semestres */}
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()} className="focus:bg-blue-900/30 rounded-md">
                              {sem}º Semestre
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-400 flex items-center gap-1 text-xs md:text-sm mt-1">
                        {formulario.formState.errors.semestre && (
                          <AlertCircle className="h-3 w-3 md:h-3.5 md:w-3.5 flex-shrink-0" />
                        )}
                        {formulario.formState.errors.semestre?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Campo: Tipo de Contribuição */}
              <FormField
                control={formulario.control}
                name="tipoContribuicao"
                render={({ field }) => (
                  <FormItem className="animate-fade-in opacity-0 group" style={{ animationDelay: "0.5s" }}>
                    <FormLabel className="text-gray-300 font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-blue-500 rounded-full opacity-70"></span>
                      Tipo de Contribuição
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-[#0a1225] border-[#1a2547] text-white focus:border-blue-500 focus:ring-blue-500 rounded-lg h-11 md:h-12 shadow-sm transition-all duration-200 group-hover:border-blue-500/50">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#0d1429] border-[#1a2547] text-white rounded-lg shadow-lg">
                        <SelectItem value="sugestao" className="focus:bg-blue-900/30 rounded-md">
                          Sugestão
                        </SelectItem>
                        <SelectItem value="reclamacao" className="focus:bg-blue-900/30 rounded-md">
                          Reclamação
                        </SelectItem>
                        <SelectItem value="elogio" className="focus:bg-blue-900/30 rounded-md">
                          Elogio
                        </SelectItem>
                        <SelectItem value="duvida" className="focus:bg-blue-900/30 rounded-md">
                          Dúvida
                        </SelectItem>
                        <SelectItem value="outro" className="focus:bg-blue-900/30 rounded-md">
                          Outro
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400 flex items-center gap-1 text-xs md:text-sm mt-1">
                      {formulario.formState.errors.tipoContribuicao && (
                        <AlertCircle className="h-3 w-3 md:h-3.5 md:w-3.5 flex-shrink-0" />
                      )}
                      {formulario.formState.errors.tipoContribuicao?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Campo: Contribuição (área de texto) */}
              <FormField
                control={formulario.control}
                name="contribuicao"
                render={({ field }) => (
                  <FormItem className="animate-fade-in opacity-0 group" style={{ animationDelay: "0.6s" }}>
                    <FormLabel className="text-gray-300 font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full opacity-70"></span>
                      Sua Contribuição
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Compartilhe sua sugestão, reclamação ou ideia para o Centro Acadêmico..."
                        className="min-h-[120px] md:min-h-[150px] bg-[#0a1225] border-[#1a2547] text-white focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm transition-all duration-200 resize-y group-hover:border-indigo-500/50"
                        {...field}
                      />
                    </FormControl>
                    {/* Contador de caracteres */}
                    <div className="flex justify-end mt-1 md:mt-2">
                      <span
                        className={`text-xs md:text-sm ${
                          field.value.length > 900 ? "text-amber-400" : field.value.length > 0 ? "text-blue-400" : "text-gray-500"
                        }`}
                      >
                        {field.value.length}/1000 caracteres
                      </span>
                    </div>
                    <FormMessage className="text-red-400 flex items-center gap-1 text-xs md:text-sm mt-1">
                      {formulario.formState.errors.contribuicao && (
                        <AlertCircle className="h-3 w-3 md:h-3.5 md:w-3.5 flex-shrink-0" />
                      )}
                      {formulario.formState.errors.contribuicao?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Botão de envio */}
              <Button
                type="submit"
                className={`w-full transition-all duration-500 rounded-lg h-11 md:h-12 shadow-lg animate-fade-in opacity-0 ${
                  progressoFormulario === 100
                    ? "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 shadow-[0_0_15px_rgba(0,102,255,0.3)] transform hover:scale-[1.02]"
                    : "bg-gray-700 hover:bg-gray-600"
                } text-white font-medium text-base md:text-lg flex items-center justify-center gap-2 group`}
                disabled={estaEnviando || progressoFormulario !== 100}
                style={{ animationDelay: "0.7s" }}
              >
                {/* Estado do botão muda conforme o progresso e envio */}
                {estaEnviando ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Enviando...</span>
                  </>
                ) : progressoFormulario === 100 ? (
                  <>
                    <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    <span>Enviar Contribuição</span>
                  </>
                ) : (
                  <span>Preencha todos os campos</span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

