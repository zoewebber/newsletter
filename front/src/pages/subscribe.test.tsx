import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Subscribe from "./subscribe";

describe("Subscribe page", () => {
  test("should all texts", () => {
    render(<Subscribe />);

    expect(screen.getByText("Newsletter")).toBeDefined();
    expect(screen.getByText("Email:")).toBeDefined();
    expect(screen.getByText("Subscribe")).toBeDefined();
  });
});
