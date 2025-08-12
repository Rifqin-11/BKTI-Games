"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Shield, Home, Trophy } from "lucide-react";

const games = [
  {
    id: "coding-sprint",
    name: "Coding Sprint",
    description: "Arrange code blocks",
    icon: <Code2 className="w-4 h-4" />,
    path: "/games/coding-sprint",
    color: "bg-blue-600",
  },
  {
    id: "hack-password",
    name: "Hack the Password",
    description: "Crack cipher puzzles",
    icon: <Shield className="w-4 h-4" />,
    path: "/games/hack-password",
    color: "bg-emerald-600",
  },
];

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <header className="border-b bg-white border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-slate-600 hover:text-slate-800"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <div className="flex items-center gap-2">
                {games.map((game) => (
                  <Link key={game.id} href={game.path}>
                    <Button
                      variant={
                        pathname.startsWith(game.path) ? "default" : "ghost"
                      }
                      size="sm"
                      className="gap-2"
                    >
                      {game.icon}
                      {game.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/games/leaderboard">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-slate-300"
              >
                <Trophy className="w-4 h-4" />
                Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
