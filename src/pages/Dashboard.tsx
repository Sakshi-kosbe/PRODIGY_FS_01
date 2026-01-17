import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Shield, User, Crown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { user, signOut, roles, hasRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen gradient-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">SecureAuth</span>
          </div>
          
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome to your Dashboard
            </h1>
            <p className="text-muted-foreground">
              You've successfully authenticated. Here's your account information.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Info Card */}
            <Card className="border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5 text-primary" />
                  Account Details
                </CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium text-foreground">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-mono text-sm text-foreground truncate">{user?.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Roles</p>
                  <div className="flex gap-2 flex-wrap">
                    {roles.map((role) => (
                      <Badge
                        key={role}
                        variant={role === 'admin' ? 'default' : 'secondary'}
                        className={role === 'admin' ? 'gradient-primary border-0' : ''}
                      >
                        {role === 'admin' && <Crown className="w-3 h-3 mr-1" />}
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Info Card */}
            <Card className="border-0 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  Session Information
                </CardTitle>
                <CardDescription>Your current session details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Account Created</p>
                  <p className="font-medium text-foreground">
                    {user?.created_at ? formatDate(user.created_at) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Sign In</p>
                  <p className="font-medium text-foreground">
                    {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Verified</p>
                  <Badge variant={user?.email_confirmed_at ? 'default' : 'secondary'}>
                    {user?.email_confirmed_at ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Section */}
          {hasRole('admin') && (
            <Card className="border-0 shadow-lg border-l-4 border-l-primary animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Admin Panel
                </CardTitle>
                <CardDescription>
                  You have administrator privileges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As an admin, you have access to additional features and can manage other users.
                  This section would typically contain admin-specific controls and analytics.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Security Notice */}
          <Card className="border-0 shadow-lg bg-secondary/50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Your account is secure</h3>
                  <p className="text-sm text-muted-foreground">
                    Your session is protected with industry-standard JWT authentication. 
                    Passwords are securely hashed using bcrypt, and all data transmission is encrypted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
