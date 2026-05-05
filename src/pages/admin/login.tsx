import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import Head from 'next/head';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid username or password');
        setPassword('');
      } else if (result?.ok) {
        router.push('/admin/submissions');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Regent Global</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-neutral-900">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Regent Global Submissions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-neutral-900"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
                disabled={isLoading}
                placeholder="Enter your username"
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:bg-neutral-100 disabled:text-neutral-500"
                autoComplete="username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-neutral-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                disabled={isLoading}
                placeholder="Enter your password"
                className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:bg-neutral-100 disabled:text-neutral-500"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-blue px-6 py-2.5 font-semibold text-white transition-all hover:bg-red hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 border-t border-neutral-200 pt-4 text-center text-xs text-neutral-500">
            <p>Authorized personnel only</p>
          </div>
        </div>
      </div>
    </>
  );
}
