import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations/auth';

export const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await updatePassword(data.password);
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Reset failed',
          description: error.message || 'Unable to reset password. Please try again.',
        });
        return;
      }

      setIsSuccess(true);
      toast({
        title: 'Password updated!',
        description: 'Your password has been successfully reset.',
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
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

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Password reset successful!</h3>
          <p className="text-muted-foreground">
            Redirecting you to the dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-muted-foreground text-center">
        Enter your new password below.
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground font-medium">
          New Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            className="pl-10 pr-10 h-12 bg-background border-input"
            {...register('password')}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-foreground font-medium">
          Confirm New Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            className="pl-10 pr-10 h-12 bg-background border-input"
            {...register('confirmPassword')}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>Password must:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Be at least 8 characters long</li>
          <li>Contain at least one uppercase letter</li>
          <li>Contain at least one lowercase letter</li>
          <li>Contain at least one number</li>
        </ul>
      </div>

      <Button
        type="submit"
        className="w-full h-12 gradient-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Resetting...
          </>
        ) : (
          'Reset Password'
        )}
      </Button>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-primary font-medium hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </form>
  );
};
