import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Building2, User } from "lucide-react";

export default function Signup() {
  const [location, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Check URL params for default tab (simple implementation)
  const searchParams = new URLSearchParams(window.location.search);
  const defaultTab = searchParams.get("type") === "business" ? "business" : "consumer";

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard or home
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
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Create an account</h1>
            <p className="text-stone-600">Join our community to build better businesses</p>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
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
                  <CardTitle>Consumer Sign Up</CardTitle>
                  <CardDescription>
                    Share your experiences and help others.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="Jane" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-consumer">Email</Label>
                      <Input id="email-consumer" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-consumer">Password</Label>
                      <Input id="password-consumer" type="password" required />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                    <div className="text-center text-sm text-stone-600">
                      Already have an account?{" "}
                      <Link href="/login">
                        <a className="text-emerald-600 hover:underline font-medium">Log in</a>
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="business">
              <Card>
                <CardHeader>
                  <CardTitle>Business Sign Up</CardTitle>
                  <CardDescription>
                    Claim your company profile and manage your reputation.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" placeholder="Acme Inc." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-business">Work Email</Label>
                      <Input id="email-business" type="email" placeholder="name@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-business">Password</Label>
                      <Input id="password-business" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input id="website" placeholder="https://example.com" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Business Account"}
                    </Button>
                    <div className="text-center text-sm text-stone-600">
                      Already have an account?{" "}
                      <Link href="/login">
                        <a className="text-emerald-600 hover:underline font-medium">Log in</a>
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
