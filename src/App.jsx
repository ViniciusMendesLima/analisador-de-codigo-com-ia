import { useState } from "react";
import "./App.css";
import { analyzeCode } from "./services/gemini";

function App() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [analysisType, setAnalysisType] = useState('quick');

  const handleAnalyze = async () => {
    
    if (!code.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const analysis = await analyzeCode(code, analysisType);
      setResult(analysis);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Analisador de código com IA</h1>
        <h3 className="subtitle">Cole seu código e descubra como melhorá-lo</h3>
        <div className="input-group">
          <textarea
            className="code-textarea"
            placeholder="Cole seu código aqui (JavaScritp, HTML, CSS, etc ...)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <h3 className="details">Nível de detalhe</h3>
          <select className="select-details-level"
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
          >
            <option value="quick">Análise Rápida</option>
            <option value="detailed">Detalhada</option>
            <option value="beginner">Para Iniciantes</option>
          </select>
        </div>
        <button
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={!code.trim() || loading}
        >
          {loading ? "Analisando código ..." : "Analisar Código"}
        </button>
        {error && <div className="error-message">{error}</div>}
        {result && (
          <div className="result-container">
            <h2 className="result-title">Análise do Código</h2>

            <div className="result-content">{result}</div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
