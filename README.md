# Analisador de Código com IA

Este é um projeto front-end desenvolvido em **React** que utiliza inteligência artificial para analisar trechos de código (JavaScript, HTML, CSS, etc). O projeto foi iniciado durante uma [live do canal Dev em Dobro](https://www.youtube.com/watch?v=AvFOYokOj5U&t=767s) e foi posteriormente expandido com novas funcionalidades e testes automatizados.

🔗 Repositório: [github.com/ViniciusMendesLima/analisador-de-codigo-com-ia](https://github.com/ViniciusMendesLima/analisador-de-codigo-com-ia)

---

## ⚙️ Tecnologias e Bibliotecas

- **React** – Interface de usuário.
- **Jest** – Testes unitários.
- **React Testing Library** – Testes de comportamento dos componentes.
- **CSS** – Estilização da interface.
- **Google Generative AI (Gemini API)** – Serviço para análise inteligente de código.

---

## 🧱 Padrões de Projeto

- **Componentes funcionais com React Hooks (`useState`)**
- **Separação de responsabilidades (serviço de IA em `services/gemini.js`)**
- **Boas práticas de acessibilidade nos testes (`getByRole`, `getByPlaceholderText`, etc.)**

---

## 🚀 Setup e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ViniciusMendesLima/analisador-de-codigo-com-ia.git
   cd analisador-de-codigo-com-ia
2. **Instale as dependências**
    ```bash
    npm install

3. **Configurar variáveis de ambiente**

    Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
    ```bash
    # Chave de API da Gemini (Google AI)
    # Gere sua chave gratuita em: https://aistudio.google.com/app/apikey

    VITE_GEMINI_API_KEY=sua-chave-aqui

4. **Execute a aplicação:**
    ```bash
    git run dev
5.  **Rode os testes automatizados**
    ```bash
    npm test

## ✅ Funcionalidades
- Análise rápida, detalhada ou para iniciantes de códigos colados no textarea.
- Feedback baseado em IA com sugestões de melhoria.
- Testes de interface com simulação de interação do usuário.
- Mensagens de erro claras em caso de falha na análise.

## 🧪 Cobertura de Testes
**Os testes cobrem:**
- Renderização dos elementos principais
- Comportamento do campo de texto e do botão
- Alteração de tipo de análise
- Chamada correta da função analyzeCode
- Tratamento de erros da IA

## 📄 Licença
Este projeto é open-source, desenvolvido com fins educacionais e de prática pessoal.