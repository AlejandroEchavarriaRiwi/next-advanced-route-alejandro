import { NextResponse } from "next/server";

interface UserData {
    email: string;
    password: string;
  }

export async function GET() {
    const res = await fetch('https://fakestoreapi.com/products', {
        headers: {
            'Content-Type' : 'application/json',
        },
    })

    const products = await res.json()

    return NextResponse.json({
        products,
    }, {status: 200} )
}
  
  export async function POST(request: Request) {
    try {
      const userData: UserData = await request.json();
  
      const registrationResponse = await fetch('https://www.api.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!registrationResponse.ok) {
        throw new Error(`HTTP error! status: ${registrationResponse.status}`);
      }
  
      const registeredUser = await registrationResponse.json();
  
      return NextResponse.json({
        message: "Usuario registrado exitosamente",
        user: registeredUser,
      }, { status: 201 });
  
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      return NextResponse.json({
        message: "Error al registrar el usuario",
        error: error instanceof Error ? error.message : String(error),
      }, { status: 500 });
    }
  }