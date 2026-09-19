"use client";

import Image from "next/image";
import { useState } from "react";
import {
	ArrowRight,
	CarFront,
	Heart,
	MapPin,
	Search,
	SlidersHorizontal,
	Sparkles,
	Star,
} from "lucide-react";
import Navbar from "@/components/Layout/Customer/navbar";

type VehicleType = "All" | "Cars" | "Bikes" | "Scooters";

const vehicles = [
	{
		name: "Honda City",
		type: "Cars" as const,
		location: "Koramangala, Bengaluru",
		price: "₹1,850",
		rating: "4.9",
		image: "/Pictures/photo-1783876962781-d202e3beaeb5.avif",
		tag: "Popular",
	},
	{
		name: "Toyota Urban Cruiser",
		type: "Cars" as const,
		location: "Whitefield, Bengaluru",
		price: "₹2,100",
		rating: "4.8",
		image: "/Pictures/photo-1783876962781-d202e3beaeb5.avif",
		tag: "Family pick",
	},
	{
		name: "Royal Enfield Classic",
		type: "Bikes" as const,
		location: "Indiranagar, Bengaluru",
		price: "₹950",
		rating: "4.8",
		image: "/Pictures/photo-1736117703669-996247368d0a.avif",
		tag: "Top rated",
	},
	{
		name: "Yamaha MT 15",
		type: "Bikes" as const,
		location: "Marathahalli, Bengaluru",
		price: "₹780",
		rating: "4.7",
		image: "/Pictures/photo-1736117703669-996247368d0a.avif",
		tag: "City favourite",
	},
	{
		name: "Vespa SXL",
		type: "Scooters" as const,
		location: "HSR Layout, Bengaluru",
		price: "₹620",
		rating: "4.7",
		image: "/Pictures/istockphoto-2211905389-612x612.webp",
		tag: "Quick pick",
	},
	{
		name: "TVS Ntorq 125",
		type: "Scooters" as const,
		location: "Jayanagar, Bengaluru",
		price: "₹540",
		rating: "4.6",
		image: "/Pictures/istockphoto-2211905389-612x612.webp",
		tag: "Easy ride",
	},
];

const categoryDetails = [
	{ label: "Cars" as const, count: "2 vehicles", icon: CarFront, tone: "bg-sky-100 text-sky-700" },
	{ label: "Bikes" as const, count: "2 vehicles", icon: Sparkles, tone: "bg-orange-100 text-orange-700" },
	{ label: "Scooters" as const, count: "2 vehicles", icon: Sparkles, tone: "bg-teal-100 text-teal-700" },
];

export default function Ridespage() {
	const [activeType, setActiveType] = useState<VehicleType>("All");
	const [savedVehicles, setSavedVehicles] = useState<string[]>([]);

	const visibleVehicles = activeType === "All"
		? vehicles
		: vehicles.filter((vehicle) => vehicle.type === activeType);

	const toggleSaved = (name: string) => {
		setSavedVehicles((current) => current.includes(name)
			? current.filter((vehicle) => vehicle !== name)
			: [...current, name]);
	};

	return (
		<main className="min-h-screen bg-[#f7faf9] text-slate-900">
			<Navbar />
			<section className="border-b border-slate-200 bg-[#102a2a] text-white">
				<div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18">
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-300">The Rently collection</p>
					<div className="mt-3 flex flex-col justify-between gap-8 md:flex-row md:items-end">
						<div className="max-w-2xl">
							<h1 className="text-4xl font-black tracking-tight sm:text-6xl">Find your next ride.</h1>
							<p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Browse every vehicle by category and choose what fits the day ahead.</p>
						</div>
						<div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200"><MapPin className="h-4 w-4 text-teal-300" /> Bengaluru, India</div>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
				<div className="grid gap-4 sm:grid-cols-3">
					{categoryDetails.map(({ label, count, icon: Icon, tone }) => (
						<button key={label} onClick={() => setActiveType(activeType === label ? "All" : label)} className={`flex items-center gap-4 rounded-3xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${activeType === label ? "border-teal-400 ring-2 ring-teal-100" : "border-slate-200"}`}>
							<span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-6 w-6" /></span>
							<span><span className="block text-lg font-black">{label}</span><span className="text-sm text-slate-500">{count}</span></span>
							<ArrowRight className="ml-auto h-5 w-5 text-slate-300" />
						</button>
					))}
				</div>

				<div className="mt-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">Ready when you are</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{activeType === "All" ? "All vehicles" : activeType}</h2><p className="mt-2 text-slate-500">{visibleVehicles.length} rides available near you</p></div>
					<div className="flex gap-2 rounded-full border border-slate-200 bg-white p-1">
						{(["All", "Cars", "Bikes", "Scooters"] as VehicleType[]).map((type) => <button key={type} onClick={() => setActiveType(type)} className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 ${activeType === type ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-900"}`}>{type}</button>)}
					</div>
				</div>

				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-500 shadow-sm"><Search className="h-5 w-5" /><input aria-label="Search vehicles" placeholder="Search by vehicle or location" className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" /></label>
					<button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
				</div>

				<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{visibleVehicles.map((vehicle) => <article key={vehicle.name} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative h-56 overflow-hidden bg-slate-100"><Image src={vehicle.image} alt={vehicle.name} fill className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur">{vehicle.tag}</span><button aria-label={`Save ${vehicle.name}`} onClick={() => toggleSaved(vehicle.name)} className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-slate-700 backdrop-blur transition hover:text-rose-500"><Heart className={`h-4 w-4 ${savedVehicles.includes(vehicle.name) ? "fill-rose-500 text-rose-500" : ""}`} /></button></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="mb-1 text-xs font-bold uppercase tracking-widest text-teal-600">{vehicle.type}</p><h3 className="text-xl font-black text-slate-900">{vehicle.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" />{vehicle.location}</p></div><span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{vehicle.rating}</span></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><p><span className="text-xl font-black text-slate-950">{vehicle.price}</span><span className="text-sm text-slate-500"> / day</span></p><button className="flex items-center gap-1 text-sm font-bold text-teal-700 transition hover:text-teal-900">View ride <ArrowRight className="h-4 w-4" /></button></div></div></article>)}
				</div>
			</section>
		</main>
	);
}
