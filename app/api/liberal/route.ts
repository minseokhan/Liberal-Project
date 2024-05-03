import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { AreaArr, GradeArr } from "@/app/data";

export async function GET(request: Request) {
  const area = +request.url.split("=")[1].split("&")[0];
  const grade = +request.url.split("=")[2].split("&")[0];
  const percent = +request.url.split("=")[3].split("&")[0];
  const page = +request.url.split("=")[4].split("&")[0];
  const limit = +request.url.split("=")[5];

  const areaName = AreaArr.find((o) => o.id === area)?.area;
  const gradeName = GradeArr.find((o) => o.id === grade)?.grade;

  if (areaName) {
    if (gradeName && percent) {
      const liberalInfo = await prisma.liberal.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          area: areaName,
        },
      });

      const filterdLiberalInfo = liberalInfo.filter((liberal) => {
        const newGradeArr = liberal.gradeArr.map((data, i) => {
          if (data.split("-")[2] === gradeName) return i;
        });
        const korKeyword = newGradeArr.find(
          (index) =>
            index &&
            (percent === 0
              ? +liberal.percentArr[index] >= percent &&
                +liberal.percentArr[index] < 10
              : +liberal.percentArr[index] >= percent * 10)
        );
        return korKeyword;
      });
      return NextResponse.json(
        filterdLiberalInfo.slice(12 * page, 12 * (page + 1))
      );
    } else {
      const liberalInfo = await prisma.liberal.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          area: areaName,
        },
      });
      return NextResponse.json(liberalInfo);
    }
  } else {
    if (gradeName && percent) {
      const liberalInfo = await prisma.liberal.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
      const filterdLiberalInfo = liberalInfo.filter((liberal) => {
        const newGradeArr = liberal.gradeArr.map((data, i) => {
          if (data.split("-")[2] === gradeName) return i;
        });
        const korKeyword = newGradeArr.find(
          (index) =>
            index &&
            (percent === 0
              ? +liberal.percentArr[index] >= percent &&
                +liberal.percentArr[index] < 10
              : +liberal.percentArr[index] >= percent * 10)
        );
        return korKeyword;
      });
      return NextResponse.json(
        filterdLiberalInfo.slice(12 * page, 12 * (page + 1))
      );
    } else {
      const liberalInfo = await prisma.liberal.findMany({
        skip: (+page - 1) * +limit,
        take: +limit,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
      return NextResponse.json(liberalInfo);
    }
  }
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
