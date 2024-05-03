import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  const search = request.url.split("=")[1].split("&")[0];
  const page = +request.url.split("=")[2].split("&")[0];
  const limit = +request.url.split("=")[3];

  if (search) {
    const liberalInfo = await prisma.liberal.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        name: {
          contains: decodeURIComponent(search),
        },
      },
    });
    return NextResponse.json(liberalInfo);
  } else {
    const liberalInfo = await prisma.liberal.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return NextResponse.json(liberalInfo);
  }
}
