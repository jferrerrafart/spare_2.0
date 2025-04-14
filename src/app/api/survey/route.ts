import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const surveys = await prisma.survey.findMany();
    return NextResponse.json({ surveys });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { user_id, title, question, option_a, option_b, option_c, option_d } =
      body;

    // Validación básica
    if (
      !user_id ||
      !title ||
      !question ||
      !option_a ||
      !option_b ||
      !option_c ||
      !option_d
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newSurvey = await prisma.survey.create({
      data: {
        user_id,
        title,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
      },
    });

    return NextResponse.json(newSurvey, { status: 201 });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
