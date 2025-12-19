'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginView from '@/components/auth/LoginView';
import { useAuth } from '@/stores/auth/AuthContext';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);

  return <LoginView />;
}
