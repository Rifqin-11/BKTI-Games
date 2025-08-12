"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { CipherUtils } from "../utils/cipherUtils";

interface AlphabetReferenceProps {
  isVisible: boolean;
  cipherType?: string;
}

export function AlphabetReference({
  isVisible,
  cipherType,
}: AlphabetReferenceProps) {
  if (!isVisible) return null;

  const alphabet = CipherUtils.getAlphabet();
  const numbers = Array.from({ length: 26 }, (_, i) => i + 1);

  const getCaesarExample = (shift: number) => {
    return alphabet.map((letter) => CipherUtils.caesarShift(letter, shift));
  };

  const getHelpText = () => {
    switch (cipherType) {
      case "caesar":
        return "Caesar cipher shifts each letter by a fixed amount. A=1, B=2, etc.";
      case "vigenere":
        return "Vigenère uses a keyword. Each letter position uses different shift.";
      case "substitution":
        return "Each letter consistently maps to another letter.";
      case "base64":
        return "Base64 uses A-Z, a-z, 0-9, +, / characters with = padding.";
      case "leet":
        return "Leetspeak replaces letters with numbers/symbols: 4=A, 3=E, 1=I, 0=O, 5=S, 7=T";
      default:
        return "Reference alphabet for cryptanalysis.";
    }
  };

  return (
    <Card className="bg-white border-emerald-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-600 font-mono text-sm">
          <Eye className="w-4 h-4" />
          ALPHABET REFERENCE
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-4">
          {/* Help Text */}
          <div className="bg-slate-50 rounded p-2 border border-emerald-200">
            <div className="text-emerald-600 font-mono text-xs">
              {getHelpText()}
            </div>
          </div>

          {/* Standard Alphabet with Numbers */}
          <div className="space-y-2">
            <div className="text-emerald-600 font-mono text-xs font-medium">
              STANDARD ALPHABET
            </div>
            <div className="grid grid-cols-13 gap-1 text-center font-mono text-sm">
              {alphabet.map((letter, index) => (
                <div key={letter} className="space-y-1">
                  <div className="text-emerald-600 font-bold">{letter}</div>
                  <div className="text-emerald-500 text-xs">
                    {numbers[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caesar Examples */}
          {cipherType === "caesar" && (
            <div className="space-y-2">
              <div className="text-orange-600 font-mono text-xs font-medium">
                CAESAR EXAMPLES
              </div>

              <div className="space-y-2">
                <div className="bg-slate-50 rounded p-2 border border-orange-200">
                  <div className="text-orange-600 font-mono text-xs mb-1">
                    SHIFT +3 (ROT3)
                  </div>
                  <div className="grid grid-cols-13 gap-1 text-center font-mono text-xs">
                    {getCaesarExample(3).map((letter, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-slate-500">{alphabet[index]}</div>
                        <div className="text-orange-500">↓</div>
                        <div className="text-orange-600 font-bold">
                          {letter}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 rounded p-2 border border-orange-200">
                  <div className="text-orange-600 font-mono text-xs mb-1">
                    SHIFT +13 (ROT13)
                  </div>
                  <div className="grid grid-cols-13 gap-1 text-center font-mono text-xs">
                    {getCaesarExample(13).map((letter, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-slate-500">{alphabet[index]}</div>
                        <div className="text-orange-500">↓</div>
                        <div className="text-orange-600 font-bold">
                          {letter}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leetspeak Reference */}
          {cipherType === "leet" && (
            <div className="space-y-2">
              <div className="text-purple-600 font-mono text-xs font-medium">
                COMMON LEETSPEAK
              </div>
              <div className="bg-slate-50 rounded p-2 border border-purple-200">
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  <div className="text-center">
                    <div className="text-purple-600">A</div>
                    <div className="text-purple-500">4, @</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600">E</div>
                    <div className="text-purple-500">3</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600">I</div>
                    <div className="text-purple-500">1, !</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600">O</div>
                    <div className="text-purple-500">0</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600">S</div>
                    <div className="text-purple-500">5, $</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600">T</div>
                    <div className="text-purple-500">7</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600">L</div>
                    <div className="text-purple-500">|_</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600">B</div>
                    <div className="text-purple-500">8</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Base64 Reference */}
          {cipherType === "base64" && (
            <div className="space-y-2">
              <div className="text-blue-600 font-mono text-xs font-medium">
                BASE64 CHARACTERS
              </div>
              <div className="bg-slate-50 rounded p-2 border border-blue-200">
                <div className="text-blue-600 font-mono text-xs space-y-1">
                  <div>A-Z (uppercase): values 0-25</div>
                  <div>a-z (lowercase): values 26-51</div>
                  <div>0-9 (digits): values 52-61</div>
                  <div>+ / : values 62-63</div>
                  <div>= : padding character</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
