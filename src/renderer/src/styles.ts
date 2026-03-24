import { CSSProperties } from 'react'

// Retro-Future Palette
const COLORS = {
  bg: '#0D0D0D', // Near Black
  main: '#E0E0E0', // Light Gray (off-white)
  sub: '#A0A0A0', // Medium Gray
  border: '#404040', // Dark Gray border
  shadow: '#1A1A1A', // Charcoal Shadow
  accent: '#FFFFFF', // Pure White
  accentSub: '#CCCCCC', // Off-White
  water: '#00A8FF', // 8-bit Blue
  empty: '#333333' // Deep Gray
}

export const styles: { [key: string]: CSSProperties } = {
  // Uses Google Font VT323 - Add to index.html (see step 5)
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: COLORS.bg,
    fontFamily: '"VT323", monospace', // Critical for Retro-Pixel
    color: COLORS.main,
    imageRendering: 'pixelated' // Essential for crisp retro look
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#121212',
    borderRight: `2px solid ${COLORS.border}`,
    padding: '40px 15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    // Drag area for frameless
    WebkitAppRegion: 'drag' as any
  },
  navItem: {
    padding: '12px 18px',
    cursor: 'pointer',
    fontSize: '1.4rem',
    fontWeight: 400, // Pixel fonts don't need heavy weight
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: COLORS.sub,
    transition: '0.1s step-end', // Step transition for retro feel
    WebkitAppRegion: 'no-drag' as any
  },
  navItemActive: {
    color: COLORS.accent,
    backgroundColor: COLORS.shadow,
    boxShadow: `inset 2px 2px 0 ${COLORS.border}`,
    border: `1px solid ${COLORS.border}`
  },
  content: {
    flex: 1,
    padding: '40px',
    overflowY: 'auto',
    // Hard-edge noise effect (subtle)
    backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 20, 20, 0.1) 1px, transparent 1px)`,
    backgroundSize: '20px 20px'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 400,
    color: COLORS.accent,
    marginBottom: '40px',
    letterSpacing: '-1px',
    textShadow: `2px 2px 0 ${COLORS.border}`
  },
  card: {
    backgroundColor: '#161616',
    borderRadius: '1px', // Hard, sharp edges
    border: `2px solid ${COLORS.border}`,
    // Hard-edge dither shadow (Task 1.2 "Originality")
    boxShadow: `4px 4px 0 ${COLORS.shadow}, 6px 6px 0 ${COLORS.border}`,
    padding: '25px',
    marginBottom: '25px',
    imageRendering: 'pixelated'
  },
  cardTitle: {
    margin: '0 0 20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.6rem',
    textTransform: 'uppercase',
    borderBottom: `2px solid ${COLORS.border}`,
    paddingBottom: '10px',
    color: COLORS.sub
  },
  button: {
    backgroundColor: '#1a1a1a',
    color: COLORS.main,
    border: `2px solid ${COLORS.border}`,
    boxShadow: `2px 2px 0 ${COLORS.shadow}`,
    padding: '10px 22px',
    fontFamily: 'inherit', // Important
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'transform 0.05s step-end'
  },
  // Add CSS :active state via pseudo-class in App.css (see step 5)
  textarea: {
    flex: 1,
    width: '100%',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '1.4rem',
    resize: 'none',
    lineHeight: '1.4',
    color: COLORS.main,
    padding: '10px',
    fontFamily: 'inherit',
    scrollbarWidth: 'thin',
    scrollbarColor: `${COLORS.border} transparent`
  },
  stats: {
    fontSize: '5rem',
    fontWeight: 400,
    margin: '15px 0',
    color: COLORS.accent,
    lineHeight: 1
  },
  desc: {
    fontSize: '1rem',
    marginBottom: '15px',
    color: COLORS.subtext,
    fontFamily: 'monospace' // Monospace for description looks retro
  },
  waterDots: { display: 'flex', gap: '8px', margin: '20px 0', flexWrap: 'wrap' },
  // Pixelated Water Dot
  dot: {
    width: '18px',
    height: '18px',
    // Uses the Octagonal Mask from image_1.png
    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    transition: 'background-color 0.1s step-end'
  }
}
