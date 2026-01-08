import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Search, ShieldCheck, Users, MessageCircle, ArrowRight, Star, Send, ShoppingBag, AlertTriangle, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-hug-gradient font-body text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/logo-shield-check.png" alt="Report Here Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-heading font-bold text-primary tracking-tight">ReportHere</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-base font-medium text-foreground/80">
            <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary py-1">Companies</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group relative">
              <span>Categories</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary py-1">Blog</a>
            <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary py-1">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 h-10 shadow-md">
              For Consumers
            </Button>
            <Button variant="outline" className="rounded-md border-primary text-primary hover:bg-primary/5 font-bold px-4 h-10 hidden sm:flex border-2">
              For Businesses
            </Button>
            <Button variant="ghost" className="rounded-md hover:bg-muted font-medium px-4 h-10">
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-official.png" 
              alt="Woman walking confidently in city" 
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay - White/Cream to Transparent to blend image */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent w-full md:w-2/3" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-32 bottom-0" />
          </div>

          <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-20">
            <div className="max-w-xl animate-in fade-in slide-in-from-left-8 duration-700">
              <h1 className="text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Check first. <br/>
                <span className="text-primary">Speak up</span> if something went wrong.
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
                Read real experiences before you buy — or share yours to help the next person choose better.
              </h2>
              <p className="text-sm text-muted-foreground/80 mb-10">
                Good or bad, every experience helps build a clearer picture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2">
                  <Search className="h-5 w-5" /> Search a company
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold bg-white/50 backdrop-blur-sm border-primary/20 text-primary hover:bg-primary/10 gap-2">
                  <MessageCircle className="h-5 w-5" /> Share an experience
                </Button>
              </div>
            </div>
            
            {/* Right side is open to show the vivid image */}
            <div className="hidden md:block" />
          </div>
        </section>

        {/* 2. WHY THIS EXISTS */}
        <section className="py-20 bg-white/50 relative z-20 -mt-20 rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: ShoppingBag, 
                  title: "Before you buy", 
                  desc: "See what really happened to others — not ads, not promises.",
                  bg: "bg-orange-100",
                  color: "text-orange-600"
                },
                { 
                  icon: AlertTriangle, 
                  title: "If something went wrong", 
                  desc: "Share your experience so others don't repeat the same mistake.",
                  bg: "bg-red-100",
                  color: "text-red-600"
                },
                { 
                  icon: MessageSquare, 
                  title: "When companies respond", 
                  desc: "Problems can be clarified, fixed, or publicly addressed.",
                  bg: "bg-blue-100",
                  color: "text-blue-600"
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-16 w-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-10 italic">
              This is how better decisions — and better businesses — are built.
            </p>
          </div>
        </section>

        {/* 3. MOST SEARCHED COMPANIES */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Most Searched Companies</h2>
              <p className="text-muted-foreground">What people are checking right now.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg shadow-primary/5 border border-border/50 overflow-hidden max-w-4xl mx-auto">
              <div className="grid grid-cols-12 gap-4 p-5 bg-muted/30 text-sm font-bold text-muted-foreground border-b border-border/50 uppercase tracking-wider">
                <div className="col-span-6 pl-4">Company</div>
                <div className="col-span-4">Category</div>
                <div className="col-span-2 text-center">Rank</div>
              </div>

              {[
                { name: "Amazon", logo: "A", color: "bg-black text-white", category: "Online Retail", rank: 1 },
                { name: "XYZ Electronics", logo: "X", color: "bg-blue-600 text-white", category: "Electronics", rank: 2 },
                { name: "ABC Movers", logo: "M", color: "bg-orange-500 text-white", category: "Moving Services", rank: 3 },
                { name: "Global Travel", logo: "G", color: "bg-sky-500 text-white", category: "Travel Agency", rank: 4 },
                { name: "FastNet", logo: "F", color: "bg-purple-600 text-white", category: "ISP", rank: 5 },
              ].map((company, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-muted/20 transition-colors border-b border-border/40 last:border-0 group cursor-pointer">
                  <div className="col-span-6 flex items-center gap-4 pl-4">
                    <div className={`h-10 w-10 rounded-xl ${company.color} flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform`}>
                      {company.logo}
                    </div>
                    <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{company.name}</span>
                  </div>
                  <div className="col-span-4 text-muted-foreground font-medium">
                    {company.category}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <span className="text-xl font-heading font-extrabold text-primary/40 group-hover:text-primary transition-colors">#{company.rank}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HOW REPORTHERE IS DIFFERENT */}
        <section className="py-24 bg-white/60">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
                  ReportHere is not about attacking companies. <br/>
                  <span className="text-primary">It's about transparency.</span>
                </h2>
                
                <div className="space-y-6">
                  {[
                    "Reports are written by real people",
                    "Companies can respond publicly",
                    "No paywall to share an experience",
                    "No manipulation of visibility"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                
                <p className="mt-8 text-xl font-bold text-foreground/80 border-l-4 border-primary pl-4">
                  Everyone sees the same information.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform rotate-6 scale-90" />
                <img 
                  src="/images/hero-vivid.jpg" 
                  alt="Transparency illustration" 
                  className="relative rounded-[2rem] shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMMUNITY LINE & CUT */}
        <section className="relative pt-32 pb-48 overflow-hidden">
          <div className="container text-center relative z-10 mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 max-w-3xl mx-auto leading-tight">
              Your experience doesn't end with you.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              When you share it, someone else makes a <span className="text-primary font-bold relative inline-block">
                better decision
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>.
            </p>
          </div>

          {/* Bottom Cut Image */}
          <div className="absolute bottom-0 left-0 right-0 h-96 w-full z-0">
             {/* Mask to create the "cut" effect at the top of the image */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
            <div className="absolute -top-12 left-0 right-0 h-24 bg-background rounded-[50%] blur-xl transform scale-x-150 z-10" />
            
            <img 
              src="/images/bottom-community-photo.jpg" 
              alt="Community gathering" 
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section className="py-24 bg-white relative z-10">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
              Before you trust a company, see what others learned the hard way.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 gap-2">
                <Search className="h-5 w-5" /> Search a company
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg font-bold border-2 gap-2 hover:bg-muted">
                <MessageCircle className="h-5 w-5" /> Share an experience
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
