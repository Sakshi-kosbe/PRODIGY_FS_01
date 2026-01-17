import React from 'react';
import { AuthCard } from '@/components/auth/AuthCard';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  return (
    <AuthCard
      title="Forgot password?"
      description="No worries, we'll send you reset instructions"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
};

export default ForgotPassword;
