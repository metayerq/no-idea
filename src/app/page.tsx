import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Welcome to{' '}
              <span className="text-blue-600 dark:text-blue-400">No Idea</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              A modern full-stack platform built with Next.js, featuring authentication, 
              database management, and everything you need to get started quickly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/signup">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg">
                  View Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built with Modern Tech Stack
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Everything you need for a production-ready application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🔐 Authentication
                </CardTitle>
                <CardDescription>
                  Secure user authentication with NextAuth.js, supporting multiple providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Email/Password signup</li>
                  <li>• Google OAuth integration</li>
                  <li>• Session management</li>
                  <li>• Protected routes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🗄️ Database
                </CardTitle>
                <CardDescription>
                  Neon PostgreSQL with Drizzle ORM for type-safe database operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Migration system</li>
                  <li>• Type-safe queries</li>
                  <li>• Automatic schema sync</li>
                  <li>• Database studio</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  ✅ Validation
                </CardTitle>
                <CardDescription>
                  Robust input validation with Zod for secure API endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Runtime type checking</li>
                  <li>• Input sanitization</li>
                  <li>• Error handling</li>
                  <li>• Type safety</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🎨 Modern UI
                </CardTitle>
                <CardDescription>
                  Beautiful, responsive interface built with Tailwind CSS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Responsive design</li>
                  <li>• Dark mode support</li>
                  <li>• Component library</li>
                  <li>• Accessibility first</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🚀 Deployment
                </CardTitle>
                <CardDescription>
                  Ready for production deployment with Vercel and GitHub integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• GitHub integration</li>
                  <li>• Auto deployments</li>
                  <li>• Environment variables</li>
                  <li>• SSL certificates</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🔧 Developer Tools
                </CardTitle>
                <CardDescription>
                  Complete development experience with TypeScript and modern tooling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• TypeScript support</li>
                  <li>• ESLint & Prettier</li>
                  <li>• Hot reload</li>
                  <li>• API routes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Create your account and start building with our modern platform.
            </p>
            <div className="mt-8">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
