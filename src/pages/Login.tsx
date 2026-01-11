import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Building2, User } from "lucide-react";

export default function Login() {
  const [location, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect based on active tab (simulated)
      // In a real app, we'd check the response
      setLocation("/businesses"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Simple Header */}
      <header className="py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-2xl text-emerald-900">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              ReportHere
            </a>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Welcome back</h1>
            <p className="text-stone-600">Log in to your account to continue</p>
          </div>

          <Tabs defaultValue="consumer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="consumer" className="flex items-center gap-2">
                <User className="w-4 h-4" /> Consumer
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Business
              </TabsTrigger>
            </TabsList>

            <TabsContent value="consumer">
              <Card>
                <CardHeader>
                  <CardTitle>Consumer Login</CardTitle>
                  <CardDescription>
                    Access your reviews and track your reports.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-consumer">Email</Label>
                      <Input id="email-consumer" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-consumer">Password</Label>
                        <Link href="/forgot-password">
                          <a className="text-sm text-emerald-600 hover:underline">Forgot password?</a>
                        </Link>
                      </div>
                      <Input id="password-consumer" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                    <div className="text-center text-sm text-stone-600">
                      Don't have an account?{" "}
                      <Link href="/signup">
                        <a className="text-emerald-600 hover:underline font-medium">Sign up</a>
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>Business Login</CardTitle>
                  <CardDescription>
                    Manage your company profile and respond to reviews.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-business">Work Email</Label>
                      <Input id="email-business" type="email" placeholder="name@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-business">Password</Label>
                        <Link href="/forgot-password">
                          <a className="text-sm text-emerald-600 hover:underline">Forgot password?</a>
                        </Link>
                      </div>
                      <Input id="password-business" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Log in to Dashboard"}
                    </Button>
                    <div className="text-center text-sm text-stone-600">
                      Need to claim your business?{" "}
                      <Link href="/signup?type=business">
                        <a className="text-emerald-600 hover:underline font-medium">Create business account</a>
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
