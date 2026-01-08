import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PenLine, ChevronDown, CheckCircle2, MessageSquare, ShieldCheck, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo-shield-check.png" alt="ReportHere Logo" className="h-12 w-auto object-contain" />
            <span className="text-2xl font-bold text-primary tracking-tight">ReportHere</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-base font-medium text-foreground/80">
            <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary py-1">Companies</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors group relative">
              <span>Categories</span>
              <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary py-1">Blog</a>
            <a href="#" className="hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary py-1">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md rounded-lg px-6">
              For Consumers
            </Button>
            <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-lg px-6">
              For Businesses
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-medium">
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center overflow-hidden bg-hug-gradient">
          {/* Background Image with Fade */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-woman-walking.jpg" 
              alt="Woman walking in city" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-2/3 lg:w-1/2"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-32 bottom-0"></div>
          </div>

          <div className="container relative z-10 pt-10 pb-20">
            <div className="max-w-2xl space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Check first. <br />
                <span className="text-primary">Speak up</span> if <br />
                something went <br />
                wrong.
              </h1>
              
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
                Read real experiences before you buy — or share yours to help the next person choose better.
              </h2>
              <p className="text-sm text-muted-foreground/80 mb-10">
                Every experience helps build a clearer picture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2">
                  <Search className="h-5 w-5" />
                  Search a company
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-background hover:border-primary/50 text-foreground gap-2">
                  <PenLine className="h-5 w-5 text-primary" />
                  Share an experience
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props Section */}
        <section className="py-16 bg-background border-b border-border/40">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-muted/30 transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Before you buy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  See what really happened to others — not ads, not promises.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-muted/30 transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-foreground mb-2">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">If something went wrong</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Share your experience so others don't repeat the same mistake.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-muted/30 transition-colors">
                <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent-foreground mb-2">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">When companies respond</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Problems can be clarified, fixed, or publicly addressed.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center border-t border-border/40 pt-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Mission</p>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                This is how better decisions — and better businesses — are built.
              </p>
            </div>
          </div>
        </section>

        {/* Most Searched Companies */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Most Searched Companies</h2>
              <p className="text-muted-foreground">What people are checking right now.</p>
            </div>

            <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-sm border border-border/50 overflow-hidden">
              {[
                { rank: 1, name: "Amazon", category: "Online Retail", logo: "A" },
                { rank: 2, name: "XYZ Electronics", category: "Electronics", logo: "X" },
                { rank: 3, name: "ABC Movers", category: "Moving Services", logo: "M" },
              ].map((company, i) => (
                <div key={i} className="flex items-center justify-between p-6 border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                      {company.rank}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-lg">{company.name}</div>
                    </div>
                  </div>
                  <div className="hidden md:block text-muted-foreground font-medium">
                    {company.category}
                  </div>
                  <div className="text-2xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors">
                    #{company.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Transparency Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                    ReportHere is not about attacking companies. <br/>
                    <span className="text-primary">It's about transparency.</span>
                  </h2>
                  <div className="h-1 w-20 bg-primary rounded-full"></div>
                </div>

                <ul className="space-y-5">
                  {[
                    "Reports are written by real people",
                    "Companies can respond publicly",
                    "No paywall to share an experience",
                    "No manipulation or visibility"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg font-medium text-foreground/80">
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl opacity-50"></div>
                <img 
                  src="/images/bottom-community-photo.jpg" 
                  alt="People talking" 
                  className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Community Section with Cut */}
        <section className="relative py-32 bg-primary overflow-hidden text-primary-foreground">
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
             <img 
              src="/images/bottom-community-photo.jpg" 
              alt="Community background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary z-0"></div>
          
          {/* Top Cut Effect */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-background" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 20%)" }}></div>

          <div className="container relative z-10 text-center space-y-8 pt-10">
            <h2 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight">
              Your experience doesn't end with you.
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto font-medium">
              When you share it, someone else makes a <span className="underline decoration-4 decoration-secondary underline-offset-4">better decision</span>.
            </p>
            
            <div className="pt-8">
              <div className="bg-background/10 backdrop-blur-md rounded-3xl p-8 max-w-3xl mx-auto border border-white/20">
                <p className="text-lg mb-6 font-medium">Before you trust a company, see what others learned the hard way.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-background text-primary hover:bg-white font-bold h-14 px-8 rounded-xl shadow-lg">
                    <Search className="h-5 w-5 mr-2" />
                    Search a company
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold h-14 px-8 rounded-xl">
                    <PenLine className="h-5 w-5 mr-2" />
                    Share an experience
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
