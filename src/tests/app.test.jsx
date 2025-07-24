/* global jest, describe, it, expect, ,*/
import React from "react";

import App from "../App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as geminiService from "../services/gemini";

jest.mock("../services/gemini", () => ({
  analyzeCode: jest.fn(() => Promise.resolve("resultado mockado")),
}));

describe("Jest", () => {
  it("renderiza corretamente os elementos principais", () => {
    render(<App />);
    // Verifica se o elementos estão visíveis
    expect(screen.getByText("Analisador de código com IA")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Cole seu código/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Analisar Código/i })
    ).toBeInTheDocument();
  });

  it("Se o usuário consegue digitar código no campo de texto e se o estado é atualizado ", () => {
    render(<App />);
    const codeInput = screen.getByRole("textbox");

    fireEvent.change(codeInput, { target: { value: "const x= 10" } });

    expect(codeInput.value).toBe("const x= 10");
  });

  it("Se o select muda o tipo de análise e atualiza o estado corretamente", () => {
    render(<App />);

    const selectelement = screen.getByRole("combobox");
    const valueChoise = "detailed";
    fireEvent.change(selectelement, { target: { value: valueChoise } });
    expect(selectelement.value).toBe(valueChoise);
  });

  it("Se o botão está desativado quando o campo de código está vazio ou só com espaços", () => {
    render(<App />);
    const codeButton = screen.getByRole("button", { name: /Analisar Código/i });
    const codeInput = screen.getByRole("textbox");

    // estado inicial
    expect(codeButton).toBeDisabled();
    // apenas espaços
    fireEvent.change(codeInput, { target: { value: "   " } });
    expect(codeButton).toBeDisabled();
    //com codigo
    fireEvent.change(codeInput, { target: { value: "const x= 10" } });
    expect(codeButton).not.toBeDisabled();
    //compo vazio
    fireEvent.change(codeInput, { target: { value: "" } });
    expect(codeButton).toBeDisabled();
  });

  it("Se ao digitar um código e clicar no botão, a função analyzeCode é chamada corretamente", async () => {
    //fingimos que a função analyzeCode respondeu com sucesso e retornou o texto "Resultado simulado"
    geminiService.analyzeCode.mockResolvedValue("Resultado simulado");

    render(<App />);
    const codeButton = screen.getByRole("button", { name: /Analisar Código/i });
    const codeInput = screen.getByRole("textbox");

    fireEvent.change(codeInput, { target: { value: "const x= 10" } });
    fireEvent.click(codeButton);

    await waitFor(() => {
      expect(geminiService.analyzeCode).toHaveBeenCalledWith(
        "const x= 10",
        "quick"
      );
    });
  });

  it("Se ao digitar um código e clicar no botão, a função analyzeCode é chamada corretamente", async () => {
    //fingimos que a função analyzeCode respondeu com sucesso e retornou erro
    geminiService.analyzeCode.mockRejectedValue(new Error("Erro na IA"));

    render(<App />);

    const codeButton = screen.getByRole("button", { name: /Analisar Código/i });
    const codeInput = screen.getByRole("textbox");

    fireEvent.change(codeInput, { target: { value: "const x= 10" } });
    fireEvent.click(codeButton);

    const error = await screen.findByText("Erro na IA")
    expect(error).toBeInTheDocument()

  });
});
