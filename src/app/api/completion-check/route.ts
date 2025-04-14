import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
