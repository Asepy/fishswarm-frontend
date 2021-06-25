import { allEmptyValues, allNonEmptyValues } from "./object.helpers";

describe("allEmptyValues", () => {
  it("should return true for all empty strings", () => {
    const values = { document: "", birthdate: "" };
    expect(allEmptyValues(values)).toBe(true);
  });

  it("should return false for at least one not empty string", () => {
    const values = { document: "123123", birthdate: "" };
    expect(allEmptyValues(values)).toBe(false);
  });
});

describe("allNonEmptyValues", () => {
  it("should return true for all non empty strings", () => {
    const values = { document: "123", birthdate: "11/11/2000" };
    expect(allNonEmptyValues(values)).toBe(true);
  });

  it("should return false if at least one value is empty", () => {
    const values = { document: "123", birthdate: "" };
    expect(allNonEmptyValues(values)).toBe(false);
  });
});
