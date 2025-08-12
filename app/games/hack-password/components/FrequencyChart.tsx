"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BarChart3 } from "lucide-react";
import { CipherUtils } from "../utils/cipherUtils";

interface FrequencyChartProps {
  text: string;
  isVisible: boolean;
}

export function FrequencyChart({ text, isVisible }: FrequencyChartProps) {
  if (!isVisible) return null;

  const frequencyData = CipherUtils.getFrequencyData(text);

  // Add zero values for missing letters
  const alphabet = CipherUtils.getAlphabet();
  const completeData = alphabet.map((letter) => {
    const existing = frequencyData.find((item) => item.letter === letter);
    return existing || { letter, count: 0, percentage: 0 };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-emerald-300 rounded p-2 font-mono text-xs shadow-lg">
          <p className="text-emerald-600">{`${label}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white border-emerald-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-600 font-mono text-sm">
          <BarChart3 className="w-4 h-4" />
          FREQUENCY ANALYSIS
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="space-y-4">
          {/* Chart */}
          <div
            className="bg-slate-50 rounded p-2 border border-slate-200"
            style={{ height: "200px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={completeData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis
                  dataKey="letter"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#059669" }}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="percentage"
                  fill="#059669"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Letters */}
          <div className="space-y-2">
            <div className="text-emerald-600 font-mono text-xs font-medium">
              MOST FREQUENT
            </div>
            <div className="grid grid-cols-5 gap-2">
              {frequencyData.slice(0, 5).map((item, index) => (
                <div key={item.letter} className="text-center">
                  <div className="text-emerald-600 font-mono text-lg font-bold">
                    {item.letter}
                  </div>
                  <div className="text-emerald-500 font-mono text-xs">
                    {item.percentage}%
                  </div>
                  <div className="text-slate-500 font-mono text-xs">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* English Reference */}
          <div className="bg-slate-50 rounded p-2 border border-emerald-200">
            <div className="text-emerald-600 font-mono text-xs mb-1">
              ENGLISH FREQUENCY (REFERENCE)
            </div>
            <div className="text-emerald-500 font-mono text-xs">
              E(12.7%) T(9.1%) A(8.2%) O(7.5%) I(7.0%) N(6.7%) S(6.3%) H(6.1%)
              R(6.0%)
            </div>
          </div>

          {/* Analysis Stats */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-50 rounded p-2 border border-emerald-200">
              <div className="text-emerald-600">TOTAL LETTERS</div>
              <div className="text-emerald-600">
                {text.replace(/[^A-Z]/g, "").length}
              </div>
            </div>
            <div className="bg-slate-50 rounded p-2 border border-emerald-200">
              <div className="text-emerald-600">UNIQUE LETTERS</div>
              <div className="text-emerald-600">{frequencyData.length}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
