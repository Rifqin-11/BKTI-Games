import DOMPurify from "dompurify";

export class CipherUtils {
  // Caesar Cipher
  static caesarShift(text: string, shift: number): string {
    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char.match(/[A-Z]/)) {
          const code = char.charCodeAt(0) - 65;
          const shifted = (code + shift + 26) % 26;
          return String.fromCharCode(shifted + 65);
        }
        return char;
      })
      .join("");
  }

  static caesarDecipher(ciphertext: string, shift: number): string {
    return this.caesarShift(ciphertext, -shift);
  }

  // Vigenère Cipher
  static vigenere(text: string, key: string, encrypt: boolean = true): string {
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
    let result = "";

    for (let i = 0; i < cleanText.length; i++) {
      const textChar = cleanText[i];
      const keyChar = cleanKey[i % cleanKey.length];

      const textCode = textChar.charCodeAt(0) - 65;
      const keyCode = keyChar.charCodeAt(0) - 65;

      let resultCode: number;
      if (encrypt) {
        resultCode = (textCode + keyCode) % 26;
      } else {
        resultCode = (textCode - keyCode + 26) % 26;
      }

      result += String.fromCharCode(resultCode + 65);
    }

    return result;
  }

  static vigenereDecipher(ciphertext: string, key: string): string {
    return this.vigenere(ciphertext, key, false);
  }

  // Substitution Cipher
  static substitutionMap(
    text: string,
    mapping: Record<string, string>
  ): string {
    return text
      .toUpperCase()
      .split("")
      .map((char) => mapping[char] || char)
      .join("");
  }

  static substitutionDecipher(
    ciphertext: string,
    mapping: Record<string, string>
  ): string {
    // Create reverse mapping
    const reverseMapping: Record<string, string> = {};
    Object.entries(mapping).forEach(([key, value]) => {
      reverseMapping[value] = key;
    });
    return this.substitutionMap(ciphertext, reverseMapping);
  }

  // Base64
  static detectBase64(text: string): boolean {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    return base64Regex.test(text) && text.length % 4 === 0;
  }

  static base64Decode(text: string): string {
    try {
      return atob(text);
    } catch {
      return "";
    }
  }

  static base64Encode(text: string): string {
    try {
      return btoa(text);
    } catch {
      return "";
    }
  }

  // Leetspeak
  static leetDecode(text: string): string {
    const leetMap: Record<string, string> = {
      "4": "A",
      "@": "A",
      "8": "B",
      "(": "C",
      "[": "C",
      "3": "E",
      "€": "E",
      "6": "G",
      "#": "H",
      "1": "I",
      "!": "I",
      "|": "I",
      "7": "T",
      "0": "O",
      "5": "S",
      $: "S",
      "2": "Z",
      "|_": "L",
      "\\/": "V",
      "\\|/": "W",
      "><": "X",
    };

    let result = text.toUpperCase();

    // Handle multi-character replacements first
    Object.entries(leetMap).forEach(([leet, normal]) => {
      if (leet.length > 1) {
        result = result.replace(
          new RegExp(leet.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          normal
        );
      }
    });

    // Handle single character replacements
    Object.entries(leetMap).forEach(([leet, normal]) => {
      if (leet.length === 1) {
        result = result.replace(
          new RegExp(leet.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
          normal
        );
      }
    });

    return result;
  }

  // Pattern decoding
  static patternDecode(text: string, pattern: string): string {
    switch (pattern) {
      case "reverse":
        return text.split("").reverse().join("");

      case "alternate":
        // Add missing vowels back
        let result = "";
        const vowels = "AEIOU";
        let vowelIndex = 0;
        for (const char of text) {
          result += char;
          if (vowelIndex < vowels.length) {
            result += vowels[vowelIndex];
            vowelIndex++;
          }
        }
        return result;

      case "spiral":
        // Simple character rearrangement
        return text.split("").sort().join("");

      case "matrix":
        // For demonstration, reverse the process
        const len = text.length;
        const cols = Math.ceil(Math.sqrt(len));
        const rows = Math.ceil(len / cols);
        const matrix: string[][] = [];

        // Fill matrix column-wise
        for (let i = 0; i < rows; i++) {
          matrix[i] = [];
        }

        let idx = 0;
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            if (idx < len) {
              matrix[row][col] = text[idx++];
            }
          }
        }

        // Read row-wise
        return matrix.map((row) => row.join("")).join("");

      case "fibonacci":
        // Simplified fibonacci rearrangement
        const fib = [1, 1, 2, 3, 5, 8, 13];
        const chars = text.split("");
        const result_arr: string[] = new Array(chars.length);

        for (let i = 0; i < chars.length; i++) {
          const fibPos = fib[i % fib.length] % chars.length;
          result_arr[fibPos] = chars[i];
        }

        return result_arr.filter(Boolean).join("");

      case "double_reverse":
        const mid = Math.floor(text.length / 2);
        const first = text.slice(0, mid).split("").reverse().join("");
        const second = text.slice(mid).split("").reverse().join("");
        return second + first;

      default:
        return text;
    }
  }

  // Frequency analysis
  static getFrequencyData(
    text: string
  ): { letter: string; count: number; percentage: number }[] {
    const counts: Record<string, number> = {};
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, "");

    for (const char of cleanText) {
      counts[char] = (counts[char] || 0) + 1;
    }

    const total = cleanText.length;
    return Object.entries(counts)
      .map(([letter, count]) => ({
        letter,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }

  // General decoding attempt
  static attemptDecode(
    ciphertext: string,
    cipher: string,
    params: any
  ): string {
    const cleanText = DOMPurify.sanitize(ciphertext);

    switch (cipher) {
      case "caesar":
        return this.caesarDecipher(cleanText, params.shift || 0);

      case "vigenere":
        return this.vigenereDecipher(cleanText, params.key || "");

      case "substitution":
        return this.substitutionDecipher(cleanText, params.mapping || {});

      case "base64":
        return this.base64Decode(cleanText);

      case "leet":
        return this.leetDecode(cleanText);

      case "pattern":
        return this.patternDecode(cleanText, params.pattern || "");

      default:
        return cleanText;
    }
  }

  // Helper to generate alphabet for display
  static getAlphabet(): string[] {
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  }

  // Helper to validate answer
  static normalizeAnswer(text: string): string {
    return text.toUpperCase().replace(/[^A-Z0-9]/g, "");
  }
}
