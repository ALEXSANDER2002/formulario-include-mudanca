"use server"

import { z } from "zod"

// Esquema de validação para os dados do feedback
// Garante que os dados recebidos estão no formato esperado
const esquemaFeedback = z.object({
  name: z.string().min(2), // Nome com pelo menos 2 caracteres
  email: z.string().email(), // Email válido
  course: z.string(), // Curso selecionado
  semester: z.string(), // Semestre selecionado
  contributionType: z.string(), // Tipo de contribuição
  contribution: z.string().min(10).max(1000), // Contribuição entre 10 e 1000 caracteres
})

// Tipo derivado do esquema Zod para tipagem do TypeScript
type DadosFeedback = z.infer<typeof esquemaFeedback>

/**
 * Server Action para processar o envio de feedback
 *
 * Esta função é executada no servidor e recebe os dados do formulário,
 * valida-os e os processa (neste exemplo, apenas simula o processamento).
 *
 * Em uma aplicação real, aqui seria o local para salvar os dados em um
 * banco de dados, enviar emails de notificação, etc.
 *
 * @param dados Dados do formulário de feedback
 * @returns Objeto com status de sucesso
 */
export async function enviarFeedback(dados: DadosFeedback) {
  // Valida os dados recebidos contra o esquema
  // Se inválidos, lançará um erro que será capturado pelo cliente
  const dadosValidados = esquemaFeedback.parse(dados)

  // Em uma aplicação real, você armazenaria isso em um banco de dados
  // Por exemplo, usando Prisma com PostgreSQL:
  // await prisma.feedback.create({ data: dadosValidados })

  // Para demonstração, apenas logamos os dados e simulamos um atraso
  console.log("Feedback recebido:", dadosValidados)

  // Simula o tempo de processamento (1.5 segundos)
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Retorna sucesso
  return { success: true }
}

