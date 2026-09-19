"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Car,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Compass,
  ImagePlus,
  LayoutDashboard,
  MapPin,
  Menu,
  PackageCheck,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserRound,
  X,
  Delete,
} from "lucide-react";
import { useEffect, useState } from "react";
import VehiclesList from "./Vehicles/Vehicleslist";


type ListingStatus = "Available" | "Rented" | "Under maintenance";
type RequestStatus = "Pending" | "Accepted" | "Rejected";

type Listing = {
  id: number;
  name: string;
  type: string;
  location: string;
  price: number;
  status: ListingStatus;
  image: string;
};

type BookingRequest = {
  id: number;
  initials: string;
  customer: string;
  vehicle: string;
  dates: string;
  distance: string;
  status: RequestStatus;
};


const initialRequests: BookingRequest[] = [
  { id: 1, initials: "AK", customer: "Arjun Kumar", vehicle: "Honda City 2023", dates: "Sep 12 - Sep 14, 2026", distance: "2.4 km away", status: "Pending" },
  { id: 2, initials: "NM", customer: "Nisha Menon", vehicle: "Royal Enfield Classic", dates: "Sep 15 - Sep 16, 2026", distance: "4.1 km away", status: "Pending" },
  { id: 3, initials: "RS", customer: "Rohan Shah", vehicle: "Hyundai i20 Sportz", dates: "Sep 18 - Sep 20, 2026", distance: "6.2 km away", status: "Pending" },
];

const statusStyles: Record<ListingStatus, string> = {
  Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rented: "bg-sky-50 text-sky-700 ring-sky-600/20",
  "Under maintenance": "bg-amber-50 text-amber-700 ring-amber-600/20",
};

