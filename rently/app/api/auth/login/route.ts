import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import bycrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {email, password, role} = body;
      
        if(!email || !password) {
            return NextResponse.json({message: "Invalid data"}, {status: 400});
        }

        const lowerCaseEmail = email.toLowerCase();

        const user = await prisma.user.findUnique({
            where: {
                email: lowerCaseEmail,
            },
            include: {
                owner: true,
            },
        });
        

        if(!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        
        const passwordMatch = await bycrypt.compare(password, user.password);
        if(!passwordMatch) {
            return NextResponse.json({message: "Invalid credentials"}, {status: 401});
        }

        if(role && user.role !== role) {
            return NextResponse.json({message: "Unauthorized User"}, {status: 403});
        }

        const cookieStore = await cookies();
        cookieStore.set("userName", user.name, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        if (user.owner?.id) {
            cookieStore.set("ownerId", user.owner.id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });
        }

        return NextResponse.json({
            message: "Login successful",
            user: {name: user.name, userId: user.id}
    });

    }catch (error) {
        console.error("Login error: ", error);
        return NextResponse.json({
            message: "Login Error"
        },
    {status: 500}
    );
    }
}