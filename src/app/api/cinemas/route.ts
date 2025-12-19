import { cinemas } from '@/data/cinemas';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(cinemas);
}
