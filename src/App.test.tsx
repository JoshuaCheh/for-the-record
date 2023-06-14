import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title of page", () => {
  render(<App />);
  const titleElement = screen.getByText("Number Frequency Game");
  expect(titleElement).toBeInTheDocument();
});
