import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, ShieldCheck, Users, MessageCircle, ArrowRight, Star, Send } from "lucide-react";

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
            <a href="#" className="hover:text-primary transition-colors">Browse reports</a>
            <a href="#" className="hover:text-primary transition-colors">For companies</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 px-6">
              Sign in
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Merged Layout */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-vivid.jpg" 
              alt="Happy person in a park" 
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay - White/Cream to Transparent to blend image */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-2/3" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-32 bottom-0" />
          </div>

          <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-20">
            <div className="max-w-xl animate-in fade-in slide-in-from-left-8 duration-700">
              <h1 className="text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground mb-6">
                Had a bad experience?
              </h1>
              <p className="text-xl text-muted-foreground mb-10">
                Tell your story. We'll help you get it heard.
              </p>

              {/* Large Input Box - GPT Layout Style */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-2 shadow-xl shadow-primary/5 border border-white/50">
                <div className="relative">
                  <textarea 
                    className="w-full min-h-[160px] bg-transparent border-0 resize-none p-6 text-lg placeholder:text-muted-foreground/60 focus:ring-0 focus:outline-none"
                    placeholder="What happened? Start wherever you want."
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                    You decide what happens next.
                  </div>
                </div>
                <div className="p-2">
                  <Button size="lg" className="w-full rounded-2xl h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Continue
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Free for consumers • Companies can respond
              </div>
            </div>
            
            {/* Right side is open to show the vivid image */}
            <div className="hidden md:block" />
          </div>
        </section>

        {/* Recent Reports Section - GPT Layout Style */}
        <section className="py-20 bg-white/50 relative z-20 -mt-20 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
              <h2 className="text-3xl font-heading font-bold">Recent reports</h2>
              
              {/* Search Bar */}
              <div className="flex w-full md:w-auto max-w-md bg-white rounded-full shadow-sm border border-border p-1 pl-4">
                <Search className="h-5 w-5 text-muted-foreground self-center mr-2" />
                <input 
                  className="flex-1 bg-transparent border-0 focus:outline-none text-sm"
                  placeholder="Search company name..."
                />
                <Button className="rounded-full px-6">Search</Button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              <Button variant="secondary" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-0">Trending</Button>
              <Button variant="ghost" className="rounded-full hover:bg-muted">Most recent</Button>
              <Button variant="ghost" className="rounded-full hover:bg-muted">Near you</Button>
            </div>

            {/* Reports Table/List */}
            <div className="bg-white rounded-3xl shadow-sm border border-border/50 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/30 text-sm font-medium text-muted-foreground border-b border-border/50">
                <div className="col-span-3 pl-4">Company</div>
                <div className="col-span-5">Report</div>
                <div className="col-span-2 text-center">Replies</div>
                <div className="col-span-2 text-center">Status</div>
              </div>

              {[
                { company: "Verizon", logo: "V", color: "bg-black text-white", title: "Charged for a service I didn't use", replies: 3, status: "Pending", statusColor: "bg-yellow-100 text-yellow-700" },
                { company: "Delta Airlines", logo: "D", color: "bg-blue-900 text-white", title: "Cancelled my flight, no rebooking", replies: 5, status: "Response", statusColor: "bg-green-100 text-green-700" },
                { company: "Santander", logo: "S", color: "bg-red-600 text-white", title: "Overcharged interest on my loan", replies: 2, status: "No reply yet", statusColor: "bg-gray-100 text-gray-600" },
                { company: "DoorDash", logo: "D", color: "bg-red-500 text-white", title: "Driver ate my food, didn't refund", replies: 7, status: "Response", statusColor: "bg-green-100 text-green-700" },
                { company: "Comcast", logo: "C", color: "bg-blue-600 text-white", title: "Internet down for 3 days straight", replies: 12, status: "Resolved", statusColor: "bg-primary/20 text-primary" },
              ].map((report, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20 transition-colors border-b border-border/40 last:border-0">
                  <div className="col-span-3 flex items-center gap-3 pl-4">
                    <div className={`h-8 w-8 rounded-lg ${report.color} flex items-center justify-center font-bold text-xs`}>
                      {report.logo}
                    </div>
                    <span className="font-bold text-sm">{report.company}</span>
                  </div>
                  <div className="col-span-5 text-sm truncate pr-4">
                    {report.title}
                  </div>
                  <div className="col-span-2 text-center text-sm text-muted-foreground">
                    {report.replies}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <Badge variant="outline" className={`rounded-full border-0 px-3 py-1 font-normal ${report.statusColor}`}>
                      {report.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="secondary" size="lg" className="rounded-full px-8 bg-primary/80 text-primary-foreground hover:bg-primary">
                Browse all reports
              </Button>
            </div>
          </div>
        </section>

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
              </div>
              
              <div>
                <h4 className="font-bold mb-6">Consumers</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">File a Complaint</a></li>
                  <li><a href="#" className="hover:text-primary">My Reports</a></li>
                  <li><a href="#" className="hover:text-primary">Rankings</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6">Companies</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Company Login</a></li>
                  <li><a href="#" className="hover:text-primary">Register Company</a></li>
                  <li><a href="#" className="hover:text-primary">Success Stories</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6">About</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary">Our Story</a></li>
                  <li><a href="#" className="hover:text-primary">Careers</a></li>
                  <li><a href="#" className="hover:text-primary">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© 2024 Report Here. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground">Privacy Policy</a>
                <a href="#" className="hover:text-foreground">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
