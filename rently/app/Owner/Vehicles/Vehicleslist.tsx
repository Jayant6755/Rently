"use client";

import Image from "next/image";
import { CarFront, CircleAlert, Filter, LoaderCircle, Bike, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Vehicle = {
	id: string;
	name: string;
	model: string;
	type: string;
	vehicleNo: string;
	price: number;
};

type VehicleCategory = "All" | "Cars" | "Bikes" | "Scooters" | "Other";

const categoryDetails: Record<Exclude<VehicleCategory, "All">, { label: string; icon: typeof CarFront; tone: string }> = {
	Cars: { label: "Cars", icon: CarFront, tone: "bg-sky-50 text-sky-700" },
	Bikes: { label: "Bikes", icon: Bike, tone: "bg-orange-50 text-orange-700" },
	Scooters: { label: "Scooters", icon: Bike, tone: "bg-teal-50 text-teal-700" },
	Other: { label: "Other", icon: CarFront, tone: "bg-slate-100 text-slate-700" },
};

const vehicleImages = [
	"/Pictures/photo-1783876962781-d202e3beaeb5.avif",
	"/Pictures/photo-1736117703669-996247368d0a.avif",
	"/Pictures/istockphoto-2211905389-612x612.webp",
];

function getCategory(type: string): Exclude<VehicleCategory, "All"> {
	const normalizedType = type.toLowerCase();

	if (normalizedType.includes("car") || normalizedType.includes("sedan") || normalizedType.includes("suv") || normalizedType.includes("hatch")) {
		return "Cars";
	}
	if (normalizedType.includes("bike") || normalizedType.includes("motorcycle")) {
		return "Bikes";
	}
	if (normalizedType.includes("scooter")) {
		return "Scooters";
	}
	return "Other";
}

export default function VehiclesList({ ownerId }: { ownerId: string }) {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [activeCategory, setActiveCategory] = useState<VehicleCategory>("All");
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchVehicles = async () => {
			if (!ownerId) {
				setVehicles([]);
				setLoading(false);
				return;
			}

			try {
				const response = await fetch(`/api/vehicles?ownerId=${encodeURIComponent(ownerId)}`);
				const result = await response.json();

				if (!response.ok) {
					throw new Error(result.error || "Unable to load vehicles");
				}

				setVehicles(result.data || []);
			} catch (fetchError) {
				setError(fetchError instanceof Error ? fetchError.message : "Unable to load vehicles");
			} finally {
				setLoading(false);
			}
		};

		fetchVehicles();
	}, [ownerId]);

	const filteredVehicles = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return vehicles.filter((vehicle) => {
			const matchesCategory = activeCategory === "All" || getCategory(vehicle.type) === activeCategory;
			const matchesSearch = !normalizedSearch || [vehicle.name, vehicle.model, vehicle.type, vehicle.vehicleNo]
				.some((value) => value.toLowerCase().includes(normalizedSearch));

			return matchesCategory && matchesSearch;
		});
	}, [activeCategory, searchTerm, vehicles]);

	const categoryCounts = useMemo(() => vehicles.reduce<Record<VehicleCategory, number>>((counts, vehicle) => {
		const category = getCategory(vehicle.type);
		counts[category] += 1;
		counts.All += 1;
		return counts;
	}, { All: 0, Cars: 0, Bikes: 0, Scooters: 0, Other: 0 }), [vehicles]);

	return (
		<main className="min-h-screen bg-[#f7f9f8] px-4 py-8 text-slate-900 sm:px-8 lg:px-12">
			<div className="mx-auto max-w-7xl">
				<header className="flex flex-col gap-5 border-b border-slate-200 pb-7 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<p className="text-xs font-black uppercase tracking-[0.22em] text-teal-700">Owner inventory</p>
						<h1 className="mt-2 text-3xl font-black tracking-tight text-[#102d2b] sm:text-4xl">Your vehicles</h1>
						<p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Keep every ride in one place and see what is ready to be booked.</p>
					</div>
					
				</header>

				<div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex flex-wrap gap-2" role="tablist" aria-label="Vehicle categories">
						{(["All", "Cars", "Bikes", "Scooters", "Other"] as VehicleCategory[]).map((category) => (
							<button
								key={category}
								type="button"
								role="tab"
								aria-selected={activeCategory === category}
								onClick={() => setActiveCategory(category)}
								className={`rounded-full px-4 py-2 text-sm font-bold transition ${activeCategory === category ? "bg-[#d4f06b] text-[#102d2b]" : "bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-900"}`}
							>
								{category} <span className="ml-1 text-xs opacity-60">{categoryCounts[category]}</span>
							</button>
						))}
					</div>
					<label className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-slate-400 ring-1 ring-slate-200 lg:max-w-xs">
						<Search className="h-4 w-4" />
						<span className="sr-only">Search vehicles</span>
						<input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search your vehicles" className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" />
					</label>
				</div>

				{loading && (
					<div className="flex min-h-64 items-center justify-center text-sm font-semibold text-slate-500">
						<LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> Loading your vehicles...
					</div>
				)}

				{!loading && error && (
					<div className="mt-8 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700">
						<CircleAlert className="h-5 w-5 shrink-0" /> {error}
					</div>
				)}

				{!loading && !error && filteredVehicles.length === 0 && (
					<div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
						<Filter className="h-8 w-8 text-teal-600" />
						<h2 className="mt-4 text-lg font-black text-[#102d2b]">No vehicles found</h2>
						<p className="mt-1 text-sm text-slate-500">Try another category or add your first vehicle listing.</p>
					</div>
				)}

				{!loading && !error && filteredVehicles.length > 0 && (
					<div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
						{filteredVehicles.map((vehicle, index) => {
							const category = getCategory(vehicle.type);
							const details = categoryDetails[category];
							const Icon = details.icon;

							return (
								<article key={vehicle.id} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
									<div className="relative h-52 overflow-hidden bg-slate-100">
										<Image src={vehicleImages[index % vehicleImages.length]} alt={vehicle.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
										<div className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${details.tone}`}><Icon className="h-3.5 w-3.5" /> {category}</div>
									</div>
									<div className="p-5">
										<div className="flex items-start justify-between gap-3">
											<div>
												<h2 className="text-lg font-black text-[#102d2b]">{vehicle.name}</h2>
												<p className="mt-1 text-sm text-slate-500">{vehicle.model}</p>
											</div>
											<p className="shrink-0 text-right text-lg font-black text-teal-700">₹{vehicle.price.toLocaleString("en-IN")}<span className="block text-[11px] font-semibold text-slate-400">per day</span></p>
										</div>
										<div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
											<span>Vehicle Number</span>
											<span className="text-slate-700">{vehicle.vehicleNo}</span>
										</div>
									</div>
								</article>
							);
						})}
					</div>
				)}
			</div>
		</main>
	);
}
