import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const surveys = await prisma.survey.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ surveys }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
