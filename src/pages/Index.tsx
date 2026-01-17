import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Users, Zap, ChevronRight, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'Industry-standard bcrypt password hashing and JWT token management.',
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Flexible user and admin roles with granular permission controls.',
    },
    {
      icon: Zap,
      title: 'Production Ready',
      description: 'Built for scale with proper session handling and token refresh.',
    },
  ];

  const securityFeatures = [
    'Password hashing with bcrypt',
    'JWT-based session tokens',
    'Protected route middleware',
    'Input validation with Zod',
    'Secure email handling',
    'Role-based access control',
  ];

  return (
    <div className="min-h-screen gradient-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Trustify</span>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <Button asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">Sign In</Link>
                </Button>
                <Button asChild className="gradient-primary border-0">
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Shield className="w-4 h-4" />
            Production-Ready Authentication
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Secure User Authentication
            <span className="block text-primary">Built Right</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A complete authentication system with registration, login, protected routes, 
            and role-based access control. Ready for real-world usage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" asChild className="gradient-primary border-0 h-14 px-8 text-lg shadow-lg">
              <Link to="/auth/signup">
                Create Free Account
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg">
              <Link to="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl p-8 shadow-lg border-0 animate-slide-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Security First Approach
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with best practices for secure authentication and data protection.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
              >
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create your account in seconds and experience secure authentication.
          </p>
          <Button size="lg" asChild className="gradient-primary border-0 h-14 px-10 text-lg shadow-lg">
            <Link to="/auth/signup">
              Create Your Account
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Trustify — Production-ready authentication system
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
