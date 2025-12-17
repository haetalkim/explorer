import React, { useState, useEffect, useRef } from 'react';

// ============================================
// DESIGN SYSTEM
// ============================================
const colors = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  primaryFaded: '#EFF6FF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  white: '#FFFFFF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

// ============================================
// SVG ICONS
// ============================================
const Icons = {
  Globe: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Chart: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Scale: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M7 21h10" /><path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  ),
  User: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Users: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Tool: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Leaf: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Heart: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  GitBranch: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  Send: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Check: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevronRight: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  ChevronLeft: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  Download: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  MessageCircle: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  Columns: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  ),
  Map: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  X: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Info: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Eye: ({ size = 24, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

// API Logos
const OpenAILogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const AnthropicLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm2.327 10.239l-2.075-5.347-2.075 5.347h4.15z"/>
  </svg>
);

const DemoIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" />
  </svg>
);

// Star Globe Logo Component (references the uploaded image)
const StarGlobeLogo = ({ size = 40 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: size * 0.2,
    background: `url('/api/placeholder/80/80') center/cover`,
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }}>
    {/* Fallback star-globe SVG if image doesn't load */}
    <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="earthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      {/* Star shape with earth texture */}
      <path 
        d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z"
        fill="url(#earthGrad)"
      />
      {/* Land masses */}
      <ellipse cx="45" cy="45" rx="12" ry="18" fill="url(#landGrad)" opacity="0.8" />
      <ellipse cx="60" cy="55" rx="8" ry="12" fill="url(#landGrad)" opacity="0.8" />
      {/* Clouds */}
      <ellipse cx="40" cy="38" rx="8" ry="3" fill="white" opacity="0.6" />
      <ellipse cx="58" cy="50" rx="6" ry="2" fill="white" opacity="0.5" />
    </svg>
  </div>
);

// ============================================
// LENS DEFINITIONS
// ============================================
const LENSES = [
  { id: 'effectiveness', name: 'Effectiveness', icon: Icons.Chart, color: '#3B82F6', question: 'What produces measurable outcomes?' },
  { id: 'equity', name: 'Equity', icon: Icons.Scale, color: '#10B981', question: 'Who benefits and who is left behind?' },
  { id: 'autonomy', name: 'Autonomy', icon: Icons.User, color: '#F59E0B', question: 'How does this affect personal freedom?' },
  { id: 'collective', name: 'Collective', icon: Icons.Users, color: '#8B5CF6', question: 'What serves the broader community?' },
  { id: 'practical', name: 'Practical', icon: Icons.Tool, color: '#EC4899', question: 'What is actually feasible?' },
  { id: 'longterm', name: 'Long-term', icon: Icons.Leaf, color: '#14B8A6', question: 'What are downstream effects?' },
  { id: 'human', name: 'Human', icon: Icons.Heart, color: '#F97316', question: 'How does this affect lived experience?' },
  { id: 'systems', name: 'Systems', icon: Icons.GitBranch, color: '#6366F1', question: 'How do the parts interact?' },
];

// Demo findings
const DEMO_FINDINGS = {
  effectiveness: [
    { id: 'eff1', text: 'Meta-analyses show 23% improvement in target outcomes with structured implementation' },
    { id: 'eff2', text: 'Implementation quality accounts for 40% of outcome variance' },
    { id: 'eff3', text: 'Cost-benefit analyses suggest 2.3:1 ROI under optimal conditions' },
  ],
  equity: [
    { id: 'eq1', text: 'Lower-income populations face 3x higher barriers to access' },
    { id: 'eq2', text: 'Historical exclusion patterns reproduce without explicit intervention' },
    { id: 'eq3', text: 'Geographic disparities create significant urban-rural divides' },
  ],
  autonomy: [
    { id: 'aut1', text: 'Individual choice may be constrained by systemic pressures' },
    { id: 'aut2', text: 'Paternalistic approaches risk undermining self-determination' },
    { id: 'aut3', text: 'Informed consent requires accessible, transparent information' },
  ],
  collective: [
    { id: 'col1', text: 'Individual optimization can produce collective suboptimal outcomes' },
    { id: 'col2', text: 'Coordination problems often require collective solutions' },
    { id: 'col3', text: 'Social cohesion may be affected by policy fragmentation' },
  ],
  practical: [
    { id: 'pra1', text: 'Implementation typically takes 40-60% longer than projected' },
    { id: 'pra2', text: 'Stakeholder resistance often exceeds initial planning assumptions' },
    { id: 'pra3', text: 'Resource requirements scale non-linearly with scope' },
  ],
  longterm: [
    { id: 'lon1', text: 'Path dependencies created now constrain future options' },
    { id: 'lon2', text: 'Short-term and long-term interests frequently diverge' },
    { id: 'lon3', text: 'Sustainability requires building capacity, not creating dependencies' },
  ],
  human: [
    { id: 'hum1', text: 'Lived experience often reveals what abstract analysis misses' },
    { id: 'hum2', text: 'Dignity and relationships matter beyond quantifiable metrics' },
    { id: 'hum3', text: 'Emotional impacts deserve consideration alongside practical ones' },
  ],
  systems: [
    { id: 'sys1', text: 'Linear thinking fails in complex adaptive systems' },
    { id: 'sys2', text: 'Feedback loops can amplify or dampen intervention effects' },
    { id: 'sys3', text: 'Leverage points are rarely where they appear to be' },
  ],
};

// ============================================
// BUTTON COMPONENT
// ============================================
const Button = ({ children, onClick, disabled, variant = 'primary', size = 'md', style }) => {
  const baseStyle = {
    border: 'none',
    borderRadius: 10,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };
  
  const variants = {
    primary: {
      background: disabled ? colors.gray300 : `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
      color: colors.white,
      boxShadow: disabled ? 'none' : `0 4px 14px ${colors.primary}30`,
    },
    secondary: {
      background: colors.white,
      color: colors.gray700,
      border: `1.5px solid ${colors.gray200}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
    ghost: {
      background: 'transparent',
      color: colors.gray600,
    },
  };
  
  const sizes = {
    sm: { padding: '10px 18px', fontSize: 13 },
    md: { padding: '14px 28px', fontSize: 14 },
    lg: { padding: '18px 36px', fontSize: 16 },
  };
  
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...baseStyle, ...variants[variant], ...sizes[size], ...style }}>
      {children}
    </button>
  );
};

