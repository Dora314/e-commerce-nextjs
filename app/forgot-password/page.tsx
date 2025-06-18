'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10" />
        
        <div className="relative w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Check Your Email</h1>
            <p className="text-slate-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-slate-500 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Back to Sign In
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                Try Different Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10" />
      
      <div className="relative w-full max-w-md">
        {/* Back to Login */}
        <Link href="/login" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Forgot Password?</h1>
            <p className="text-slate-600">
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="pl-10"
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                'Sending...'
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Reset Link
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Remember your password?{' '}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}