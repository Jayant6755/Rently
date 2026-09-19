"use client";
import { useState } from "react";
import {
	Bell,
	ChevronDown,
	CircleUserRound,
	MapPin,
	Menu,
	X,
} from "lucide-react";
import Link from "next/link";

export default function CustomerNavbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
				<a href="#top" className="flex items-center gap-3">
					<span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15 transition-transform hover:rotate-0">
						<MapPin className="h-5 w-5 text-teal-300" />
					</span>
					<span>
						<span className="block text-xl font-black tracking-tight">rently<span className="text-teal-500">.</span></span>
						<span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">move freely</span>
					</span>
				</a>

				<nav className="hidden items-center gap-8 text-sm font-semibold text-slate-500 md:flex">
					<Link className="text-slate-950" href="/Customer">Discover</Link>
					<Link className="transition hover:text-teal-600" href="/Customer/Rides">Rides</Link>
					<Link className="transition hover:text-teal-600" href="#how-it-works">How it works</Link>
				</nav>

				<div className="flex items-center gap-2 sm:gap-4">
					<button aria-label="Notifications" className="relative hidden rounded-full p-2 text-slate-500 transition hover:bg-slate-100 sm:block">
						<Bell className="h-5 w-5" />
						<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
					</button>
					<button aria-label="Open account menu" className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 text-sm font-semibold shadow-sm">
						<span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700"><CircleUserRound className="h-5 w-5" /></span>
						<span className="hidden sm:inline">My account</span>
						<ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
					</button>
					<button aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden">
						{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>
				</div>
			</div>
			{menuOpen && <nav className="border-t border-slate-100 px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm font-semibold text-slate-600"><a href="#top" onClick={() => setMenuOpen(false)}>Discover</a><a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a></div></nav>}
		</header>
	);
}
