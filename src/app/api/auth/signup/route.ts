import { NextRequest, NextResponse } from 'next/server';

const RIWI_HOST = process.env.RIWI_HOST;

export async function POST(req: NextRequest) {
  try {
    const { email, username, password, name, phone } = await req.json();

    if (!email || !username || !password || !name || !phone) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const response = await fetch(`${RIWI_HOST}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password, name, phone }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server response:', response.status, errorData);
      return NextResponse.json({ message: 'Failed to register user', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
