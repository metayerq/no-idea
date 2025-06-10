'use client';

import { useSession } from 'next-auth/react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { logout } = useAuth();

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
          <Button className="mt-4" asChild>
            <a href="/auth/signin">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🎉 Welcome to Your Dashboard!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Hello {session.user?.name || session.user?.email}! Your platform is now live and working.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✅ Authentication</h3>
              <p className="text-green-600">NextAuth.js working perfectly</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">✅ Database</h3>
              <p className="text-blue-600">Neon + Drizzle connected</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">✅ Validation</h3>
              <p className="text-purple-600">Zod schemas protecting APIs</p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">✅ Deployment</h3>
              <p className="text-yellow-600">Vercel hosting live</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="/api/users" target="_blank">📊 Test API</a>
              </Button>
              
              <Button variant="outline" asChild>
                <a href="https://github.com/metayerq/no-idea" target="_blank">📁 GitHub Repo</a>
              </Button>
              
              <Button variant="outline" onClick={() => {
                navigator.clipboard.writeText(window.location.origin);
                alert('Platform URL copied!');
              }}>
                🔗 Copy URL
              </Button>
              
              <Button variant="destructive" onClick={logout}>
                🚪 Sign Out
              </Button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">🎯 What We Built Together:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Full Next.js 15 app with TypeScript</li>
              <li>• Neon PostgreSQL database with migrations</li>
              <li>• NextAuth.js authentication (credentials + Google)</li>
              <li>• Zod validation for secure APIs</li>
              <li>• Tailwind CSS for modern UI</li>
              <li>• Deployed to Vercel with GitHub integration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 