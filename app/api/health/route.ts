import { checkDbRunning, checkGithubRunning } from "@/services/health/helper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    /* eslint-disable @typescript-eslint/no-explicit-any */

    const backendServices = await Promise.all([
      checkDbRunning(),
      checkGithubRunning(),
    ]);
    const respData = backendServices.map((service) => ({
      service: service.name,
      status: service.success,
    }));
    return NextResponse.json(
      { message: "Running fine", data: respData },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
