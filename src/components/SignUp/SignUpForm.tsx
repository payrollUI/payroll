'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ModernSignUpForm from '../Auth/ModernSignUpForm';

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: { email: string; password: string; name: string; company: string }) => {
    try {
      // Your signup logic here
      console.log('Signing up with:', data);
      
      // Example: Replace with your actual authentication service
      // const result = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // 
      // if (result.ok) {
      //   // Redirect to verification page or login
      //   router.push('/verify-email');
      // } else {
      //   const error = await result.json();
      //   throw new Error(error.message || 'Signup failed');
      // }
      
      // For demo purposes - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page after successful signup
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed. Please try again.');
    }
  };

  const handleSocialAuth = (provider: 'google' | 'linkedin') => {
    try {
      // Your social auth logic here
      console.log(`Social signup with ${provider}`);
      
      // Example: Replace with your actual social auth service
      // if (provider === 'google') {
      //   window.location.href = '/api/auth/google?mode=signup';
      // } else if (provider === 'linkedin') {
      //   window.location.href = '/api/auth/linkedin?mode=signup';
      // }
      
      // For demo purposes
      alert(`${provider} signup initiated! (Demo)`);
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