import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Search, ShieldCheck, Users, MessageCircle, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-hug-gradient font-body text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <span className="text-xl font-heading font-bold text-primary">Report Here</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">For You</a>
            <a href="#" className="hover:text-primary transition-colors">Rankings</a>
            <a href="#" className="hover:text-primary transition-colors">Discounts</a>
            <a href="#" className="hover:text-primary transition-colors">For Companies</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
              Log In
            </Button>
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 shadow-sm mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Your safe space for consumer rights</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              We're here to <span className="text-primary relative inline-block">
                listen
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span> and help you resolve it.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Connect with brands that care. Share your experience in a safe, supportive environment and find the solution you deserve.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl relative group animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center bg-white rounded-full shadow-xl shadow-primary/5 border border-border p-2">
                <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                <Input 
                  className="border-0 shadow-none focus-visible:ring-0 bg-transparent text-lg h-12 placeholder:text-muted-foreground/60"
                  placeholder="What company are you looking for?"
                />
                <Button size="lg" className="rounded-full px-8 font-bold">
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
              {[
                { icon: MessageCircle, title: "File a Report", desc: "Tell us what happened", color: "text-primary", bg: "bg-primary/10" },
                { icon: Search, title: "Compare Brands", desc: "See who you can trust", color: "text-secondary-foreground", bg: "bg-secondary/20" },
                { icon: ShieldCheck, title: "Resolve Issues", desc: "Get help directly", color: "text-accent-foreground", bg: "bg-accent/30" },
              ].map((action, i) => (
                <Card key={i} className="border-0 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 bg-white/60 backdrop-blur-sm group cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`h-14 w-14 rounded-2xl ${action.bg} ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-heading font-bold mb-2">{action.title}</h3>
                    <p className="text-muted-foreground">{action.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Stats Section */}
        <section className="py-20 bg-white/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Resolved Cases", value: "2.5M+", icon: ShieldCheck },
                { label: "Active Users", value: "10M+", icon: Users },
                { label: "Trusted Brands", value: "50k+", icon: Star },
                { label: "Daily Solutions", value: "15k+", icon: Heart },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <stat.icon className="h-6 w-6 text-primary/60 mb-2" />
                  <span className="text-3xl md:text-4xl font-heading font-extrabold text-foreground">{stat.value}</span>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-24">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">Browse by Category</h2>
                <p className="text-muted-foreground">Find the best companies in every sector</p>
              </div>
              <Button variant="outline" className="rounded-full hidden md:flex gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["Online Retail", "Finance", "Travel", "Telecom", "Health", "Education"].map((cat, i) => (
                <a key={i} href="#" className="group block">
                  <div className="aspect-square rounded-3xl bg-white border border-border/50 shadow-sm flex flex-col items-center justify-center p-4 transition-all duration-300 group-hover:shadow-md group-hover:border-primary/30 group-hover:-translate-y-1">
                    <div className="h-12 w-12 rounded-full bg-muted/50 mb-4 group-hover:bg-primary/10 transition-colors" />
                    <span className="font-medium text-center group-hover:text-primary transition-colors">{cat}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-primary px-6 py-16 md:px-16 md:py-20 text-center md:text-left">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                    Ready to find a solution?
                  </h2>
                  <p className="text-primary-foreground/90 text-lg">
                    Join millions of consumers who have found their voice and resolved their issues through our platform.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg font-bold shadow-xl">
                    Start a Report
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-bold border-white/30 text-white hover:bg-white/10 hover:text-white">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border/60 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <Heart className="h-5 w-5 fill-current" />
                </div>
                <span className="text-xl font-heading font-bold text-foreground">Report Here</span>
              </div>
              <p className="text-muted-foreground max-w-xs mb-6">
                Building trust between consumers and companies through transparency and dialogue.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                    <div className="h-5 w-5 bg-current opacity-20 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Consumers</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">File a Complaint</a></li>
                <li><a href="#" className="hover:text-primary">My Reports</a></li>
                <li><a href="#" className="hover:text-primary">Rankings</a></li>
                <li><a href="#" className="hover:text-primary">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Companies</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Company Login</a></li>
                <li><a href="#" className="hover:text-primary">Register Company</a></li>
                <li><a href="#" className="hover:text-primary">Success Stories</a></li>
                <li><a href="#" className="hover:text-primary">Plans</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">About</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Our Story</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Press</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 Report Here. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
