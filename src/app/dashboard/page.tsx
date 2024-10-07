'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NavbarDashboard from '../../components/ui/NavBar/NavBarDashboard'; 

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, session]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An error occurred while fetching products');
    } finally {
      setIsLoading(false);
    }
  };
    if (status === 'loading') {
        return <div>Loading session...</div>;
    }

    if (status === 'unauthenticated') {
        return <div>Access denied. Please log in.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <NavbarDashboard />
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {isLoading && <div>Loading products...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded-lg">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500 mt-2">{product.description.substring(0, 100)}...</p>
                        <div className="mt-2">
                            <span className="text-yellow-500">★ {product.rating.rate}</span>
                            <span className="text-gray-500 ml-2">({product.rating.count} reviews)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}