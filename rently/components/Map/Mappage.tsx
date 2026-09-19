"use client";

import { LocateFixed, LoaderCircle, MapPin, Navigation } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const DEFAULT_LOCATION: Coordinates = {
  latitude: 12.9716,
  longitude: 77.5946,
};

const Mappage = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setErrorMessage("Location is not supported by this browser.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({ latitude: coords.latitude, longitude: coords.longitude });
        setStatus("ready");
      },
      (error) => {
        setStatus("error");
        setErrorMessage(
          error.code === error.PERMISSION_DENIED
            ? "Location access was denied. Allow it in your browser to see your position."
            : "We could not find your location. Please try again."
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }, []);

  useEffect(() => {
    locateUser();
  }, [locateUser]);

  const mapLocation = coordinates ?? DEFAULT_LOCATION;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${mapLocation.latitude},${mapLocation.longitude}&bbox=${mapLocation.longitude - 0.035},${mapLocation.latitude - 0.025},${mapLocation.longitude + 0.035},${mapLocation.latitude + 0.025}`;

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8" aria-labelledby="location-map-title">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal-600">Your live location</p>
          <h2 id="location-map-title" className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Rides close to you</h2>
          <p className="mt-2 text-sm text-slate-500">Your position stays on this device and is never shared with us.</p>
        </div>
        <button
          type="button"
          onClick={locateUser}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
          {status === "loading" ? "Finding you..." : "Locate me"}
        </button>
      </div>

      <div className="relative h-[24rem] overflow-hidden rounded-[2rem] border border-slate-200 bg-[#dce9e5] shadow-sm sm:h-[30rem]">
        <iframe
          key={`${mapLocation.latitude}-${mapLocation.longitude}`}
          title="Map showing your current location"
          src={mapUrl}
          className="h-full w-full border-0"
          loading="lazy"
        />
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-3 py-2 text-xs font-bold text-slate-700 shadow-lg backdrop-blur sm:left-6 sm:top-6">
          <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-500 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-600" /></span>
          {status === "ready" ? "You are here" : "Map preview"}
        </div>
        {status === "error" && (
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl border border-rose-100 bg-white/95 p-3 text-sm text-slate-700 shadow-lg backdrop-blur sm:inset-x-6 sm:bottom-6">
            <MapPin className="h-5 w-5 shrink-0 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}
        {status === "ready" && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-slate-950/90 px-3 py-2 text-xs font-semibold text-white shadow-lg sm:bottom-6 sm:left-6">
            <Navigation className="h-3.5 w-3.5 text-teal-300" />
            Live position
          </div>
        )}
      </div>
      <p className="mt-3 text-right text-xs text-slate-400">Map data © OpenStreetMap contributors</p>
    </section>
  );
};

export default Mappage;