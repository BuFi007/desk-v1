import { describe, expect, it } from "bun:test";
import { formatAmountValue, formatDate } from "./utils";

describe("formatAmountValue", () => {
  it("should handle numbers with comma as decimal separator", () => {
    expect(formatAmountValue({ amount: "1.234,56" })).toBe(1234.56);
  });

  it("should handle numbers with period as thousands separator", () => {
    expect(formatAmountValue({ amount: "1.234.56" })).toBe(1234.56);
  });

  it("should handle numbers with period as decimal separator", () => {
    expect(formatAmountValue({ amount: "1234.56" })).toBe(1234.56);
  });

  it("should handle plain numbers", () => {
    expect(formatAmountValue({ amount: "1234" })).toBe(1234);
  });

  it("should invert the amount when inverted is true", () => {
    expect(formatAmountValue({ amount: "1234.56", inverted: true })).toBe(
      -1234.56,
    );
  });

  it("should handle negative numbers", () => {
    expect(formatAmountValue({ amount: "-1234.56" })).toBe(-1234.56);
  });

  it("should invert negative numbers when inverted is true", () => {
    expect(formatAmountValue({ amount: "-1234.56", inverted: true })).toBe(
      1234.56,
    );
  });

  it("should handle zero", () => {
    expect(formatAmountValue({ amount: "0" })).toBe(0);
    expect(formatAmountValue({ amount: "0", inverted: true })).toBe(-0);
  });
});

describe("formatDate", () => {
  it("should format a valid date string", () => {
    expect(formatDate("2023-05-15", "Europe/Berlin")).toBe("2023-05-15");
  });

  it("should handle date strings with non-date characters", () => {
    expect(formatDate("2023/05/15", "Europe/Berlin")).toBe("2023-05-15");
    expect(formatDate("May 15, 2023", "Europe/Berlin")).toBe("2023-05-15");
  });

  it("should return undefined for invalid date strings", () => {
    expect(formatDate("invalid-date", "Europe/Berlin")).toBeUndefined();
    expect(formatDate("2023-13-45", "Europe/Berlin")).toBeUndefined();
  });

  it("should handle different date formats", () => {
    expect(formatDate("05/15/2023", "Europe/Berlin")).toBe("2023-05-15");
  });

  it("should handle dates with time", () => {
    expect(formatDate("2023-05-15T14:30:00", "Europe/Berlin")).toBe(
      "2023-05-15",
    );
  });

  it("should handle dates dot separated", () => {
    expect(formatDate("04.09.2024", "Europe/Berlin")).toBe("2024-09-04");
  });

  it("should handle dates with time", () => {
    expect(formatDate("08.05.2024 09:12:07", "Europe/Berlin")).toBe(
      "2024-05-08",
    );
  });

  it("should handle dates 07/Aug/2024", () => {
    expect(formatDate("07/Aug/2024", "Europe/Berlin")).toBe("2024-08-07");
  });

  it("should handle dates 24-08-2024", () => {
    expect(formatDate("24-08-2024", "Europe/Berlin")).toBe("2024-08-24");
  });

  it("should handle European timezones", () => {
    expect(formatDate("2023-05-15", "Europe/Berlin")).toBe("2023-05-15");
  });

  it("should handle America timezones", () => {
    expect(formatDate("2023-05-15", "America/New_York")).toBe("2023-05-14");
  });
});