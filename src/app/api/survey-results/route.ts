import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const surveyResults = await req.json();

    await prisma.$transaction([
      prisma.response.create({
        data: surveyResults,
      }),
      prisma.survey.update({
        where: { id: surveyResults.survey_id },
        data: { responses_count: { increment: 1 } },
      }),
    ]);

    return NextResponse.json({
      message: "Survey response saved successfully.",
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
