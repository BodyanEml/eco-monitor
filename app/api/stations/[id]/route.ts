import { NextResponse } from "next/server";
import { getStationById } from "@/services/stationService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const station = await getStationById(id);

  if (!station) {
    return NextResponse.json({ error: "Станцію не знайдено" }, { status: 404 });
  }

  return NextResponse.json(station);
}