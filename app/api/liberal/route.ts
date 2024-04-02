import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(request: Request) {
  const liberalInfo = await prisma.liberal.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return NextResponse.json(liberalInfo);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    area,
    credit,
    gradeArr,
    percentArr,
    everytimeLink,
    portfolioLink,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const liberal = await prisma.liberal.create({
    data: {
      name,
      area,
      credit: +credit,
      gradeArr,
      percentArr,
      everytimeLink,
      portfolioLink,
    },
  });

  return NextResponse.json(liberal);
}
