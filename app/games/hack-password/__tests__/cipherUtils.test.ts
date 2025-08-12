import { describe, it, expect } from "vitest";
import { CipherUtils } from "../utils/cipherUtils";

describe("CipherUtils", () => {
  describe("Caesar Cipher", () => {
    it("should encode with positive shift", () => {
      expect(CipherUtils.caesarShift("HELLO", 3)).toBe("KHOOR");
      expect(CipherUtils.caesarShift("WORLD", 13)).toBe("JBEYQ");
    });

    it("should decode with correct shift", () => {
      expect(CipherUtils.caesarDecipher("KHOOR", 3)).toBe("HELLO");
      expect(CipherUtils.caesarDecipher("JBEYQ", 13)).toBe("WORLD");
    });

    it("should handle negative shifts", () => {
      expect(CipherUtils.caesarShift("HELLO", -3)).toBe("EBIIL");
      expect(CipherUtils.caesarDecipher("EBIIL", -3)).toBe("HELLO");
    });

    it("should wrap around alphabet", () => {
      expect(CipherUtils.caesarShift("XYZ", 3)).toBe("ABC");
      expect(CipherUtils.caesarShift("ABC", -3)).toBe("XYZ");
    });
  });

  describe("Vigenère Cipher", () => {
    it("should encode with key", () => {
      expect(CipherUtils.vigenere("HELLO", "KEY", true)).toBe("RIJVS");
      expect(CipherUtils.vigenere("ATTACK", "LEMON", true)).toBe("LXFOPV");
    });

    it("should decode with key", () => {
      expect(CipherUtils.vigenereDecipher("RIJVS", "KEY")).toBe("HELLO");
      expect(CipherUtils.vigenereDecipher("LXFOPV", "LEMON")).toBe("ATTACK");
    });

    it("should handle repeating key", () => {
      expect(CipherUtils.vigenere("ATTACKATDAWN", "LEMON", true)).toBe(
        "LXFOPVEFRNHR"
      );
    });
  });

  describe("Base64", () => {
    it("should detect valid base64", () => {
      expect(CipherUtils.detectBase64("SGVsbG8=")).toBe(true);
      expect(CipherUtils.detectBase64("U0VDUkVU")).toBe(true);
      expect(CipherUtils.detectBase64("Hello")).toBe(false);
    });

    it("should decode base64", () => {
      expect(CipherUtils.base64Decode("SGVsbG8=")).toBe("Hello");
      expect(CipherUtils.base64Decode("U0VDUkVU")).toBe("SECRET");
    });

    it("should encode to base64", () => {
      expect(CipherUtils.base64Encode("Hello")).toBe("SGVsbG8=");
      expect(CipherUtils.base64Encode("SECRET")).toBe("U0VDUkVU");
    });
  });

  describe("Leetspeak", () => {
    it("should decode basic leetspeak", () => {
      expect(CipherUtils.leetDecode("H4CK3R")).toBe("HACKER");
      expect(CipherUtils.leetDecode("P455W0RD")).toBe("PASSWORD");
      expect(CipherUtils.leetDecode("3L1T3")).toBe("ELITE");
    });

    it("should handle special characters", () => {
      expect(CipherUtils.leetDecode("C0MP|_3X")).toBe("COMPLEX");
      expect(CipherUtils.leetDecode("H@CK")).toBe("HACK");
    });
  });

  describe("Pattern Decoding", () => {
    it("should reverse text", () => {
      expect(CipherUtils.patternDecode("DROWSSAP", "reverse")).toBe("PASSWORD");
      expect(CipherUtils.patternDecode("OLLEH", "reverse")).toBe("HELLO");
    });

    it("should handle double reverse pattern", () => {
      expect(
        CipherUtils.patternDecode("TCEJORPRETNECRUOS", "double_reverse")
      ).toBe("SOURCEENCRYPTPROJECT");
    });
  });

  describe("Substitution Cipher", () => {
    it("should apply substitution mapping", () => {
      const mapping = { H: "T", E: "H", L: "E", O: "S" };
      expect(CipherUtils.substitutionMap("HELLO", mapping)).toBe("THEES");
    });

    it("should decode with reverse mapping", () => {
      const mapping = { H: "T", E: "H", L: "E", O: "S" };
      expect(CipherUtils.substitutionDecipher("THEES", mapping)).toBe("HELLO");
    });
  });

  describe("Frequency Analysis", () => {
    it("should count letter frequencies", () => {
      const freq = CipherUtils.getFrequencyData("HELLO");
      expect(freq.find((f) => f.letter === "L")).toEqual({
        letter: "L",
        count: 2,
        percentage: 40,
      });
      expect(freq.find((f) => f.letter === "H")).toEqual({
        letter: "H",
        count: 1,
        percentage: 20,
      });
    });

    it("should sort by frequency", () => {
      const freq = CipherUtils.getFrequencyData("AABBBC");
      expect(freq[0].letter).toBe("B"); // Most frequent
      expect(freq[1].letter).toBe("A");
      expect(freq[2].letter).toBe("C"); // Least frequent
    });
  });

  describe("Utility Functions", () => {
    it("should generate alphabet", () => {
      const alphabet = CipherUtils.getAlphabet();
      expect(alphabet).toHaveLength(26);
      expect(alphabet[0]).toBe("A");
      expect(alphabet[25]).toBe("Z");
    });

    it("should normalize answers", () => {
      expect(CipherUtils.normalizeAnswer("hello world!")).toBe("HELLOWORLD");
      expect(CipherUtils.normalizeAnswer("Test-123")).toBe("TEST123");
      expect(CipherUtils.normalizeAnswer("  spaces  ")).toBe("SPACES");
    });
  });

  describe("General Decode", () => {
    it("should decode caesar cipher", () => {
      expect(CipherUtils.attemptDecode("KHOOR", "caesar", { shift: 3 })).toBe(
        "HELLO"
      );
    });

    it("should decode vigenere cipher", () => {
      expect(
        CipherUtils.attemptDecode("RIJVS", "vigenere", { key: "KEY" })
      ).toBe("HELLO");
    });

    it("should decode base64", () => {
      expect(CipherUtils.attemptDecode("SGVsbG8=", "base64", {})).toBe("Hello");
    });

    it("should decode leetspeak", () => {
      expect(CipherUtils.attemptDecode("H4CK3R", "leet", {})).toBe("HACKER");
    });

    it("should decode patterns", () => {
      expect(
        CipherUtils.attemptDecode("DROWSSAP", "pattern", { pattern: "reverse" })
      ).toBe("PASSWORD");
    });
  });
});
