import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const survey_id = searchParams.get("survey_id");

    if (!user_id || !survey_id) {
      return NextResponse.json(
        { error: "Missing user_id or survey_id" },
        { status: 400 }
      );
    }

    const response = await prisma.response.findFirst({
      where: {
        user_id: parseInt(user_id),
        survey_id: parseInt(survey_id),
      },
    });

    return NextResponse.json({ responded: Boolean(response) });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
