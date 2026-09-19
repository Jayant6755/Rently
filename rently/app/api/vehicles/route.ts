import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const {ownerId, name, price, model, type, vehicleNo, imageUrl} = body

        if(!ownerId){
            return NextResponse.json({error: "Owner ID is required"}, {status: 400})
        }

        const ownerExists = await prisma.owner.findUnique({
            where: {id: ownerId},
        });

        if(!ownerExists) {
            return NextResponse.json(
                {error: `No owner record found with ID: ${ownerId}`},
                {status: 404}
            );
        }

        if( !name || !price || !model || !type || !vehicleNo){
            return NextResponse.json({message: "Invalid data"}, {status: 400})
        }

        const vehicle = await prisma.vehicle.create({
            data: {
                ownerId,
                name,
                price: Number(price),
                model,
                type,
                vehicleNo,
                imageUrl
            }
        })

        return NextResponse.json({message: "Vehicle saved successfully", data: vehicle}, {status: 201})
    } catch (error: any) {
        console.error("Vehicles error: ", error)

        return NextResponse.json({
            message: "Vehicles Error"
        }, {status: 500})
    }
}

export async function GET(req: NextRequest){
    try {
        const {searchParams} = new URL(req.url);
        const ownerID = searchParams.get("ownerId")
        const limit = searchParams.get("limit");

        if(!ownerID){
            return NextResponse.json({message: "ID of owner required"}, {status: 404})
        }

        
        const vehicles = await prisma.vehicle.findMany({
            where: {
                ownerId: ownerID,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: limit ? Number(limit) : undefined,
        });

        return NextResponse.json({success: true, data: vehicles}, {status:200});
    } catch (error: any) {
        console.error("GET vehicles error:", error);
        return NextResponse.json({
            error: error.message || "Failed to fetch vehicles"
        }, {status: 500});
    }
}

