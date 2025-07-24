import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClinet = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function analyzeCode(code, analysisType) {
  let selectChoose = "";
  let objectiveAnalysis = "";
  if (analysisType == "quick") {
    selectChoose =
      "Forneça uma análise objetiva e direta sobre o código abaixo, destacando os principais pontos fortes e problemas mais relevantes, sem se aprofundar em detalhes.";
    objectiveAnalysis = "Máximo 3 frases. Direto ao ponto.";
  } else if (analysisType === "detailed") {
    selectChoose =
      "Realize uma análise completa e minuciosa do código a seguir. Aponte boas práticas, possíveis melhorias, padrões utilizados, problemas de performance, legibilidade e segurança. Use exemplos e explique tecnicamente cada ponto.";
    objectiveAnalysis =
      "Seja técnico, claro e completo. Utilize quantas frases forem necessárias.";
  } else {
    selectChoose =
      "Analise o código abaixo de forma simples e educativa, como se estivesse explicando para alguém que está começando na programação. Evite termos técnicos complexos e utilize analogias e exemplos para facilitar o entendimento.";
    objectiveAnalysis =
      "Explique com linguagem acessível. Use frases curtas, comparações e exemplos práticos.";
  }

  const prompt = `
    Analise o seguinte código e forneça sugestões de melhorias de forma didática e clara:

    ${selectChoose}
   
    ${code}
   
    Por favor, avalie:
    1. Possíveis bugs ou erros
    2. Melhorias de performance
    3. Boas práticas de código
    4. Legibilidade e manutenibilidade
    5. Sugestões específicas de otimização
   
    IMPORTANTE:
    - Formate a resposta usando markdown
    - Use ### para títulos das seções
    - Use **negrito** para destacar pontos importantes
    - Use \`código\` para trechos de código
    - Use - para listas
    - Seja claro e didático em português

    FORMATO DA RESPOSTA:
    - Use apenas parágrafos normais

    ${objectiveAnalysis}

    Retorne apenas:
    
    ❌ PRINCIPAL PROBLEMA:
    
    ✅ SOLUÇÃO:
        `;

  try {
    const model = geminiClinet.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);

    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("erro ao analisar código", error);
    throw new Error(
      "erro ao conectar com a IA. Verifique sua chave de API e tente novamente"
    );
  }
}
