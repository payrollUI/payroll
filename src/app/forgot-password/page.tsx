'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="37" cy="37" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  borderRadius: theme.spacing(2),
  position: 'relative',
  zIndex: 1
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  '& .logo-text': {
    fontSize: '2.5rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textTransform: 'lowercase',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
  },
  '& .logo-sub': {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginLeft: theme.spacing(1),
    fontWeight: 400
  }
}));

const ResetButton = styled(Button)(({ theme }) => ({
  minHeight: 48,
  borderRadius: theme.spacing(1),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b4f9c 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
  },
  '&:disabled': {
    background: '#9ca3af',
    color: '#ffffff'
  },
  transition: 'all 0.2s ease-in-out'
}));

const BackButton = styled(Button)(({ theme }) => ({
  color: '#6b7280',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(107, 114, 128, 0.04)',
    color: '#374151'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: '#e5e7eb'
    },
    '&:hover fieldset': {
      borderColor: '#667eea'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
      borderWidth: 2
    }
  },
  '& .MuiInputLabel-root': {
    color: '#6b7280',
    '&.Mui-focused': {
      color: '#667eea'
    }
  }
}));

const SuccessCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  '& .success-icon': {
    fontSize: '4rem',
    color: '#10b981',
    marginBottom: theme.spacing(2)
  }
}));

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll always show success
      setIsEmailSent(true);
    } catch (error) {
      setError('Something went wrong. Please try again.');
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setEmail('');
  };

  if (isEmailSent) {
    return (
      <StyledContainer>
        <StyledCard>
          <CardContent sx={{ p: 4 }}>
            <LogoBox>
              <Typography className="logo-text">worksy</Typography>
              <Typography className="logo-sub">Payroll</Typography>
            </LogoBox>

            <SuccessCard>
              <CheckCircleIcon className="success-icon" />
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 600,
                  color: '#1f2937',
                  mb: 2,
                  fontSize: isMobile ? '1.25rem' : '1.5rem'
                }}
              >
                Check your email
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#6b7280', mb: 3, lineHeight: 1.6 }}
              >
                We've sent a password reset link to{' '}
                <strong>{email}</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#9ca3af', mb: 4 }}
              >
                Didn't receive the email? Check your spam folder or try again.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ResetButton
                  fullWidth
                  onClick={handleResendEmail}
                >
                  Send Another Email
                </ResetButton>
                <BackButton
                  fullWidth
                  startIcon={<ArrowBackIcon />}
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </BackButton>
              </Box>
            </SuccessCard>
          </CardContent>
        </StyledCard>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ mb: 2 }}>
            <BackButton
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToLogin}
            >
              Back to Login
            </BackButton>
          </Box>

          <LogoBox>
            <Typography className="logo-text">worksy</Typography>
            <Typography className="logo-sub">Payroll</Typography>
          </LogoBox>

          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              fontWeight: 600,
              color: '#1f2937',
              mb: 1,
              fontSize: isMobile ? '1.5rem' : '2rem'
            }}
          >
            Forgot Password?
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ color: '#6b7280', mb: 3, lineHeight: 1.6 }}
          >
            No worries! Enter your email address and we'll send you a link to reset your password.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledTextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your work email address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
            />

            <ResetButton
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Sending Email...' : 'Send Reset Link'}
            </ResetButton>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Remember your password?{' '}
              <Button
                variant="text"
                onClick={handleBackToLogin}
                sx={{
                  color: '#667eea',
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
} 