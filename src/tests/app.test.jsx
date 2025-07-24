/* global jest, describe, it, expect, ,*/
import React from "react";

import App from "../App";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';



jest.mock('../services/gemini', () => ({
  analyzeCode: jest.fn(() => Promise.resolve("resultado mockado")),
}));


describe('Jest', () => {
    it("renderiza corretamente os elementos principais", () => {
  render(<App />);
  expect(screen.getByText("Analisador de código com IA")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Cole seu código/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Analisar Código/i })).toBeInTheDocument();
});
})