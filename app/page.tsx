import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Timer,
  Trophy,
  Zap,
  Play,
  ArrowRight,
  Shield,
  Brain,
  Target,
} from "lucide-react";
import Logo from "@/public/logo.png";
import Image from "next/image";

const games = [
  {
    id: "coding-sprint",
    name: "Coding Sprint",
    description: "Arrange code blocks into working solutions",
    longDescription:
      "Race against time to organize jumbled HTML, JavaScript, and TypeScript code blocks into proper working solutions.",
    icon: <Code2 className="w-8 h-8" />,
    color: "bg-blue-600",
    gradient: "from-blue-600 to-purple-600",
    path: "/games/coding-sprint",
    features: [
      "Real code snippets",
      "Drag & drop interface",
      "3 difficulty levels",
      "Time-based scoring",
    ],
    difficulties: [
      { name: "Beginner", time: "90s", color: "bg-green-500" },
      { name: "Intermediate", time: "60s", color: "bg-orange-500" },
      { name: "Advanced", time: "45s", color: "bg-red-500" },
    ],
  },
  {
    id: "hack-password",
    name: "Hack the Password",
    description: "Crack ciphers and decode encrypted messages",
    longDescription:
      "Test your cryptographic knowledge by solving various cipher types including Caesar, Vigenère, and Base64.",
    icon: <Shield className="w-8 h-8" />,
    color: "bg-emerald-600",
    gradient: "from-emerald-600 to-cyan-600",
    path: "/games/hack-password",
    features: [
      "6 cipher types",
      "Frequency analysis",
      "Hint system",
      "Educational content",
    ],
    difficulties: [
      { name: "Easy", time: "30-60s", color: "bg-green-500" },
      { name: "Medium", time: "60-90s", color: "bg-orange-500" },
      { name: "Hard", time: "75-120s", color: "bg-red-500" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-200/30 rounded-full blur-xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-xl border border-white/50">
                  <Image
                    src={Logo}
                    alt="BKTI MINI GAMES"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  BKTI MINI GAMES
                </h1>
                <div className="flex items-center justify-center gap-2 text-slate-500">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Interactive Learning Platform
                  </span>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Hero Description */}
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-4 font-light">
                Challenge yourself with our collection of{" "}
                <span className="font-semibold text-blue-600">
                  interactive coding
                </span>{" "}
                and{" "}
                <span className="font-semibold text-purple-600">
                  cryptography games
                </span>
              </p>
              <p className="text-base text-slate-500 leading-relaxed">
                Test your programming skills and problem-solving abilities with
                real-world scenarios designed for learning and fun
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="#games" className="scroll-smooth">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Choose Your Game
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <Link href="/games/leaderboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 border-2 border-slate-300 hover:border-slate-400 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 group"
                >
                  <Trophy className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  View Leaderboard
                </Button>
              </Link>
            </div>

            {/* Stats or Features Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                <div className="text-xl font-bold text-blue-600">2</div>
                <div className="text-xs text-slate-600 font-medium">
                  Unique Games
                </div>
              </div>
              <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                <div className="text-xl font-bold text-purple-600">6+</div>
                <div className="text-xs text-slate-600 font-medium">
                  Challenge Types
                </div>
              </div>
              <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50">
                <div className="text-xl font-bold text-emerald-600">∞</div>
                <div className="text-xs text-slate-600 font-medium">
                  Learning Opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Games Selection */}
      <div id="games" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">
            Choose Your Challenge
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Two unique puzzle experiences designed to test different aspects of
            your technical skills
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {games.map((game) => (
            <Card
              key={game.id}
              className="hover:shadow-xl transition-all duration-300 group border-slate-200 bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 ${game.color} rounded-2xl text-white group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {game.icon}
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      Interactive
                    </Badge>
                  </div>
                </div>

                <CardTitle
                  className={`text-2xl font-bold bg-gradient-to-r ${game.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left`}
                >
                  {game.name}
                </CardTitle>
                <CardDescription className="text-base text-slate-600 leading-relaxed">
                  {game.longDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Game Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {game.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Difficulty Levels */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Difficulty Levels
                  </h4>
                  <div className="flex gap-2">
                    {game.difficulties.map((diff, index) => (
                      <div
                        key={index}
                        className={`${diff.color} text-white text-xs px-2 py-1 rounded-full font-medium`}
                      >
                        {diff.name} ({diff.time})
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link href={game.path} className="block">
                  <Button
                    className={`w-full text-lg py-6 ${game.color} hover:opacity-90 shadow-lg hover:shadow-xl transition-all group-hover:scale-105`}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Playing
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/50 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              Why Choose Our Games?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Designed with education and engagement in mind, featuring modern
              web technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow bg-white/80 border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">
                  Time Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Variable time limits based on difficulty levels to keep you
                  engaged and motivated
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white/80 border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">
                  Smart Scoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Advanced scoring system with time bonuses, streak multipliers,
                  and leaderboards
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white/80 border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">
                  Educational
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Learn real programming concepts and cryptographic techniques
                  through gameplay
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white/80 border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">
                  Responsive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Works perfectly on desktop, tablet, and mobile with intuitive
                  touch controls
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            {/* Footer Logo and Branding */}
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 backdrop-blur-sm rounded-full">
                  <Image
                    src={Logo}
                    alt="BKTI MINI GAMES"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    BKTI MINI GAMES
                  </h3>
                  <p className="text-slate-600 text-sm">Teknik Elektro Undip</p>
                </div>
              </div>

              <div className="max-w-4xl">
                <p className="text-slate-700 leading-relaxed">
                  Developed by{" "}
                  <span className="font-semibold text-blue-600">
                    Biro Konsentrasi Teknologi Informasi (BKTI)
                  </span>
                  to provide innovative and engaging educational experiences
                  through interactive gaming and problem-solving challenges.
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-200 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-600 text-sm">
                  © 2024 BKTI Mini Games. Developed for educational purposes.
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-slate-600 text-sm">
                    Powered by BKTI TEKNIK ELEKTRO UNDIP
                  </span>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs border-slate-300 text-slate-600"
                    >
                      Educational
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border-slate-300 text-slate-600"
                    >
                      Interactive
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border-slate-300 text-slate-600"
                    >
                      Learning
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
