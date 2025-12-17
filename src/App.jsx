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
    const timer = setInterval(() => setPhase(p => (p + 1) % 100), 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <svg viewBox="0 0 900 220" style={{ width: '100%', maxWidth: 1000, height: 'auto' }}>
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.gray400} />
          <stop offset={`${phase}%`} stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>
        <linearGradient id="blueFlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.primaryLight} />
        </linearGradient>
      </defs>
      
      {/* Main horizontal line from left */}
      <path d="M 0 110 L 280 110" stroke={colors.gray400} strokeWidth="6" fill="none" strokeLinecap="round" />
      
      {/* Animated flow line */}
      <path 
        d="M 0 110 L 280 110" 
        stroke="url(#flowGrad)" 
        strokeWidth="6" 
        fill="none" 
        strokeLinecap="round"
        strokeDasharray={`${phase * 2.8} 280`}
      />
      
      {/* Center junction point */}
      <circle cx="300" cy="110" r="18" fill={colors.white} stroke={colors.primary} strokeWidth="3" />
      <g transform="translate(288, 98)"><Icons.Globe size={24} color={colors.primary} /></g>
      
      {/* Upper gray path - One Answer */}
      <path d="M 318 100 Q 400 60, 520 45" stroke={colors.gray300} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="550" cy="42" r="12" fill={colors.gray400} />
      <text x="575" y="48" fill={colors.gray500} fontSize="18" fontWeight="600">One Answer</text>
      
      {/* Lower blue path - Perspectives (thick flowing line) */}
      <path d="M 318 120 Q 380 140, 450 155 Q 520 170, 580 150" stroke="url(#blueFlow)" strokeWidth="8" fill="none" strokeLinecap="round" />
      
      {/* Perspective network nodes */}
      {[
        { x: 580, y: 100, r: 14 },
        { x: 620, y: 130, r: 16 },
        { x: 660, y: 95, r: 12 },
        { x: 700, y: 125, r: 14 },
        { x: 640, y: 165, r: 10 },
        { x: 700, y: 170, r: 12 },
        { x: 740, y: 140, r: 10 },
        { x: 620, y: 70, r: 8 },
        { x: 680, y: 60, r: 9 },
        { x: 740, y: 100, r: 8 },
      ].map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={colors.primary} opacity={0.6 + Math.sin(phase * 0.08 + i) * 0.3} />
      ))}
      
      {/* Network connections */}
      <g stroke={colors.primary} strokeWidth="2" opacity="0.4">
        <line x1="580" y1="100" x2="620" y2="130" />
        <line x1="580" y1="100" x2="620" y2="70" />
        <line x1="620" y1="130" x2="660" y2="95" />
        <line x1="620" y1="130" x2="640" y2="165" />
        <line x1="660" y1="95" x2="700" y2="125" />
        <line x1="660" y1="95" x2="680" y2="60" />
        <line x1="700" y1="125" x2="740" y2="140" />
        <line x1="700" y1="125" x2="700" y2="170" />
        <line x1="640" y1="165" x2="700" y2="170" />
        <line x1="620" y1="70" x2="680" y2="60" />
        <line x1="680" y1="60" x2="740" y2="100" />
        <line x1="740" y1="100" x2="740" y2="140" />
      </g>
      
      <text x="770" y="130" fill={colors.primary} fontSize="20" fontWeight="700">Perspectives</text>
    </svg>
  );
};

