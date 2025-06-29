import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = [
    { username: 'john.doe', role: 'Requestor', department: 'Engineering' },
    { username: 'jane.smith', role: 'Approver', department: 'Engineering' },
    { username: 'mike.wilson', role: 'Accounts', department: 'Finance' },
    { username: 'admin', role: 'Admin', department: 'IT' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 mb-6">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ExpenseFlow
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline your expense management with our powerful, role-based platform designed for modern teams.
            </p>
            
            {/* Demo Users */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Users</h3>
              <div className="space-y-3">
                {demoUsers.map((user) => (
                  <div key={user.username} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{user.username}</p>
                      <p className="text-sm text-gray-600">{user.role} • {user.department}</p>
                    </div>
                    <button
                      onClick={() => setUsername(user.username)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Any password works for demo purposes
              </p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                <p className="text-gray-600">Access your expense management portal</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;