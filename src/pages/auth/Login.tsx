import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your account to continue"
    >
      <LoginForm />
    </AuthCard>
  );
};

export default Login;
