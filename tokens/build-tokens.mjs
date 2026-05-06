#!/usr/bin/env node
// Horizon DS · token builder
// Reads embedded data extracted from Figma file UfHICFSU9PJl9OkE84mUk9
// Emits: variables.css · tokens.css · tokens.json · tailwind.tokens.js
// Re-run anytime tokens drift in Figma — the watcher auto-publishes the result.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;

/* ───────── 1. Mode collection (Light + Dark resolved values) ───────── */
const MODE = [
  { name:'surface/border', light:'#E4E4E6', dark:'#3F3F46' },
  { name:'surface/destructive-background', light:'#FEF2F2', dark:'#FEE2E2' },
  { name:'surface/page-background-content', light:'#FDFDFD', dark:'#27272A' },
  { name:'surface/warning-background', light:'#FFFBEB', dark:'#FEF3C7' },
  { name:'surface/card-background', light:'#FFFFFF', dark:'#27272A' },
  { name:'surface/page-background-backlight', light:'#F4F4F5', dark:'#3F3F46' },
  { name:'surface/header-background', light:'#FFFFFF', dark:'#18181B' },
  { name:'surface/navigation-background', light:'#FFFFFF', dark:'#18181B' },
  { name:'surface/widget-background', light:'#FDFDFD', dark:'#27272A' },
  { name:'surface/muted-background', light:'#F4F4F5', dark:'#3F3F46' },
  { name:'surface/overlay-background', light:'rgba(255, 255, 255, 0.2)', dark:'rgba(9, 9, 11, 0.5)' },
  { name:'surface/success-background', light:'#ECFDF5', dark:'#D1FAE5' },
  { name:'alpha/10', light:'rgba(255, 255, 255, 0.9)', dark:'rgba(9, 9, 11, 0.9)' },
  { name:'alpha/20', light:'rgba(255, 255, 255, 0.8)', dark:'rgba(9, 9, 11, 0.8)' },
  { name:'alpha/30', light:'rgba(255, 255, 255, 0.7)', dark:'rgba(9, 9, 11, 0.7)' },
  { name:'alpha/40', light:'rgba(255, 255, 255, 0.6)', dark:'rgba(9, 9, 11, 0.6)' },
  { name:'alpha/50', light:'rgba(255, 255, 255, 0.5)', dark:'rgba(9, 9, 11, 0.5)' },
  { name:'alpha/60', light:'rgba(255, 255, 255, 0.4)', dark:'rgba(9, 9, 11, 0.4)' },
  { name:'alpha/70', light:'rgba(255, 255, 255, 0.3)', dark:'rgba(9, 9, 11, 0.3)' },
  { name:'alpha/80', light:'rgba(255, 255, 255, 0.2)', dark:'rgba(9, 9, 11, 0.2)' },
  { name:'alpha/90', light:'rgba(255, 255, 255, 0.1)', dark:'rgba(9, 9, 11, 0.1)' },
  { name:'charts/Chart 1', light:'#2A9D90', dark:'#2662D9' },
  { name:'charts/Chart 2', light:'#E76E50', dark:'#E23670' },
  { name:'charts/Chart 3', light:'#274754', dark:'#E88C30' },
  { name:'charts/Chart 4', light:'#E8C468', dark:'#AF57DB' },
  { name:'charts/Chart 5', light:'#F4A462', dark:'#2EB88A' },
  { name:'typography/text-white', light:'#FAFAFA', dark:'#FAFAFA' },
  { name:'typography/text-black', light:'#09090B', dark:'#09090B' },
  { name:'typography/text-primary', light:'#3F3F46', dark:'#FAFAFA' },
  { name:'typography/text-secondary', light:'#71717A', dark:'#D4D4D8' },
  { name:'typography/text-tertiary', light:'#A1A1AA', dark:'#FFFFFF' },
  { name:'typography/text-destructive', light:'#DC2626', dark:'#EF4444' },
  { name:'typography/text-warning', light:'#B45309', dark:'#F59E0B' },
  { name:'typography/text-success', light:'#047857', dark:'#10B981' },
  { name:'typography/text-url', light:'#065F46', dark:'#10B981' },
];

