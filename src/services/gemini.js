import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiClinet = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function analyzeCode(code, analysisType) {
    let selectChoose = ""
    if (analysisType == "quick") {
        selectChoose = "Seja conciso"
    } else if (analysisType === "detailed") {
        selectChoose = "Detalhe cada aspecto"
    } else {
        selectChoose = "Explique de forma simples para iniciantes em programação"
    }
    
  const prompt = `
        Analise o seguinte código e forneça sugestões de melhorias de forma didática e clara:
        Tipo de análise: ${selectChoose}
   
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
    throw new Error("erro ao conectar com a IA. Verifique sua chave de API e tente novamente")
  }
}
