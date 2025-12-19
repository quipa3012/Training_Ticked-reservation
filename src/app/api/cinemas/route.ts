import { NextResponse } from 'next/server';
import { cinemas } from '@/data/cinemas';

export async function GET() {
  return NextResponse.json(cinemas);
}