/* ───────── 2. System Colours primitives (Tailwind-aligned palette + brand ramps) ───────── */
const PRIMITIVES = {
  // Tailwind base
  'base/black':'#000000', 'base/white':'#FFFFFF', 'base/transparent':'rgba(0, 0, 0, 0)',
  ...palette('slate', ['#F8FAFC','#F1F5F9','#E2E8F0','#CBD5E1','#94A3B8','#64748B','#475569','#334155','#1E293B','#0F172A','#020617']),
  ...palette('gray', ['#F9FAFB','#F3F4F6','#E5E7EB','#D1D5DB','#9CA3AF','#6B7280','#4B5563','#374151','#1F2937','#111827','#030712']),
  ...palette('zinc', ['#FAFAFA','#F4F4F5','#E4E4E7','#D4D4D8','#A1A1AA','#71717A','#52525B','#3F3F46','#27272A','#18181B','#09090B']),
  ...palette('neutral', ['#FAFAFA','#F5F5F5','#E5E5E5','#D4D4D4','#A3A3A3','#737373','#525252','#404040','#262626','#171717','#0A0A0A']),
  ...palette('stone', ['#FAFAF9','#F5F5F4','#E7E5E4','#D6D3D1','#A8A29E','#78716C','#57534E','#44403C','#292524','#1C1917','#0C0A09']),
  ...palette('red',    ['#FEF2F2','#FEE2E2','#FECACA','#FCA5A5','#F87171','#EF4444','#DC2626','#B91C1C','#991B1B','#7F1D1D','#450A0A']),
  ...palette('orange', ['#FFF7ED','#FFEDD5','#FED7AA','#FDBA74','#FB923C','#F97316','#EA580C','#C2410C','#9A3412','#7C2D12','#431407']),
  ...palette('amber',  ['#FFFBEB','#FEF3C7','#FDE68A','#FCD34D','#FBBF24','#F59E0B','#D97706','#B45309','#92400E','#78350F','#451A03']),
  ...palette('yellow', ['#FEFCE8','#FEF9C3','#FEF08A','#FDE047','#FACC15','#EAB308','#CA8A04','#A16207','#854D0E','#713F12','#422006']),
  ...palette('lime',   ['#F7FEE7','#ECFCCB','#D9F99D','#BEF264','#A3E635','#84CC16','#65A30D','#4D7C0F','#3F6212','#365314','#1A2E05']),
  ...palette('green',  ['#F0FDF4','#DCFCE7','#BBF7D0','#86EFAC','#4ADE80','#22C55E','#16A34A','#15803D','#166534','#14532D','#052E16']),
  ...palette('emerald',['#ECFDF5','#D1FAE5','#A7F3D0','#6EE7B7','#34D399','#10B981','#059669','#047857','#065F46','#064E3B','#022C22']),
  ...palette('teal',   ['#F0FDFA','#CCFBF1','#99F6E4','#5EEAD4','#2DD4BF','#14B8A6','#0D9488','#0F766E','#115E59','#134E4A','#042F2E']),
  ...palette('cyan',   ['#ECFEFF','#CFFAFE','#A5F3FC','#67E8F9','#22D3EE','#06B6D4','#0891B2','#0E7490','#155E75','#164E63','#083344']),
  ...palette('sky',    ['#F0F9FF','#E0F2FE','#BAE6FD','#7DD3FC','#38BDF8','#0EA5E9','#0284C7','#0369A1','#075985','#0C4A6E','#082F49']),
  ...palette('blue',   ['#EFF6FF','#DBEAFE','#BFDBFE','#93C5FD','#60A5FA','#3B82F6','#2563EB','#1D4ED8','#1E40AF','#1E3A8A','#172554']),
  ...palette('indigo', ['#EEF2FF','#E0E7FF','#C7D2FE','#A5B4FC','#818CF8','#6366F1','#4F46E5','#4338CA','#3730A3','#312E81','#1E1B4B']),
  ...palette('violet', ['#F5F3FF','#EDE9FE','#DDD6FE','#C4B5FD','#A78BFA','#8B5CF6','#7C3AED','#6D28D9','#5B21B6','#4C1D95','#2E1065']),
  ...palette('purple', ['#FAF5FF','#F3E8FF','#E9D5FF','#D8B4FE','#C084FC','#A855F7','#9333EA','#7E22CE','#6B21A8','#581C87','#3B0764']),
  ...palette('fuchsia',['#FDF4FF','#FAE8FF','#F5D0FE','#F0ABFC','#E879F9','#D946EF','#C026D3','#A21CAF','#86198F','#701A75','#4A044E']),
  ...palette('pink',   ['#FDF2F8','#FCE7F3','#FBCFE8','#F9A8D4','#F472B6','#EC4899','#DB2777','#BE185D','#9D174D','#831843','#500724']),
  ...palette('rose',   ['#FFF1F2','#FFE4E6','#FECDD3','#FDA4AF','#FB7185','#F43F5E','#E11D48','#BE123C','#9F1239','#881337','#4C0519']),
};
function palette(name, hexes){
  const labels = ['50','100','200','300','400','500','600','700','800','900','950'];
  const out = {};
  hexes.forEach((h,i)=>{ out[`${name}/${name}-${labels[i]}`] = h; });
  return out;
}

