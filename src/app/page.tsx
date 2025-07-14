import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Welcome to Payroll System
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
        Manage your payroll efficiently and securely
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          href="/login" 
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontWeight: '500'
          }}
        >
          Login
        </Link>
        <Link 
          href="/signup" 
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#007bff',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            border: '1px solid #007bff',
            fontWeight: '500'
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
