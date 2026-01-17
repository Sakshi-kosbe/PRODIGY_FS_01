import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '@/components/auth/AuthCard';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { useAuth } from '@/contexts/AuthContext';

const SignUp: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <AuthCard
      title="Create your account"
      description="Get started with a free account"
    >
      <SignUpForm />
    </AuthCard>
  );
};

export default SignUp;