/* Brand ramps (Airlift / MalCare / BlogVault / WPRemote) */
const BRANDS = {
  ...brand('al-indigo', ['#EEF2FF','#E0E7FF','#C7D2FE','#A5B4FC','#818CF8','#6366F1','#4F46E5','#4338CA','#3730A3','#312E81','#1E1B4B']),
  ...brand('al-teal',   ['#F0FDFA','#CCFBF1','#99F6E4','#5EEAD4','#2DD4BF','#14B8A6','#0D9488','#0F766E','#115E59','#134E4A','#042F2E']),
  ...brand('mc-blue',   ['#EFF6FF','#DBEAFE','#BFDBFE','#93C5FD','#60A5FA','#3B82F6','#2563EB','#1D4ED8','#1E40AF','#1E3A8A','#172554']),
  ...brand('mc-red',    ['#FEF2F2','#FEE2E2','#FECACA','#FCA5A5','#F87171','#EF4444','#DC2626','#B91C1C','#991B1B','#7F1D1D','#450A0A']),
  ...brand('bv-emerald',['#ECFDF5','#D1FAE5','#A7F3D0','#6EE7B7','#34D399','#10B981','#059669','#047857','#065F46','#064E3B','#022C22']),
  ...brand('bv-slate',  ['#F8FAFC','#F1F5F9','#E2E8F0','#CBD5E1','#94A3B8','#64748B','#475569','#334155','#1E293B','#0F172A','#020617']),
  ...brand('wpr-yellow',['#FEFCE8','#FEF9C3','#FEF08A','#FDE047','#FACC15','#EAB308','#CA8A04','#A16207','#854D0E','#713F12','#422006']),
  ...brand('wpr-stone', ['#FAFAF9','#F5F5F4','#E7E5E4','#D6D3D1','#A8A29E','#78716C','#57534E','#44403C','#292524','#1C1917','#0C0A09']),
};
function brand(name, hexes){
  const labels = ['50','100','200','300','400','500','600','700','800','900','950'];
  const out = {};
  hexes.forEach((h,i)=>{ out[`${name}-${labels[i]}`] = h; });
  return out;
}

/* ───────── 3. Layout primitives — radius, spacing, sizing, breakpoints, blur, opacity ───────── */
const RADIUS = (() => {
  const o = {0:0, 9999:9999};
  for (let n=2; n<=80; n+=2) o[n] = n;
  return o;
})();
const SPACING = [0,1,2,4,6,8,10,12,14,16,18,20,24,28,32,36,40,44,48,56,64,72,80,88,96,104,112,120,128,136,144,152,160,168,176,184,192,200,208,216,224,232,240,248,256,264,272,280,288,296,304,312,320,328,336,344,352,360,368,376,384];
const WIDTH_HEIGHT = [0,1,2,4,6,8,10,12,14,16,18,20,24,28,32,36,40,44,48,56,64,72,80,88,96,112,128,144,160,176,192,208,224,240,256,288,320,384];
const BREAKPOINTS = { xs:480, sm:640, md:768, lg:1024, xl:1280, 'xl2':1440, 'xl3':1512, '2xl':1536, '2xl2':1728, '3xl':1920, '4xl':2560, '5xl':3440, '6xl':3840, '7xl':5120, '8xl':7680 };
const BORDER_WIDTH = { 0:0, 1:1, 2:2, 4:4, 8:8 };
const OPACITY = (() => { const o={}; for(let n=0; n<=100; n+=5) o[n]=n; return o; })();
const BLUR = { none:0, sm:4, base:8, md:12, lg:16, xl:24, '2xl':40, '3xl':64 };

