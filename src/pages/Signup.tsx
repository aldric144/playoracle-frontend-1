import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password, fullName);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
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
            Create your account
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
              <label className="text-sm font-medium text-zinc-300">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-green-500 focus:ring-green-500"
              />
              <label htmlFor="terms" className="text-xs text-zinc-400">
                I agree to PlayOracle™{' '}
                <Link to="/terms-of-use" className="text-green-400 hover:text-green-300 underline">
                  Terms of Use
                </Link>
                {' '}and{' '}
                <Link to="/privacy-policy" className="text-green-400 hover:text-green-300 underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
              disabled={loading || !agreedToTerms}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link to="/login" className="text-green-400 hover:text-green-300">
              Sign in
            </Link>
          </div>
          <div className="mt-4 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
            <p className="text-xs text-zinc-400 text-center">
              PlayOracle is an analytical and learning tool, not a gambling platform. 
              Predictions are educational insights based on public data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
