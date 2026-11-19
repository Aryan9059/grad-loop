"use client";

import { motion, type Variants } from "framer-motion";

const lift = (y: number, rotate = 0): Variants => ({
  rest: { y: 0, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
  hover: { y, rotate, transition: { type: "spring", stiffness: 200, damping: 16 } },
});

function Sparkle({ x, y, size, delay, className }: { x: number; y: number; size: number; delay: number; className: string }) {
  const s = size;
  return (
    <motion.path
      d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`}
      className={className}
      style={{ transformOrigin: `${x}px ${y}px` }}
      animate={{ scale: [0.6, 1.1, 0.6], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ─────────────────────────  CREATE  ───────────────────────── */

export function CreateIllustration({ className }: { className?: string }) {
  const code = [
    { w: 70, c: "fill-violet-400", indent: 0 },
    { w: 110, c: "fill-white/25", indent: 12 },
    { w: 86, c: "fill-pink-400/80", indent: 12 },
    { w: 60, c: "fill-white/25", indent: 24 },
    { w: 94, c: "fill-violet-400", indent: 0 },
    { w: 120, c: "fill-white/25", indent: 12 },
    { w: 72, c: "fill-sky-400/80", indent: 12 },
    { w: 50, c: "fill-white/25", indent: 24 },
  ];

  return (
    <svg viewBox="0 0 420 340" fill="none" className={className} aria-hidden>
      <defs>
        <filter id="create-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#4c1d95" floodOpacity="0.18" />
        </filter>
        <linearGradient id="create-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="create-header" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Backdrop blob */}
      <motion.path
        d="M210 28c78 0 168 40 176 120s-52 168-160 168S34 282 34 190 132 28 210 28Z"
        fill="url(#create-blob)"
        animate={{ scale: [1, 1.03, 1] }}
        style={{ transformOrigin: "210px 170px" }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="70" cy="70" r="4" className="fill-violet-400/50" />
      <circle cx="380" cy="270" r="5" className="fill-indigo-400/40" />
      <circle cx="56" cy="290" r="3" className="fill-violet-400/40" />

      {/* Code editor */}
      <motion.g variants={lift(-6, -2)} style={{ transformOrigin: "130px 180px" }}>
        <g filter="url(#create-shadow)">
          <rect x="30" y="92" width="200" height="176" rx="14" fill="#1e1b2e" />
          <path d="M30 106a14 14 0 0 1 14-14h172a14 14 0 0 1 14 14v12H30v-12Z" fill="#2a2640" />
          <circle cx="46" cy="105" r="3.5" fill="#f87171" />
          <circle cx="58" cy="105" r="3.5" fill="#fbbf24" />
          <circle cx="70" cy="105" r="3.5" fill="#34d399" />
          <rect x="150" y="101" width="64" height="8" rx="4" className="fill-white/10" />
          {code.map((l, i) => (
            <g key={i}>
              <rect x="42" y={132 + i * 15} width="10" height="5" rx="2.5" className="fill-white/10" />
              <rect x={60 + l.indent} y={132 + i * 15} width={l.w} height="5" rx="2.5" className={l.c} />
            </g>
          ))}
          <motion.rect
            x="134"
            y="250"
            width="2.5"
            height="10"
            rx="1"
            fill="#a78bfa"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </g>
      </motion.g>

      {/* Resume paper */}
      <motion.g variants={lift(-14, 2)} style={{ transformOrigin: "290px 180px" }}>
        <g filter="url(#create-shadow)">
          <rect x="196" y="40" width="180" height="246" rx="14" className="fill-white dark:fill-[#2a2540]" />
          <rect x="196" y="40" width="180" height="56" rx="14" fill="url(#create-header)" />
          <rect x="196" y="80" width="180" height="16" fill="url(#create-header)" />
          <circle cx="226" cy="68" r="15" className="fill-white/90" />
          <circle cx="226" cy="64" r="5.5" fill="#a78bfa" />
          <path d="M216 77a10 10 0 0 1 20 0" fill="#a78bfa" />
          <rect x="250" y="58" width="80" height="8" rx="4" className="fill-white" />
          <rect x="250" y="72" width="54" height="5" rx="2.5" className="fill-white/60" />

          {[0, 1, 2].map((s) => (
            <g key={s} transform={`translate(0 ${s * 60})`}>
              <rect x="212" y="112" width="52" height="6" rx="3" fill="#7c3aed" />
              <rect x="270" y="114.5" width="90" height="1.5" rx="0.75" className="fill-violet-200 dark:fill-violet-500/30" />
              {[0, 1, 2].map((b) => (
                <g key={b}>
                  <circle cx="216" cy={130 + b * 11} r="2" className="fill-violet-300 dark:fill-violet-400/60" />
                  <rect
                    x="223"
                    y={128 + b * 11}
                    width={[120, 96, 108][(b + s) % 3]}
                    height="4"
                    rx="2"
                    className="fill-slate-200 dark:fill-white/15"
                  />
                </g>
              ))}
            </g>
          ))}
        </g>
      </motion.g>

      {/* Connector arrow from editor to paper */}
      <motion.path
        d="M150 84 C 160 50, 190 40, 206 30"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 6"
        animate={{ strokeDashoffset: [0, -20] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />

      {/* Magic wand */}
      <motion.g variants={lift(-10, -12)} style={{ transformOrigin: "370px 52px" }}>
        <rect x="336" y="22" width="9" height="66" rx="4.5" transform="rotate(40 340 55)" fill="#1e1b2e" className="dark:fill-[#0f0c1a]" />
        <rect x="336" y="22" width="9" height="16" rx="4.5" transform="rotate(40 340 55)" fill="#fbbf24" />
      </motion.g>
      <Sparkle x={376} y={30} size={11} delay={0} className="fill-amber-400" />
      <Sparkle x={398} y={64} size={7} delay={0.6} className="fill-violet-400" />
      <Sparkle x={352} y={12} size={6} delay={1.2} className="fill-pink-400" />
      <Sparkle x={48} y={46} size={8} delay={0.9} className="fill-violet-400" />

      {/* PDF badge */}
      <motion.g variants={lift(-18)}>
        <g filter="url(#create-shadow)">
          <rect x="318" y="246" width="78" height="40" rx="12" className="fill-white dark:fill-[#1e1a2e]" />
          <rect x="328" y="254" width="24" height="24" rx="7" fill="#ef4444" />
          <path d="M340 259v10m0 0-4-4m4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="360" y="271" fontSize="12" fontWeight="800" className="fill-slate-800 dark:fill-white" fontFamily="inherit">
            PDF
          </text>
        </g>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────  ANALYZE  ───────────────────────── */

export function AnalyzeIllustration({ className }: { className?: string }) {
  const R = 26;
  const C = 2 * Math.PI * R;
  const score = 0.86;

  return (
    <svg viewBox="0 0 420 340" fill="none" className={className} aria-hidden>
      <defs>
        <filter id="analyze-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#9a3412" floodOpacity="0.16" />
        </filter>
        <linearGradient id="analyze-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="analyze-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="analyze-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <clipPath id="analyze-paper">
          <rect x="70" y="40" width="180" height="250" rx="14" />
        </clipPath>
        <clipPath id="analyze-lens">
          <circle cx="0" cy="0" r="34" />
        </clipPath>
      </defs>

      {/* Backdrop blob */}
      <motion.path
        d="M200 30c90-6 180 50 180 140s-70 150-170 150S30 270 40 170 110 36 200 30Z"
        fill="url(#analyze-blob)"
        animate={{ scale: [1, 1.03, 1] }}
        style={{ transformOrigin: "210px 170px" }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="44" cy="96" r="4" className="fill-amber-400/50" />
      <circle cx="392" cy="300" r="5" className="fill-orange-400/40" />
      <circle cx="372" cy="40" r="3" className="fill-amber-400/50" />

      {/* Resume paper */}
      <motion.g variants={lift(-8, -2)} style={{ transformOrigin: "160px 165px" }}>
        <g filter="url(#analyze-shadow)">
          <rect x="70" y="40" width="180" height="250" rx="14" className="fill-white dark:fill-[#2a2540]" />
        </g>
        <g clipPath="url(#analyze-paper)">
          <rect x="88" y="60" width="90" height="9" rx="4.5" className="fill-slate-700 dark:fill-white/80" />
          <rect x="88" y="75" width="60" height="5" rx="2.5" className="fill-slate-300 dark:fill-white/25" />

          {[0, 1, 2].map((s) => (
            <g key={s} transform={`translate(0 ${s * 64})`}>
              <rect x="88" y="98" width="48" height="6" rx="3" className="fill-slate-500 dark:fill-white/50" />
              {[0, 1, 2, 3].map((b) => {
                const w = [140, 118, 130, 96][(b + s) % 4];
                const kw = (b + s) % 3 === 0;
                const weak = s === 1 && b === 2;
                return (
                  <g key={b}>
                    <rect x="88" y={112 + b * 10} width={w} height="4" rx="2" className="fill-slate-200 dark:fill-white/15" />
                    {kw && <rect x={88 + w * 0.3} y={110.5 + b * 10} width="34" height="7" rx="3" className="fill-amber-300/70 dark:fill-amber-400/40" />}
                    {weak && (
                      <path
                        d={`M88 ${119 + b * 10} q4 3 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0`}
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          ))}

          {/* Scan beam */}
          <motion.g animate={{ y: [0, 230, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <rect x="70" y="20" width="180" height="36" fill="url(#analyze-scan)" />
            <rect x="70" y="55" width="180" height="2" fill="#f59e0b" />
          </motion.g>
        </g>
      </motion.g>

      {/* Magnifying glass */}
      <motion.g
        animate={{ x: [0, 14, -6, 0], y: [0, 10, 24, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.g variants={lift(-6, -6)} style={{ transformOrigin: "200px 170px" }}>
          <g transform="translate(196 168)">
            <rect x="24" y="22" width="14" height="52" rx="7" transform="rotate(-45 24 22)" fill="#1e1b2e" className="dark:fill-[#0f0c1a]" />
            <circle r="40" className="fill-white dark:fill-[#2a2540]" filter="url(#analyze-shadow)" />
            <g clipPath="url(#analyze-lens)">
              <circle r="34" className="fill-amber-50 dark:fill-amber-500/10" />
              <rect x="-28" y="-16" width="56" height="7" rx="3.5" className="fill-slate-300 dark:fill-white/25" />
              <rect x="-28" y="-3" width="40" height="7" rx="3.5" className="fill-amber-400" />
              <rect x="16" y="-3" width="20" height="7" rx="3.5" className="fill-slate-300 dark:fill-white/25" />
              <rect x="-28" y="10" width="48" height="7" rx="3.5" className="fill-slate-300 dark:fill-white/25" />
            </g>
            <circle r="37" stroke="#1e1b2e" strokeWidth="6" className="dark:stroke-[#0f0c1a]" />
            <path d="M-20 -22a28 28 0 0 1 16 -8" stroke="#fff" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
          </g>
        </motion.g>
      </motion.g>

      {/* ATS score card */}
      <motion.g variants={lift(-16, 2)} style={{ transformOrigin: "330px 92px" }}>
        <g filter="url(#analyze-shadow)">
          <rect x="268" y="40" width="124" height="104" rx="16" className="fill-white dark:fill-[#1e1a2e]" />
        </g>
        <g transform="translate(306 92)">
          <circle r={R} strokeWidth="7" className="stroke-amber-100 dark:stroke-white/10" />
          <motion.circle
            r={R}
            stroke="url(#analyze-ring)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={C}
            transform="rotate(-90)"
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - score) }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
          />
          <text textAnchor="middle" y="6" fontSize="17" fontWeight="800" className="fill-slate-800 dark:fill-white" fontFamily="inherit">
            86
          </text>
        </g>
        <text x="342" y="84" fontSize="9" fontWeight="700" className="fill-slate-400 dark:fill-white/50" fontFamily="inherit">
          ATS
        </text>
        <text x="342" y="97" fontSize="9" fontWeight="700" className="fill-slate-400 dark:fill-white/50" fontFamily="inherit">
          SCORE
        </text>
        <rect x="342" y="104" width="36" height="5" rx="2.5" className="fill-emerald-400/70" />
      </motion.g>

      {/* Checklist card */}
      <motion.g variants={lift(-10, -2)} style={{ transformOrigin: "336px 240px" }}>
        <g filter="url(#analyze-shadow)">
          <rect x="280" y="190" width="120" height="100" rx="16" className="fill-white dark:fill-[#1e1a2e]" />
        </g>
        {[
          { c: "#10b981", icon: "check", w: 62 },
          { c: "#f59e0b", icon: "warn", w: 50 },
          { c: "#10b981", icon: "check", w: 56 },
        ].map((it, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.25 }}
          >
            <circle cx="300" cy={214 + i * 26} r="9" fill={it.c} fillOpacity="0.15" />
            {it.icon === "check" ? (
              <path
                d={`M296 ${214 + i * 26}l3 3 5-6`}
                stroke={it.c}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <>
                <rect x="299" y={208 + i * 26} width="2.2" height="7" rx="1.1" fill={it.c} />
                <circle cx="300.1" cy={218.5 + i * 26} r="1.3" fill={it.c} />
              </>
            )}
            <rect x="316" y={211 + i * 26} width={it.w} height="6" rx="3" className="fill-slate-200 dark:fill-white/15" />
          </motion.g>
        ))}
      </motion.g>

      <Sparkle x={258} y={30} size={9} delay={0.3} className="fill-amber-400" />
      <Sparkle x={40} y={250} size={7} delay={1.1} className="fill-orange-400" />
    </svg>
  );
}
