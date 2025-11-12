import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { PasswordInput } from '../components/auth/PasswordInput';
import { ForgotPasswordModal } from '../components/auth/ForgotPasswordModal';
import { RegisterModal } from '../components/auth/RegisterModal';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-green-400">
            PlayOracle
          </CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <PasswordInput
              id="login-password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold min-h-[44px] rounded-xl"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm font-semibold text-white/80 hover:text-emerald-400 hover:underline decoration-emerald-400 underline-offset-4 transition-all duration-150"
            >
              Forgot your password?
            </button>
          </div>

          {/* Create Account Link */}
          <div className="mt-3 text-center text-sm text-zinc-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setShowRegister(true)}
              className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline decoration-emerald-300 underline-offset-4 transition-all duration-150"
            >
              Create one
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ForgotPasswordModal
        open={showForgotPassword}
        onOpenChange={setShowForgotPassword}
      />
      <RegisterModal
        open={showRegister}
        onOpenChange={setShowRegister}
      />
    </div>
  );
}
