"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Gamepad2, Calendar, Image as ImageIcon, Trophy, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Gamepad2 },
    { name: "Book Slot", href: "/book-slot", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Events", href: "/events", icon: Trophy },
    { name: "Admin", href: "/admin", icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 neon-glow-cyan transform group-hover:scale-105 transition-transform duration-300">
            <Gamepad2 className="w-7 h-7 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display font-extrabold text-2xl tracking-wider text-white">
              GAMER'S<span className="text-cyan-400">PORT</span>
            </span>
            <span className="block text-[10px] tracking-widest text-gray-400 uppercase font-mono">
              Elite Gaming Lounge
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 neon-border-cyan"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth / User Actions */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-cyan-500",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2.5 rounded-xl font-display text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
