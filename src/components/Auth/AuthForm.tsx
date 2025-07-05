'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSubmit: (data: { email: string; password: string }) => Promise<void> | void;
  onSocialAuth?: (provider: 'google' | 'linkedin') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, onSocialAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isSignUp = mode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit({ email, password });

      // ✅ Redirect to dashboard after successful auth
      router.push('/dashboard');
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialClick = (provider: 'google' | 'linkedin') => {
    if (onSocialAuth) {
      onSocialAuth(provider);
    } else {
      console.log(`${isSignUp ? 'Signing up' : 'Signing in'} with ${provider}`);
    }
  };

  return (
    <div className={styles.container}>
      {isSignUp && <h1 className={styles.logo}>worksy</h1>}

      <h2 className={styles.heading}>
        {isSignUp ? 'Sign up' : 'Welcome back'}
      </h2>

      <p className={styles.subheading}>
        {isSignUp ? 'Sign up using your account' : 'Sign in using your account'}
      </p>

      <div className={styles.socialButtons}>
        <button
          type="button"
          onClick={() => handleSocialClick('google')}
          className={styles.socialButton}
        >
          G
        </button>
        <button
          type="button"
          onClick={() => handleSocialClick('linkedin')}
          className={styles.socialButton}
        >
          in
        </button>
      </div>

      <p className={styles.alt}>
        Or {isSignUp ? 'sign up' : 'sign in'} with your email
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Work email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading
            ? `${isSignUp ? 'Signing up' : 'Signing in'}...`
            : (isSignUp ? 'Sign up' : 'Sign in')}
        </button>
      </form>

      <p className={styles.footer}>
        {isSignUp ? (
          <>Already a member? <a href="/login" className={styles.link}>Sign in</a></>
        ) : (
          <>Forgot password? <a href="/forgot-password" className={styles.link}>Click here</a></>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
