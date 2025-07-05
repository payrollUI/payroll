'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import AuthForm from '../Auth/AuthForm';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const handleSubmit = async (data: { email: string; password: string }) => {
    const result = await signIn('credentials', {
  redirect: false,
  email: data.email,
  password: data.password,
  callbackUrl: '/dashboard', // ✅ redirect here on success
});

    if (result?.ok && result.url) {
  router.push(result.url);
} else {
      alert('Login failed');
    }
  };

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <AuthForm 
      mode="signin" 
      onSubmit={handleSubmit}
      onSocialAuth={handleSocialAuth}
    />
  );
};

export default LoginForm;
