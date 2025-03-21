"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/utils/tokenManager';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
    }
  }, [router]);

  return isLoggedIn() ? children : null;
}