/* ───────── 4. Typography ───────── */
const FONT_FAMILY = {
  primary:    'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  'wpr-sans': 'Helvetica Neue, ui-sans-serif, system-ui, sans-serif',
  'wpr-serif':'Hedvig Letters Serif, ui-serif, Georgia, serif',
  'bv-sans':  'Montserrat, ui-sans-serif, system-ui, sans-serif',
  'bv-display':'Happy Monkey, ui-sans-serif, system-ui, sans-serif',
  'mc-sans':  'Montserrat, ui-sans-serif, system-ui, sans-serif',
  'mc-display':'Happy Monkey, ui-sans-serif, system-ui, sans-serif',
  'al-sans':  'Montserrat, ui-sans-serif, system-ui, sans-serif',
  'al-display':'Happy Monkey, ui-sans-serif, system-ui, sans-serif',
};
const FONT_WEIGHT = { thin:100, extralight:200, light:300, normal:400, medium:500, semibold:600, bold:700, extrabold:800, black:900 };
const FONT_SIZE   = { xs:12, sm:14, base:16, lg:18, xl:20, '2xl':24, '3xl':30, '4xl':36, '5xl':48, '6xl':60, '7xl':72, '8xl':96, '9xl':128 };
const LINE_HEIGHT = { 3:12, 4:16, 5:20, 6:24, 7:28, 8:32, 9:36, 10:40 };
const LETTER_SPACING = { tighter:-0.8, tight:-0.4, normal:0, wide:0.4, wider:0.8, widest:1.6 };
const FONT_STYLE = { italic:'italic', 'not-italic':'normal' };

/* Type-style ramp (Inter · 7 sizes × 2 line-heights × 7 weights = 84+ named styles) */
const TYPE_STYLES = (() => {
  const sizes  = [['xs',12,12,16],['sm',14,14,20],['base',16,16,24],['lg',18,18,28],['xl',20,20,28],['2xl',24,24,32],['3xl',30,30,36]];
  const lhs    = ['tight','normal'];
  const wts    = ['regular','medium','semibold','bold','italic','underlined','strikethrough'];
  const wmap   = { regular:400, medium:500, semibold:600, bold:700, italic:400, underlined:400, strikethrough:400 };
  const decor  = { italic:'font-style:italic;', underlined:'text-decoration:underline;', strikethrough:'text-decoration:line-through;' };
  const out = [];
  for (const [size,fs,lhT,lhN] of sizes) {
    for (const lh of lhs) {
      for (const w of wts) {
        const lhVal = (lh==='tight') ? lhT : lhN;
        out.push({
          name: `type/${size}/${lh}/${w}`,
          fontSize: fs, lineHeight: lhVal, fontWeight: wmap[w], extra: decor[w] || ''
        });
      }
    }
  }
  return out;
})();

