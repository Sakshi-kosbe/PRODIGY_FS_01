import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '@/components/auth/AuthCard';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // When redirected from the reset email, Supabase automatically
    // exchanges the token and creates a session
    if (!loading) {
      if (session) {
        setIsValidSession(true);
      } else {
        // No session means the token was invalid or expired
        navigate('/auth/forgot-password');
      }
    }
  }, [session, loading, navigate]);

  if (loading || !isValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-background">
        <div className="flex items-center gap-3 text-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Verifying reset link...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Choose a new secure password"
    >
      <ResetPasswordForm />
    </AuthCard>
  );
};

export default ResetPassword;
