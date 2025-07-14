import { NextResponse } from 'next/server'

// Configure route as dynamic since it returns current timestamp
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'payroll-app',
      version: '1.0.0'
    },
    { status: 200 }
  )
}