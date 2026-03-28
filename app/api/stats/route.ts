import { NextResponse } from "next/server";
import { getGlobalStats } from "@/services/stationService";

export async function GET() {
  const stats = await getGlobalStats();
  return NextResponse.json(stats);
}