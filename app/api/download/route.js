import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Fayis.k MERN Stack & Next JS Developer Resume.pdf");
  const file = fs.readFileSync(filePath);


  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Fayis.k MERN & Next.js Developer-Resume.pdf",
    },
  });
}