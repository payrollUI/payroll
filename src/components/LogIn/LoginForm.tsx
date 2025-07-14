'use client';

import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import ModernLoginForm from '../Auth/ModernLoginForm';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlMessage = searchParams.get('message');
    if (urlMessage) {
      setMessage(urlMessage);
      // Clear the message from URL after showing it
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);
  
  const handleSubmit = async (data: { email: string; password: string }) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
    });

    if (result?.ok) {
      router.push('/dashboard');
    } else {
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    }
  };

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <ModernLoginForm 
      onSubmit={handleSubmit}
      onSocialAuth={handleSocialAuth}
      successMessage={message}
    />
  );
};

export default LoginForm;