// ============================================
// METALLIC TOGGLE SWITCH
// ============================================
const MetallicToggle = ({ isOn, onToggle, leftLabel, rightLabel }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center' }}>
    <span style={{
      fontSize: 14,
      fontWeight: isOn ? 400 : 600,
      color: isOn ? colors.gray400 : colors.gray800,
      transition: 'all 0.3s ease',
      minWidth: 100,
      textAlign: 'right',
    }}>
      {leftLabel}
    </span>
    
    <button
      onClick={onToggle}
      style={{
        position: 'relative',
        width: 76,
        height: 38,
        borderRadius: 19,
        border: 'none',
        cursor: 'pointer',
        padding: 3,
        background: isOn 
          ? `linear-gradient(180deg, ${colors.primaryDark} 0%, ${colors.primary} 50%, ${colors.primaryLight} 100%)`
          : `linear-gradient(180deg, #8a8a8a 0%, #b8b8b8 30%, #d4d4d4 50%, #b8b8b8 70%, #8a8a8a 100%)`,
        boxShadow: `
          inset 0 2px 4px rgba(0,0,0,0.25),
          inset 0 -1px 2px rgba(255,255,255,0.2),
          0 3px 10px rgba(0,0,0,0.2)
        `,
        transition: 'background 0.3s ease',
      }}
    >
      {/* Inner track */}
      <div style={{
        position: 'absolute',
        top: 4,
        left: 4,
        right: 4,
        bottom: 4,
        borderRadius: 15,
        background: isOn 
          ? `linear-gradient(180deg, ${colors.primaryDark} 0%, ${colors.primary} 100%)`
          : 'linear-gradient(180deg, #7a7a7a 0%, #9a9a9a 100%)',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.35)',
      }} />
      
      {/* Metallic knob */}
      <div style={{
        position: 'absolute',
        top: 3,
        left: isOn ? 41 : 3,
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: `
          radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.9) 0%, transparent 45%),
          radial-gradient(ellipse at 65% 75%, rgba(0,0,0,0.15) 0%, transparent 40%),
          linear-gradient(180deg, 
            #fafafa 0%, 
            #e8e8e8 20%,
            #d0d0d0 40%,
            #c0c0c0 60%,
            #a8a8a8 80%,
            #909090 100%
          )
        `,
        boxShadow: `
          0 3px 8px rgba(0,0,0,0.35),
          0 1px 2px rgba(0,0,0,0.2),
          inset 0 1px 1px rgba(255,255,255,0.9),
          inset 0 -1px 1px rgba(0,0,0,0.1)
        `,
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(0,0,0,0.08)',
      }}>
        {/* Knob highlight */}
        <div style={{
          position: 'absolute',
          top: 4,
          left: 4,
          right: 4,
          bottom: 4,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.5) 0%, transparent 55%)',
        }} />
        {/* Grip lines */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 10,
              height: 2,
              background: 'linear-gradient(180deg, #888 0%, #aaa 50%, #888 100%)',
              borderRadius: 1,
              boxShadow: '0 1px 0 rgba(255,255,255,0.4)',
            }} />
          ))}
        </div>
      </div>
    </button>
    
    <span style={{
      fontSize: 14,
      fontWeight: isOn ? 600 : 400,
      color: isOn ? colors.primary : colors.gray400,
      transition: 'all 0.3s ease',
      minWidth: 100,
    }}>
      {rightLabel}
    </span>
  </div>
);

