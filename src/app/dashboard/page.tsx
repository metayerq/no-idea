'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    lastLogin: new Date().toISOString(),
    memberSince: new Date().toISOString(),
  });

  useEffect(() => {
    // Simulate fetching some stats
    setStats({
      totalUsers: Math.floor(Math.random() * 1000) + 100,
      lastLogin: new Date().toISOString(),
      memberSince: new Date().toISOString(),
    });
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need to be signed in to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {session.user?.name || session.user?.email}!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Total Platform Users</h3>
              <div className="h-4 w-4">👥</div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Last Login</h3>
              <div className="h-4 w-4">🕒</div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold">Now</div>
              <p className="text-xs text-gray-500">
                {new Date(stats.lastLogin).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium">Member Since</h3>
              <div className="h-4 w-4">📅</div>
            </div>
            <div className="pt-0">
              <div className="text-2xl font-bold">
                {new Date(stats.memberSince).toLocaleDateString()}
              </div>
              <p className="text-xs text-gray-500">Account creation date</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Profile */}
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            <div className="flex flex-col space-y-1.5 pb-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                👤 Profile Information
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your account details and settings
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{session.user?.name || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{session.user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Role:</span>
                  <span className="capitalize">{session.user?.role || 'user'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">User ID:</span>
                  <span className="font-mono text-sm">{session.user?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email Verified:</span>
                  <span>{session.user?.emailVerified ? '✅ Yes' : '❌ No'}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50">
            <div className="flex flex-col space-y-1.5 pb-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                ⚡ Quick Actions
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Common tasks and platform features
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <a href="/auth/signin">🔌 Test Authentication</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/api/users" target="_blank">📊 View API Documentation</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => {
                navigator.clipboard.writeText(window.location.origin);
                alert('Platform URL copied to clipboard!');
              }}>
                🔗 Copy Platform URL
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="https://github.com/metayerq/no-idea" target="_blank">
                  📁 View GitHub Repository
                </a>
              </Button>
              <div className="pt-4 border-t">
                <Button variant="destructive" onClick={logout} className="w-full">
                  🚪 Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Platform Features */}
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 lg:col-span-2">
            <div className="flex flex-col space-y-1.5 pb-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                🏗️ Platform Architecture
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Overview of what we&apos;ve built together
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-semibold">Authentication</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">NextAuth.js</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-semibold">Database</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Neon + Drizzle</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-semibold">Validation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Zod schemas</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl mb-2">✅</div>
                <h4 className="font-semibold">UI/UX</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tailwind CSS</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 