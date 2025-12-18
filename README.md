# Explorer - Multi-Lens AI Chat Interface

A React-based research simulation exploring how users interact with AI through multiple perspective "lenses." This prototype investigates conversational interfaces that encourage critical thinking by presenting diverse viewpoints simultaneously to mitigate "Oracle" pattern responses.

## Live Demo
The project is optimized for deployment on **Vercel**. 

## Key Updates & Features

### Real AI Integration
- **Direct API Connection**: Support for **OpenAI (GPT-4o)** and **Anthropic (Claude 3)**.
- **Live Key Validation**: Integrated validation step to ensure API keys are authentic before starting.
- **Privacy-First**: API keys are stored locally in the session and never transmitted to our servers.

### Global Navigation (Dock Bar)
- **Three-Tiered Experience**:
    1. **Simulation**: The core interactive research tool.
    2. **Initial Designs**: Visual documentation of the interface architectures.
    3. **Case Study**: Full academic context and findings from Teachers College, Columbia University.
- **Safe Exit Flow**: Context-aware warnings prevent users from accidentally losing simulation progress.

### Three Exploration Modes
1. **Standard Mode**: Single-stream, structured AI response. REDESIGNED to be concise, conversational, and scannable with bullet points and bold headings.
2. **Split View**: Dual-lens side-by-side comparison. Includes smart tagging (@lens) for targeted questioning.
3. **Synthesis Mode (Beta)**: Multi-perspective debate with:
    - **Dynamic Lens Invitation**: Add up to 4 concurrent perspectives.
    - **Insight Archiving**: Save meaningful points directly from the debate.
    - **Visual Mapping**: Interactive node-based mapping to construct personal synthesis.

### UI/UX Enhancements
- **Loading Indicators**: Real-time feedback during AI initialization.
- **Brevity Control**: Optimized prompts keep lens responses focused (2-3 sentences) to maintain a fast-paced debate.
- **Adaptive Hero Figure**: Animated SVG representing the shift from "One Answer" to "Multiple Perspectives."

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/haetalkim/explorer.git

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage Flow
1. **Welcome**: Set your username for a personalized experience.
2. **API Setup**: Connect OpenAI/Anthropic and validate your key (or use Demo Mode).
3. **Choose Mode**: Select Standard, Split, or Synthesis.
4. **Interact**: Ask questions and watch the AI analyze from 8 distinct lenses (Equity, Systems, Long-term, etc.).
5. **Export**: At the end of a session, export your journey and synthesis map as JSON.

## Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: CSS-in-JS (Flexbox/Grid), SVG Animation
- **Icons**: Lucide React
- **Deployment**: Vercel

---
**Note**: This is a research prototype developed for Teachers College, Columbia University (2025).
