'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ModernSignUpForm from '../Auth/ModernSignUpForm';

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { email: string; password: string; name: string; company: string }) => {
    try {
      console.log('Signing up with:', data);
      
      // Call the registration API
      const result = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const response = await result.json();
      
      if (result.ok) {
        // Registration successful, redirect to login
        console.log('User registered successfully:', response.user);
        router.push('/login?message=Registration successful! Please login with your credentials.');
      } else {
        // Registration failed, throw error with server message
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Re-throw to be handled by the form
    }
  };

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    try {
      console.log(`Social signup with ${provider}`);
      
      // Use NextAuth for social authentication
      import('next-auth/react').then(({ signIn }) => {
        signIn(provider, { callbackUrl: '/dashboard' });
      });
    } catch (error) {
      console.error('Social auth error:', error);
      alert('Social authentication failed. Please try again.');
    }
  };

  return (
    <ModernSignUpForm 
      onSubmit={handleSubmit}
      onSocialAuth={handleSocialAuth}
    />
  );
};

export default SignUpForm;