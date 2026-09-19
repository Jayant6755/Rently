import { Bike, Car, LucideMap, Motorbike, Verified, DollarSign, Star, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Navbar from "@/components/Layout/navbar";
import Footer from "@/components/Layout/footer";



export default function Home() {

  const icons = [
    {
      image: "/Pictures/png image/3842177.png",
      content: "Scooter",
      icons: "/Pictures/png image/3253168.png",
      name: "Find"
    },
    {
      image: "/Pictures/png image/1048334.png",
      content: "Bike",
      icons: "/Pictures/png image/18307328.png",
      name: "Explore"
    },
    {
      image: "/Pictures/png image/18042764.png",
      content: "Car",
      icons: "/Pictures/png image/10396466.png",
      name: "Ride"
    }
  ]

  const why = [
    {
      icons: <LucideMap className="w-8 h-8"/>,
      title: "Nearby",
      description: "Rent vehicles close to you",
    },
     {
      icons: <Verified className="w-8 h-8"/>,
      title: "Verified",
      description: "Trusted by hosts and vehicles",
    },
     {
      icons: <DollarSign className="w-8 h-8"/>,
      title: "Pricing",
      description: "Affordable and Transparent costs",
    },
     {
      icons: <Star className="w-8 h-8"/>,
      title: "Reviews",
      description: "Read feedback from other renters",
    },
  ]

  const mapUrl = "https://maps.google.com/?cid=14382494332249338725";
  const mapImageUrl = "/Pictures/photo-1736117703669-996247368d0a.avif";
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center justify-center dark:bg-black ">

      {/* Hero section */}
      <main id="home" className="flex w-full min-h-screen flex-col items-center justify-between bg-white pt-20">
        <img 
          src="/Pictures/photo-1783876962781-d202e3beaeb5.avif" 
          alt="Hero background - vehicles ready for rent"
          className="w-full h-screen object-cover object-center fixed"
        />
       <div className="absolute inset-0 bg-black/30" />

<div className="absolute inset-0 flex items-center justify-center p-4">

  <div className="flex flex-col items-center justify-center gap-8  p-10">
    
    
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
        Find your <span className="bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">ride</span>
      </h1>
      <p className="text-xl md:text-2xl tracking-tight text-teal-200">Wherever you are, we have it</p>
    </div>

    
    <div className="flex w-full items-center justify-center">
      <a href="#vehicles">
        <Button className="rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
          Explore Vehicles
        </Button>
      </a>
    </div>

    
    <div className="flex w-full items-center justify-center gap-10 text-white">
      <Bike className="h-14 w-14" />
      <Car className="h-14 w-14" />
      <Motorbike className="h-14 w-14" />
    </div>

  </div>
</div>
      </main>

      {/* section-2 */}
     <main className="relative flex min-h-screen w-full items-center justify-center bg-white p-6">
  <div className="flex w-full flex-col items-center justify-center gap-12 max-w-6xl">
    
    
    <div className="flex w-full flex-col items-center justify-center gap-8 p-6">
      <div className="text-center">
        <h2 id="vehicles" className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          What are you looking for?
        </h2>
        <p className="text-gray-500 mt-2 text-lg">Choose your perfect ride</p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-6">
        {icons.map((i, index) => (
          <Card key={index} size="sm" className="w-full max-w-xs bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-teal-300 hover:scale-105 flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer group">
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <img src={i.image} alt={i.content} className="h-16 w-16 object-contain" />
            </div>
            <CardContent className="font-bold text-2xl text-gray-900 text-center">
              {i.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

   
    <div id="works" className=" flex w-full flex-col items-center justify-center gap-8 border-t-2 border-gray-200 pt-8 p-6">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          How Rently works
        </h2>
        <p className="text-gray-500 mt-2 text-lg">Three simple steps to your next adventure</p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-6">
        {icons.map((i, works) => (
          <Card key={works} size="sm" className="w-full max-w-sm bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-2xl hover:border-teal-400 hover:scale-105 p-8 rounded-2xl group">
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
              <img src={i.icons} alt={i.content} className="h-20 w-20 object-contain" />
            </div>
            <CardContent className="font-bold text-2xl text-center text-gray-900">
              {i.name}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  </div>
</main>

{/* section-3 */}
<main className="relative w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-16 px-6">
  <div className="flex w-full flex-col items-center justify-center gap-12 max-w-5xl ">
    
    {/* Section Title */}
    <div className="flex flex-col w-full justify-center items-center text-center">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Why choose Rently?</h2>
      <p className="text-gray-500 mt-2  text-lg">Discover the benefits that make us the best choice</p>
    </div>

    {/* 2-Column Responsive Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full ">
      {why.map((w, index) => (
        <Card key={index} className="w-full bg-white border-2 border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-teal-300 hover:scale-105 p-6 rounded-2xl group">
          <CardContent className="flex flex-col items-center gap-4 p-0 text-center">
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
              <div className="text-teal-600 scale-125">
                {w.icons}
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {w.title}
            </div>
          </CardContent>
          <CardContent className="p-0 text-sm text-gray-500 text-center">
            {w.description}
          </CardContent>
        </Card>
      ))}
    </div>

  </div>
</main>
{/* section-4: Map Section */}
<section id="about" className="flex w-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-white to-gray-50 py-16 px-8 relative">
  <div className="text-center">
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
      Explore Rentals Near You
    </h2>
    <p className="text-gray-500 mt-2 text-lg">Find amazing vehicles in your area</p>
  </div>

  {/* Map Container Link */}
  <a
    href={mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative h-96 w-full max-w-5xl overflow-hidden rounded-3xl border-2 border-gray-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-teal-300"
  >
    {/* Background Map Image */}
    <img
      src={mapImageUrl}
      alt="Rental vehicles location map"
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    {/* Dark Overlay on Hover */}
    <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-all duration-300 group-hover:bg-black/50">
      {/* Action Badge */}
      <div className="flex items-center gap-3 rounded-full bg-white px-6 py-3 text-base font-bold text-gray-900 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:text-white">
        <MapPin className="h-5 w-5" />
        <span>View Locations</span>
      </div>
    </div>
  </a>
</section>

{/* section-5: CTA Banner */}
<section className="relative w-full bg-gradient-to-b from-white to-gray-50 py-20 px-6">
  <div className="container mx-auto px-4">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-blue-600 to-cyan-600 p-8 text-center md:p-20 shadow-2xl">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 h-32 w-32 rounded-full bg-cyan-300/10 blur-2xl" />
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <h2 className="max-w-4xl text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          Your next ride is just a click away
        </h2>
        <p className="max-w-2xl text-lg text-white/90 drop-shadow">Join thousands of happy renters and start your journey today</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#vehicles">
            <Button className="rounded-full bg-white text-teal-600 px-8 py-4 font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started Now
            </Button>
          </a>
          <a href="#about">
            <Button className="rounded-full bg-transparent border-2 border-white text-white px-8 py-4 font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300">
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
 <Footer/>
    </section>
    </>
  );
}