// ============================================
// HEADER
// ============================================
const Header = ({ onBack, showProgress, step, totalSteps }) => (
  <header style={{
    padding: '18px 40px',
    borderBottom: `1px solid ${colors.gray100}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.white,
    width: '100%',
    boxSizing: 'border-box',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: colors.gray100,
          border: 'none',
          borderRadius: 8,
          padding: 8,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 8,
        }}>
          <Icons.ChevronLeft size={20} color={colors.gray600} />
        </button>
      )}
      <img src="/logo.png" alt="Explorer" style={{ height: 32 }} />
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
    
    <div style={{ width: onBack ? 44 : 0 }} /> {/* Spacer for balance */}
  </header>
);

// ============================================
// LANDING PAGE
// ============================================
const LandingPage = ({ onStart }) => (
  <div style={{ minHeight: 'calc(100vh - 70px)', background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.gray50} 100%)`, width: '100%' }}>
    <main style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '80px 5%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
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
        maxWidth: 600,
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
// STEP 0: WELCOME / NAME INPUT
// ============================================
const WelcomeStep = ({ onNext, onBack }) => {
  const [name, setName] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
      <Header onBack={onBack} showProgress step={0} totalSteps={7} />
      
      <main style={{ width: '100%', maxWidth: 500, margin: '0 auto', padding: '80px 5%', boxSizing: 'border-box', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>👋</div>
        
        <h2 style={{ fontSize: 32, fontWeight: 700, color: colors.gray900, marginBottom: 12 }}>
          Hey there!
        </h2>
        <p style={{ fontSize: 16, color: colors.gray500, marginBottom: 40 }}>
          What should we call you?
        </p>
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoFocus
          style={{
            width: '100%',
            padding: '18px 24px',
            fontSize: 18,
            border: `2px solid ${colors.gray200}`,
            borderRadius: 16,
            boxSizing: 'border-box',
            outline: 'none',
            textAlign: 'center',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = colors.primary}
          onBlur={(e) => e.target.style.borderColor = colors.gray200}
          onKeyDown={(e) => e.key === 'Enter' && name.trim() && onNext({ username: name.trim() })}
        />
        
        <Button 
          onClick={() => onNext({ username: name.trim() || 'Explorer' })} 
          disabled={!name.trim()}
          style={{ width: '100%', marginTop: 24 }}
        >
          Continue <Icons.ChevronRight size={18} />
        </Button>
        
        <p style={{ fontSize: 13, color: colors.gray400, marginTop: 20 }}>
          This helps personalize your exploration experience
        </p>
      </main>
    </div>
  );
};

// ============================================
// STEP 1: INTERFACE COMPARISON
// ============================================
const CompareStep = ({ onNext, onBack }) => {
  const [viewMode, setViewMode] = useState(false); // false = standard, true = perspectives

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
      <Header onBack={onBack} showProgress step={1} totalSteps={7} />
      
      <main style={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: '50px 5%', boxSizing: 'border-box' }}>
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
    <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
      <Header onBack={onBack} showProgress step={2} totalSteps={7} />
      
      <main style={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: '50px 5%', boxSizing: 'border-box' }}>
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
      detail: 'See two analytical lenses side-by-side, each analyzing your question from their unique perspective.'
    },
    { 
      id: 'synthesis', 
      name: 'Synthesis Mode', 
      icon: Icons.Map, 
      desc: 'Debate → Archive → Map → Synthesize',
      detail: 'Watch lenses debate, archive meaningful insights, then map connections and create your own synthesis.',
      beta: true,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
      <Header onBack={onBack} showProgress step={3} totalSteps={7} />
      
      <main style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '50px 5%', boxSizing: 'border-box' }}>
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
                position: 'relative',
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
                    <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {c.name}
                      {c.beta && (
                        <span style={{
                          padding: '3px 8px',
                          background: colors.warning,
                          color: colors.white,
                          fontSize: 10,
                          fontWeight: 700,
                          borderRadius: 6,
                          textTransform: 'uppercase',
                        }}>
                          Beta
                        </span>
                      )}
                    </div>
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
    <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
      <Header onBack={onBack} showProgress step={4} totalSteps={7} />
      
      <main style={{ width: '100%', maxWidth: 1000, margin: '0 auto', padding: '50px 5%', boxSizing: 'border-box' }}>
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
const QuestionStep = ({ config, onNext, onBack }) => {
  const [question, setQuestion] = useState('');
  const [stance, setStance] = useState(50);
  
  const samples = [
    'Should schools ban smartphones?',
    'Is remote work better for productivity?',
    'Should AI be used in hiring decisions?',
    'Should cities prioritize cars or public transit?',
  ];

  return (
    <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
      <Header onBack={onBack} showProgress step={5} totalSteps={7} />
      
      <main style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '50px 5%', boxSizing: 'border-box' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: colors.gray900, marginBottom: 10 }}>
          What do you want to explore?
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
  const [activeLens, setActiveLens] = useState(null);
  const [selectedFindings, setSelectedFindings] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [synthesis, setSynthesis] = useState('');
  const [postStance, setPostStance] = useState(questionData.preStance);
  const [phase, setPhase] = useState('chat');
  const [isTyping, setIsTyping] = useState(false);
  const [debateRounds, setDebateRounds] = useState([]);
  const [isDebating, setIsDebating] = useState(false);
  const [showSynthesisSuggestion, setShowSynthesisSuggestion] = useState(false);
  const [activeLenses, setActiveLenses] = useState(config.lenses || []);
  const [showInviteLens, setShowInviteLens] = useState(false);
  const messagesEndRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  
  // Generate contextual debate responses based on the question
  const getDebateResponse = (lensId, type, question) => {
    const q = question.toLowerCase();
    
    // Detect topic keywords
    const isAboutSchools = q.includes('school') || q.includes('education') || q.includes('student');
    const isAboutPhones = q.includes('phone') || q.includes('smartphone') || q.includes('device');
    const isAboutWork = q.includes('work') || q.includes('remote') || q.includes('office') || q.includes('employee');
    const isAboutAI = q.includes('ai') || q.includes('artificial intelligence') || q.includes('algorithm');
    const isAboutTransport = q.includes('car') || q.includes('transit') || q.includes('transport') || q.includes('city');
    const isAboutHealth = q.includes('health') || q.includes('medical') || q.includes('vaccine');
    
    const responses = {
      effectiveness: {
        opening: isAboutSchools && isAboutPhones 
          ? "Studies show phone-free classrooms improve test scores by 15-20%. The data is clear: removing distractions enhances learning outcomes."
          : isAboutWork 
          ? "Productivity metrics from remote workers show mixed results - some roles see 13% gains, others decline. We need role-specific policies."
          : isAboutAI 
          ? "AI hiring tools can screen 10x more candidates, but their accuracy depends heavily on training data quality."
          : "The measurable outcomes here suggest we need data-driven decision making, not assumptions.",
        response: isAboutSchools && isAboutPhones
          ? "But 'effectiveness' for whom? Students from lower-income families often rely on phones for homework and family communication."
          : isAboutWork
          ? "Productivity isn't just output metrics. What about innovation, mentorship, and spontaneous collaboration?"
          : "We're optimizing for the wrong metrics. What we can measure isn't always what matters most.",
        rebuttal: isAboutSchools && isAboutPhones
          ? "Valid concern, but schools can provide devices. The question is whether personal phones specifically help or hurt learning."
          : isAboutWork
          ? "Those are harder to measure but not impossible. Companies like GitLab have developed async collaboration metrics."
          : "I agree we need better metrics, but having no measurement leads to policy based on anecdote.",
      },
      equity: {
        opening: isAboutSchools && isAboutPhones
          ? "23% of low-income students use phones as their primary internet device. A ban could widen the digital divide."
          : isAboutWork
          ? "Remote work disproportionately benefits those with home offices and stable internet. What about workers in shared housing?"
          : isAboutAI
          ? "AI systems trained on historical data often perpetuate existing biases against marginalized groups."
          : "We must ask: who benefits and who bears the burden of this decision?",
        response: isAboutSchools && isAboutPhones
          ? "That's a resource problem, not a phone policy problem. Schools should provide equitable access separately."
          : isAboutWork
          ? "But forcing everyone back to offices hurts caregivers and disabled workers who thrive remotely."
          : "The status quo also has inequities. Change might actually improve fairness if designed well.",
        rebuttal: isAboutSchools && isAboutPhones
          ? "Should and do are different. Until schools actually provide alternatives, bans harm the most vulnerable students first."
          : isAboutWork
          ? "Hybrid models could address both concerns - flexibility for those who need it, presence for those who benefit."
          : "Designed well is doing a lot of work there. History shows good intentions don't guarantee equitable outcomes.",
      },
      autonomy: {
        opening: isAboutSchools && isAboutPhones
          ? "Students deserve agency over their tools. Bans treat young people as incapable of self-regulation."
          : isAboutWork
          ? "Adults should choose where they work best. Mandates infantilize professionals."
          : isAboutAI
          ? "People have a right to know when AI is making decisions about them and to opt out."
          : "Individual choice should be paramount. People know their own needs better than institutions.",
        response: isAboutSchools && isAboutPhones
          ? "Schools exist precisely because children need structured environments. That's not disrespect, it's developmental reality."
          : isAboutWork
          ? "But your choice affects your team. Autonomy has limits when it impacts collective work."
          : "Unlimited choice isn't always better. Sometimes constraints enable better outcomes.",
        rebuttal: isAboutSchools && isAboutPhones
          ? "There's a difference between structure and prohibition. Teaching self-regulation requires practice, not removal of choice."
          : isAboutWork
          ? "Then make the case for presence, don't mandate it. Persuasion respects autonomy; mandates don't."
          : "Who decides what 'better outcomes' means? That's exactly the autonomy question.",
      },
      collective: {
        opening: isAboutSchools && isAboutPhones
          ? "One student's phone use affects everyone's learning environment. Classroom attention is a shared resource."
          : isAboutWork
          ? "Office culture, mentorship, and team cohesion benefit everyone. Individual preferences can't override collective needs."
          : isAboutAI
          ? "AI decisions affect communities, not just individuals. We need collective governance, not just individual rights."
          : "Individual optimization often creates collective problems. We need to think systemically.",
        response: isAboutSchools && isAboutPhones
          ? "But collective rules often mask majority preferences. What about neurodivergent students who focus better with music or fidgeting?"
          : isAboutWork
          ? "The 'collective' you're describing is often just extrovert preferences dressed up as universal needs."
          : "Collective governance sounds nice but often means the loudest voices dominate.",
        rebuttal: isAboutSchools && isAboutPhones
          ? "Accommodations for specific needs are different from blanket phone access. We can do both."
          : isAboutWork
          ? "Fair critique. But some collaboration genuinely requires presence. The question is how much."
          : "That's a design problem, not an argument against collective decision-making itself.",
      },
      practical: {
        opening: isAboutSchools && isAboutPhones
          ? "Enforcement is the real issue. Teachers spend 20% of class time managing phones. Bans at least give them authority."
          : isAboutWork
          ? "Office space costs are real. Companies can't maintain empty buildings indefinitely. Something has to give."
          : isAboutAI
          ? "AI is already being used. The practical question is regulation, not prohibition."
          : "Let's focus on what's actually implementable given real-world constraints.",
        response: isAboutSchools && isAboutPhones
          ? "Bans don't solve enforcement - they just change what you're enforcing. Students will hide phones, creating adversarial dynamics."
          : isAboutWork
          ? "The cost argument cuts both ways. Remote work reduces commute costs, childcare costs, and environmental impact."
          : "Practical constraints shouldn't override ethical concerns. 'We can' doesn't mean 'we should.'",
        rebuttal: isAboutSchools && isAboutPhones
          ? "Some adversarial dynamics exist regardless. The question is whether the policy is worth enforcing, and I think it is."
          : isAboutWork
          ? "True, but those savings accrue to individuals while office costs hit company budgets. Incentives are misaligned."
          : "Ethics without implementation is just wishful thinking. We need both.",
      },
      longterm: {
        opening: isAboutSchools && isAboutPhones
          ? "A generation raised on constant connectivity may lack deep focus skills. We're shaping cognitive habits for life."
          : isAboutWork
          ? "Remote-first companies are building different cultures. In 10 years, will office-centric firms seem outdated?"
          : isAboutAI
          ? "AI decisions compound over time. Small biases today become systemic discrimination tomorrow."
          : "Short-term convenience often creates long-term problems. We need to think generationally.",
        response: isAboutSchools && isAboutPhones
          ? "Or they'll develop new skills we can't imagine. Every generation fears the next generation's tools."
          : isAboutWork
          ? "Or remote-first companies will struggle with culture and innovation. We don't know yet."
          : "Long-term thinking can also be an excuse for inaction. Sometimes we need to act now.",
        rebuttal: isAboutSchools && isAboutPhones
          ? "History shows some fears are valid. Not every new tool is neutral. Attention fragmentation is well-documented."
          : isAboutWork
          ? "True, but the trends favor flexibility. Companies that adapt will attract talent; those that don't will struggle."
          : "Acting now without considering consequences is how we got many current problems.",
      },
      human: {
        opening: isAboutSchools && isAboutPhones
          ? "Behind the policy debate are real kids. Some use phones to cope with anxiety. Some text parents during scary situations."
          : isAboutWork
          ? "Remote work let a single mom keep her job while caring for her sick child. These stories matter."
          : isAboutAI
          ? "When an algorithm rejects your loan application, you're not a data point. You're a person with dreams and needs."
          : "Behind every statistic is a human story. We can't reduce people to numbers.",
        response: isAboutSchools && isAboutPhones
          ? "Individual stories are compelling but can mislead. Policy needs to work for the average case, with exceptions handled separately."
          : isAboutWork
          ? "Anecdotes aren't data. For every positive remote work story, there's someone isolated and struggling."
          : "Emotional appeals can cloud judgment. We need both heart and head.",
        rebuttal: isAboutSchools && isAboutPhones
          ? "The 'average case' often means the majority's preferences override minority needs. That's exactly the problem."
          : isAboutWork
          ? "Both stories are true. That's why we need flexibility, not one-size-fits-all mandates."
          : "Dismissing emotion as 'clouding judgment' is itself a value judgment. Emotions carry information.",
      },
      systems: {
        opening: isAboutSchools && isAboutPhones
          ? "Phone bans address symptoms, not causes. Why are students disengaged? That's the system question."
          : isAboutWork
          ? "Office vs. remote is a false binary. The real question is how information flows through organizations."
          : isAboutAI
          ? "AI doesn't exist in isolation. It's embedded in hiring systems, feedback loops, and power structures."
          : "This isn't a linear problem. We need to understand the feedback loops and unintended consequences.",
        response: isAboutSchools && isAboutPhones
          ? "Sometimes you treat symptoms while working on root causes. Students need focus skills now, not after we fix education."
          : isAboutWork
          ? "Information flow is important, but so is human connection. Systems thinking shouldn't ignore social dynamics."
          : "Systems thinking can lead to paralysis. Sometimes simple interventions work.",
        rebuttal: isAboutSchools && isAboutPhones
          ? "Treating symptoms often creates new problems. Bans might increase anxiety, worsen trust, or shift distraction elsewhere."
          : isAboutWork
          ? "Social dynamics ARE part of the system. I'm not ignoring them; I'm saying they work differently than assumed."
          : "Simple interventions in complex systems often backfire. That's the whole point of systems thinking.",
      },
    };
    
    return responses[lensId]?.[type] || "Let me offer my perspective on this complex issue...";
  };
  
  // Generate a debate round with contextual responses
  const generateDebateRound = () => {
    if (!activeLenses || activeLenses.length < 2) return;
    
    setIsDebating(true);
    const question = questionData.question;
    
    setTimeout(() => {
      // Create exchanges based on number of active lenses
      const exchanges = [];
      const types = ['opening', 'response', 'rebuttal', 'counter'];
      
      activeLenses.forEach((lens, i) => {
        exchanges.push({
          lens: lens,
          text: getDebateResponse(lens.id, types[i % types.length], question),
          type: types[i % types.length],
        });
      });
      
      // Add one more rebuttal from first lens if we have 2-3 lenses
      if (activeLenses.length <= 3) {
        exchanges.push({
          lens: activeLenses[0],
          text: getDebateResponse(activeLenses[0].id, 'rebuttal', question),
          type: 'rebuttal',
        });
      }
      
      const round = {
        id: Date.now(),
        exchanges,
      };
      setDebateRounds(prev => [...prev, round]);
      setIsDebating(false);
    }, 1500);
  };
  
  // Add a new lens to the debate
  const inviteLens = (lens) => {
    if (activeLenses.length >= 4) return;
    if (activeLenses.find(l => l.id === lens.id)) return;
    
    setActiveLenses([...activeLenses, lens]);
    setShowInviteLens(false);
    
    // Add invitation announcement and lens introduction
    const introRound = {
      id: Date.now(),
      isInvitation: true,
      invitedLens: lens,
      username: questionData.username,
      exchanges: [
        {
          lens: lens,
          text: getDebateResponse(lens.id, 'opening', questionData.question),
          type: 'introduction',
        },
      ],
    };
    setDebateRounds(prev => [...prev, introRound]);
  };
  
  // Remove a lens from the debate
  const removeLens = (lensId) => {
    if (activeLenses.length <= 2) return; // Keep minimum 2
    setActiveLenses(activeLenses.filter(l => l.id !== lensId));
  };

  // Initial response based on mode
  useEffect(() => {
    if (config.condition === 'standard') {
      setMessages([
        { id: 1, type: 'user', text: questionData.question },
        { id: 2, type: 'ai', text: 'This involves multiple considerations worth examining carefully. Research suggests both potential benefits and significant drawbacks depending on context. Key factors include stakeholder impact, implementation feasibility, and long-term consequences. What specific aspect would you like to explore?' },
      ]);
    } else if (config.condition === 'split') {
      // Split view - dual responses chat style
      const lens1 = config.lenses[0];
      const lens2 = config.lenses[1];
      setMessages([
        { 
          id: 0, 
          type: 'system-intro',
          username: questionData.username,
          lenses: [lens1, lens2],
        },
        { id: 1, type: 'user', text: questionData.question },
        { 
          id: 2, 
          type: 'dual-response',
          responses: [
            { lens: lens1, text: getDebateResponse(lens1.id, 'opening', questionData.question) },
            { lens: lens2, text: getDebateResponse(lens2.id, 'opening', questionData.question) },
          ]
        },
      ]);
    } else {
      // Synthesis mode - starts with debate
      generateDebateRound();
    }
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: input, targetLens: activeLens };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      if (activeLens) {
        // Single lens response
        const lens = config.lenses.find(l => l.id === activeLens);
        const responses = DEMO_FINDINGS[activeLens] || [];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]?.text || 
          `From a ${lens?.name.toLowerCase()} perspective, this raises important considerations about ${lens?.question.toLowerCase()}`;
        setMessages(prev => [...prev, { id: Date.now(), type: 'single-response', lens, text: randomResponse }]);
      } else {
        // Dual lens response
        const lens1 = config.lenses[0];
        const lens2 = config.lenses[1];
        const resp1 = DEMO_FINDINGS[lens1.id] || [];
        const resp2 = DEMO_FINDINGS[lens2.id] || [];
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          type: 'dual-response',
          responses: [
            { lens: lens1, text: resp1[Math.floor(Math.random() * resp1.length)]?.text || 'Considering this angle...' },
            { lens: lens2, text: resp2[Math.floor(Math.random() * resp2.length)]?.text || 'From this viewpoint...' },
          ]
        }]);
      }
    }, 800);
  };

  const toggleFinding = (finding, lens, customKey = null) => {
    const key = customKey || `${lens.id}-${finding.id}`;
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

  // Synthesis Map Modal state (moved outside to prevent re-render issues)
  const [hoveredNode, setHoveredNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);
  const [nodePositions, setNodePositions] = useState({});
  
  // Initialize positions for findings
  useEffect(() => {
    if (showMap && selectedFindings.length > 0) {
      const positions = {};
      selectedFindings.forEach((item, i) => {
        if (!nodePositions[item.key]) {
          const angle = (i / Math.max(selectedFindings.length, 1)) * Math.PI * 2 - Math.PI / 2;
          const radius = 180;
          positions[item.key] = {
            x: 400 + Math.cos(angle) * radius,
            y: 200 + Math.sin(angle) * radius,
          };
        }
      });
      if (Object.keys(positions).length > 0) {
        setNodePositions(prev => ({ ...prev, ...positions }));
      }
    }
  }, [showMap, selectedFindings.length]);

  // Helper functions for synthesis map
  const handleDrag = (e, key) => {
    if (draggedNode === key) {
      const svg = e.currentTarget.closest('svg');
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 800;
      const y = ((e.clientY - rect.top) / rect.height) * 400;
      setNodePositions(prev => ({ ...prev, [key]: { x: Math.max(80, Math.min(720, x)), y: Math.max(50, Math.min(350, y)) } }));
    }
  };

  const getKeywords = (text) => {
    const words = text.split(' ').filter(w => w.length > 5).slice(0, 3);
    return words.map(w => w.replace(/[^a-zA-Z]/g, '')).join(' · ');
  };

  // Synthesis Map Modal (inline JSX, not a component)
  const synthesisMapModal = showMap && (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
        <div style={{ background: colors.white, borderRadius: 20, width: '95%', maxWidth: 1000, maxHeight: '95vh', overflow: 'auto' }}>
          <div style={{ padding: '18px 24px', borderBottom: `1px solid ${colors.gray200}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: colors.gray900 }}>Synthesis Map</h3>
            <button onClick={() => setShowMap(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <Icons.X size={20} color={colors.gray500} />
            </button>
          </div>
          
          <div style={{ padding: 24 }}>
            {/* Interactive Visual Map */}
            <div style={{ background: `linear-gradient(135deg, ${colors.gray50} 0%, ${colors.white} 100%)`, borderRadius: 16, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
              {selectedFindings.length === 0 ? (
                <div style={{ textAlign: 'center', color: colors.gray400, padding: '120px 20px', fontSize: 15 }}>
                  <Icons.Map size={48} color={colors.gray300} />
                  <p style={{ marginTop: 16 }}>Select findings from each lens to build your synthesis map</p>
                  <p style={{ fontSize: 13, color: colors.gray300 }}>Drag nodes to arrange them</p>
                </div>
              ) : (
                <svg 
                  width="100%" 
                  height="400" 
                  viewBox="0 0 800 400"
                  onMouseMove={(e) => draggedNode && handleDrag(e, draggedNode)}
                  onMouseUp={() => setDraggedNode(null)}
                  onMouseLeave={() => setDraggedNode(null)}
                  style={{ cursor: draggedNode ? 'grabbing' : 'default' }}
                >
                  <defs>
                    {selectedFindings.map(item => (
                      <linearGradient key={`grad-${item.key}`} id={`grad-${item.key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={item.lens.color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={item.lens.color} stopOpacity="0.05" />
                      </linearGradient>
                    ))}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  
                  {/* Flowing connection lines */}
                  {selectedFindings.map((item) => {
                    const pos = nodePositions[item.key] || { x: 400, y: 200 };
                    return (
                      <path
                        key={`line-${item.key}`}
                        d={`M ${pos.x} ${pos.y} Q ${(pos.x + 400) / 2} ${(pos.y + 200) / 2 + 30} 400 200`}
                        stroke={item.lens.color}
                        strokeWidth={hoveredNode === item.key ? 4 : 2}
                        fill="none"
                        opacity={hoveredNode === item.key ? 0.8 : 0.3}
                        style={{ transition: 'all 0.3s ease' }}
                      />
                    );
                  })}
                  
                  {/* Center synthesis node */}
                  <g style={{ filter: 'url(#glow)' }}>
                    <ellipse cx="400" cy="200" rx="70" ry="45" fill={colors.primaryFaded} stroke={colors.primary} strokeWidth="2" />
                    <text x="400" y="195" textAnchor="middle" fontSize="14" fill={colors.primary} fontWeight="700">Your</text>
                    <text x="400" y="215" textAnchor="middle" fontSize="14" fill={colors.primary} fontWeight="700">Synthesis</text>
                  </g>
                  
                  {/* Finding nodes - organic shapes with keywords */}
                  {selectedFindings.map((item, i) => {
                    const pos = nodePositions[item.key] || { x: 400, y: 200 };
                    const isHovered = hoveredNode === item.key;
                    const keywords = getKeywords(item.finding.text);
                    
                    return (
                      <g 
                        key={item.key}
                        onMouseEnter={() => setHoveredNode(item.key)}
                        onMouseLeave={() => !draggedNode && setHoveredNode(null)}
                        onMouseDown={() => setDraggedNode(item.key)}
                        style={{ cursor: 'grab' }}
                      >
                        {/* Organic blob shape */}
                        <ellipse
                          cx={pos.x}
                          cy={pos.y}
                          rx={isHovered ? 95 : 85}
                          ry={isHovered ? 45 : 38}
                          fill={`url(#grad-${item.key})`}
                          stroke={item.lens.color}
                          strokeWidth={isHovered ? 3 : 2}
                          style={{ transition: 'all 0.2s ease' }}
                        />
                        
                        {/* Lens name */}
                        <text 
                          x={pos.x} 
                          y={pos.y - 10} 
                          textAnchor="middle" 
                          fontSize="11" 
                          fill={item.lens.color} 
                          fontWeight="700"
                          style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
                        >
                          {item.lens.name}
                        </text>
                        
                        {/* Keywords */}
                        <text 
                          x={pos.x} 
                          y={pos.y + 8} 
                          textAnchor="middle" 
                          fontSize="10" 
                          fill={colors.gray600}
                          fontWeight="500"
                        >
                          {keywords || item.finding.id}
                        </text>
                        
                        {/* Remove button on hover */}
                        {isHovered && (
                          <g 
                            onClick={(e) => { e.stopPropagation(); toggleFinding(item.finding, item.lens); }}
                            style={{ cursor: 'pointer' }}
                          >
                            <circle cx={pos.x + 70} cy={pos.y - 25} r="12" fill={colors.white} stroke={colors.gray300} />
                            <text x={pos.x + 70} y={pos.y - 21} textAnchor="middle" fontSize="14" fill={colors.gray500}>×</text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>
            
            {/* Selected Findings - Horizontal layout */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: colors.gray700, marginBottom: 12 }}>
                Selected Findings ({selectedFindings.length})
              </h4>
              {selectedFindings.length === 0 ? (
                <p style={{ fontSize: 13, color: colors.gray400 }}>Click findings in the chat to add them here.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
                  {selectedFindings.map(item => (
                    <div key={item.key} style={{
                      padding: 14,
                      borderRadius: 12,
                      background: `${item.lens.color}08`,
                      border: `2px solid ${item.lens.color}30`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: item.lens.color, textTransform: 'uppercase' }}>{item.lens.name}</span>
                        <button onClick={() => toggleFinding(item.finding, item.lens)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                          <Icons.X size={14} color={colors.gray400} />
                        </button>
                      </div>
                      <p style={{ fontSize: 13, color: colors.gray700, margin: 0, lineHeight: 1.5 }}>{item.finding.text}</p>
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
                  minHeight: 120,
                  resize: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontSize: 12, color: synthesis.length >= 10 ? colors.success : colors.gray400 }}>
                  {synthesis.length < 10 ? `${10 - synthesis.length} more characters needed` : '✓ Ready to submit'}
                </span>
                <span style={{ fontSize: 12, color: colors.gray400 }}>{synthesis.length} characters</span>
              </div>
            </div>
            
            {/* Buttons inside scrollable area */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingBottom: 8 }}>
              <Button variant="secondary" onClick={() => setShowMap(false)} style={{ flex: 1 }}>
                Continue Exploring
              </Button>
              <Button onClick={() => { setShowMap(false); setPhase('rating'); }} disabled={selectedFindings.length < 1 || synthesis.length < 10} style={{ flex: 1 }}>
                Complete Synthesis
              </Button>
            </div>
          </div>
        </div>
      </div>
  );

  // Rating Phase
  if (phase === 'rating') {
    return (
      <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
        <Header onBack={() => setPhase('chat')} showProgress step={5} totalSteps={6} />
        
        <main style={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: '60px 5%', textAlign: 'center', boxSizing: 'border-box' }}>
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

  // Render Synthesis Mode UI (Debate + Archive + Map)
  if (config.condition === 'synthesis') {
    const archivedCount = selectedFindings.length;
    
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: colors.gray50 }}>
        <Header onBack={onBack} showProgress step={6} totalSteps={7} />
        
        {/* Debate Header */}
        <div style={{ 
          background: colors.white, 
          borderBottom: `1px solid ${colors.gray200}`,
          padding: '20px 24px',
        }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.gray900, margin: 0 }}>
                    Synthesis Mode
                  </h2>
                  <span style={{ padding: '3px 8px', background: colors.warning, color: colors.white, fontSize: 10, fontWeight: 700, borderRadius: 6 }}>BETA</span>
                </div>
                <p style={{ fontSize: 14, color: colors.gray500, margin: 0 }}>
                  {questionData.question}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {archivedCount > 0 && (
                  <Button variant="secondary" onClick={() => setShowMap(true)} size="sm">
                    <Icons.Map size={16} /> Archive ({archivedCount})
                  </Button>
                )}
              </div>
            </div>
            
            {/* Debating Lenses */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: colors.gray500 }}>Debating:</span>
              {activeLenses.map((lens) => (
                <div key={lens.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  background: `${lens.color}10`,
                  borderRadius: 20,
                  border: `2px solid ${lens.color}30`,
                }}>
                  {React.createElement(lens.icon, { size: 14, color: lens.color })}
                  <span style={{ fontSize: 12, fontWeight: 600, color: lens.color }}>{lens.name}</span>
                  {activeLenses.length > 2 && (
                    <button 
                      onClick={() => removeLens(lens.id)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: 0,
                        marginLeft: 4,
                        opacity: 0.6,
                        display: 'flex',
                      }}
                    >
                      <Icons.X size={12} color={lens.color} />
                    </button>
                  )}
                </div>
              ))}
              
              {activeLenses.length < 4 && (
                <button
                  onClick={() => setShowInviteLens(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    background: colors.white,
                    borderRadius: 20,
                    border: `2px dashed ${colors.gray300}`,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.gray500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  + Invite Lens
                </button>
              )}
              
              <span style={{ fontSize: 18, color: colors.gray300, marginLeft: 4 }}>⚔️</span>
            </div>
          </div>
        </div>
        
        {/* Debate Rounds */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px 16px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            {/* Archiving Guide */}
            <div style={{ 
              background: colors.primaryFaded, 
              borderRadius: 12, 
              padding: 20, 
              marginBottom: 24,
              border: `1px solid ${colors.primary}20`,
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: colors.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icons.Info size={16} /> How Synthesis Mode Works
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>1️⃣</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray700 }}>Watch</div>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>Lenses debate your question</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>2️⃣</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray700 }}>Archive</div>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>Click insights that resonate or challenge you</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>3️⃣</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.gray700 }}>Synthesize</div>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>Map connections & write your take</div>
                </div>
              </div>
              {archivedCount > 0 && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${colors.primary}20` }}>
                  <div style={{ fontSize: 13, color: colors.gray600 }}>
                    <strong style={{ color: colors.primary }}>{archivedCount} insight{archivedCount !== 1 ? 's' : ''} archived</strong>
                    {archivedCount < 2 ? ' — archive at least 2 to synthesize' : ' — ready to synthesize!'}
                  </div>
                </div>
              )}
            </div>
            
            {debateRounds.length === 0 && !isDebating && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎭</div>
                <h3 style={{ fontSize: 18, color: colors.gray700, marginBottom: 8 }}>Ready to debate</h3>
                <p style={{ fontSize: 14, color: colors.gray500, marginBottom: 24 }}>
                  Watch {config.lenses[0]?.name} and {config.lenses[1]?.name} discuss: <em>"{questionData.question}"</em>
                </p>
                <Button onClick={generateDebateRound}>
                  Start Debate <Icons.ChevronRight size={18} />
                </Button>
              </div>
            )}
            
            {debateRounds.map((round, roundIndex) => (
              <div key={round.id} style={{ marginBottom: 32 }}>
                {/* Invitation announcement */}
                {round.isInvitation ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px',
                    marginBottom: 16,
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 20px',
                      background: `linear-gradient(135deg, ${round.invitedLens.color}10 0%, ${colors.white} 100%)`,
                      borderRadius: 24,
                      border: `2px solid ${round.invitedLens.color}30`,
                    }}>
                      <span style={{ fontSize: 14, color: colors.gray600 }}>
                        <strong style={{ color: colors.primary }}>{round.username}</strong> invited
                      </span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '4px 10px',
                        background: `${round.invitedLens.color}15`,
                        borderRadius: 12,
                      }}>
                        {React.createElement(round.invitedLens.icon, { size: 14, color: round.invitedLens.color })}
                        <span style={{ fontSize: 13, fontWeight: 700, color: round.invitedLens.color }}>
                          {round.invitedLens.name}
                        </span>
                      </div>
                      <span style={{ fontSize: 14, color: colors.gray600 }}>to the debate</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    fontSize: 12, 
                    color: colors.gray400, 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}>
                    <div style={{ flex: 1, height: 1, background: colors.gray200 }} />
                    Round {debateRounds.filter((r, i) => i <= roundIndex && !r.isInvitation).length}
                    <div style={{ flex: 1, height: 1, background: colors.gray200 }} />
                  </div>
                )}
                
                {round.exchanges.map((exchange, i) => {
                  const isLeft = exchange.lens.id === config.lenses[0]?.id;
                  const exchangeKey = `${round.id}-${i}`;
                  const isArchived = selectedFindings.find(f => f.key === exchangeKey);
                  
                  return (
                    <div 
                      key={i} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                        marginBottom: 16,
                      }}
                    >
                      <div 
                        onClick={() => toggleFinding({ id: exchangeKey, text: exchange.text }, exchange.lens, exchangeKey)}
                        style={{
                          maxWidth: '65%',
                          padding: 20,
                          borderRadius: 16,
                          borderTopLeftRadius: isLeft ? 4 : 16,
                          borderTopRightRadius: isLeft ? 16 : 4,
                          background: isArchived ? `${exchange.lens.color}08` : colors.white,
                          border: `2px solid ${isArchived ? exchange.lens.color : exchange.lens.color + '20'}`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 8, 
                          marginBottom: 10,
                        }}>
                          <div style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: `${exchange.lens.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            {React.createElement(exchange.lens.icon, { size: 14, color: exchange.lens.color })}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 700, color: exchange.lens.color }}>
                            {exchange.lens.name}
                          </span>
                          <span style={{ 
                            fontSize: 11, 
                            color: exchange.type === 'introduction' ? colors.primary : colors.gray400, 
                            background: exchange.type === 'introduction' ? colors.primaryFaded : colors.gray100, 
                            padding: '2px 8px', 
                            borderRadius: 10 
                          }}>
                            {exchange.type === 'introduction' ? '👋 joining the debate' : exchange.type}
                          </span>
                          {isArchived && (
                            <span style={{ fontSize: 13, marginLeft: 'auto' }}>⭐</span>
                          )}
                        </div>
                        <p style={{ margin: 0, fontSize: 15, color: colors.gray700, lineHeight: 1.6 }}>
                          "{exchange.text}"
                        </p>
                        <div style={{ marginTop: 10, fontSize: 11, color: isArchived ? colors.primary : colors.gray400, display: 'flex', alignItems: 'center', gap: 4 }}>
                          {isArchived ? '⭐ Archived to your synthesis' : 'Click to archive'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            
            {/* Typing indicator during debate */}
            {isDebating && (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: config.lenses[0]?.color, animation: 'pulse 1s infinite' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors.gray300, animation: 'pulse 1s infinite 0.2s' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: config.lenses[1]?.color, animation: 'pulse 1s infinite 0.4s' }} />
                </div>
                <p style={{ fontSize: 14, color: colors.gray500, marginTop: 12 }}>Lenses are debating...</p>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Bottom Actions */}
        {debateRounds.length > 0 && !isDebating && (
          <div style={{ 
            borderTop: `1px solid ${colors.gray200}`, 
            padding: '16px 24px', 
            background: colors.white,
          }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Button onClick={generateDebateRound} variant="secondary">
                Another Round
              </Button>
              {archivedCount >= 2 ? (
                <Button onClick={() => setShowMap(true)}>
                  <Icons.Map size={18} /> Map & Synthesize ({archivedCount})
                </Button>
              ) : (
                <Button disabled>
                  Archive {2 - archivedCount} more to synthesize
                </Button>
              )}
            </div>
          </div>
        )}
        
        {synthesisMapModal}
        
        {/* Invite Lens Modal */}
        {showInviteLens && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: colors.white, borderRadius: 20, padding: 28, maxWidth: 500, width: '90%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.gray900, margin: 0 }}>
                  Invite Another Lens
                </h3>
                <button onClick={() => setShowInviteLens(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Icons.X size={20} color={colors.gray400} />
                </button>
              </div>
              <p style={{ fontSize: 14, color: colors.gray500, marginBottom: 20 }}>
                Add a new perspective to the debate ({4 - activeLenses.length} slot{4 - activeLenses.length !== 1 ? 's' : ''} remaining)
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {LENSES.filter(lens => !activeLenses.find(l => l.id === lens.id)).map(lens => {
                  const Icon = lens.icon;
                  return (
                    <button
                      key={lens.id}
                      onClick={() => inviteLens(lens)}
                      style={{
                        padding: 16,
                        borderRadius: 12,
                        border: `2px solid ${colors.gray200}`,
                        background: colors.white,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = lens.color;
                        e.currentTarget.style.background = `${lens.color}08`;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = colors.gray200;
                        e.currentTarget.style.background = colors.white;
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <div style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: `${lens.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Icon size={16} color={lens.color} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: lens.color }}>{lens.name}</span>
                      </div>
                      <p style={{ fontSize: 12, color: colors.gray500, margin: 0 }}>{lens.question}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: colors.gray50 }}>
      <Header onBack={onBack} showProgress step={6} totalSteps={7} />
      
      {/* Chat Messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 16px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ marginBottom: 24 }}>
              {/* System intro message */}
              {msg.type === 'system-intro' && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '24px 20px',
                  background: `linear-gradient(135deg, ${colors.primaryFaded} 0%, ${colors.white} 100%)`,
                  borderRadius: 16,
                  marginBottom: 8,
                }}>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 8,
                    padding: '8px 16px',
                    background: colors.white,
                    borderRadius: 20,
                    marginBottom: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.success }} />
                    <span style={{ fontSize: 13, color: colors.gray600 }}>Session Active</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: colors.gray900, marginBottom: 8 }}>
                    <span style={{ color: colors.primary }}>{msg.username}</span> activated dual-lens mode
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
                    {msg.lenses.map((lens, i) => (
                      <div key={lens.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 16px',
                        background: colors.white,
                        borderRadius: 12,
                        border: `2px solid ${lens.color}30`,
                      }}>
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: `${lens.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {React.createElement(lens.icon, { size: 16, color: lens.color })}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: lens.color }}>{lens.name}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: colors.gray500, marginTop: 16, marginBottom: 0 }}>
                    Both perspectives will analyze your questions. Tag a specific lens to ask it directly.
                  </p>
                </div>
              )}
              
              {/* User message */}
              {msg.type === 'user' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <div style={{ 
                    maxWidth: '75%', 
                    padding: '16px 20px', 
                    borderRadius: 20,
                    borderBottomRightRadius: 6,
                    background: colors.gray800, 
                    color: colors.white, 
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}>
                    {msg.targetLens && (
                      <div style={{ 
                        fontSize: 11, 
                        opacity: 0.7, 
                        marginBottom: 6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                        @{config.lenses.find(l => l.id === msg.targetLens)?.name}
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              )}
              
              {/* Dual lens response - side by side */}
              {msg.type === 'dual-response' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {msg.responses.map((resp, i) => (
                    <div 
                      key={i}
                      onClick={() => config.condition === 'synthesis' && toggleFinding({ id: `${msg.id}-${i}`, text: resp.text }, resp.lens)}
                      style={{ 
                        padding: 20, 
                        borderRadius: 16,
                        background: colors.white,
                        border: `2px solid ${resp.lens.color}20`,
                        borderLeft: `4px solid ${resp.lens.color}`,
                        cursor: config.condition === 'synthesis' ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 8, 
                          background: `${resp.lens.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {React.createElement(resp.lens.icon, { size: 18, color: resp.lens.color })}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: resp.lens.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {resp.lens.name}
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: 14, color: colors.gray700, lineHeight: 1.6 }}>
                        {resp.text}
                      </p>
                      {config.condition === 'synthesis' && (
                        <div style={{ marginTop: 12, fontSize: 11, color: colors.gray400 }}>
                          Click to add to synthesis
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Single lens response */}
              {msg.type === 'single-response' && (
                <div style={{ 
                  maxWidth: '70%',
                  padding: 20, 
                  borderRadius: 16,
                  borderBottomLeftRadius: 6,
                  background: colors.white,
                  border: `2px solid ${msg.lens.color}20`,
                  borderLeft: `4px solid ${msg.lens.color}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ 
                      width: 28, 
                      height: 28, 
                      borderRadius: 6, 
                      background: `${msg.lens.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {React.createElement(msg.lens.icon, { size: 16, color: msg.lens.color })}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: msg.lens.color, textTransform: 'uppercase' }}>
                      {msg.lens.name}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: colors.gray700, lineHeight: 1.6 }}>
                    {msg.text}
                  </p>
                </div>
              )}
              
              {/* Standard AI response */}
              {msg.type === 'ai' && (
                <div style={{ 
                  maxWidth: '75%', 
                  padding: '16px 20px', 
                  borderRadius: 20,
                  borderBottomLeftRadius: 6,
                  background: colors.white, 
                  fontSize: 15, 
                  color: colors.gray700,
                  lineHeight: 1.6,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', gap: 16 }}>
              {config.condition !== 'standard' ? (
                <>
                  <div style={{ flex: 1, padding: 20, borderRadius: 16, background: colors.white, border: `2px solid ${colors.gray200}` }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300, animation: 'pulse 1s infinite' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300, animation: 'pulse 1s infinite 0.2s' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300, animation: 'pulse 1s infinite 0.4s' }} />
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: 20, borderRadius: 16, background: colors.white, border: `2px solid ${colors.gray200}` }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300, animation: 'pulse 1s infinite' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300, animation: 'pulse 1s infinite 0.2s' }} />
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300, animation: 'pulse 1s infinite 0.4s' }} />
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ padding: 20, borderRadius: 16, background: colors.white }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300 }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300 }} />
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: colors.gray300 }} />
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div style={{ borderTop: `1px solid ${colors.gray200}`, padding: '16px 24px', background: colors.white }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Lens tag buttons */}
          {config.condition !== 'standard' && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: colors.gray400, marginRight: 4 }}>Ask:</span>
              <button 
                onClick={() => setActiveLens(null)} 
                style={{
                  padding: '6px 12px',
                  borderRadius: 16,
                  border: `1.5px solid ${!activeLens ? colors.primary : colors.gray200}`,
                  background: !activeLens ? colors.primaryFaded : colors.white,
                  fontSize: 12,
                  fontWeight: 600,
                  color: !activeLens ? colors.primary : colors.gray500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Both
              </button>
              {config.lenses.map(lens => (
                <button 
                  key={lens.id} 
                  onClick={() => setActiveLens(lens.id)} 
                  style={{
                    padding: '6px 12px',
                    borderRadius: 16,
                    border: `1.5px solid ${activeLens === lens.id ? lens.color : colors.gray200}`,
                    background: activeLens === lens.id ? `${lens.color}15` : colors.white,
                    fontSize: 12,
                    fontWeight: 600,
                    color: activeLens === lens.id ? lens.color : colors.gray500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {React.createElement(lens.icon, { size: 12 })}
                  {lens.name}
                </button>
              ))}
            </div>
          )}
          
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={
                activeLens 
                  ? `Ask ${config.lenses.find(l => l.id === activeLens)?.name} lens...` 
                  : config.condition !== 'standard' 
                    ? 'Ask both perspectives...' 
                    : 'Type your message...'
              }
              style={{ 
                flex: 1, 
                padding: '14px 20px', 
                fontSize: 15, 
                border: `2px solid ${colors.gray200}`, 
                borderRadius: 24, 
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary}
              onBlur={(e) => e.target.style.borderColor = colors.gray200}
            />
            <Button onClick={handleSend} disabled={!input.trim()} size="md" style={{ borderRadius: 24, padding: '14px 20px' }}>
              <Icons.Send size={18} />
            </Button>
            
            {config.condition === 'synthesis' && (
              <Button variant="secondary" onClick={() => setShowMap(true)} size="md" style={{ borderRadius: 24 }}>
                <Icons.Map size={18} /> Synthesize
              </Button>
            )}
            
            {config.condition === 'split' && (
              <Button variant="secondary" onClick={() => setShowSynthesisSuggestion(true)} size="md" style={{ borderRadius: 24 }}>
                Done
              </Button>
            )}
            {config.condition === 'standard' && (
              <Button variant="secondary" onClick={() => setPhase('rating')} size="md" style={{ borderRadius: 24 }}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {synthesisMapModal}
      
      {/* Synthesis Suggestion Modal for Split View */}
      {showSynthesisSuggestion && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: colors.white, borderRadius: 20, padding: 32, maxWidth: 450, width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🧪</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: colors.gray900, marginBottom: 8 }}>
              Want to go deeper?
            </h3>
            <p style={{ fontSize: 15, color: colors.gray500, marginBottom: 24, lineHeight: 1.6 }}>
              Try <strong>Synthesis Mode</strong> to watch lenses debate, archive key insights, and create your own synthesis map.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Button variant="secondary" onClick={() => { setShowSynthesisSuggestion(false); setPhase('rating'); }}>
                No thanks, finish
              </Button>
              <Button onClick={() => { 
                setShowSynthesisSuggestion(false);
                onComplete({ trySynthesisMode: true });
              }}>
                Try Synthesis Mode
              </Button>
            </div>
            <p style={{ fontSize: 12, color: colors.gray400, marginTop: 16 }}>
              <span style={{ padding: '2px 6px', background: colors.warning, color: colors.white, borderRadius: 4, fontSize: 10, fontWeight: 700 }}>BETA</span>
              {' '}New feature - we'd love your feedback!
            </p>
          </div>
        </div>
      )}
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
    <div style={{ minHeight: '100vh', background: colors.gray50, width: '100%' }}>
      <Header />
      
      <main style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '60px 5%', textAlign: 'center', boxSizing: 'border-box' }}>
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
const GlobalHeader = ({ currentTab, onTabChange, onLogoClick }) => (
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
      <img 
        src="/logo.png" 
        alt="Explorer" 
        style={{ height: 32, cursor: 'pointer' }} 
        onClick={onLogoClick}
      />
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
// SIMULATION VIEW
// ============================================
const SimulationView = ({ onStepChange }) => {
  const [step, setStep] = useState('landing');
  const [config, setConfig] = useState({});
  const [questionData, setQuestionData] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  // Report step changes to parent
  useEffect(() => {
    if (onStepChange) onStepChange(step);
  }, [step, onStepChange]);

  const restart = () => {
    setConfig({});
    setQuestionData(null);
    setSessionData(null);
    setStep('landing');
  };

  return (
    <>
      {step === 'landing' && <LandingPage onStart={() => setStep('welcome')} />}
      {step === 'welcome' && <WelcomeStep onNext={(d) => { setConfig({ ...config, ...d }); setStep('compare'); }} onBack={() => setStep('landing')} />}
      {step === 'compare' && <CompareStep onNext={() => setStep('api')} onBack={() => setStep('welcome')} />}
      {step === 'api' && <ApiStep onNext={(d) => { setConfig({ ...config, ...d }); setStep('condition'); }} onBack={() => setStep('compare')} />}
      {step === 'condition' && <ConditionStep onNext={(d) => { setConfig({ ...config, ...d }); setStep(d.condition === 'standard' ? 'question' : 'lens'); }} onBack={() => setStep('api')} />}
      {step === 'lens' && <LensStep config={config} onNext={(d) => { setConfig({ ...config, ...d }); setStep('question'); }} onBack={() => setStep('condition')} />}
      {step === 'question' && <QuestionStep config={config} onNext={(d) => { setQuestionData({ ...d, username: config.username }); setStep('explore'); }} onBack={() => setStep(config.condition === 'standard' ? 'condition' : 'lens')} />}
      {step === 'explore' && <ExplorationPage config={config} questionData={questionData} onComplete={(d) => { setSessionData(d); setStep('complete'); }} onBack={() => setStep('question')} />}
      {step === 'complete' && <CompletionPage sessionData={sessionData} onRestart={restart} />}
    </>
  );
};

// ============================================
// INITIAL DESIGNS VIEW
// ============================================
const SynthesisInterfacePreview = ({ active, style }) => (
  <div style={{
    background: colors.gray900,
    borderRadius: 12,
    border: `2px solid ${active ? colors.primary : colors.gray700}`,
    overflow: 'hidden',
    opacity: active ? 1 : 0.6,
    boxShadow: active ? `0 4px 20px rgba(0,0,0,0.3)` : 'none',
    ...style
  }}>
    <div style={{ background: colors.gray800, padding: '10px 14px', borderBottom: `1px solid ${colors.gray700}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28CA41' }} />
        <span style={{ marginLeft: 10, fontSize: 11, color: colors.white, fontWeight: 600 }}>Synthesis Mode</span>
      </div>
    </div>
    <div style={{ padding: 14, minHeight: 140, display: 'flex', alignItems: 'center', justifyItems: 'center', position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 60" style={{ opacity: 0.8 }}>
        <line x1="20" y1="20" x2="50" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
        <line x1="80" y1="20" x2="50" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
        <line x1="30" y1="50" x2="50" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
        <line x1="70" y1="50" x2="50" y2="30" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
        <circle cx="20" cy="20" r="4" fill={colors.primary} />
        <circle cx="80" cy="20" r="4" fill={colors.success} />
        <circle cx="30" cy="50" r="4" fill={colors.warning} />
        <circle cx="70" cy="50" r="4" fill={colors.error} />
        <circle cx="50" cy="30" r="8" fill="white" />
      </svg>
    </div>
  </div>
);

const SYNTHESIS_NODES = [
  { id: '1', x: 400, y: 80, lens: LENSES[0], text: "Measurable Focus Gains" }, 
  { id: '2', x: 620, y: 180, lens: LENSES[1], text: "Digital Divide Risks" },  
  { id: '3', x: 580, y: 350, lens: LENSES[7], text: "Enforcement Overhead" },  
  { id: '4', x: 220, y: 350, lens: LENSES[6], text: "Safety Anxiety" },        
  { id: '5', x: 180, y: 180, lens: LENSES[2], text: "Self-Regulation Skills" },
];

const InitialDesignsView = () => (
  <div style={{ padding: '60px 5%', maxWidth: 1000, margin: '0 auto' }}>
    <h1 style={{ fontSize: 32, fontWeight: 700, color: colors.gray900, marginBottom: 12 }}>Initial Design Artifacts</h1>
    <p style={{ fontSize: 16, color: colors.gray500, marginBottom: 60 }}>
      Visual documentation of the interface architectures and conceptual frameworks underpinning the Explorer simulation.
    </p>

    {/* INTERFACE ARCHITECTURE COMPARISON */}
    <section style={{ marginBottom: 80 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, borderBottom: `1px solid ${colors.gray200}`, paddingBottom: 16, marginBottom: 32 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.gray400, textTransform: 'uppercase', letterSpacing: 1 }}>Interface Architecture</span>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.gray900, margin: 0 }}>Comparison</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        <div>
          <div style={{ aspectRatio: '3/4', marginBottom: 20 }}>
            <StandardInterfacePreview active={true} style={{ height: '100%', border: `1px solid ${colors.gray200}` }} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.gray800, marginBottom: 8 }}>A. Standard Chat</h3>
          <p style={{ fontSize: 13, color: colors.gray500, lineHeight: 1.5 }}>
            "Oracle" pattern. Single authoritative response synthesizes complexity, encouraging passive consumption.
          </p>
        </div>
        <div>
          <div style={{ aspectRatio: '3/4', marginBottom: 20 }}>
            <PerspectivesInterfacePreview active={true} style={{ height: '100%', border: `1px solid ${colors.gray200}` }} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.gray800, marginBottom: 8 }}>B. Split View</h3>
          <p style={{ fontSize: 13, color: colors.gray500, lineHeight: 1.5 }}>
            "Epistemic Multiplicity." Simultaneous conflicting perspectives force active comparison and evaluation.
          </p>
        </div>
        <div>
          <div style={{ aspectRatio: '3/4', marginBottom: 20 }}>
            <SynthesisInterfacePreview active={true} style={{ height: '100%', border: `1px solid ${colors.gray200}` }} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.gray800, marginBottom: 8 }}>C. Synthesis Mode</h3>
          <p style={{ fontSize: 13, color: colors.gray500, lineHeight: 1.5 }}>
            "Cognitive Cartography." Users archive evidence and construct a visual network to support their own synthesized position.
          </p>
        </div>
      </div>
    </section>

    {/* ANALYTICAL LENS FRAMEWORK */}
    <section style={{ marginBottom: 80 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, borderBottom: `1px solid ${colors.gray200}`, paddingBottom: 16, marginBottom: 32 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.gray400, textTransform: 'uppercase', letterSpacing: 1 }}>Framework</span>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.gray900, margin: 0 }}>Analytical Lenses</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {LENSES.map(lens => (
          <div key={lens.id} style={{ border: `1px solid ${colors.gray200}`, borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: 12, borderBottom: `1px solid ${colors.gray100}`, background: colors.gray50, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: lens.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                {React.createElement(lens.icon, { size: 16 })}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.gray800, textTransform: 'uppercase' }}>{lens.name}</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: colors.gray400, textTransform: 'uppercase', marginBottom: 4 }}>Guiding Question</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: colors.gray700, lineHeight: 1.4 }}>"{lens.question}"</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* VISUAL SYNTHESIS MAPPING */}
    <section>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, borderBottom: `1px solid ${colors.gray200}`, paddingBottom: 16, marginBottom: 32 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: colors.gray400, textTransform: 'uppercase', letterSpacing: 1 }}>Mapping</span>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.gray900, margin: 0 }}>Visual Synthesis</h2>
      </div>
      
      <div style={{ background: colors.gray50, border: `1px solid ${colors.gray200}`, borderRadius: 16, height: 500, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.05 }} />
        <svg width="100%" height="100%" viewBox="0 0 800 500">
          {SYNTHESIS_NODES.map(node => (
            <line key={`l-${node.id}`} x1={node.x} y1={node.y} x2={400} y2={250} stroke={node.lens.color} strokeWidth="2" strokeDasharray="6,4" opacity="0.4" />
          ))}
          <circle cx="400" cy="250" r="60" fill={colors.gray900} stroke={colors.gray800} strokeWidth="4" />
          <foreignObject x="340" y="220" width="120" height="60">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', color: 'white' }}>
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.7, marginBottom: 2 }}>User Stance</span>
              <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Conditional Restriction</span>
            </div>
          </foreignObject>
          {SYNTHESIS_NODES.map(node => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="35" fill="white" stroke={node.lens.color} strokeWidth="3" />
              <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: colors.gray700 }}>
                  {React.createElement(node.lens.icon, { size: 20, color: node.lens.color })}
                </div>
              </foreignObject>
              <text x={node.x} y={node.y - 45} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: colors.gray500, textTransform: 'uppercase', letterSpacing: 1 }}>{node.lens.name}</text>
              <foreignObject x={node.x - 75} y={node.y + 40} width="150" height="40">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ background: 'white', border: `1px solid ${colors.gray200}`, padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, color: colors.gray600, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>{node.text}</div>
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>
    </section>
  </div>
);

// ============================================
// CASE STUDY VIEW
// ============================================
const CaseStudyView = () => (
  <div style={{ padding: '60px 5%', maxWidth: 800, margin: '0 auto' }}>
    <div style={{ borderBottom: `1px solid ${colors.gray200}`, paddingBottom: 40, marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: colors.primary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Case Study</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: colors.gray900, marginBottom: 24, lineHeight: 1.1 }}>
          Designing AI Interfaces for Epistemic Openness
        </h1>
        <div style={{ display: 'flex', gap: 24, color: colors.gray500, fontSize: 15 }}>
          <span><strong>Jiin Hur</strong></span>
          <span>Teachers College, Columbia University</span>
        </div>
      </div>
      <div>
        <Button size="sm" onClick={() => window.open('#', '_blank')} style={{ padding: '8px 16px', fontSize: 13 }}>
          <Icons.Download size={16} /> Read the Case Study
        </Button>
      </div>
    </div>

    <div style={{ lineHeight: 1.7, fontSize: 18, color: colors.gray700 }}>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: colors.gray900, marginTop: 40, marginBottom: 16 }}>Abstract</h3>
      <p style={{ marginBottom: 24 }}>
        The proliferation of LLM-powered tools in education raises a critical question: do our interfaces encourage critical thinking or passive acceptance? Current chat-based AI interfaces create what Kuniavsky (2024) terms an "Oracle" pattern—positioning AI as singular truth rather than one perspective among many.
      </p>
      <p style={{ marginBottom: 24 }}>
        This design case study examines a novel interface prototype, "Explorer," that operationalizes epistemic flexibility. By presenting users with multiple analytical perspectives simultaneously rather than collapsing complexity into singular outputs, Explorer aims to mitigate verification drift and encourage active synthesis.
      </p>
      
      <h3 style={{ fontSize: 24, fontWeight: 700, color: colors.gray900, marginTop: 40, marginBottom: 16 }}>Key Findings</h3>
      <ul style={{ listStyleType: 'disc', paddingLeft: 24, marginBottom: 24 }}>
        <li style={{ marginBottom: 12 }}><strong>Verification Drift:</strong> Users progressively reduce critical evaluation when faced with authoritative, single-stream AI responses.</li>
        <li style={{ marginBottom: 12 }}><strong>Interface Architecture:</strong> Minor changes in design (split view vs. single stream) significantly alter the user's epistemic stance toward the information.</li>
        <li style={{ marginBottom: 12 }}><strong>Cognitive Forcing:</strong> Requiring users to "archive" and "synthesize" conflicting viewpoints prevents premature cognitive closure.</li>
      </ul>
    </div>
  </div>
);

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [currentTab, setCurrentTab] = useState('simulation');
  const [simulationStep, setSimulationStep] = useState('landing');
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [simulationKey, setSimulationKey] = useState(0);

  const isInMiddleOfSimulation = currentTab === 'simulation' && 
    !['landing', 'complete'].includes(simulationStep);

  const handleLogoClick = () => {
    if (isInMiddleOfSimulation) {
      setShowExitWarning(true);
    } else {
      setCurrentTab('simulation');
      setSimulationKey(k => k + 1); // Reset simulation
    }
  };

  const confirmExit = () => {
    setShowExitWarning(false);
    setCurrentTab('simulation');
    setSimulationKey(k => k + 1); // Reset simulation
  };
  
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh', background: colors.gray50 }}>
      <GlobalHeader 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
        onLogoClick={handleLogoClick}
      />
      
      {currentTab === 'simulation' && <SimulationView key={simulationKey} onStepChange={setSimulationStep} />}
      {currentTab === 'designs' && <InitialDesignsView />}
      {currentTab === 'casestudy' && <CaseStudyView />}

      {/* Exit Warning Modal */}
      {showExitWarning && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: colors.white,
            borderRadius: 16,
            padding: 32,
            maxWidth: 400,
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.gray900, marginBottom: 12 }}>
              Leave Simulation?
            </h3>
            <p style={{ fontSize: 14, color: colors.gray500, marginBottom: 24, lineHeight: 1.6 }}>
              Your current progress will be lost. Are you sure you want to start over?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Button variant="secondary" onClick={() => setShowExitWarning(false)}>
                Stay
              </Button>
              <Button onClick={confirmExit}>
                Leave & Restart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
