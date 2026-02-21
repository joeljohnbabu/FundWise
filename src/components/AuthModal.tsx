import { useState } from "react";
import { X, Mail, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

type AuthStep = 'welcome' | 'signup' | 'signin';

export function AuthModal({ open, onClose, onSignIn }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!open) return null;

  const handleContinueAsGuest = () => {
    onClose();
  };

  const handleCreateAccount = () => {
    setStep('signup');
  };

  const handleSignIn = () => {
    setStep('signin');
  };

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`);
    // Simulate sign in
    setTimeout(() => {
      onSignIn();
      onClose();
    }, 500);
  };

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up with email:', { name, email, password });
    // Simulate sign up
    setTimeout(() => {
      onSignIn();
      onClose();
    }, 500);
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in with email:', { email, password });
    // Simulate sign in
    setTimeout(() => {
      onSignIn();
      onClose();
    }, 500);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setStep('welcome');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Welcome Step */}
        {step === 'welcome' && (
          <div className="p-8">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-[#F9FAFB] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#00D9A3] rounded-2xl mx-auto mb-4"></div>
              <h2 className="mb-2">Welcome to FundWise</h2>
              <p className="text-[#6B7280]">
                Invest in premium real estate and grow your wealth
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleCreateAccount}
                className="w-full h-14 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-2xl font-medium"
              >
                Create an account
              </Button>

              <Button
                onClick={handleContinueAsGuest}
                variant="outline"
                className="w-full h-14 border-2 border-[#E5E7EB] hover:border-[#00D9A3] hover:bg-white rounded-2xl font-medium"
              >
                Continue as guest
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#6B7280]">
                Already have an account?{" "}
                <button
                  onClick={handleSignIn}
                  className="text-[#00D9A3] font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Sign Up Step */}
        {step === 'signup' && (
          <div className="p-8">
            <button
              onClick={resetForm}
              className="absolute top-6 left-6 p-2 hover:bg-[#F9FAFB] rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
            </button>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-[#F9FAFB] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>

            <div className="text-center mb-8 mt-4">
              <h2 className="mb-2">Create your account</h2>
              <p className="text-[#6B7280]">
                Join thousands of investors on FundWise
              </p>
            </div>

            {/* Social Sign In Options */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialSignIn('Google')}
                className="w-full h-12 border-2 border-[#E5E7EB] hover:border-[#00D9A3] rounded-2xl font-medium flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialSignIn('Apple')}
                className="w-full h-12 bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-2xl font-medium flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#6B7280]">Or continue with email</span>
              </div>
            </div>

            {/* Email Sign Up Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-[#E5E7EB] focus:border-[#00D9A3]"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-[#E5E7EB] focus:border-[#00D9A3]"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-[#E5E7EB] focus:border-[#00D9A3]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-2xl font-medium"
              >
                Create account
              </Button>
            </form>

            <p className="text-xs text-center text-[#6B7280] mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {/* Sign In Step */}
        {step === 'signin' && (
          <div className="p-8">
            <button
              onClick={resetForm}
              className="absolute top-6 left-6 p-2 hover:bg-[#F9FAFB] rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
            </button>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-[#F9FAFB] rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>

            <div className="text-center mb-8 mt-4">
              <h2 className="mb-2">Welcome back</h2>
              <p className="text-[#6B7280]">
                Sign in to your FundWise account
              </p>
            </div>

            {/* Social Sign In Options */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialSignIn('Google')}
                className="w-full h-12 border-2 border-[#E5E7EB] hover:border-[#00D9A3] rounded-2xl font-medium flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleSocialSignIn('Apple')}
                className="w-full h-12 bg-[#000000] hover:bg-[#1a1a1a] text-white rounded-2xl font-medium flex items-center justify-center gap-3 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#6B7280]">Or continue with email</span>
              </div>
            </div>

            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-[#E5E7EB] focus:border-[#00D9A3]"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-2xl border-2 border-[#E5E7EB] focus:border-[#00D9A3]"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <input type="checkbox" className="rounded border-[#E5E7EB]" />
                  Remember me
                </label>
                <button type="button" className="text-sm text-[#00D9A3] hover:underline">
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-2xl font-medium"
              >
                Sign in
              </Button>
            </form>

            <p className="text-sm text-center text-[#6B7280] mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => setStep('signup')}
                className="text-[#00D9A3] font-medium hover:underline"
              >
                Create account
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
