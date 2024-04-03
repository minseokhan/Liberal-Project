import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.accessPwd) return NextResponse.error();

  const schoolNumberArr = process.env.ACCESS_PWD?.split("/");

  if (schoolNumberArr?.includes(body.accessPwd)) {
    return NextResponse.json({ ok: true, message: "관리자 권한 인증 성공!" });
  } else {
    return NextResponse.json({
      ok: false,
      message: "잘못된 관리자 권한 번호입니다...",
    });
  }
}