/* ───────── 5. Effect styles (drop / inner shadows · blur · backdrop-blur) ───────── */
const SHADOWS = {
  sm:    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base:  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md:    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg:    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl:    '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

/* ───────── 6. Helpers ───────── */
const slug = s => s
  .toLowerCase()
  .replace(/^typography\//,'')
  .replace(/^charts\/chart /,'chart-')
  .replace(/^surface\//,'surface-')
  .replace(/^alpha\//,'alpha-')
  .replace(/[\s/]+/g,'-')
  .replace(/[^a-z0-9-]/g,'-')
  .replace(/-+/g,'-');

const banner = (file) => `/* Horizon Design System · ${file}
 * Auto-generated from Figma file UfHICFSU9PJl9OkE84mUk9 (⚙️ Horizon Design System ✨)
 * Source of truth — do not edit by hand. Re-run \`node build-tokens.mjs\` to regenerate.
 * https://nilanjan-cmyk.github.io/horizon-ds-guidelines/
 */`;

/* ───────── 7. Build variables.css (primitives) ───────── */
function buildVariablesCss(){
  const lines = [];
  lines.push(banner('variables.css'));
  lines.push('');
  lines.push(':root {');
  lines.push('  /* ─ Tailwind primitive palette ─ */');
  for (const [k,v] of Object.entries(PRIMITIVES)) lines.push(`  --${slug(k)}: ${v};`);
  lines.push('');
  lines.push('  /* ─ Brand ramps (Airlift / MalCare / BlogVault / WPRemote) ─ */');
  for (const [k,v] of Object.entries(BRANDS))     lines.push(`  --${k}: ${v};`);
  lines.push('');
  lines.push('  /* ─ Radius ─ */');
  for (const [k,v] of Object.entries(RADIUS))     lines.push(`  --radius-${k}: ${v}px;`);
  lines.push('');
  lines.push('  /* ─ Spacing / gap (full Horizon scale; layouts use multiples of 8 only) ─ */');
  for (const v of SPACING)                         lines.push(`  --spacing-${v}: ${v}px;`);
  lines.push('');
  lines.push('  /* ─ Width / height tokens ─ */');
  for (const v of WIDTH_HEIGHT)                    lines.push(`  --size-${v}: ${v}px;`);
  lines.push('');
  lines.push('  /* ─ Breakpoints ─ */');
  for (const [k,v] of Object.entries(BREAKPOINTS)) lines.push(`  --breakpoint-${k}: ${v}px;`);
  lines.push('');
  lines.push('  /* ─ Border widths ─ */');
  for (const [k,v] of Object.entries(BORDER_WIDTH)) lines.push(`  --border-${k}: ${v}px;`);
  lines.push('');
  lines.push('  /* ─ Opacity ─ */');
  for (const [k,v] of Object.entries(OPACITY))     lines.push(`  --opacity-${k}: ${v/100};`);
  lines.push('');
  lines.push('  /* ─ Blur / backdrop-blur ─ */');
  for (const [k,v] of Object.entries(BLUR)) {
    lines.push(`  --blur-${k}: ${v}px;`);
    lines.push(`  --backdrop-blur-${k}: ${v}px;`);
  }
  lines.push('');
  lines.push('  /* ─ Typography primitives ─ */');
  for (const [k,v] of Object.entries(FONT_FAMILY)) lines.push(`  --font-family-${k}: ${v};`);
  for (const [k,v] of Object.entries(FONT_WEIGHT)) lines.push(`  --font-weight-${k}: ${v};`);
  for (const [k,v] of Object.entries(FONT_SIZE))   lines.push(`  --font-size-${k}: ${v}px;`);
  for (const [k,v] of Object.entries(LINE_HEIGHT)) lines.push(`  --line-height-${k}: ${v}px;`);
  for (const [k,v] of Object.entries(LETTER_SPACING)) lines.push(`  --tracking-${k}: ${v}px;`);
  for (const [k,v] of Object.entries(FONT_STYLE))  lines.push(`  --font-style-${k}: ${v};`);
  lines.push('}');
  lines.push('');
  return lines.join('\n');
}

/* ───────── 8. Build tokens.css (semantic Light/Dark + shadows + per-style typography) ───────── */
function buildTokensCss(){
  const lines = [];
  lines.push(banner('tokens.css'));
  lines.push('');
  lines.push('/* Pull primitives first */');
  lines.push('@import "./variables.css";');
  lines.push('');
  lines.push(':root {');
  lines.push('  /* ─ Semantic — Light mode (default) ─ */');
  for (const m of MODE) lines.push(`  --${slug(m.name)}: ${m.light};`);
  lines.push('');
  lines.push('  /* ─ Shadows ─ */');
  for (const [k,v] of Object.entries(SHADOWS)) lines.push(`  --shadow-${k}: ${v};`);
  lines.push('}');
  lines.push('');
  lines.push("/* ─ Semantic — Dark mode (toggle via [data-theme='dark'] or .dark class on <html>) ─ */");
  lines.push("html[data-theme='dark'], html.dark, :root[data-theme='dark'] {");
  for (const m of MODE) lines.push(`  --${slug(m.name)}: ${m.dark};`);
  lines.push('}');
  lines.push('');
  lines.push('@media (prefers-color-scheme: dark) {');
  lines.push('  :root:not([data-theme]) {');
  for (const m of MODE) lines.push(`    --${slug(m.name)}: ${m.dark};`);
  lines.push('  }');
  lines.push('}');
  lines.push('');
  lines.push('/* ─ Typography styles (84 named ramps · type/{size}/{lh}/{weight}) ─ */');
  for (const t of TYPE_STYLES) {
    const cls = '.' + t.name.replace(/\//g,'\\/');
    lines.push(`${cls} { font-family: var(--font-family-primary); font-size: ${t.fontSize}px; line-height: ${t.lineHeight}px; font-weight: ${t.fontWeight}; ${t.extra} }`);
  }
  lines.push('');
  return lines.join('\n');
}

/* ───────── 9. Build tokens.json (DTCG-shaped) ───────── */
function buildTokensJson(){
  const obj = {
    $description: 'Horizon Design System · DTCG-shaped tokens · auto-generated.',
    color: {
      surface:    {}, text:{}, alpha:{}, charts:{},
      primitive:  {}, brand:{},
    },
    radius:    {},
    spacing:   {},
    size:      {},
    breakpoint:{},
    border:    {},
    opacity:   {},
    blur:      {},
    typography:{ family:{}, weight:{}, size:{}, lineHeight:{}, letterSpacing:{}, style:{}, ramps:{} },
    shadow:    {},
  };
  for (const m of MODE) {
    const key = slug(m.name).replace(/^surface-/,'').replace(/^alpha-/,'').replace(/^chart-/,'');
    if (m.name.startsWith('surface/'))      obj.color.surface[key] = { $type:'color', $value:{ light:m.light, dark:m.dark } };
    else if (m.name.startsWith('alpha/'))   obj.color.alpha[key]   = { $type:'color', $value:{ light:m.light, dark:m.dark } };
    else if (m.name.startsWith('charts/'))  obj.color.charts[key]  = { $type:'color', $value:{ light:m.light, dark:m.dark } };
    else                                    obj.color.text[key.replace(/^text-/,'')] = { $type:'color', $value:{ light:m.light, dark:m.dark } };
  }
  for (const [k,v] of Object.entries(PRIMITIVES)) obj.color.primitive[slug(k)] = { $type:'color', $value:v };
  for (const [k,v] of Object.entries(BRANDS))     obj.color.brand[k]            = { $type:'color', $value:v };
  for (const [k,v] of Object.entries(RADIUS))     obj.radius[k]                 = { $type:'dimension', $value:`${v}px` };
  for (const v of SPACING)                         obj.spacing[v]                = { $type:'dimension', $value:`${v}px` };
  for (const v of WIDTH_HEIGHT)                    obj.size[v]                   = { $type:'dimension', $value:`${v}px` };
  for (const [k,v] of Object.entries(BREAKPOINTS)) obj.breakpoint[k]             = { $type:'dimension', $value:`${v}px` };
  for (const [k,v] of Object.entries(BORDER_WIDTH))obj.border[k]                 = { $type:'dimension', $value:`${v}px` };
  for (const [k,v] of Object.entries(OPACITY))     obj.opacity[k]                = { $type:'number', $value: v/100 };
  for (const [k,v] of Object.entries(BLUR))        obj.blur[k]                   = { $type:'dimension', $value:`${v}px` };
  for (const [k,v] of Object.entries(FONT_FAMILY)) obj.typography.family[k]      = { $type:'fontFamily', $value:v };
  for (const [k,v] of Object.entries(FONT_WEIGHT)) obj.typography.weight[k]      = { $type:'fontWeight', $value:v };
  for (const [k,v] of Object.entries(FONT_SIZE))   obj.typography.size[k]        = { $type:'dimension', $value:`${v}px` };
  for (const [k,v] of Object.entries(LINE_HEIGHT)) obj.typography.lineHeight[k]  = { $type:'dimension', $value:`${v}px` };
  for (const [k,v] of Object.entries(LETTER_SPACING)) obj.typography.letterSpacing[k] = { $type:'dimension', $value:`${v}px` };
  for (const [k,v] of Object.entries(FONT_STYLE))  obj.typography.style[k]       = { $type:'fontStyle', $value:v };
  for (const t of TYPE_STYLES)                     obj.typography.ramps[t.name]  = { $type:'typography', $value:{ fontFamily:'Inter', fontSize:`${t.fontSize}px`, lineHeight:`${t.lineHeight}px`, fontWeight:t.fontWeight } };
  for (const [k,v] of Object.entries(SHADOWS))     obj.shadow[k]                 = { $type:'shadow', $value:v };
  return JSON.stringify(obj, null, 2);
}

/* ───────── 10. Build tailwind.tokens.js ───────── */
function buildTailwindConfig(){
  const surface = {}, text = {}, charts = {}, alpha = {};
  for (const m of MODE) {
    if (m.name.startsWith('surface/'))      surface[m.name.replace('surface/','')] = `var(--${slug(m.name)})`;
    else if (m.name.startsWith('typography/'))  text[m.name.replace('typography/text-','')] = `var(--${slug(m.name)})`;
    else if (m.name.startsWith('charts/'))  charts[m.name.replace('charts/','').toLowerCase().replace(' ','-')] = `var(--${slug(m.name)})`;
    else if (m.name.startsWith('alpha/'))   alpha[m.name.replace('alpha/','')]    = `var(--${slug(m.name)})`;
  }
  const cfg = {
    theme: {
      extend: {
        colors: { surface, text, charts, alpha,
          primitive: Object.fromEntries(Object.keys(PRIMITIVES).map(k => [slug(k), `var(--${slug(k)})`])),
          brand:     Object.fromEntries(Object.keys(BRANDS).map(k => [k,         `var(--${k})`])),
        },
        borderRadius: Object.fromEntries(Object.keys(RADIUS).map(k => [k, `var(--radius-${k})`])),
        spacing:      Object.fromEntries(SPACING.map(v => [v, `var(--spacing-${v})`])),
        screens:      Object.fromEntries(Object.entries(BREAKPOINTS).map(([k,v]) => [k, `${v}px`])),
        borderWidth:  Object.fromEntries(Object.keys(BORDER_WIDTH).map(k => [k, `var(--border-${k})`])),
        opacity:      Object.fromEntries(Object.keys(OPACITY).map(k => [k, `var(--opacity-${k})`])),
        blur:         Object.fromEntries(Object.keys(BLUR).map(k => [k, `var(--blur-${k})`])),
        backdropBlur: Object.fromEntries(Object.keys(BLUR).map(k => [k, `var(--backdrop-blur-${k})`])),
        fontFamily:   { sans: ['Inter','ui-sans-serif','system-ui','sans-serif'] },
        fontSize:     {
          xs:   ['12px','16px'],
          sm:   ['14px','20px'],
          base: ['16px','24px'],
          lg:   ['18px','28px'],
          xl:   ['20px','28px'],
          '2xl':['24px','32px'],
          '3xl':['30px','36px'],
          '4xl':['36px','40px'],
          '5xl':['48px','52px'],
          '6xl':['60px','64px'],
          '7xl':['72px','76px'],
        },
        fontWeight:    Object.fromEntries(Object.keys(FONT_WEIGHT).map(k => [k, `var(--font-weight-${k})`])),
        letterSpacing: Object.fromEntries(Object.keys(LETTER_SPACING).map(k => [k, `var(--tracking-${k})`])),
        boxShadow:     Object.fromEntries(Object.keys(SHADOWS).map(k => [k, `var(--shadow-${k})`])),
      },
    },
  };
  return `// Horizon Design System · Tailwind preset
// Drop into your tailwind.config.js:  presets: [require('./tailwind.tokens.js')]
// Imports CSS variables from variables.css + tokens.css — load those in your global CSS.
module.exports = ${JSON.stringify(cfg, null, 2)};
`;
}

/* ───────── 11. Write all files ───────── */
const variablesCss = buildVariablesCss();
const tokensCss    = buildTokensCss();
const tokensJson   = buildTokensJson();
const tailwindJs   = buildTailwindConfig();

fs.writeFileSync(path.join(OUT,'variables.css'), variablesCss);
fs.writeFileSync(path.join(OUT,'tokens.css'),    tokensCss);
fs.writeFileSync(path.join(OUT,'tokens.json'),   tokensJson);
fs.writeFileSync(path.join(OUT,'tailwind.tokens.js'), tailwindJs);

console.log(`Wrote:
  variables.css       ${variablesCss.length.toLocaleString()} bytes
  tokens.css          ${tokensCss.length.toLocaleString()} bytes
  tokens.json         ${tokensJson.length.toLocaleString()} bytes
  tailwind.tokens.js  ${tailwindJs.length.toLocaleString()} bytes
Done.`);
