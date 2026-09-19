import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}){
    try {
        const {id} = await params;

        const vehicle = await prisma.vehicle.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({message: "Vehicle deleted Successfully", vehicle});

    } catch (error) {
        console.error("Delete vehicle error:", error);

        return NextResponse.json(
            {message: "Failed to delete vehicle"},
            {status: 500}
        );
    }
}