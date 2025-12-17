# Explorer - Multi-Lens AI Chat Interface

A React-based simulation exploring how users interact with AI through multiple perspective "lenses." This prototype investigates conversational interfaces that encourage critical thinking by presenting diverse viewpoints.

## Features

### Three Exploration Modes

1. **Standard Mode** - Single lens perspective for focused exploration
2. **Split View** - Dual-lens side-by-side comparison with @mentions for targeted questions
3. **Synthesis Mode** (Beta) - Multi-lens debate with archiving and visual synthesis mapping

### Key Interactions

- **Lens Selection** - Choose from 8 distinct perspectives (Effectiveness, Equity, Autonomy, Collective, Practical, Long-term, Human, Systems)
- **Username Personalization** - Casual onboarding with personalized chat experience
- **Debate Format** - Watch lenses discuss and challenge each other's viewpoints
- **Archive & Synthesize** - Save meaningful insights and create visual synthesis maps
- **Invite Lenses** - Dynamically add up to 4 lenses to ongoing debates

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Project Structure

```
hey/
├── Explorer.jsx      # Main application component
├── src/
│   ├── App.jsx       # App entry point
│   ├── main.jsx      # React mount
│   └── index.css     # Global styles
├── public/
│   └── logo.png      # Header logo
└── package.json
```

## Usage Flow

1. **Welcome** - Enter your username
2. **API Setup** - Configure API key (simulated)
3. **Choose Mode** - Select Standard, Split View, or Synthesis Mode
4. **Select Lenses** - Pick 1-2 lenses based on mode
5. **Ask Questions** - Explore controversial topics through multiple perspectives
6. **Archive & Synthesize** - (Synthesis Mode) Build your own understanding

## Tech Stack

- React 18
- Vite
- Lucide React (icons)
- CSS-in-JS (inline styles)

## Notes

This is a research prototype simulating AI responses locally. No actual API calls are made—all responses are generated client-side to demonstrate the interaction patterns.

---

Built for exploring multi-perspective AI conversations.
