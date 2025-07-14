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
  IconButton,
  Divider,
  Alert,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Google as GoogleIcon,
  LinkedIn as LinkedInIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon
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

const SocialButton = styled(Button)(({ theme }) => ({
  minHeight: 48,
  borderRadius: theme.spacing(1),
  border: '2px solid #e5e7eb',
  color: '#374151',
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#667eea',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.15)'
  },
  transition: 'all 0.2s ease-in-out'
}));

const LoginButton = styled(Button)(({ theme }) => ({
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

interface ModernLoginFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void> | void;
  onSocialAuth?: (provider: 'google' | 'linkedin') => void;
  successMessage?: string;
}

const ModernLoginForm: React.FC<ModernLoginFormProps> = ({ onSubmit, onSocialAuth, successMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onSubmit({ email, password });
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialClick = (provider: 'google' | 'linkedin') => {
    if (onSocialAuth) {
      onSocialAuth(provider);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <StyledContainer>
      <StyledCard elevation={0}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Success Message */}
          {successMessage && (
            <Alert 
              severity="success" 
              sx={{ mb: 3, borderRadius: 2 }}
            >
              {successMessage}
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

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
            Welcome back
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ color: '#6b7280', mb: 3 }}
          >
            Sign in to access your payroll dashboard
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <SocialButton
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialClick('google')}
            >
              Google
            </SocialButton>
            <SocialButton
              fullWidth
              variant="outlined"
              startIcon={<LinkedInIcon />}
              onClick={() => handleSocialClick('linkedin')}
            >
              LinkedIn
            </SocialButton>
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Or continue with email
            </Typography>
          </Divider>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledTextField
              fullWidth
              label="Work Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#6b7280' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <LoginButton
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </LoginButton>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="text"
              onClick={handleForgotPassword}
              sx={{
                color: '#667eea',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.04)'
                }
              }}
            >
              Forgot your password?
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Don't have an account?{' '}
              <Button
                variant="text"
                onClick={() => router.push('/signup')}
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
                Sign up
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
};

export default ModernLoginForm; 