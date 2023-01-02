import { VersionCompare } from "./version_compare";

describe("桁が一致しているとき", () => {
  describe("メジャーバージョン", () => {
    it("booleanを返す", () => {
      expect(VersionCompare("0.3.3", "1.3.10")).toBe(false);
      expect(VersionCompare("2.3.3", "3.3.10")).toBe(false);
    });
  });

  describe("マイナーバージョン", () => {
    it("booleanを返す", () => {
      expect(VersionCompare("0.3.0", "0.30.10")).toBe(false);
      expect(VersionCompare("0.3.0", "0.20.10")).toBe(false);
      expect(VersionCompare("0.3.0", "0.2.10")).toBe(true);
    });
  });

  describe("マイクロバージョン", () => {
    it("booleanを返す", () => {
      expect(VersionCompare("0.3.3", "0.3.10")).toBe(false);
      expect(VersionCompare("0.3.1", "0.3.2")).toBe(false);
    });
  });
});

describe("桁が一致していないとき", () => {
  describe("メジャーバージョン", () => {
    it("booleanを返す", () => {
      expect(VersionCompare("0.3.3.0", "1.3.10")).toBe(false);
      expect(VersionCompare("2.3.3.0", "3.3.10")).toBe(false);
      expect(VersionCompare("2.9.3.0", "3.3.10")).toBe(false);
    });
  });

  describe("マイナーバージョン", () => {
    it("booleanを返す", () => {
      expect(VersionCompare("0.3.0.0", "0.30.10")).toBe(false);
      expect(VersionCompare("0.3.0.0", "0.20.10")).toBe(false);
      expect(VersionCompare("0.3.0.0", "0.2.10")).toBe(true);
      expect(VersionCompare("0.3.9.0", "0.2.10")).toBe(true);
    });
  });

  describe("マイクロバージョン", () => {
    it("booleanを返す", () => {
      expect(VersionCompare("0.3.3.0", "0.3.10")).toBe(false);
      expect(VersionCompare("0.3.1.0", "0.3.2")).toBe(false);
      expect(VersionCompare("0.3.1.9", "0.3.2")).toBe(false);
    });
  });
});
