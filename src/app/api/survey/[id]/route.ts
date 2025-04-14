import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const surveyId = parseInt(params.id, 10);

    if (isNaN(surveyId)) {
      return NextResponse.json({ error: "Invalid survey ID" }, { status: 400 });
    }

    const survey = await prisma.survey.findUnique({
      where: { id: surveyId },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    return NextResponse.json(survey);
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
