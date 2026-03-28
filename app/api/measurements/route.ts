import { NextResponse } from "next/server";
import { getMeasurements } from "@/services/stationService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get("stationId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!stationId) {
    return NextResponse.json({ error: "Параметр stationId обов'язковий" }, { status: 400 });
  }

  let measurements = await getMeasurements(stationId);

  // Фільтрація за періодом (якщо вказано)
  if (from || to) {
    measurements = measurements.filter(m => {
      const date = new Date(m.timestamp).getTime();
      const fromTime = from ? new Date(from).getTime() : 0;
      const toTime = to ? new Date(to).getTime() : Infinity;
      return date >= fromTime && date <= toTime;
    });
  }

  return NextResponse.json(measurements);
}