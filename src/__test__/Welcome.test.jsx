import React from "react";
import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome"; // Assicurati di importare il componente corretto

test("Il componente Welcome mostra correttamente l'Alert", () => {
  // Renderizza il componente Welcome
  render(<Welcome />);

  // Verifica che l'elemento Alert sia presente nel DOM
  const alertElement = screen.getByRole("alert");
  expect(alertElement).toBeInTheDocument();

  // Verifica che il testo dell'Alert sia corretto
  const alertText = screen.getByText(/Benvenuti in EpiBooks!/i);
  expect(alertText).toBeInTheDocument();
});
