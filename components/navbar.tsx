"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "História", href: "#story" },
  { label: "Personagens", href: "#characters" },
  { label: "Inimigos", href: "#enemies" },
  { label: "Mundo", href: "#world" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setVisible(latest < 50 || latest < prev);
  });

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-6 py-3 rounded-xl border border-border bg-surface/80 backdrop-blur-md"
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2">
        <span
          className="text-lg tracking-widest text-primary uppercase"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The Last of Us
        </span>
      </a>

      {/* Links desktop */}
      <ul className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm tracking-wider text-muted hover:text-primary transition-colors duration-200 uppercase cursor-pointer"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#characters"
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/40 text-primary text-sm tracking-wider hover:bg-primary/10 transition-all duration-200 cursor-pointer"
      >
        Explorar
      </a>

      {/* Botão mobile */}
      <button
        className="md:hidden text-muted hover:text-primary transition-colors cursor-pointer"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Abrir menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu mobile */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-border bg-surface/95 backdrop-blur-md px-6 py-4 flex flex-col gap-3"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm tracking-wider text-muted hover:text-primary transition-colors uppercase"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
