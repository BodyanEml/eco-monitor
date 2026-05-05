import { NextResponse } from "next/server";
import { getStations } from "@/services/stationService";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const stations = await getStations();
    return NextResponse.json(stations);
  } catch (error) {
    console.log(error)
    };
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }