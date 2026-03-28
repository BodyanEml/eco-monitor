import { NextResponse } from "next/server";
import { getStations } from "@/services/stationService";

export async function GET() {
  try {
    const stations = await getStations();
    return NextResponse.json(stations);
  } catch (error) {
    return NextResponse.json({ error: "Помилка при отриманні списку станцій" }, { status: 500 });
  }
}