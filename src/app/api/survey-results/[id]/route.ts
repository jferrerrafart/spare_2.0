import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const survey_id = parseInt(params.id);

    const totalResponses = await prisma.response.count({
      where: { survey_id },
    });

    if (totalResponses === 0) {
      return NextResponse.json({
        survey_id,
        totalResponses,
        option_a: 0,
        option_b: 0,
        option_c: 0,
        option_d: 0,
      });
    }

    const optionCounts = await prisma.response.groupBy({
      by: ["selected_option"],
      where: { survey_id },
      _count: { selected_option: true },
    });

    const results = {
      survey_id,
      totalResponses,
      option_a: 0,
      option_b: 0,
      option_c: 0,
      option_d: 0,
    };

    optionCounts.forEach(
      (option: {
        selected_option: string;
        _count: { selected_option: number };
      }) => {
        if (option.selected_option in results) {
          results[option.selected_option as keyof typeof results] = Math.round(
            (option._count.selected_option / totalResponses) * 100
          );
        }
      }
    );

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
