// app/api/migrations/route.ts
import { NextResponse } from "next/server";
import { getMigrationStatus } from "@/lib/actions";

export async function GET() {
    try {
        const status = await getMigrationStatus();
        return NextResponse.json({ status });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
