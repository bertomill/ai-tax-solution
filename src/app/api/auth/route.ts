import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Get the password from environment variable (server-side only)
    const correctPassword = process.env.APP_PASSWORD || 'AIGTM2025'
    
    if (password === correctPassword) {
      return NextResponse.json({ 
        success: true, 
        message: 'Authentication successful' 
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Incorrect password' 
        },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Invalid request' 
      },
      { status: 400 }
    )
  }
} 