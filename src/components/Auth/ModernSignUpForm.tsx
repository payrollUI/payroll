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
  useMediaQuery,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Google as GoogleIcon,
  LinkedIn as LinkedInIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
  Business as BusinessIcon
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
  maxWidth: 450,
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

const SignUpButton = styled(Button)(({ theme }) => ({
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

interface ModernSignUpFormProps {
  onSubmit: (data: { email: string; password: string; name: string; company: string }) => Promise<void> | void;
  onSocialAuth?: (provider: 'google' | 'linkedin') => void;
}

const ModernSignUpForm: React.FC<ModernSignUpFormProps> = ({ onSubmit, onSocialAuth }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      await onSubmit({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        company: formData.company
      });
    } catch (error) {
      setError('Sign up failed. Please try again.');
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialClick = (provider: 'google' | 'linkedin') => {
    if (onSocialAuth) {
      onSocialAuth(provider);
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
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
            Create Account
          </Typography>

          <Typography
            variant="body1"
            align="center"
            sx={{ color: '#6b7280', mb: 3 }}
          >
            Get started with your payroll management
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {error}
            </Alert>
          )}

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
              Or sign up with email
            </Typography>
          </Divider>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledTextField
                fullWidth
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
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
                label="Company"
                type="text"
                value={formData.company}
                onChange={handleInputChange('company')}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <StyledTextField
              fullWidth
              label="Work Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />

            <StyledTextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
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

            <StyledTextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: '#6b7280' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  sx={{
                    color: '#667eea',
                    '&.Mui-checked': {
                      color: '#667eea',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  I agree to the{' '}
                  <Button
                    variant="text"
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
                    Terms of Service
                  </Button>
                  {' '}and{' '}
                  <Button
                    variant="text"
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
                    Privacy Policy
                  </Button>
                </Typography>
              }
            />

            <SignUpButton
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </SignUpButton>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Already have an account?{' '}
              <Button
                variant="text"
                onClick={() => router.push('/login')}
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
};

export default ModernSignUpForm; 