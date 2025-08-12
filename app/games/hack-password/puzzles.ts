export type CipherType =
  | "caesar"
  | "vigenere"
  | "substitution"
  | "base64"
  | "leet"
  | "pattern";

export interface Puzzle {
  id: string;
  cipher: CipherType;
  cipherParams: Record<string, any>;
  ciphertext: string;
  plaintext: string;
  hint: string;
  explanation: string;
  timeLimit: number;
  difficulty: "easy" | "medium" | "hard";
}

export const puzzles: Puzzle[] = [
  // Easy Puzzles (8)
  {
    id: "easy-1",
    cipher: "caesar",
    cipherParams: { shift: 3 },
    ciphertext: "KHOOR",
    plaintext: "HELLO",
    hint: "Each letter is shifted by the same amount. A becomes D.",
    explanation:
      "Caesar cipher with shift of 3. Each letter moves 3 positions forward in the alphabet.",
    timeLimit: 60,
    difficulty: "easy",
  },
  {
    id: "easy-2",
    cipher: "base64",
    cipherParams: {},
    ciphertext: "U0VDUkVU",
    plaintext: "SECRET",
    hint: "This looks like it ends with equals signs when longer.",
    explanation: "Base64 encoding. Decode using atob() or base64 decoder.",
    timeLimit: 45,
    difficulty: "easy",
  },
  {
    id: "easy-3",
    cipher: "leet",
    cipherParams: {},
    ciphertext: "H4CK3R",
    plaintext: "HACKER",
    hint: "Numbers replace similar-looking letters.",
    explanation: "Leetspeak: 4=A, 3=E, 1=I, 0=O, 5=S, 7=T",
    timeLimit: 30,
    difficulty: "easy",
  },
  {
    id: "easy-4",
    cipher: "caesar",
    cipherParams: { shift: 13 },
    ciphertext: "EBG13",
    plaintext: "ROT13",
    hint: "This is a famous rotation cipher.",
    explanation:
      "ROT13 - Caesar cipher with shift of 13. Apply it twice to decode.",
    timeLimit: 45,
    difficulty: "easy",
  },
  {
    id: "easy-5",
    cipher: "substitution",
    cipherParams: { mapping: { A: "Z", B: "Y", C: "X", D: "W", E: "V" } },
    ciphertext: "XZWV",
    plaintext: "CAVE",
    hint: "A=Z, B=Y, each letter maps to its reverse position.",
    explanation:
      "Atbash cipher - each letter is replaced by its mirror in the alphabet.",
    timeLimit: 50,
    difficulty: "easy",
  },
  {
    id: "easy-6",
    cipher: "pattern",
    cipherParams: { pattern: "reverse" },
    ciphertext: "DROWSSAP",
    plaintext: "PASSWORD",
    hint: "Read it backwards.",
    explanation: "Simple reversal - the text is written in reverse order.",
    timeLimit: 30,
    difficulty: "easy",
  },
  {
    id: "easy-7",
    cipher: "leet",
    cipherParams: {},
    ciphertext: "P455W0RD",
    plaintext: "PASSWORD",
    hint: "Replace numbers with letters they look like.",
    explanation: "Leetspeak substitution: 4=A, 5=S, 0=O",
    timeLimit: 40,
    difficulty: "easy",
  },
  {
    id: "easy-8",
    cipher: "base64",
    cipherParams: {},
    ciphertext: "QURNSU4=",
    plaintext: "ADMIN",
    hint: "Base64 often ends with = padding.",
    explanation: "Base64 encoding with padding. The = indicates the end.",
    timeLimit: 45,
    difficulty: "easy",
  },

  // Medium Puzzles (8)
  {
    id: "medium-1",
    cipher: "vigenere",
    cipherParams: { key: "KEY" },
    ciphertext: "RIJVS",
    plaintext: "HELLO",
    hint: "Repeating key cipher. Key is short and common.",
    explanation:
      'Vigenère cipher with key "KEY". Each letter uses a different shift based on the key position.',
    timeLimit: 75,
    difficulty: "medium",
  },
  {
    id: "medium-2",
    cipher: "substitution",
    cipherParams: { mapping: { H: "T", E: "H", L: "E", O: "S" } },
    ciphertext: "THEES",
    plaintext: "HELLO",
    hint: "Each letter maps to another consistently. E appears twice.",
    explanation: "Monoalphabetic substitution. H→T, E→H, L→E, O→S",
    timeLimit: 90,
    difficulty: "medium",
  },
  {
    id: "medium-3",
    cipher: "caesar",
    cipherParams: { shift: -7 },
    ciphertext: "HBKTPVK",
    plaintext: "OFFICER",
    hint: "Try shifting backwards instead of forwards.",
    explanation:
      "Caesar cipher with negative shift of 7. Move 7 positions back in alphabet.",
    timeLimit: 60,
    difficulty: "medium",
  },
  {
    id: "medium-4",
    cipher: "pattern",
    cipherParams: { pattern: "alternate" },
    ciphertext: "SCRT",
    plaintext: "SECRET",
    hint: "Some letters are missing. Think about patterns.",
    explanation: "Every other letter removed. Full word: S_E_C_R_E_T → SECRET",
    timeLimit: 70,
    difficulty: "medium",
  },
  {
    id: "medium-5",
    cipher: "vigenere",
    cipherParams: { key: "CODE" },
    ciphertext: "EQFKP",
    plaintext: "CRACK",
    hint: "Four letter key, relates to programming.",
    explanation:
      'Vigenère with key "CODE". C→E(+2), R→Q(+4), A→F(+5), C→K(+3), K→P(+5)',
    timeLimit: 80,
    difficulty: "medium",
  },
  {
    id: "medium-6",
    cipher: "substitution",
    cipherParams: { mapping: { S: "A", Y: "B", T: "C", E: "D", M: "E" } },
    ciphertext: "AYBCED",
    plaintext: "SYSTEM",
    hint: "Look for frequency patterns. E is most common in English.",
    explanation:
      "Frequency analysis helps. Map most common cipher letters to common English letters.",
    timeLimit: 90,
    difficulty: "medium",
  },
  {
    id: "medium-7",
    cipher: "pattern",
    cipherParams: { pattern: "spiral" },
    ciphertext: "TKCRHA",
    plaintext: "HACKER",
    hint: "Letters might be rearranged in a geometric pattern.",
    explanation:
      "Letters arranged in a spiral and read differently. H-A-C-K-E-R becomes T-K-C-R-H-A.",
    timeLimit: 85,
    difficulty: "medium",
  },
  {
    id: "medium-8",
    cipher: "leet",
    cipherParams: {},
    ciphertext: "C0MP|_3X",
    plaintext: "COMPLEX",
    hint: "Advanced leetspeak with special characters.",
    explanation:
      "Complex leetspeak: 0=O, |_=L, 3=E, using special character combinations.",
    timeLimit: 70,
    difficulty: "medium",
  },

  // Hard Puzzles (8)
  {
    id: "hard-1",
    cipher: "vigenere",
    cipherParams: { key: "CRYPTO" },
    ciphertext: "EWWEPO",
    plaintext: "ACCESS",
    hint: "Six letter key related to encryption.",
    explanation:
      'Vigenère with key "CRYPTO". Complex polyalphabetic substitution.',
    timeLimit: 90,
    difficulty: "hard",
  },
  {
    id: "hard-2",
    cipher: "substitution",
    cipherParams: {
      mapping: {
        M: "A",
        A: "B",
        S: "C",
        T: "D",
        E: "E",
        R: "F",
        H: "G",
        C: "H",
        K: "I",
        F: "J",
        O: "K",
        B: "L",
        J: "M",
        Y: "N",
        I: "O",
        L: "P",
        N: "Q",
        U: "R",
        X: "S",
        V: "T",
        Q: "U",
        W: "V",
        G: "W",
        Z: "X",
        P: "Y",
        D: "Z",
      },
    },
    ciphertext: "JMXVEUFMSHEU",
    plaintext: "MASTEROFHACK",
    hint: "Complete alphabet substitution. Look for common patterns.",
    explanation:
      "Full monoalphabetic cipher. Each letter consistently maps to another.",
    timeLimit: 120,
    difficulty: "hard",
  },
  {
    id: "hard-3",
    cipher: "pattern",
    cipherParams: { pattern: "matrix" },
    ciphertext: "NWETRLKEOVI",
    plaintext: "NETWORKEVIL",
    hint: "Think about arranging letters in rows and columns.",
    explanation:
      "Letters arranged in a matrix and read column-wise instead of row-wise.",
    timeLimit: 100,
    difficulty: "hard",
  },
  {
    id: "hard-4",
    cipher: "caesar",
    cipherParams: { shift: 17 },
    ciphertext: "JFTLJMP",
    plaintext: "SYSTEMS",
    hint: "Large shift value. Try working backwards from Z.",
    explanation:
      "Caesar cipher with shift of 17. Large shifts can be confusing.",
    timeLimit: 80,
    difficulty: "hard",
  },
  {
    id: "hard-5",
    cipher: "vigenere",
    cipherParams: { key: "QUANTUM" },
    ciphertext: "VQBKRXY",
    plaintext: "FIREWALL",
    hint: "Seven letter key, relates to advanced computing.",
    explanation: 'Vigenère with key "QUANTUM". Advanced polyalphabetic cipher.',
    timeLimit: 110,
    difficulty: "hard",
  },
  {
    id: "hard-6",
    cipher: "pattern",
    cipherParams: { pattern: "fibonacci" },
    ciphertext: "EPCTYNORI",
    plaintext: "ENCRYPTION",
    hint: "Pattern follows a famous mathematical sequence.",
    explanation: "Letters rearranged following Fibonacci sequence positions.",
    timeLimit: 95,
    difficulty: "hard",
  },
  {
    id: "hard-7",
    cipher: "substitution",
    cipherParams: {
      mapping: {
        Z: "A",
        Y: "B",
        X: "C",
        W: "D",
        V: "E",
        U: "F",
        T: "G",
        S: "H",
        R: "I",
        Q: "J",
        P: "K",
        O: "L",
        N: "M",
        M: "N",
        L: "O",
        K: "P",
        J: "Q",
        I: "R",
        H: "S",
        G: "T",
        F: "U",
        E: "V",
        D: "W",
        C: "X",
        B: "Y",
        A: "Z",
      },
    },
    ciphertext: "ZFGSLI",
    plaintext: "AUTHOR",
    hint: "Complete reverse alphabet. A↔Z, B↔Y, etc.",
    explanation: "Atbash cipher - complete alphabet reversal substitution.",
    timeLimit: 75,
    difficulty: "hard",
  },
  {
    id: "hard-8",
    cipher: "pattern",
    cipherParams: { pattern: "double_reverse" },
    ciphertext: "TCEJORPRETNECRUOS",
    plaintext: "SOURCEENCRYPTPROJECT",
    hint: "Multiple transformations applied. Think step by step.",
    explanation: "Text split in half, each half reversed, then concatenated.",
    timeLimit: 120,
    difficulty: "hard",
  },
];

export function getPuzzlesByDifficulty(
  difficulty: "easy" | "medium" | "hard"
): Puzzle[] {
  return puzzles.filter((puzzle) => puzzle.difficulty === difficulty);
}

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find((puzzle) => puzzle.id === id);
}
