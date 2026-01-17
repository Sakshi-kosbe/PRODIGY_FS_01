import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Loader2, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations/auth';

export const ForgotPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { resetPasswordForEmail } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await resetPasswordForEmail(data.email);
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Request failed',
          description: 'Unable to send reset email. Please try again.',
        });
        return;
      }

      setIsEmailSent(true);
      toast({
        title: 'Email sent!',
        description: 'Check your inbox for the password reset link.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Check your email</h3>
          <p className="text-muted-foreground">
            We've sent you a password reset link. Click the link in your email to reset your password.
          </p>
        </div>
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-muted-foreground text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="pl-10 h-12 bg-background border-input"
            {...register('email')}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 gradient-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Reset Link'
        )}
      </Button>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    </form>
  );
};
