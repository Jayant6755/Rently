import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import bycrypt from "bcryptjs";
import { Role } from "@/lib/generated/prisma/browser";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const {email, name, password, role} = body;

        //validation
        if(!email || !name || !password || password.length < 8) {
            return  NextResponse.json({message: "Invalid data"}, {status: 400});
        }

        const lowerCaseEmail = email.toLowerCase();

        const userExists = await prisma.user.findUnique({
            where: {
                email: lowerCaseEmail,
            }
        });

        if(userExists) {
            return  NextResponse.json({message: "User already exists"}, {status: 409});
        }

        const hashpassword = await bycrypt.hash(password, 12);

        //create
       const user = await prisma.user.create({
            data: {
                name,
                email: lowerCaseEmail,
                password: hashpassword,
                role: role === "OWNER" ? Role.OWNER : Role.CUSTOMER,
            }
        });

        if(role === "OWNER") {
            await prisma.owner.create({
                data: {
                    userId: user.id,
                }
            })
        }
       
       return NextResponse.json({
        message: "Account created successfully",
       },{status: 201});
    }
    catch (error) {
        console.error("Signup error: ", error);

        return NextResponse.json({
            message: "Signup Error"
        },
    {status: 500}
    );
    }
}