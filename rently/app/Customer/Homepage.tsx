"use client";

import Image from "next/image";
import { useState } from "react";
import {
	ArrowRight,
	Bell,
	Calendar,
	CalendarDays,
	CarFront,
	ChevronDown,
	CircleUserRound,
	Heart,
	MapPin,
	Menu,
	Search,
	ShieldCheck,
	SlidersHorizontal,
	Sparkles,
	Star,
	X,
} from "lucide-react";
import Navbar from "@/components/Layout/Customer/navbar";
import Mappage from "@/components/Map/Mappage";

type VehicleType = "All" | "Cars" | "Bikes" | "Scooters";

const vehicles = [
	{
		name: "Honda City",
		type: "Cars",
		location: "Koramangala, Bengaluru",
		price: "₹1,850",
		rating: "4.9",
		image: "/Pictures/photo-1783876962781-d202e3beaeb5.avif",
		tag: "Popular",
	},
	{
		name: "Royal Enfield Classic",
		type: "Bikes",
		location: "Indiranagar, Bengaluru",
		price: "₹950",
		rating: "4.8",
		image: "/Pictures/photo-1736117703669-996247368d0a.avif",
		tag: "Top rated",
	},
	{
		name: "Vespa SXL",
		type: "Scooters",
		location: "HSR Layout, Bengaluru",
		price: "₹620",
		rating: "4.7",
		image: "/Pictures/istockphoto-2211905389-612x612.webp",
		tag: "Quick pick",
	},
];

const categories = [
	{ label: "Cars", count: "128 rides", icon: CarFront, tone: "bg-sky-100 text-sky-700" },
	{ label: "Bikes", count: "86 rides", icon: Sparkles, tone: "bg-orange-100 text-orange-700" },
	{ label: "Scooters", count: "64 rides", icon: CircleUserRound, tone: "bg-teal-100 text-teal-700" },
];

