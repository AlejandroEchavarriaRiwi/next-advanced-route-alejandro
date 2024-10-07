import { NextRequest, NextResponse } from 'next/server';

const RIWI_HOST = process.env.RIWI_HOST;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;


  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  try {
    const response = await fetch(`${RIWI_HOST}/auth/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${req.headers.get('Authorization')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Failed to fetch product', details: errorData }, { status: response.status });
    }

    const product = await response.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
