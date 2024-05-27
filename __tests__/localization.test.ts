import { changeLocale, translate } from "@/src/localization";

describe("localization", () => {
  it("english works", () => {
    changeLocale("en");
    expect(translate("iso")).toBe("en");
  });
  it("german works", () => {
    changeLocale("de");
    expect(translate("iso")).toBe("de");
  });
});
