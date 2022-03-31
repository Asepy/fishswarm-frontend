import { capitalize, parseCellphone } from "./string.helpers";

describe("captialize", () => {
  it("should return string with first letter uppercase", () => {
    const str = "femenino";
    expect(capitalize(str)).toBe("Femenino");
  });
});

describe("parseCellPhone", () => {
  it("should parse normal cellphone", () => {
    const str = "0981232323";
    expect(parseCellphone(str)).toBe("0981232323");
  });

  it("should parse cellphone with spaces in between", () => {
    const str = "0971 922 900";
    expect(parseCellphone(str)).toBe("0971922900");
  });

  it("should parse cellphone 595", () => {
    const str = "595981252735";
    expect(parseCellphone(str)).toBe("0981252735");
  });

  it("should shorten long number", () => {
    const str = "0984133540-0974904802";
    expect(parseCellphone(str)).toBe("0974904802");
  });

  it("should add 0 to number", () => {
    const str = "974904802";
    expect(parseCellphone(str)).toBe("0974904802");
  });

  it("should shorten number from another country", () => {
    const str = "541122471888";
    expect(parseCellphone(str)).toBe("1122471888");
  });
});