// ============================================
// INTERFACE PREVIEW COMPONENTS
// ============================================
const StandardInterfacePreview = ({ active }) => (
  <div style={{
    background: colors.white,
    borderRadius: 12,
    border: `2px solid ${active ? colors.gray400 : colors.gray200}`,
    overflow: 'hidden',
    opacity: active ? 1 : 0.5,
    transform: active ? 'scale(1)' : 'scale(0.97)',
    transition: 'all 0.3s ease',
    boxShadow: active ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
  }}>
    <div style={{ background: colors.gray100, padding: '10px 14px', borderBottom: `1px solid ${colors.gray200}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41' }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: colors.gray500 }}>Standard Chat</span>
      </div>
    </div>
    <div style={{ padding: 14, minHeight: 140 }}>
      <div style={{ background: colors.gray100, padding: 10, borderRadius: 8, marginBottom: 10, maxWidth: '65%' }}>
        <div style={{ fontSize: 11, color: colors.gray600 }}>Should schools ban phones?</div>
      </div>
      <div style={{ background: colors.gray800, color: colors.white, padding: 10, borderRadius: 8, marginLeft: 'auto', maxWidth: '80%' }}>
        <div style={{ fontSize: 10, lineHeight: 1.5 }}>
          This involves multiple considerations. On one hand, research shows... On the other hand...
        </div>
      </div>
    </div>
    <div style={{ padding: 10, borderTop: `1px solid ${colors.gray200}` }}>
      <div style={{ background: colors.gray50, borderRadius: 6, padding: '8px 10px', fontSize: 10, color: colors.gray400, border: `1px solid ${colors.gray200}` }}>
        Ask anything...
      </div>
    </div>
  </div>
);

const PerspectivesInterfacePreview = ({ active }) => (
  <div style={{
    background: colors.white,
    borderRadius: 12,
    border: `2px solid ${active ? colors.primary : colors.gray200}`,
    overflow: 'hidden',
    opacity: active ? 1 : 0.5,
    transform: active ? 'scale(1)' : 'scale(0.97)',
    transition: 'all 0.3s ease',
    boxShadow: active ? `0 4px 20px ${colors.primary}20` : 'none',
  }}>
    <div style={{ background: colors.primaryFaded, padding: '10px 14px', borderBottom: `1px solid ${colors.primary}20` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41' }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: colors.primary, fontWeight: 600 }}>Explorer</span>
      </div>
    </div>
    <div style={{ display: 'flex', minHeight: 140 }}>
      <div style={{ flex: 1, padding: 10, borderRight: `1px solid ${colors.gray200}` }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: '#3B82F6', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icons.Chart size={12} /> Effectiveness
        </div>
        <div style={{ fontSize: 9, color: colors.gray600, lineHeight: 1.4 }}>
          Research shows 15% higher test scores in phone-free environments...
        </div>
        <div style={{ marginTop: 8, padding: 5, background: '#FEF3C7', borderRadius: 4, fontSize: 8, color: colors.gray600 }}>
          May overlook: access barriers
        </div>
      </div>
      <div style={{ flex: 1, padding: 10 }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: '#10B981', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icons.Scale size={12} /> Equity
        </div>
        <div style={{ fontSize: 9, color: colors.gray600, lineHeight: 1.4 }}>
          23% of low-income students rely on phones for homework access...
        </div>
        <div style={{ marginTop: 8, padding: 5, background: '#FEF3C7', borderRadius: 4, fontSize: 8, color: colors.gray600 }}>
          May overlook: attention costs
        </div>
      </div>
    </div>
    <div style={{ padding: 8, background: colors.primaryFaded, borderTop: `1px solid ${colors.primary}20` }}>
      <div style={{ fontSize: 9, color: colors.primary, fontWeight: 500, textAlign: 'center' }}>
        What's your position given these tensions?
      </div>
    </div>
  </div>
);

// ============================================
// ANIMATED HERO FIGURE
// ============================================
const HeroFigure = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setPhase(p => (p + 1) % 100), 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <svg viewBox="0 0 600 160" style={{ width: '100%', maxWidth: 520, height: 'auto' }}>
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.gray300} />
          <stop offset={`${phase}%`} stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      
      <text x="20" y="85" fill={colors.gray400} fontSize="12" fontFamily="system-ui">Your Question</text>
      <path d="M 120 80 L 240 80" stroke="url(#flowGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle r="4" fill={colors.primary}><animateMotion dur="2s" repeatCount="indefinite" path="M 120 80 L 240 80" /></circle>
      
      <circle cx="270" cy="80" r="22" fill={colors.white} stroke={colors.primary} strokeWidth="2.5" />
      <g transform="translate(258, 68)"><Icons.Globe size={24} color={colors.primary} /></g>
      
      <path d="M 292 68 Q 350 45, 420 35" stroke={colors.gray300} strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.5" />
      <circle cx="440" cy="32" r="7" fill={colors.gray300} opacity="0.5" />
      <text x="458" y="38" fill={colors.gray400} fontSize="11">Single Answer</text>
      
      <path d="M 292 92 Q 340 105, 380 115" stroke={colors.primary} strokeWidth="2.5" fill="none" style={{ filter: 'url(#glow)' }} />
      
      {[
        { x: 400, y: 110, r: 9 },
        { x: 445, y: 88, r: 8 },
        { x: 465, y: 125, r: 10 },
        { x: 425, y: 145, r: 7 },
        { x: 495, y: 105, r: 6 },
        { x: 510, y: 135, r: 7 },
      ].map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={colors.primary} opacity={0.5 + Math.sin(phase * 0.1 + i) * 0.4} />
      ))}
      
      <g stroke={colors.primary} strokeWidth="1.5" opacity="0.3">
        <line x1="400" y1="110" x2="445" y2="88" />
        <line x1="400" y1="110" x2="425" y2="145" />
        <line x1="445" y1="88" x2="465" y2="125" />
        <line x1="465" y1="125" x2="425" y2="145" />
        <line x1="445" y1="88" x2="495" y2="105" />
        <line x1="465" y1="125" x2="510" y2="135" />
      </g>
      
      <text x="525" y="120" fill={colors.primary} fontSize="12" fontWeight="600">Perspectives</text>
    </svg>
  );
};

// ============================================
// HEADER
// ============================================
const Header = ({ onBack, showProgress, step, totalSteps }) => (
  <header style={{
    padding: '18px 28px',
    borderBottom: `1px solid ${colors.gray100}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.white,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <StarGlobeLogo size={36} />
      <span style={{ fontWeight: 700, fontSize: 18, color: colors.gray900, letterSpacing: '-0.02em' }}>Explorer</span>
    </div>
    
    {showProgress && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} style={{
            width: i === step ? 28 : 10,
            height: 10,
            borderRadius: 5,
            background: i <= step ? colors.primary : colors.gray200,
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    )}
    
    {onBack && (
      <Button variant="ghost" size="sm" onClick={onBack}>
        <Icons.X size={18} /> Exit
      </Button>
    )}
  </header>
);

// ============================================
// LANDING PAGE
// ============================================
const LandingPage = ({ onStart }) => (
  <div style={{ minHeight: '100vh', background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.gray50} 100%)` }}>
    <Header />
    
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '50px 28px', textAlign: 'center' }}>
      <div style={{
        display: 'inline-block',
        background: colors.primaryFaded,
        color: colors.primary,
        padding: '8px 16px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 28,
        letterSpacing: '0.5px',
      }}>
        RESEARCH SIMULATION TOOL
      </div>
      
      <h1 style={{
        fontSize: 44,
        fontWeight: 700,
        color: colors.gray900,
        lineHeight: 1.15,
        marginBottom: 20,
        letterSpacing: '-0.03em',
      }}>
        Explore questions through<br />
        <span style={{ color: colors.primary }}>multiple perspectives</span>
      </h1>
      
      <p style={{
        fontSize: 18,
        color: colors.gray500,
        marginBottom: 36,
        lineHeight: 1.6,
        maxWidth: 500,
        margin: '0 auto 36px',
      }}>
        How does interface design shape reasoning?
        Choose analytical lenses and discover how perspective affects understanding.
      </p>
      
      <Button size="lg" onClick={onStart}>
        Begin Exploration
        <Icons.ChevronRight size={20} />
      </Button>
      
      <div style={{ marginTop: 50 }}>
        <HeroFigure />
      </div>
      
      <p style={{ fontSize: 12, color: colors.gray400, marginTop: 12 }}>
        Same question, different interfaces → different epistemic outcomes
      </p>
    </main>
  </div>
);

// ============================================
// STEP 1: INTERFACE COMPARISON
// ============================================
const CompareStep = ({ onNext, onBack }) => {
  const [viewMode, setViewMode] = useState(false); // false = standard, true = perspectives

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50 }}>
      <Header onBack={onBack} showProgress step={0} totalSteps={6} />
      
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 28px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 10, textAlign: 'center' }}>
          Compare Interface Approaches
        </h2>
        <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 36, textAlign: 'center', maxWidth: 500, margin: '0 auto 36px' }}>
          Toggle between the two interfaces to see how each presents information differently.
        </p>
        
        {/* Toggle Section */}
        <div style={{
          background: colors.white,
          borderRadius: 16,
          padding: 28,
          marginBottom: 28,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <MetallicToggle
            isOn={viewMode}
            onToggle={() => setViewMode(!viewMode)}
            leftLabel="Standard Chat"
            rightLabel="Perspectives"
          />
          
          <div style={{
            marginTop: 24,
            padding: 16,
            background: viewMode ? colors.primaryFaded : colors.gray100,
            borderRadius: 10,
            transition: 'all 0.3s ease',
          }}>
            <p style={{
              fontSize: 14,
              color: viewMode ? colors.primary : colors.gray600,
              textAlign: 'center',
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.5,
            }}>
              {viewMode 
                ? 'Multiple analytical lenses reveal different aspects of the question. Each makes its priorities and potential blindspots explicit.'
                : 'A single authoritative response synthesizes information into one coherent answer. The underlying value commitments remain hidden.'
              }
            </p>
          </div>
        </div>
        
        {/* Interface Previews */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 36 }}>
          <div>
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: !viewMode ? colors.gray800 : colors.gray200,
                color: !viewMode ? colors.white : colors.gray500,
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                transition: 'all 0.3s ease',
              }}>BASELINE</span>
            </div>
            <StandardInterfacePreview active={!viewMode} />
          </div>
          
          <div>
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: viewMode ? colors.primary : colors.gray200,
                color: viewMode ? colors.white : colors.gray500,
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                transition: 'all 0.3s ease',
              }}>INTERVENTION</span>
            </div>
            <PerspectivesInterfacePreview active={viewMode} />
          </div>
        </div>
        
        {/* Key Differences */}
        <div style={{
          background: colors.white,
          borderRadius: 16,
          padding: 24,
          marginBottom: 36,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
            What Changes
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: Icons.Eye, title: 'Visual Architecture', desc: 'Single stream → split view panels' },
              { icon: Icons.Info, title: 'Explicit Framing', desc: 'Hidden values → visible lens priorities' },
              { icon: Icons.MessageCircle, title: 'User Agency', desc: 'Passive reception → active synthesis' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: colors.primary, marginBottom: 10 }}>
                  <item.icon size={24} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray800, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onNext}>
            Continue to Setup
            <Icons.ChevronRight size={18} />
          </Button>
        </div>
      </main>
    </div>
  );
};

// ============================================
// STEP 2: API SELECTION
// ============================================
const ApiStep = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState(null);
  const [apiKey, setApiKey] = useState('');
  
  const providers = [
    { id: 'openai', name: 'OpenAI', Logo: OpenAILogo, placeholder: 'sk-...' },
    { id: 'anthropic', name: 'Anthropic', Logo: AnthropicLogo, placeholder: 'sk-ant-...' },
    { id: 'demo', name: 'Demo Mode', Logo: DemoIcon, placeholder: null, desc: 'Pre-constructed responses' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50 }}>
      <Header onBack={onBack} showProgress step={1} totalSteps={6} />
      
      <main style={{ maxWidth: 480, margin: '0 auto', padding: '40px 28px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 10 }}>
          Select API Provider
        </h2>
        <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 32 }}>
          Choose how to power the AI responses.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {providers.map(p => (
            <div key={p.id} onClick={() => { setSelected(p.id); setApiKey(''); }} style={{
              padding: 18,
              borderRadius: 14,
              border: `2px solid ${selected === p.id ? colors.primary : colors.gray200}`,
              background: selected === p.id ? colors.primaryFaded : colors.white,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              transition: 'all 0.2s ease',
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: colors.gray100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.gray700,
              }}>
                <p.Logo size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: colors.gray800 }}>{p.name}</div>
                {p.desc && <div style={{ fontSize: 12, color: colors.gray500 }}>{p.desc}</div>}
              </div>
              {selected === p.id && (
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icons.Check size={14} color={colors.white} />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {selected && selected !== 'demo' && (
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: colors.gray700, marginBottom: 10 }}>
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={providers.find(p => p.id === selected)?.placeholder}
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: 14,
                border: `1.5px solid ${colors.gray300}`,
                borderRadius: 10,
                boxSizing: 'border-box',
                fontFamily: 'monospace',
              }}
            />
            <p style={{ fontSize: 11, color: colors.gray400, marginTop: 8 }}>
              Your key is stored locally and never transmitted to our servers.
            </p>
          </div>
        )}
        
        <Button
          onClick={() => onNext({ provider: selected, apiKey: selected === 'demo' ? null : apiKey })}
          disabled={!(selected === 'demo' || apiKey.length > 10)}
          style={{ width: '100%' }}
        >
          Continue <Icons.ChevronRight size={18} />
        </Button>
      </main>
    </div>
  );
};

// ============================================
// STEP 3: CONDITION SELECTION
// ============================================
const ConditionStep = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState('split');
  
  const conditions = [
    { 
      id: 'standard', 
      name: 'Standard Chat', 
      icon: Icons.MessageCircle, 
      desc: 'Single-stream AI response',
      detail: 'The baseline experience. AI provides a single, synthesized answer that attempts to balance perspectives.'
    },
    { 
      id: 'split', 
      name: 'Split View', 
      icon: Icons.Columns, 
      desc: 'Dual perspective panels',
      detail: 'See two analytical lenses side-by-side, each with explicit priorities and blindspots.'
    },
    { 
      id: 'synthesis', 
      name: 'Synthesis Mode', 
      icon: Icons.Map, 
      desc: 'Visual mapping + synthesis',
      detail: 'Full experience with visual connection mapping and required synthesis before completing.'
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50 }}>
      <Header onBack={onBack} showProgress step={2} totalSteps={6} />
      
      <main style={{ maxWidth: 520, margin: '0 auto', padding: '40px 28px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 10 }}>
          Choose Interface Condition
        </h2>
        <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 32 }}>
          Select which interface mode you'll experience.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {conditions.map(c => {
            const Icon = c.icon;
            const isSelected = selected === c.id;
            return (
              <div key={c.id} onClick={() => setSelected(c.id)} style={{
                padding: 20,
                borderRadius: 14,
                border: `2px solid ${isSelected ? colors.primary : colors.gray200}`,
                background: isSelected ? colors.primaryFaded : colors.white,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: isSelected ? colors.primary : colors.gray100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}>
                    <Icon size={26} color={isSelected ? colors.white : colors.gray500} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: colors.gray500 }}>{c.desc}</div>
                  </div>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? colors.primary : colors.gray300}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}>
                    {isSelected && <div style={{ width: 12, height: 12, borderRadius: '50%', background: colors.primary }} />}
                  </div>
                </div>
                
                {isSelected && (
                  <div style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: `1px solid ${colors.primary}30`,
                  }}>
                    <p style={{ fontSize: 13, color: colors.gray600, margin: 0, lineHeight: 1.5 }}>
                      {c.detail}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <Button onClick={() => onNext({ condition: selected })} style={{ width: '100%' }}>
          Continue <Icons.ChevronRight size={18} />
        </Button>
      </main>
    </div>
  );
};

// ============================================
// STEP 4: LENS SELECTION
// ============================================
const LensStep = ({ config, onNext, onBack }) => {
  const [selected, setSelected] = useState([]);
  
  // Skip if standard mode
  useEffect(() => {
    if (config.condition === 'standard') {
      onNext({ lenses: [] });
    }
  }, []);

  if (config.condition === 'standard') return null;

  const toggle = (id) => {
    if (selected.includes(id)) setSelected(selected.filter(l => l !== id));
    else if (selected.length < 2) setSelected([...selected, id]);
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50 }}>
      <Header onBack={onBack} showProgress step={3} totalSteps={6} />
      
      <main style={{ maxWidth: 580, margin: '0 auto', padding: '40px 28px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 10 }}>
          Choose Two Analytical Lenses
        </h2>
        <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 28 }}>
          These perspectives will analyze your question from different angles.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 28 }}>
          {LENSES.map(lens => {
            const isSelected = selected.includes(lens.id);
            const num = selected.indexOf(lens.id) + 1;
            const Icon = lens.icon;
            const isDisabled = selected.length >= 2 && !isSelected;
            
            return (
              <div key={lens.id} onClick={() => !isDisabled && toggle(lens.id)} style={{
                padding: 18,
                borderRadius: 14,
                border: `2px solid ${isSelected ? lens.color : colors.gray200}`,
                background: isSelected ? `${lens.color}10` : colors.white,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                position: 'relative',
                transition: 'all 0.2s ease',
              }}>
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: lens.color,
                    color: colors.white,
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>{num}</div>
                )}
                <div style={{ color: lens.color, marginBottom: 10 }}><Icon size={28} /></div>
                <div style={{ fontSize: 15, fontWeight: 600, color: colors.gray800, marginBottom: 4 }}>{lens.name}</div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>{lens.question}</div>
              </div>
            );
          })}
        </div>
        
        {selected.length === 2 && (
          <div style={{
            padding: 14,
            background: colors.success + '10',
            borderRadius: 10,
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <Icons.Check size={18} color={colors.success} />
            <span style={{ fontSize: 14, color: colors.gray700 }}>
              <strong style={{ color: LENSES.find(l => l.id === selected[0])?.color }}>{LENSES.find(l => l.id === selected[0])?.name}</strong>
              {' '}and{' '}
              <strong style={{ color: LENSES.find(l => l.id === selected[1])?.color }}>{LENSES.find(l => l.id === selected[1])?.name}</strong>
              {' '}selected
            </span>
          </div>
        )}
        
        <Button onClick={() => onNext({ lenses: selected.map(id => LENSES.find(l => l.id === id)) })} disabled={selected.length !== 2} style={{ width: '100%' }}>
          Continue <Icons.ChevronRight size={18} />
        </Button>
      </main>
    </div>
  );
};

// ============================================
// STEP 5: QUESTION INPUT
// ============================================
const QuestionStep = ({ onNext, onBack }) => {
  const [question, setQuestion] = useState('');
  const [stance, setStance] = useState(50);
  
  const samples = [
    'Should schools ban smartphones?',
    'Is remote work better for productivity?',
    'Should AI be used in hiring decisions?',
    'Should cities prioritize cars or public transit?',
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50 }}>
      <Header onBack={onBack} showProgress step={4} totalSteps={6} />
      
      <main style={{ maxWidth: 520, margin: '0 auto', padding: '40px 28px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 10 }}>
          Enter Your Question
        </h2>
        <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 28 }}>
          Ask a complex question about policy, ethics, or society.
        </p>
        
        <div style={{ background: colors.white, borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            style={{
              width: '100%',
              padding: 16,
              fontSize: 16,
              border: `1.5px solid ${colors.gray300}`,
              borderRadius: 12,
              minHeight: 100,
              resize: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
              marginBottom: 16,
            }}
          />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {samples.map((s, i) => (
              <button key={i} onClick={() => setQuestion(s)} style={{
                background: colors.gray100,
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 12,
                color: colors.gray600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}>{s}</button>
            ))}
          </div>
        </div>
        
        <div style={{ background: colors.white, borderRadius: 16, padding: 24, marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: colors.gray800 }}>Initial Position</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: colors.primary }}>{stance}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={stance}
            onChange={(e) => setStance(Number(e.target.value))}
            style={{
              width: '100%',
              height: 8,
              borderRadius: 4,
              appearance: 'none',
              background: `linear-gradient(to right, ${colors.primary} ${stance}%, ${colors.gray200} ${stance}%)`,
              cursor: 'pointer',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: colors.gray400 }}>Strongly Against</span>
            <span style={{ fontSize: 12, color: colors.gray400 }}>Strongly For</span>
          </div>
        </div>
        
        <Button onClick={() => onNext({ question, preStance: stance })} disabled={!question.trim()} style={{ width: '100%' }}>
          Begin Exploration <Icons.ChevronRight size={18} />
        </Button>
      </main>
    </div>
  );
};

// ============================================
// EXPLORATION PAGE (Chat Interface)
// ============================================
const ExplorationPage = ({ config, questionData, onComplete, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [activeLens, setActiveLens] = useState(config.lenses?.[0]?.id || null);
  const [selectedFindings, setSelectedFindings] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [synthesis, setSynthesis] = useState('');
  const [postStance, setPostStance] = useState(questionData.preStance);
  const [phase, setPhase] = useState('chat');
  const messagesEndRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (config.condition === 'standard') {
      setMessages([
        { id: 1, type: 'system', text: questionData.question },
        { id: 2, type: 'ai', text: 'This involves multiple considerations worth examining carefully. Research suggests both potential benefits and significant drawbacks depending on context. Key factors include stakeholder impact, implementation feasibility, and long-term consequences. What specific aspect would you like to explore?' },
      ]);
    } else {
      const lens1 = config.lenses[0];
      const lens2 = config.lenses[1];
      setMessages([
        { id: 1, type: 'system', text: questionData.question },
        { id: 2, type: 'findings', lens: lens1, findings: DEMO_FINDINGS[lens1.id] || [] },
        { id: 3, type: 'findings', lens: lens2, findings: DEMO_FINDINGS[lens2.id] || [] },
      ]);
    }
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: input, lens: config.condition !== 'standard' ? activeLens : null };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      const lens = LENSES.find(l => l.id === activeLens);
      const text = activeLens 
        ? `From a ${lens?.name.toLowerCase()} perspective: This raises important considerations about ${lens?.question.toLowerCase()} Key factors include contextual implementation and stakeholder impact.`
        : 'That\'s an important angle to consider. The evidence suggests multiple dimensions worth examining. Would you like to explore any specific aspect further?';
      setMessages(prev => [...prev, { id: Date.now(), type: 'ai', text, lens: activeLens }]);
    }, 600);
  };

  const toggleFinding = (finding, lens) => {
    const key = `${lens.id}-${finding.id}`;
    if (selectedFindings.find(f => f.key === key)) {
      setSelectedFindings(selectedFindings.filter(f => f.key !== key));
    } else {
      setSelectedFindings([...selectedFindings, { key, finding, lens }]);
    }
  };

  const handleComplete = () => {
    onComplete({
      sessionId: `session-${Date.now()}`,
      timestamp: new Date().toISOString(),
      config: { condition: config.condition, provider: config.provider, lenses: config.lenses?.map(l => l.id) || [] },
      question: questionData.question,
      preStance: questionData.preStance,
      postStance,
      stanceChange: postStance - questionData.preStance,
      timeSpent: Math.round((Date.now() - startTimeRef.current) / 1000),
      messageCount: messages.filter(m => m.type === 'user').length,
      selectedFindings: selectedFindings.map(f => ({ lens: f.lens.id, finding: f.finding.text })),
      synthesis: config.condition === 'synthesis' ? synthesis : null,
    });
  };

  // Synthesis Map Modal
  const SynthesisMapModal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: colors.white, borderRadius: 20, width: '90%', maxWidth: 750, maxHeight: '90vh', overflow: 'auto' }}>
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${colors.gray200}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.gray900 }}>Synthesis Map</h3>
          <button onClick={() => setShowMap(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <Icons.X size={20} color={colors.gray500} />
          </button>
        </div>
        
        <div style={{ padding: 24 }}>
          {/* Visual Map */}
          <div style={{ background: colors.gray50, borderRadius: 16, padding: 24, marginBottom: 24, minHeight: 280 }}>
            {selectedFindings.length === 0 ? (
              <div style={{ textAlign: 'center', color: colors.gray400, paddingTop: 100, fontSize: 14 }}>
                Select findings from each lens to build your synthesis map
              </div>
            ) : (
              <svg width="100%" height="280" viewBox="0 0 650 280">
                {selectedFindings.map((item, i) => {
                  const isLeft = item.lens.id === config.lenses[0]?.id;
                  const x = isLeft ? 100 + (i % 2) * 70 : 480 + (i % 2) * 70;
                  const y = 60 + Math.floor(i / 2) * 80;
                  return (
                    <g key={item.key}>
                      <circle cx={x} cy={y} r="28" fill={`${item.lens.color}20`} stroke={item.lens.color} strokeWidth="2.5" />
                      <text x={x} y={y + 5} textAnchor="middle" fontSize="10" fill={colors.gray700} fontWeight="600">{item.finding.id}</text>
                      <line x1={x} y1={y} x2="325" y2="140" stroke={item.lens.color} strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />
                    </g>
                  );
                })}
                {selectedFindings.length > 0 && (
                  <g>
                    <circle cx="325" cy="140" r="45" fill={colors.primaryFaded} stroke={colors.primary} strokeWidth="2.5" />
                    <text x="325" y="145" textAnchor="middle" fontSize="12" fill={colors.primary} fontWeight="700">Synthesis</text>
                  </g>
                )}
              </svg>
            )}
          </div>
          
          {/* Selected Findings */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: colors.gray700, marginBottom: 12 }}>
              Selected Findings ({selectedFindings.length})
            </h4>
            {selectedFindings.length === 0 ? (
              <p style={{ fontSize: 13, color: colors.gray400 }}>Click findings in the chat to add them here.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selectedFindings.map(item => (
                  <div key={item.key} style={{
                    padding: 14,
                    borderRadius: 10,
                    background: `${item.lens.color}08`,
                    borderLeft: `4px solid ${item.lens.color}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: item.lens.color }}>{item.lens.name}</span>
                      <p style={{ fontSize: 13, color: colors.gray700, margin: '6px 0 0 0', lineHeight: 1.4 }}>{item.finding.text}</p>
                    </div>
                    <button onClick={() => toggleFinding(item.finding, item.lens)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Icons.X size={16} color={colors.gray400} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Synthesis Text */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: colors.gray700, marginBottom: 10 }}>Your Synthesis</h4>
            <textarea
              value={synthesis}
              onChange={(e) => setSynthesis(e.target.value)}
              placeholder="Based on these findings, what is your integrated understanding? How do these perspectives connect or conflict?"
              style={{
                width: '100%',
                padding: 16,
                fontSize: 14,
                border: `1.5px solid ${colors.gray300}`,
                borderRadius: 12,
                minHeight: 100,
                resize: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
        
        <div style={{ padding: '18px 24px', borderTop: `1px solid ${colors.gray200}` }}>
          <Button onClick={() => { setShowMap(false); setPhase('rating'); }} disabled={selectedFindings.length < 2 || synthesis.length < 50} style={{ width: '100%' }}>
            Complete Synthesis
          </Button>
        </div>
      </div>
    </div>
  );

  // Rating Phase
  if (phase === 'rating') {
    return (
      <div style={{ minHeight: '100vh', background: colors.gray50 }}>
        <Header onBack={() => setPhase('chat')} showProgress step={5} totalSteps={6} />
        
        <main style={{ maxWidth: 420, margin: '0 auto', padding: '60px 28px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 10 }}>
            Final Position
          </h2>
          <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 32 }}>
            After this exploration, where do you stand on the question?
          </p>
          
          <div style={{ background: colors.white, borderRadius: 20, padding: 28, marginBottom: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <input
              type="range"
              min="0"
              max="100"
              value={postStance}
              onChange={(e) => setPostStance(Number(e.target.value))}
              style={{
                width: '100%',
                height: 10,
                borderRadius: 5,
                appearance: 'none',
                background: `linear-gradient(to right, ${colors.primary} ${postStance}%, ${colors.gray200} ${postStance}%)`,
                cursor: 'pointer',
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 28 }}>
              <div>
                <div style={{ fontSize: 12, color: colors.gray400, marginBottom: 4 }}>Before</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: colors.gray300 }}>{questionData.preStance}</div>
              </div>
              <div style={{ fontSize: 28, color: colors.gray300, paddingTop: 20 }}>→</div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray400, marginBottom: 4 }}>After</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: colors.primary }}>{postStance}</div>
              </div>
            </div>
            
            <div style={{ marginTop: 20, padding: 12, background: colors.primaryFaded, borderRadius: 10 }}>
              <span style={{ fontSize: 16, color: colors.primary, fontWeight: 700 }}>
                {postStance - questionData.preStance > 0 ? '+' : ''}{postStance - questionData.preStance} points
              </span>
            </div>
          </div>
          
          <Button onClick={handleComplete} style={{ width: '100%' }}>
            Complete Session
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: colors.white }}>
      <Header onBack={onBack} showProgress step={5} totalSteps={6} />
      
      {/* Messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ marginBottom: 20 }}>
              {msg.type === 'system' && (
                <div style={{ textAlign: 'center', padding: 18, background: colors.gray50, borderRadius: 14, fontSize: 15, color: colors.gray700, fontWeight: 500 }}>
                  {msg.text}
                </div>
              )}
              
              {msg.type === 'findings' && (
                <div style={{ padding: 20, borderRadius: 14, border: `1px solid ${colors.gray200}`, borderTop: `4px solid ${msg.lens.color}`, background: colors.white }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ color: msg.lens.color }}>{React.createElement(msg.lens.icon, { size: 20 })}</div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: msg.lens.color }}>{msg.lens.name}</span>
                    <span style={{ fontSize: 12, color: colors.gray400, fontStyle: 'italic' }}>{msg.lens.question}</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {msg.findings.map(finding => {
                      const isSelected = selectedFindings.find(f => f.key === `${msg.lens.id}-${finding.id}`);
                      return (
                        <div key={finding.id} onClick={() => config.condition === 'synthesis' && toggleFinding(finding, msg.lens)} style={{
                          padding: 14,
                          borderRadius: 10,
                          background: isSelected ? `${msg.lens.color}12` : colors.gray50,
                          border: `2px solid ${isSelected ? msg.lens.color : 'transparent'}`,
                          cursor: config.condition === 'synthesis' ? 'pointer' : 'default',
                          transition: 'all 0.2s ease',
                        }}>
                          <p style={{ margin: 0, fontSize: 14, color: colors.gray700, lineHeight: 1.5 }}>{finding.text}</p>
                          {config.condition === 'synthesis' && (
                            <div style={{ marginTop: 8, fontSize: 11, color: isSelected ? msg.lens.color : colors.gray400, fontWeight: 500 }}>
                              {isSelected ? '✓ Added to synthesis' : 'Click to add to synthesis'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {msg.type === 'user' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ maxWidth: '70%', padding: 14, borderRadius: 14, background: colors.primary, color: colors.white, fontSize: 14 }}>
                    {msg.lens && <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>@{LENSES.find(l => l.id === msg.lens)?.name}</div>}
                    {msg.text}
                  </div>
                </div>
              )}
              
              {msg.type === 'ai' && (
                <div style={{ maxWidth: '70%', padding: 14, borderRadius: 14, background: colors.gray100, fontSize: 14, color: colors.gray700 }}>
                  {msg.lens && <div style={{ fontSize: 11, color: LENSES.find(l => l.id === msg.lens)?.color, marginBottom: 6, fontWeight: 600 }}>{LENSES.find(l => l.id === msg.lens)?.name} perspective</div>}
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div style={{ borderTop: `1px solid ${colors.gray200}`, padding: 18, background: colors.white }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {config.condition !== 'standard' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {config.lenses.map(lens => (
                <button key={lens.id} onClick={() => setActiveLens(activeLens === lens.id ? null : lens.id)} style={{
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: `1.5px solid ${activeLens === lens.id ? lens.color : colors.gray200}`,
                  background: activeLens === lens.id ? `${lens.color}10` : colors.white,
                  fontSize: 12,
                  fontWeight: 600,
                  color: activeLens === lens.id ? lens.color : colors.gray500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>@{lens.name}</button>
              ))}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={activeLens ? `Ask about ${LENSES.find(l => l.id === activeLens)?.name.toLowerCase()}...` : 'Ask a follow-up question...'}
              style={{ flex: 1, padding: '14px 18px', fontSize: 14, border: `1.5px solid ${colors.gray300}`, borderRadius: 12, outline: 'none' }}
            />
            <Button onClick={handleSend} disabled={!input.trim()} size="md">
              <Icons.Send size={18} />
            </Button>
            
            {config.condition === 'synthesis' && (
              <Button variant="secondary" onClick={() => setShowMap(true)} size="md">
                <Icons.Map size={18} /> Map
              </Button>
            )}
            
            {config.condition !== 'synthesis' && (
              <Button variant="secondary" onClick={() => setPhase('rating')} size="md">
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {showMap && <SynthesisMapModal />}
    </div>
  );
};

// ============================================
// COMPLETION PAGE
// ============================================
const CompletionPage = ({ sessionData, onRestart }) => {
  const exportData = () => {
    const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `explorer-${sessionData.sessionId}.json`;
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50 }}>
      <Header />
      
      <main style={{ maxWidth: 480, margin: '0 auto', padding: '60px 28px', textAlign: 'center' }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: colors.success + '20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <Icons.Check size={36} color={colors.success} />
        </div>
        
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 8 }}>
          Session Complete
        </h1>
        <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 32 }}>
          Thank you for participating in this exploration.
        </p>
        
        {/* Summary */}
        <div style={{ background: colors.white, borderRadius: 20, padding: 28, textAlign: 'left', marginBottom: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 20 }}>Session Summary</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: colors.gray400, marginBottom: 4 }}>Condition</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: colors.gray800, textTransform: 'capitalize' }}>{sessionData.config.condition}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: colors.gray400, marginBottom: 4 }}>Duration</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: colors.gray800 }}>{Math.floor(sessionData.timeSpent / 60)}m {sessionData.timeSpent % 60}s</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: colors.gray400, marginBottom: 4 }}>Messages</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: colors.gray800 }}>{sessionData.messageCount}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: colors.gray400, marginBottom: 4 }}>Stance Change</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: colors.primary }}>
                {sessionData.stanceChange > 0 ? '+' : ''}{sessionData.stanceChange} points
              </div>
            </div>
          </div>
          
          <Button variant="secondary" onClick={exportData} style={{ width: '100%' }}>
            <Icons.Download size={16} /> Export Session Data (JSON)
          </Button>
        </div>
        
        <Button onClick={onRestart} style={{ width: '100%' }}>
          Start New Session
        </Button>
      </main>
    </div>
  );
};

