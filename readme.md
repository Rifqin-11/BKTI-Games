# Puzzle Games Hub

A collection of interactive puzzle games built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Games Included

### 1. Coding Sprint

Race against time to arrange jumbled code blocks into working solutions. Test your programming logic and pattern recognition skills with HTML, JavaScript, and TypeScript snippets.

### 2. Hack the Password

Crack passwords through logic puzzles and cipher challenges. Learn real cryptographic techniques including:

- Caesar Cipher
- Vigenère Cipher
- Substitution Cipher
- Base64 Encoding
- Leetspeak
- Pattern Ciphers

## Features

- 🎮 **Multiple Games**: Two distinct puzzle games with different mechanics
- ⏱️ **Timed Challenges**: Variable difficulty-based time limits
- 🏆 **Scoring System**: Smart scoring with time bonuses and streak multipliers
- 📊 **Leaderboards**: Combined leaderboard across all games
- 🎯 **Difficulty Levels**: Easy, Medium, and Hard difficulties
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Dark Theme**: Beautiful terminal-inspired UI
- ♿ **Accessibility**: Keyboard navigation and ARIA labels
- 💾 **Local Storage**: Saves scores and preferences

## Installation

### Prerequisites

- Node.js 16+ or 18+
- npm, yarn, or pnpm

### Quick Start

1. **Clone or download the project**
2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Install additional required packages:**

   ```bash
   npm install dompurify
   npm install -D @types/dompurify
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to see the games hub

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── games/
│   ├── layout.tsx              # Shared games layout with navigation
│   ├── page.tsx                # Games hub homepage
│   ├── leaderboard/
│   │   └── page.tsx            # Combined leaderboard
│   ├── coding-sprint/          # First game
│   │   ├── page.tsx
│   │   ├── play/page.tsx
│   │   ├── results/page.tsx
│   │   └── ... (components, context, hooks)
│   └── hack-password/          # Second game (NEW)
│       ├── page.tsx            # Game overview and difficulty selection
│       ├── play/page.tsx       # Main game interface
│       ├── results/page.tsx    # Results and statistics
│       ├── puzzles.ts          # 24+ cipher puzzles
│       ├── components/         # Game-specific components
│       │   ├── CipherPanel.tsx
│       │   ├── GuessForm.tsx
│       │   ├── Timer.tsx
│       │   ├── Hud.tsx
│       │   ├── LogFeed.tsx
│       │   ├── FrequencyChart.tsx
│       │   └── AlphabetReference.tsx
│       ├── context/
│       │   └── GameContext.tsx # Game state management
│       ├── hooks/
│       │   └── useGameTimer.ts
│       ├── utils/
│       │   └── cipherUtils.ts  # Cryptographic utilities
│       └── __tests__/
│           └── cipherUtils.test.ts
components/
└── ui/                         # shadcn/ui components
```

## Game Mechanics

### Hack the Password

#### Cipher Types

- **Caesar Cipher**: Each letter shifted by fixed amount
- **Vigenère Cipher**: Polyalphabetic cipher with repeating key
- **Substitution Cipher**: Each letter maps to another consistently
- **Base64**: Binary-to-text encoding
- **Leetspeak**: Letters replaced with numbers/symbols (4=A, 3=E, etc.)
- **Pattern Ciphers**: Geometric rearrangements and transformations

#### Scoring

- Base points (Easy: 100, Medium: 200, Hard: 300)
- Time bonus: (timeLeft / timeLimit)
- Hint penalty: -25% if hint used
- Streak multiplier: +10% per 3 consecutive solves
- Wrong answer penalty: -5 seconds, -1 life, streak reset

#### Tools

- **Hint System**: Contextual clues for each cipher type
- **Alphabet Reference**: Shows standard alphabet and cipher-specific help
- **Frequency Analysis**: Letter frequency chart with English reference
- **Access Log**: Real-time terminal-style activity feed

## Testing

Run the cipher utility tests:

```bash
npm test
# or run with UI
npm run test:ui
```

## Technologies Used

- **Next.js 14** - App Router, TypeScript
- **Tailwind CSS** - Styling and responsive design
- **shadcn/ui** - UI component library
- **Recharts** - Charts for frequency analysis
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **DOMPurify** - Security for user input
- **Vitest** - Unit testing

## Security Features

- All cryptographic operations run client-side
- No `eval()` usage
- Input sanitization with DOMPurify
- Educational focus - no real hacking involved

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

- Built for offline use once loaded
- No external font dependencies
- Optimized images and assets
- Client-side state management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Include tests for new features
5. Submit a pull request

## License

MIT License - Feel free to use this code in your own projects!

## Deployment

This project is ready to deploy to any platform that supports Next.js:

- **Vercel**: `vercel deploy`
- **Netlify**: Build command: `npm run build`, Publish directory: `.next`
- **Docker**: Dockerfile included for containerization

## Game Design Philosophy

- **Educational**: Learn real cryptographic concepts
- **Progressive**: Difficulty scales naturally
- **Accessible**: Keyboard navigation and screen reader support
- **Engaging**: Terminal aesthetic with real-time feedback
- **Competitive**: Personal bests and leaderboards

---

Ready to hack some passwords? Start your cryptographic journey at `/games/hack-password`!