function StatusPill({ status }: { status: ListingStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${statusStyles[status]}`}>{status}</span>;
}

interface listing {
  ownerId: string,
  name: string,
  price: number,
  type: string,
  model: string,
  vehicleNo : string
}

interface vehicles {
  id: string,
  name: string,
  price: number,
  type: string,
  model: string,
  vehicleNo: string,
}

export default function OwnerPage({ userName, ownerId = "" }: { userName: string; ownerId?: string }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [listings, setListings] = useState<listing>(
    {
      ownerId,
      name: '',
      price: 0,
      type: 'car',
      model: '',
      vehicleNo: '',
    }
  );
  const [vehicles, setVehicles] = useState<vehicles[]>([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState(initialRequests);
  const [showListingForm, setShowListingForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [savedMessage, setSavedMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [previews, setPreviews] = useState<string | null>(null);
 
  // const updateListingStatus = (id: number, status: ListingStatus) => {
  //   setListings((current) => current.map((listing) => (listing.id === id ? { ...listing, status } : listing)));
  // };

  // const removeListing = (id: number) => setListings((current) => current.filter((listing) => listing.id !== id));



  const updateRequest = (id: number, status: RequestStatus) => {
    setRequests((current) => current.map((request) => (request.id === id ? { ...request, status } : request)));
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    const {name ,value, type} = e.target

    setListings((prev)=>({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setSelectedFiles(file);
    setPreviews(URL.createObjectURL(file));
  };

  const removeFile = () => {
    setSelectedFiles(null);
    setPreviews(null);
  };

  
  

  const saveListing = async(event: React.FormEvent) => {
    event.preventDefault();

   
    
    setLoading(true)

    try {
      let uploadedImageUrl = "";

      if(selectedFiles){
        const formData = new FormData();
        formData.append("files", selectedFiles);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok){
          throw new Error(uploadData.error || "Failed to upload image");
        }

        uploadedImageUrl = uploadData.url || (uploadData.urls ? uploadData.urls[0] : "");
      }

      const payload = {
        ...listings,
        imageUrl: uploadedImageUrl,
      }

      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      

      const result = await res.json();

      if(!res.ok){
        throw new Error(result.error || "Failed to save Vehicle")
      }

      const savedVehicle = result.data || result;

      setVehicles((prev)=>[
        {
          ...savedVehicle,
        price: Number(savedVehicle.price || 0),
        },
        ...prev
      ]);

      setListings({
        ownerId,
        name: '',
        price: 0,
        type: 'car',
        model: '',
        vehicleNo: '',
      })

      setShowListingForm(false);
      setSelectedFiles(null);
      setPreviews(null);
      setFormStep(1);
      setSuccess(true)
      setSavedMessage("Listing added to your inventory");
      setTimeout(() => setSavedMessage(""), 3000);

    } catch (error: any) {
      setError(error.message || "Something went wrong");
      setSavedMessage("Something went wrong")
    }
  };
  
  //fetching vehicles
  useEffect(()=>{
    const fetchvehicles = async() => {
      try {
        if (!ownerId) return;

        const res = await fetch(`/api/vehicles?ownerId=${encodeURIComponent(ownerId)}`);
        const data = await res.json();

        if(!res.ok){
          throw new Error(data.error || "Failed to fetch Vehicles")
        }
        setVehicles(data.data || []);
        
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      }
    }
    fetchvehicles();
  },[ownerId]);

  //delete vehicles
  const deleteVehicles = async (id: string)=>{
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      })
   

      if(!res.ok){
        throw new Error("Failed to delete")
      }

      setVehicles((prev)=> prev.filter((vehicles)=> vehicles.id != id));
    } catch (error) {
      console.error("Delete error: ", error)
    }
  }

  if(error) return <p>Error loading vehicles: {error}</p>

  {loading && (
    <div className="min-h-screen flex justify-center items-center absolute bg-white">
     <div className="w-full h-full p-5 flex-col">
         <p>Saving your vechile</p>
      <p>Please wait...</p>
     </div>
    </div>
  )}

  const pendingRequests = requests.filter((request) => request.status === "Pending").length;
   const availableListings = vehicles.filter((listing) => listing.name === "Available").length;

  return (
    <main className="min-h-screen bg-[#f7f9f8] text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-[#102d2b] px-5 py-6 text-white transition-transform lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 border-b border-white/10 pb-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d4f06b] text-[#102d2b]"><Compass className="h-5 w-5" /></div>
          <div><p className="text-xl font-black tracking-tight">Rently</p><p className="text-[10px] uppercase tracking-[0.2em] text-teal-200">Owner studio</p></div>
        </div>
        <div className="mt-8 space-y-1">
          {[{ label: "Overview", icon: LayoutDashboard }, { label: "My listings", icon: PackageCheck }, { label: "Booking requests", icon: CalendarDays }].map(({ label, icon: Icon }) => (
            <button key={label} type="button" onClick={() => { setActiveTab(label); setMobileNavOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${activeTab === label ? "bg-[#d4f06b] text-[#102d2b]" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <span className="flex items-center gap-3"><Icon className="h-4 w-4" />{label}</span>
              {label === "Booking requests" && pendingRequests > 0 && <span className="rounded-full bg-rose-400 px-2 py-0.5 text-[10px] text-white">{pendingRequests}</span>}
            </button>
          ))}
        </div>
        <div className="absolute bottom-6 left-5 right-5 border-t border-white/10 pt-5">
        <button type="button" className="flex items-center gap-3 px-3 text-sm font-semibold text-slate-300 hover:text-white">
          <Settings className="h-4 w-4" />Settings</button></div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-[#f7f9f8]/90 px-5 backdrop-blur sm:px-8">
          <button type="button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)} className="rounded-lg p-2 hover:bg-slate-200 lg:hidden"><Menu className="h-5 w-5" /></button>
          <div className="hidden sm:block">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              </p>
            <h1 className="mt-1 text-xl font-black">Good morning, {userName || "Owner"}</h1></div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Notifications" className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:border-teal-300">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
              </button><div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4f06b] text-xs font-black text-[#102d2b]">
                  {userName.charAt(0).toUpperCase() || "O"}</div>
                  <span className="hidden text-sm font-bold sm:block">{userName || "Owner"}
                    </span>
                    <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
                    </div>
                    </div>
        </header>

        {activeTab === "My listings" ? <VehiclesList ownerId={ownerId} /> : <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold text-teal-700">Your rental business at a glance</p>
          </div>
          <button type="button" onClick={() => { setShowListingForm(true); setActiveTab("My listings"); }} className="inline-flex items-center gap-2 rounded-xl bg-[#102d2b] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-teal-950/10 transition hover:bg-teal-800">
            <Plus className="h-4 w-4" /> Add new listing</button>
            </div>

          {savedMessage && <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-4 w-4" />{savedMessage}</div>}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Total listings", value: vehicles.length, icon: PackageCheck, color: "bg-[#dff5d0] text-emerald-800" },
              { label: "Pending requests", value: pendingRequests, detail: "Within 5 km radius", icon: Clock3, color: "bg-[#fff0bf] text-amber-800" }, 
              { label: "Vehicles available", value: vehicles.length, detail: `of ${vehicles.length} total`, icon: Car, color: "bg-[#d8eff4] text-cyan-800" },
             ].map(({ label, value, detail, icon: Icon, color }) => 
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                <div className="flex items-start justify-between">
                  <div>
                  <p className="text-sm font-semibold text-slate-500">{label}</p>
                  <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
                  </div>
                  <div className={`rounded-xl p-3 ${color}`}>
                    <Icon className="h-5 w-5" />
                    </div>
                    </div>
                    <p className="mt-4 text-xs font-bold text-slate-400">{detail}</p>
                    </div>
                  )}
          </section>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
            <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5"><div><h3 className="text-lg font-black">Booking requests</h3><p className="mt-1 text-sm text-slate-500">Nearby renters waiting for your response</p></div><button type="button" onClick={() => setActiveTab("Booking requests")} className="text-sm font-bold text-teal-700 hover:text-teal-900">View all <ArrowRight className="ml-1 inline h-4 w-4" /></button></div>
              <div className="divide-y divide-slate-100">{requests.map((request) => <div key={request.id} className="flex flex-wrap items-center gap-4 p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700">{request.initials}</div><div className="min-w-[170px] flex-1"><p className="text-sm font-bold">{request.customer}</p><p className="mt-1 text-xs text-slate-500">{request.vehicle} · {request.dates}</p></div><div className="text-xs font-semibold text-slate-400"><MapPin className="mr-1 inline h-3.5 w-3.5" />{request.distance}</div>{request.status === "Pending" ? <div className="flex gap-2"><button type="button" onClick={() => updateRequest(request.id, "Accepted")} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700">Accept</button><button type="button" onClick={() => updateRequest(request.id, "Rejected")} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-rose-300 hover:text-rose-600">Reject</button></div> : <span className={`rounded-full px-3 py-1 text-xs font-bold ${request.status === "Accepted" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{request.status}</span>}</div>)}</div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-[#102d2b] p-6 text-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]"><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-[#d4f06b]">Active rental</p><h3 className="mt-2 text-2xl font-black">Royal Enfield Classic</h3></div><div className="rounded-xl bg-white/10 p-3"><CalendarDays className="h-5 w-5 text-[#d4f06b]" /></div></div><div className="mt-7 space-y-4 border-t border-white/10 pt-5"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><UserRound className="h-4 w-4" /></div><div><p className="text-xs text-teal-100/60">Customer</p><p className="text-sm font-bold">Nisha Menon</p></div></div><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><Clock3 className="h-4 w-4" /></div><div><p className="text-xs text-teal-100/60">Check-in / Check-out</p><p className="text-sm font-bold">Sep 10, 09:00 - Sep 11, 18:00</p></div></div></div><button type="button" className="mt-7 w-full rounded-xl bg-[#d4f06b] px-4 py-3 text-sm font-black text-[#102d2b] hover:bg-lime-200">View rental details</button></section>
          </div>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div>
          <h3 className="text-lg font-black">Your listings</h3>
          <p className="mt-1 text-sm text-slate-500">Keep your inventory and availability up to date</p>
          </div>
          <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400 sm:flex">
          <Search className="h-4 w-4" /><input aria-label="Search listings" placeholder="Search listings" className="w-32 outline-none" />
          </div>
          <button type="button" onClick={() => { setShowListingForm(true); setActiveTab("My listings"); }} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-teal-300" aria-label="Add listing">
          <Plus className="h-4 w-4 " />
          </button>
          </div>
          </div>
            <div className="divide-y divide-slate-100 ">
              {vehicles.slice(0, 3).map((listing, index) => (
                <div key={listing.id || index} className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="truncate text-base font-black text-slate-900">{listing.name}</p>
                      <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold capitalize text-teal-700">{listing.type}</span>
                    </div>
                    <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3 sm:gap-6">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Model</p>
                        <p className="mt-1 font-semibold text-slate-700">{listing.model}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Vehicle no.</p>
                        <p className="mt-1 font-semibold uppercase text-slate-700">{listing.vehicleNo}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Daily rate</p>
                        <p className="mt-1 font-black text-slate-900">₹{listing.price.toLocaleString()} <span className="font-normal text-slate-400">/ day</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-end gap-1 border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0">
                    <button type="button" aria-label={`Edit ${listing.name}`} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={()=> deleteVehicles(listing.id)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
                        </div>
          </section>
        </div>}
      </div>

      {showListingForm && 
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-5">
        <div className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-700">New listing · Step {formStep} of 2</p>
              <h3 className="mt-2 text-2xl font-black">Add a vehicle</h3>
          </div>
          <button type="button" aria-label="Close form" onClick={() => setShowListingForm(false)} className="rounded-lg p-2 hover:bg-slate-100">
            <X className="h-5 w-5" />
            </button>
            </div>
            <div className="mt-6 flex gap-2">{["Basics", "Pricing & availability"].map((step, index) => <div key={step} className={`h-1.5 flex-1 rounded-full ${index + 1 <= formStep ? "bg-[#102d2b]" : "bg-slate-200"}`} title={step} />)}</div>
            <form onSubmit={saveListing} className="mt-7">
              {formStep === 1 && <div className="space-y-5"><label className="block">
              <span className="mb-2 block text-sm font-bold">Vehicle name</span>
              <input 
              name="name"
              type="text"
              required 
              value={listings.name} 
              onChange={handleChange} 
              placeholder="e.g. Honda City 2024" 
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Vehicle type</span>
              <select 
              name="type"
              value={listings.type} 
              onChange={handleChange} 
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-teal-500">
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="scooter">Scooter</option>
                <option value="van">Van</option>
                </select>
                </label>

                <div>
                  <span className="mb-2 block text-sm font-bold">Photos</span>
                  {!previews ? (
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 px-5 py-8 text-center transition hover:border-teal-400 hover:bg-slate-50">
      <ImagePlus className="mx-auto h-7 w-7 text-teal-600" />
      <p className="mt-2 text-sm font-bold">Upload vehicle photo</p>
      <p className="mt-1 text-xs text-slate-400">JPG or PNG (1 image maximum)</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
                  ): (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200">
      <img src={previews} alt="Vehicle preview" className="h-full w-full object-cover" />
      <button
        type="button"
        onClick={removeFile}
        className="absolute right-2 top-2 rounded-full bg-rose-600 p-1.5 text-white shadow hover:bg-rose-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
                  )}
                      </div>
                      </div>}
                      {formStep === 2 && 
                      <div className="space-y-5">
                        <label className="block">
                          <span className="mb-2 block text-sm font-bold">Daily price (₹)</span>
                          <input 
                          required 
                          name="price"
                          type="number" 
                          min="1" 
                          value={listings.price || ''} 
                          onChange={handleChange} 
                          placeholder="1200"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100" />
                          </label>
                         
                            <span className="mb-2 block text-sm font-bold">Model</span>
                           
                              <label className="block">
                              <input 
                              type="text"
                              name="model"
                              onChange={handleChange}
                              value={listings.model}
                              placeholder="eg. Maruti 800"
                              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100" />
                              </label>
                              
                              <span className="mb-2 block text-sm font-bold">Vehicle No.</span>
                           
                              <label className="block">
                              <input 
                              type="text"
                              name="vehicleNo"
                              onChange={handleChange}
                              value={listings.vehicleNo}
                              placeholder="UK 04 7686"
                              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100" 
                              />
                              </label>
                             
                                </div>
                                }
                            <div className="mt-8 flex justify-between gap-3 border-t border-slate-100 pt-5">
                                              {formStep > 1 ? 
                                              <button type="button" onClick={() => setFormStep(formStep - 1)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
                                                <ArrowLeft className="h-4 w-4" />Back</button> : <span />
                                                }
                                                {formStep < 2 ? 
                                                <button 
                                                type="button" 
                                                onClick={() => setFormStep(formStep + 1)} 
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#102d2b] px-5 py-3 text-sm font-bold text-white">
                                                  Continue 
                                                  <ArrowRight className="h-4 w-4" />
                                                  </button> : <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#102d2b] px-5 py-3 text-sm font-bold text-white">
                                                    <Check className="h-4 w-4" />Publish listing</button>
                                                    }
                                                    </div>
                                                    </form>
                                                    </div>
                                                    </div>}
    </main>
  );
}