export default function Homepage({ userName }: { userName: string }) {
	const [activeType, setActiveType] = useState<VehicleType>("All");
	const [menuOpen, setMenuOpen] = useState(false);
	const [savedVehicles, setSavedVehicles] = useState<string[]>([]);
	const [location, setLocation] = useState("Bengaluru, India");
	const [pickupDate, setPickupDate] = useState("");
	const [pickupTime, setPickupTime] = useState("10:00");
	const [returnDate, setReturnDate] = useState("");
	const [returnTime, setReturnTime] = useState("10:00");

	const [showbox, setShowbox] = useState(true);
	const [islocating, setIslocating] = useState(false);
	const [locationError, setLocationError] = useState("");
	const [manualInput, setManualInput] = useState("");


	const visibleVehicles = activeType === "All"
		? vehicles
		: vehicles.filter((vehicle) => vehicle.type === activeType);

	const toggleSaved = (name: string) => {
		setSavedVehicles((current) => current.includes(name)
			? current.filter((vehicle) => vehicle !== name)
			: [...current, name]);
	};

	const showCalendar = () => {
		const dateInput = document.getElementById("pickup-date-desk") as HTMLInputElement | null;
		if (dateInput) {
			if("showPicker" in HTMLInputElement.prototype) {
				dateInput.showPicker();
			} else {
				dateInput.focus();
			}
		}
	};

	// location
	const handleLocationAccess = () => {
		if(!navigator.geolocation) {
			setLocationError("Geolocation is not supported by your browser.");
			return;
		}

		setIslocating(true);
		setLocationError("");

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords;
				try {
					const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);

					const data = await res.json();
					if(!res.ok) {
						throw new Error(data.error || "Failed to fetch location");
					}

					const city =
						data.address.suburb ||
						data.address.neighbourhood ||
						data.address.town ||
						data.address.city ||
						data.address.county;

						setLocation(city);
						setShowbox(false);
						console.log("Location fetched:", latitude, longitude, city);
				}catch (error) {
					setLocationError("Failed to fetch location. Please enter Manually.");
				} finally {
					setIslocating(false);
				}
			},
			(error) => {
				setIslocating(false);
				if (error.code === error.PERMISSION_DENIED) {
					setLocationError("Location access denied. Please enter your city or neighborhood manually.");
				} else {
					setLocationError("Unable to retrieve location.");
				}
	}
		);
	};

	const handleFallbackSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if(manualInput) {
			setLocation(manualInput);
			setShowbox(false);
		}
	};

	const showReturnCalendar = () => {
		const dateInput = document.getElementById("return-date-desk") as HTMLInputElement | null;
		if (dateInput) {
			if("showPicker" in HTMLInputElement.prototype) {
				dateInput.showPicker();
			} else {
				dateInput.focus();
			}
		}
	};

	return (
		<main className="min-h-screen overflow-x-hidden bg-[#f7faf9] text-slate-900">
			<Navbar />
			{showbox && (
				 <div className="inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm min-h-screen fixed p-4 mb-4">
              <div className="w-full max-w-2xl rounded-[32px] border border-slate-200/80 bg-white p-10 shadow-2xl dark:border-slate-700/80 dark:bg-slate-950/95">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-violet-600">Find Rentals Around You</p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Please enable location access</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">Allow geolocation or enter a city/neighborhood to explore nearby rooms and vehicle shops within 5km.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLocationAccess}
					disabled={islocating}
                    className="rounded-3xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500"
                  >
                    {islocating ? "Locating..." : "Share Location"}
                  </button>
                </div>
                <form  className="mt-8 grid gap-4" onSubmit={handleFallbackSubmit}>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Fallback location</label>
                  <input
                    type="text"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Koramangala, Bangalore"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                  />
                  <button type="submit" className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Use city / neighborhood
                  </button>
                 <p className="text-sm text-rose-600"></p>
                </form>
              </div>
            </div>
			)}
			<section id="top" className="relative isolate overflow-hidden bg-[#102a2a]">
				<div className="absolute -right-24 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-teal-400/15 blur-3xl" />
				<div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
					<div className="max-w-xl">
						<div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-200"><Sparkles className="h-3.5 w-3.5" /> Your next escape starts here</div>
						<h1 className="text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-7xl">Where will you <span className="text-teal-300">go</span> today?</h1>
						<p className="mt-6 max-w-md text-base leading-7 text-slate-300 sm:text-lg">Reliable rides from people nearby. Pick a vehicle, choose your dates, and get moving.</p>

						<div className="mt-9 rounded-[1.5rem] bg-white p-2 shadow-2xl shadow-black/20 sm:p-3 ">
							<div className="flex-col gap-2 sm:grid-cols-[1fr_0.9fr_0.9fr]">
								<label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
									<MapPin className="h-5 w-5 shrink-0 text-teal-600" />
									<span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Pick-up location</span><select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"><option>Bengaluru, India</option><option>Mumbai, India</option><option>Delhi, India</option><option>Hyderabad, India</option></select></span>
								</label>

								<label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
									<CalendarDays className="h-5 w-5 shrink-0 text-orange-500" />
									<span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Pick-up</span>
									<span className="gap-2 flex">
										{/* date */}
								
									<div onClick={showCalendar}  className="relative border-r-1 border-black flex gap-2 w-full cursor-pointer">
										
	  <span className = "absolute block text-sm font-semibold text-slate-800">{pickupDate ? pickupDate : "Date"}</span>
      <input
        id="pickup-date-desk"
        name="pickup"
		type="date"
        placeholder="Date"
		value={pickupDate}
		onChange={(event) => setPickupDate(event.target.value)}
        required
        aria-label="Pickup date"
        className=" inset-0 h-full w-full opacity-0 cursor-pointer pointer-events-none"/>
    </div>
									{/* Time */}
									<input aria-label="Pick-up time" type="time" value={pickupTime} 
									onChange={(event) => setPickupTime(event.target.value)} 
									className="w-[5.5rem] bg-transparent text-sm font-semibold text-slate-800 outline-none" /></span></span>

								</label>
								<label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
									<CalendarDays className="h-5 w-5 shrink-0 text-orange-500" />
									<span className="min-w-0 flex-1"><span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Return</span>
									<span className="flex gap-2">

										<div onClick={showReturnCalendar} className="relative border-r-1 border-black flex gap-2 w-full cursor-pointer">
										<span className = "absolute block text-sm font-semibold text-slate-800">{returnDate ? returnDate : "Date"}</span>
										<input 
										id="return-date-desk"
										aria-label="Return date" 
										type="date" 
										value={returnDate} 
										onChange={(event) => setReturnDate(event.target.value)} 
										className="inset-0 h-full w-full opacity-0 cursor-pointer pointer-events-none" />
										</div>
										<input aria-label="Return time" type="time" value={returnTime} onChange={(event) => setReturnTime(event.target.value)} className="w-[5.5rem] bg-transparent text-sm font-semibold text-slate-800 outline-none" /></span></span>
								</label>
							</div>
							<div className="mt-4 flex w-full justify-center">
								<button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700"><Search className="h-4 w-4" /> Search </button>
							</div>
						</div>
						<div className="mt-5 flex items-center gap-2 text-sm text-slate-400"><ShieldCheck className="h-4 w-4 text-teal-300" /> Every vehicle is verified before it reaches you.</div>
					</div>

					<div className="relative hidden min-h-[27rem] lg:block">
						<div className="absolute right-0 top-3 h-[25rem] w-[86%] rotate-3 overflow-hidden rounded-[2.5rem] border-8 border-white/10 shadow-2xl"><Image src="/Pictures/photo-1783876962781-d202e3beaeb5.avif" alt="Vehicle ready for a Rently trip" fill className="object-cover" priority /></div>
						<div className="absolute bottom-3 left-0 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700"><ShieldCheck className="h-6 w-6" /></span><span><span className="block text-xs font-bold uppercase tracking-widest text-slate-400">Trusted rides</span><span className="block font-bold text-slate-900">4.8 average rating</span></span></div>
					</div>
				</div>
			</section>

			<div>
				 <Mappage/>
			</div>

			<section id="categories" className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
				<div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">Browse your way</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">What are you in the mood for?</h2></div><button className="hidden items-center gap-2 text-sm font-bold text-teal-700 sm:flex">View all <ArrowRight className="h-4 w-4" /></button></div>
				<div className="mt-8 grid gap-4 sm:grid-cols-3">{categories.map(({ label, count, icon: Icon, tone }) => <button key={label} onClick={() => setActiveType(label as VehicleType)} className={`flex items-center gap-4 rounded-3xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${activeType === label ? "border-teal-400 ring-2 ring-teal-100" : "border-slate-200"}`}><span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-7 w-7" /></span><span><span className="block text-lg font-black text-slate-900">{label}</span><span className="text-sm text-slate-500">{count}</span></span><ArrowRight className="ml-auto h-5 w-5 text-slate-300" /></button>)}</div>
			</section>

			<section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">Curated for you</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Rides people love nearby</h2></div><div className="flex gap-2 rounded-full border border-slate-200 bg-white p-1">{(["All", "Cars", "Bikes", "Scooters"] as VehicleType[]).map((type) => <button key={type} onClick={() => setActiveType(type)} className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 ${activeType === type ? "bg-slate-950 text-white" : "text-slate-500 hover:text-slate-900"}`}>{type}</button>)}</div></div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visibleVehicles.map((vehicle) => <article key={vehicle.name} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative h-56 overflow-hidden bg-slate-100"><Image src={vehicle.image} alt={vehicle.name} fill className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur">{vehicle.tag}</span><button aria-label={`Save ${vehicle.name}`} onClick={() => toggleSaved(vehicle.name)} className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-slate-700 backdrop-blur transition hover:text-rose-500"><Heart className={`h-4 w-4 ${savedVehicles.includes(vehicle.name) ? "fill-rose-500 text-rose-500" : ""}`} /></button></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-black text-slate-900">{vehicle.name}</h3><p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" />{vehicle.location}</p></div><span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{vehicle.rating}</span></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><p><span className="text-xl font-black text-slate-950">{vehicle.price}</span><span className="text-sm text-slate-500"> / day</span></p><button className="flex items-center gap-1 text-sm font-bold text-teal-700 transition hover:text-teal-900">View ride <ArrowRight className="h-4 w-4" /></button></div></div></article>)}</div>{visibleVehicles.length === 0 && <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500">No rides in this category yet.</div>}</section>

			<section id="how-it-works" className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-500">Simple by design</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Your day, in motion.</h2><p className="mt-4 max-w-sm leading-7 text-slate-500">Rently keeps the little details easy, so you can spend your energy on the places ahead.</p></div><div className="grid gap-4 sm:grid-cols-3">{[["01", "Choose a ride", "Browse verified vehicles around you."], ["02", "Book your dates", "Set a time that fits your plans."], ["03", "Hit the road", "Meet your host and start moving."]].map(([number, title, text]) => <div key={number} className="rounded-3xl bg-[#f7faf9] p-5"><span className="text-sm font-black text-teal-600">{number}</span><h3 className="mt-8 font-black text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}</div></div></section>
			<footer className="bg-slate-950 text-slate-400"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8"><p className="font-black tracking-tight text-white">rently<span className="text-teal-400">.</span></p><p className="text-sm">Made for the spontaneous plans.</p><p className="text-xs">© 2026 Rently</p></div></footer>
		</main>
	);
}
