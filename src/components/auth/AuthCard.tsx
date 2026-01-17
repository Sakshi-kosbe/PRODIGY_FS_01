import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({ title, description, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-background p-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">Trustify</span>
          </div>
        </div>

        <Card className="border-0 shadow-xl bg-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
};
