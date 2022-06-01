import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Unsubscribe from "./unsubscribe";
import ProvidersWrapper from "../utils/providersWrapper";

describe("Unsubscribe page", () => {
  test("should all texts", () => {
    render(<Unsubscribe />, { wrapper: ProvidersWrapper });

    expect(screen.getByText("Unsubscribe")).toBeDefined();
    expect(screen.getByText("Confirm")).toBeDefined();
  });
});
