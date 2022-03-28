import { parseRuc } from "./ruc.helpers";

describe("parseRuc", () => {
  test("A normal ruc with hyphen should be valild", () => {
    const ruc = "3416110-4";
    expect(parseRuc(ruc)).toBe("3416110-4");
  });
  test("A normal ruc without hyphen should be valild", () => {
    const ruc = "3968065";
    expect(parseRuc(ruc)).toBe("3968065");
  });

  test("An empty string should be empty", () => {
    const ruc = "";
    expect(parseRuc(ruc)).toBe("");
  });

  test("An word string should be empty", () => {
    const ruc = "Activo";
    const wrong = "Jardinería y Paisajismo.";
    expect(parseRuc(ruc)).toBe("");
    expect(parseRuc(wrong)).toBe("");
  });

  test("An long string should be trimmed down", () => {
    const ruc = "4.202.493-5 y 80101753-0";
    expect(parseRuc(ruc)).toBe("80101753-0");
  });

  test("An ruc string with thousands should be valid", () => {
    const ruc = "1.439.845-1";
    const ruc2 = "4.484.497-2";
    expect(parseRuc(ruc)).toBe("1439845-1");
    expect(parseRuc(ruc2)).toBe("4484497-2");
  });

  test("An ruc string with weird separator should be valid", () => {
    const ruc = "3957757_0";
    expect(parseRuc(ruc)).toBe("3957757-0");
  });

  test("An ruc string with spaces in between should be valid", () => {
    const ruc = "3411303 - 7";
    expect(parseRuc(ruc)).toBe("3411303-7");
  });
});
