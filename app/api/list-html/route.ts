// app/api/list-html/route.ts
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const htmlDir = path.join(process.cwd(), "public", "content"); 
  const files = fs.readdirSync(htmlDir).filter((f) => f.endsWith(".html"));

  // Map into objects
  // const fileObjects = files.map((file) => ({
  //   name: file.replace(".html", ""),
  //   path: `/content/${file}`,
  //   url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/content/${file}`,
  // }));

  return NextResponse.json({ files: fileObjects });
}
