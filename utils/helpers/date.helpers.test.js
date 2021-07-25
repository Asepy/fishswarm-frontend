import { testValidDateMember } from "./date.helpers";

describe("testValidDateMember for days", () => {
  test("1 should be a valid day", () => {
    expect(testValidDateMember({ day: 1 })).toBe(true);
  });
  test("31 should be a valid day", () => {
    expect(testValidDateMember({ day: 31 })).toBe(true);
  });

  test("'01' should be a valid day", () => {
    expect(testValidDateMember({ day: "01" })).toBe(true);
  });

  test("0 should be an invalid day", () => {
    expect(testValidDateMember({ day: 0 })).toBe(false);
  });

  test("51 should be an invalid day", () => {
    expect(testValidDateMember({ day: 51 })).toBe(false);
  });

  test("-1 should be an invalid day", () => {
    expect(testValidDateMember({ day: -1 })).toBe(false);
  });
});

describe("testValidDateMember for months", () => {
  test("1 should be a valid month", () => {
    expect(testValidDateMember({ month: 1 })).toBe(true);
  });
  test("12 should be a valid month", () => {
    expect(testValidDateMember({ month: 12 })).toBe(true);
  });

  test("'01' should be a valid month", () => {
    expect(testValidDateMember({ month: "01" })).toBe(true);
  });

  test("0 should be an invalid month", () => {
    expect(testValidDateMember({ month: 0 })).toBe(false);
  });

  test("13 should be an invalid month", () => {
    expect(testValidDateMember({ month: 13 })).toBe(false);
  });

  test("'foo' should be an invalid month", () => {
    expect(testValidDateMember({ month: "foo" })).toBe(false);
  });
});

describe("testValidDateMember for years", () => {
  test("1 should be a valid year", () => {
    expect(testValidDateMember({ year: 1 })).toBe(true);
  });

  test("'02' should be an valid year", () => {
    expect(testValidDateMember({ year: "02" })).toBe(true);
  });

  test("1983 should be a valid year", () => {
    expect(testValidDateMember({ year: 1983 })).toBe(true);
  });

  test("'1983' should be a valid year", () => {
    expect(testValidDateMember({ year: "1983" })).toBe(true);
  });

  test("0 should be an invalid year", () => {
    expect(testValidDateMember({ year: 0 })).toBe(false);
  });

  test("-2000 should be an invalid year", () => {
    expect(testValidDateMember({ year: -2000 })).toBe(false);
  });

  test("'foo' should be an invalid year", () => {
    expect(testValidDateMember({ year: "foo" })).toBe(false);
  });
});
