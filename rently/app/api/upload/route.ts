import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


export async function POST(req: Request) {
  try {

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Fall back to NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase URL or Key is missing in environment variables." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const formData = await req.formData();
    const files = formData.get("files") as File | null;

    if (!files) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const fileExt = files.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `vehicles/${fileName}`;

    const arrayBuffer = await files.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const {error} = await supabase.storage.from("vehicle-image").upload(filePath, buffer, {
        contentType: files.type || "image/jpeg",
        upsert: false,
    })

    if (error) {
      console.log("supabase storage error: ", error);
      throw error;
    }

    const {data} = supabase.storage.from("vehicle-image").getPublicUrl(filePath);

    return NextResponse.json({url: data.publicUrl }, {status:200});
  } catch (err: any) {
    console.log("Error: ",err)
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}