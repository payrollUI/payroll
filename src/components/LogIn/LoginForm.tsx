'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import ModernLoginForm from '../Auth/ModernLoginForm';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  
  const handleSubmit = async (data: { email: string; password: string }) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
    });

    if (result?.ok && result.url) {
      router.push(result.url);
    } else {
      throw new Error('Login failed');
    }
  };

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <ModernLoginForm 
      onSubmit={handleSubmit}
      onSocialAuth={handleSocialAuth}
    />
  );
};

export default LoginForm;
