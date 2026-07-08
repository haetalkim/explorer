// Platform chat skins. Each skin recreates the visual grammar of the AI
// product the participant uses most (per the setup question), so the study
// session feels like their everyday tool rather than a foreign research app.
// Colors/typography live in skins.css; this file holds structure and marks.

// ---- Brand marks (drawn approximations) ----------------------------------

export const OpenAIMark = ({ size = 20, color = '#0d0d0d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
  </svg>
);

export const ClaudeMark = ({ size = 20, color = '#d97757' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round">
    {[0, 45, 90, 135].map((deg) => (
      <line
        key={deg}
        x1="12"
        y1="3.5"
        x2="12"
        y2="20.5"
        transform={`rotate(${deg} 12 12)`}
      />
    ))}
    {[22.5, 67.5, 112.5, 157.5].map((deg) => (
      <line
        key={deg}
        x1="12"
        y1="6"
        x2="12"
        y2="18"
        transform={`rotate(${deg} 12 12)`}
      />
    ))}
  </svg>
);

export const GeminiSpark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="55%" stopColor="#9B72CB" />
        <stop offset="100%" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path
      d="M12 1.5c.6 6.2 3.3 8.9 10.5 10.5C15.3 13.6 12.6 16.3 12 22.5 11.4 16.3 8.7 13.6 1.5 12 8.7 10.4 11.4 7.7 12 1.5Z"
      fill="url(#gemini-grad)"
    />
  </svg>
);

// ---- Small line icons for sidebar decoys ----------------------------------

const SIcon = ({ children }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const PencilIcon = () => (
  <SIcon>
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </SIcon>
);

const SearchIcon = () => (
  <SIcon>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </SIcon>
);

const GridIcon = () => (
  <SIcon>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </SIcon>
);

const CaretDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ---- Skin definitions ------------------------------------------------------

export const SKINS = {
  chatgpt: {
    id: 'chatgpt',
    placeholder: 'Ask anything',
    disclaimer: 'ChatGPT can make mistakes. Check important info.',
    composerPlus: true,
    composerModelLabel: null,
    sendShape: 'circle',
    assistantAvatar: null, // ChatGPT renders assistant turns as plain text
    headerLeft: (
      <span className="skin-model-label">
        ChatGPT 5.5 <CaretDown />
      </span>
    ),
    sidebar: {
      brand: <OpenAIMark size={20} />,
      items: [
        { label: 'New chat', icon: <PencilIcon /> },
        { label: 'Search chats', icon: <SearchIcon /> },
        { label: 'Library', icon: <GridIcon /> },
      ],
      sectionLabel: 'Chats',
    },
  },

  claude: {
    id: 'claude',
    placeholder: 'Reply to Claude…',
    disclaimer: 'Claude can make mistakes. Please double-check responses.',
    composerPlus: true,
    composerModelLabel: 'Sonnet 5',
    sendShape: 'square',
    assistantAvatar: null, // Claude renders responses as plain text on cream
    headerLeft: (
      <span className="skin-wordmark-serif">
        <ClaudeMark size={16} /> Claude
      </span>
    ),
    sidebar: null, // sidebar collapsed by default
  },

  gemini: {
    id: 'gemini',
    placeholder: 'Ask Gemini',
    disclaimer: 'Gemini can make mistakes, so double-check it',
    composerPlus: true,
    composerModelLabel: null,
    sendShape: 'plain',
    assistantAvatar: (
      <div style={{ flexShrink: 0, marginTop: 4 }}>
        <GeminiSpark size={22} />
      </div>
    ),
    headerLeft: (
      <span className="skin-model-label gemini-brand">
        Gemini <span className="gemini-model-chip">3.5 Flash <CaretDown /></span>
      </span>
    ),
    sidebar: {
      brand: <PencilIcon />,
      items: [
        { label: 'New chat', icon: <PencilIcon /> },
        { label: 'Explore Gems', icon: <GeminiSpark size={16} /> },
      ],
      sectionLabel: 'Recent',
    },
  },

  neutral: {
    id: 'neutral',
    placeholder: 'Message',
    disclaimer: null,
    composerPlus: false,
    composerModelLabel: null,
    sendShape: 'circle',
    assistantAvatar: <div className="assistant-avatar">AI</div>,
    headerLeft: <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Explorer" style={{ height: 22 }} />,
    sidebar: null,
  },
};

export function getSkin(platform) {
  return SKINS[platform] || SKINS.neutral;
}

export function SkinSidebar({ skin, chatTitle }) {
  if (!skin.sidebar) return null;
  return (
    <aside className="chat-sidebar">
      <div className="sidebar-brand">{skin.sidebar.brand}</div>
      {skin.sidebar.items.map((item) => (
        <div key={item.label} className="sidebar-item">
          {item.icon}
          {item.label}
        </div>
      ))}
      <div className="sidebar-section">{skin.sidebar.sectionLabel}</div>
      <div className="sidebar-item active">{chatTitle}</div>
    </aside>
  );
}