// ============================================
// GLOBAL HEADER (DOCK BAR)
// ============================================
const GlobalHeader = ({ currentTab, onTabChange }) => (
  <header style={{
    padding: '0 40px',
    height: 70,
    borderBottom: `1px solid ${colors.gray200}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.white,
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src="/logo.png" alt="Explorer" style={{ height: 32 }} />
      <div style={{ width: 1, height: 24, background: colors.gray200, margin: '0 8px' }} />
      <span style={{ fontSize: 14, fontWeight: 500, color: colors.gray500 }}>Jiin Hur 2025</span>
    </div>
    
    <div style={{ display: 'flex', gap: 8 }}>
      {[
        { id: 'simulation', label: 'Simulation' },
        { id: 'designs', label: 'Initial Designs' },
        { id: 'casestudy', label: 'Case Study' },
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: '8px 16px',
            borderRadius: 20,
            border: 'none',
            background: currentTab === tab.id ? colors.gray900 : 'transparent',
            color: currentTab === tab.id ? colors.white : colors.gray500,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </header>
);

// ============================================
// SIMULATION VIEW (existing flow)
// ============================================
const SimulationView = () => {
  const [step, setStep] = useState('landing');
  const [config, setConfig] = useState({});
  const [questionData, setQuestionData] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const restart = () => {
    setConfig({});
    setQuestionData(null);
    setSessionData(null);
    setStep('landing');
  };

  return (
    <>
      {step === 'landing' && <LandingPage onStart={() => setStep('compare')} />}
      {step === 'compare' && <CompareStep onNext={() => setStep('api')} onBack={() => setStep('landing')} />}
      {step === 'api' && <ApiStep onNext={(d) => { setConfig({ ...config, ...d }); setStep('condition'); }} onBack={() => setStep('compare')} />}
      {step === 'condition' && <ConditionStep onNext={(d) => { setConfig({ ...config, ...d }); setStep(d.condition === 'standard' ? 'question' : 'lens'); }} onBack={() => setStep('api')} />}
      {step === 'lens' && <LensStep config={config} onNext={(d) => { setConfig({ ...config, ...d }); setStep('question'); }} onBack={() => setStep('condition')} />}
      {step === 'question' && <QuestionStep onNext={(d) => { setQuestionData(d); setStep('explore'); }} onBack={() => setStep(config.condition === 'standard' ? 'condition' : 'lens')} />}
      {step === 'explore' && <ExplorationPage config={config} questionData={questionData} onComplete={(d) => { setSessionData(d); setStep('complete'); }} onBack={() => setStep('question')} />}
      {step === 'complete' && <CompletionPage sessionData={sessionData} onRestart={restart} />}
    </>
  );
};

// ============================================
// PLACEHOLDER VIEWS FOR OTHER TABS
// ============================================
const InitialDesignsView = () => (
  <div style={{ padding: '60px 5%', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
    <h1 style={{ fontSize: 32, fontWeight: 700, color: colors.gray900, marginBottom: 12 }}>Initial Designs</h1>
    <p style={{ fontSize: 16, color: colors.gray500 }}>Design artifacts and documentation coming soon.</p>
  </div>
);

const CaseStudyView = () => (
  <div style={{ padding: '60px 5%', maxWidth: 800, margin: '0 auto' }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Case Study</div>
    <h1 style={{ fontSize: 42, fontWeight: 800, color: colors.gray900, marginBottom: 24, lineHeight: 1.1 }}>
      Designing AI Interfaces for Epistemic Openness
    </h1>
    <p style={{ fontSize: 18, color: colors.gray600, lineHeight: 1.7 }}>
      Case study content coming soon.
    </p>
  </div>
);

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [currentTab, setCurrentTab] = useState('simulation');
  
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh', background: colors.gray50 }}>
      <GlobalHeader currentTab={currentTab} onTabChange={setCurrentTab} />
      
      {currentTab === 'simulation' && <SimulationView />}
      {currentTab === 'designs' && <InitialDesignsView />}
      {currentTab === 'casestudy' && <CaseStudyView />}
    </div>
  );
}
