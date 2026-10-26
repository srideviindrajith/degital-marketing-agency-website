'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const rotateY = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const tx = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const ty = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  return (
    <section
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
    >
      {/* Ambient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center w-full">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 pl-1.5 pr-3 py-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary px-2 py-0.5 font-medium">
              <Sparkles className="h-3 w-3" /> New
            </span>
            Full-funnel growth, built for 2026
          </div>

          <h1 className="mt-6 font-display font-semibold tracking-tight text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05]">
            Turn Attention
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-chart-2 bg-clip-text text-transparent text-glow">
                Into Growth.
              </span>
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty leading-relaxed">
            We combine strategy, creative, technology and data to help businesses attract
            customers, generate leads and grow with confidence.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary/80 text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-all backdrop-blur-md border border-primary/30 glow-primary"
            >
              Book a Strategy Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-foreground font-semibold px-6 py-3.5 transition-all backdrop-blur-md"
            >
              Explore Our Work
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="120+" label="Brands scaled" />
            <Stat value="₹100Cr+" label="Ad spend managed" />
            <Stat value="4.2x" label="Avg. blended ROAS" />
          </div>
        </motion.div>

        {/* Dimensional object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative h-[360px] sm:h-[460px] lg:h-[540px] hidden sm:block"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <RingLayer radius={190} />
            </motion.div>

            {/* Inner counter-rotating ring */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <RingLayer radius={130} tilt={55} color="var(--chart-2)" />
            </motion.div>

            {/* Nodes */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Nodes radius={190} />
            </motion.div>

            {/* Core */}
            <motion.div
              style={{ x: tx, y: ty }}
              className="absolute inset-0 grid place-items-center"
            >
              <CoreOrb />
            </motion.div>
          </motion.div>

          {/* Floating data chips */}
          <FloatingChip
            className="left-[-4%] top-[18%]"
            label="Organic traffic"
            value="+212%"
            delay={0.6}
          />
          <FloatingChip
            className="right-[-2%] top-[8%]"
            label="ROAS"
            value="4.2x"
            delay={0.8}
          />
          <FloatingChip
            className="right-[6%] bottom-[6%]"
            label="CAC"
            value="-38%"
            delay={1.0}
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[11px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-[1px] bg-gradient-to-b from-primary to-transparent"
        />
      </div>

      {mounted && null}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function RingLayer({
  radius,
  tilt = 0,
  color = 'var(--primary)',
}: {
  radius: number;
  tilt?: number;
  color?: string;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        borderRadius: '9999px',
        border: `1px solid hsl(${color} / 0.35)`,
        boxShadow: `inset 0 0 40px -10px hsl(${color} / 0.25), 0 0 40px -12px hsl(${color} / 0.4)`,
        transform: `rotateX(${70 + tilt}deg)`,
      }}
    />
  );
}

function Nodes({ radius }: { radius: number }) {
  const points = 8;
  return (
    <>
      {Array.from({ length: points }).map((_, i) => {
        const angle = (i / points) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.32;
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: 8,
              height: 8,
              marginLeft: -4,
              marginTop: -4,
              transform: `translate(${x}px, ${y}px)`,
              background: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--chart-2))',
              boxShadow: `0 0 16px 2px hsl(${i % 2 === 0 ? 'var(--primary)' : 'var(--chart-2)'} / 0.7)`,
            }}
          />
        );
      })}
    </>
  );
}

function CoreOrb() {
  return (
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative grid place-items-center"
    >
      <div className="absolute h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
      <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-chart-2 via-fuchsia-400 to-primary shadow-[0_0_60px_-10px_hsl(var(--primary))]" />
      <div className="absolute h-28 w-28 rounded-full ring-1 ring-white/60 [mask-image:radial-gradient(circle_at_30%_30%,black,transparent_60%)]" />
      <div className="absolute h-10 w-10 rounded-full bg-white/70 blur-md" style={{ transform: 'translate(-18px,-18px)' }} />
    </motion.div>
  );
}

function FloatingChip({
  className,
  label,
  value,
  delay,
}: {
  className: string;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`absolute glass rounded-xl px-3 py-2 shadow-lg shadow-primary/15 ${className}`}
    >
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-sm font-semibold text-foreground">{value}</div>
    </motion.div>
  );
}