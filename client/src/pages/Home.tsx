import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PenLine, ChevronDown, CheckCircle2, MessageSquare, ShieldCheck, Users, Store, MessageSquareWarning, MessageSquareQuote, Heart, BookOpen } from "lucide-react";

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
              src="/images/hero-official.png" 
              alt="Woman walking in city" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent w-full md:w-3/4 lg:w-2/3"></div>
            {/* Stronger bottom fade to blend with next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent h-48 bottom-0"></div>
          </div>

          <div className="container relative z-10 pt-10 pb-12">
            <div className="max-w-2xl space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Check first. <br />
                <span className="text-primary">Speak up</span> if <br />
                something went wrong.
              </h1>
              
              <h2 className="text-xl md:text-2xl text-foreground/90 mb-4 font-medium drop-shadow-sm">
                Read real experiences before you buy — or share yours to help the next person choose better.
              </h2>
              <p className="text-sm text-muted-foreground/80 mb-8">
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

        {/* Value Props Section - Fluid Gradient Background */}
        <section className="py-8 bg-gradient-to-b from-background via-muted/10 to-background">
          <div className="container">
            {/* 3 Columns with Vertical Dividers */}
            <div className="grid md:grid-cols-3 gap-8 mb-8 relative">
              {/* Column 1 */}
              <div className="flex flex-col items-center text-center space-y-3 group relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#8BA888] to-[#5e7a5b] flex items-center justify-center text-white mb-3 shadow-lg shadow-primary/20 transform group-hover:scale-110 transition-all duration-300">
                  <Store className="h-8 w-8 fill-white/20" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Before you buy</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  See what really happened to others — not ads, not promises.
                </p>
                {/* Vertical Divider (Desktop only) */}
                <div className="hidden md:block absolute right-[-1rem] top-4 bottom-4 w-[2px] bg-border/60"></div>
              </div>
              
              {/* Column 2 */}
              <div className="flex flex-col items-center text-center space-y-3 group relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#D97706] to-[#B45309] flex items-center justify-center text-white mb-3 shadow-lg shadow-orange-500/20 transform group-hover:scale-110 transition-all duration-300">
                  <MessageSquareWarning className="h-8 w-8 fill-white/20" />
                </div>
                <h3 className="text-lg font-bold text-foreground">If something went wrong</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  Share your experience so others don't repeat the same mistake.
                </p>
                {/* Vertical Divider (Desktop only) */}
                <div className="hidden md:block absolute right-[-1rem] top-4 bottom-4 w-[2px] bg-border/60"></div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col items-center text-center space-y-3 group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#8BA888] to-[#5e7a5b] flex items-center justify-center text-white mb-3 shadow-lg shadow-primary/20 transform group-hover:scale-110 transition-all duration-300">
                  <MessageSquareQuote className="h-8 w-8 fill-white/20" />
                </div>
                <h3 className="text-lg font-bold text-foreground">When companies respond</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  Problems can be clarified, fixed, or publicly addressed.
                </p>
              </div>
            </div>
            
            {/* Divider 1 - Thicker & Toned */}
            <div className="w-full h-[2px] bg-border/60 mb-6"></div>

            {/* Mission Statement */}
            <div className="text-center mb-6">
              <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-3xl mx-auto">
                This is how better decisions — and better businesses — are built.
              </p>
            </div>

            {/* Divider 2 - Green, Thick, No Gap */}
            <div className="w-full h-1 bg-[#2C4A3B]"></div>
          </div>
        </section>

        {/* Most Searched Companies - Base Background (Reset) & No Top Padding */}
        <section className="pb-16 pt-0 bg-background">
          <div className="container">
            <div className="mb-6 pt-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Most Searched Companies</h2>
                <p className="text-muted-foreground">What people are checking right now.</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Updates
              </div>
            </div>

            {/* Transparent Table - No bg-card, just borders */}
            <div className="w-full rounded-xl border border-border/40 overflow-hidden">
              {[
                { rank: 1, name: "Amazon", category: "Online Retail", logo: "/images/amazon-full-logo.png", logoClass: "object-contain p-1" },
                { rank: 2, name: "XYZ Electronics", category: "Electronics", logo: "/images/xyz-blue-logo.jpg", logoClass: "object-cover" },
                { rank: 3, name: "ABC Movers", category: "Moving Services", logo: "/images/abc-red-logo.png", logoClass: "object-contain p-1" },
              ].map((company, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center font-extrabold text-sm group-hover:scale-110 transition-transform shadow-md">
                      {company.rank}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-24 rounded-lg overflow-hidden border border-border/20 shadow-sm bg-white flex items-center justify-center">
                        <img src={company.logo} alt={company.name} className={`w-full h-full ${company.logoClass}`} />
                      </div>
                      <div className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{company.name}</div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block text-muted-foreground text-sm font-medium">
                    {company.category}
                  </div>
                  
                  <div className="text-xl font-extrabold text-muted-foreground/30 group-hover:text-primary transition-colors">
                    #{company.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Can Do Here Section */}
        <section className="py-20 bg-muted/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-foreground">What You Can Do Here</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {/* Column 1 */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-[#2C4A3B] stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Share Your Story</h3>
                <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Your voice helps others make better choices tomorrow.
                </p>
                <Button variant="outline" className="mt-4 border-[#2C4A3B] text-[#2C4A3B] hover:bg-[#2C4A3B] hover:text-white rounded-full px-8 font-medium transition-all duration-300">
                  File a Complaint
                </Button>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-10 h-10 text-[#2C4A3B] stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Read Other People's Stories</h3>
                <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Real stories from real people — everyday experiences that matter.
                </p>
                <Button variant="outline" className="mt-4 border-[#2C4A3B] text-[#2C4A3B] hover:bg-[#2C4A3B] hover:text-white rounded-full px-8 font-medium transition-all duration-300">
                  Browse Complaints
                </Button>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-10 h-10 text-[#2C4A3B] stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Watch Problems Get Solved</h3>
                <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  When businesses respond with kindness, everyone wins.
                </p>
                <Button variant="outline" className="mt-4 border-[#2C4A3B] text-[#2C4A3B] hover:bg-[#2C4A3B] hover:text-white rounded-full px-8 font-medium transition-all duration-300">
                  For Businesses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Trust & Community Section */}
        <section className="relative min-h-[1200px] flex flex-col overflow-hidden">
          {/* Unified Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/couple-table-unified.png" 
              alt="Couple talking at cafe with green table" 
              className="w-full h-full object-cover object-center"
            />
            {/* Left Fade for Trust Text Readability */}
            <div className="absolute top-0 left-0 bottom-1/2 bg-gradient-to-r from-background via-background/90 to-transparent w-full md:w-2/3 lg:w-1/2"></div>
            {/* Top Fade to blend with previous section */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
          </div>

          {/* Trust Content (Top Left) */}
          <div className="container relative z-10 pt-24 pb-48">
            <div className="max-w-xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground">
                  ReportHere is not about attacking companies. <br/>
                  <span className="text-primary">It's about transparency.</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/40 rounded-full"></div>
              </div>

              <ul className="space-y-6">
                {[
                  "Reports are written by real people",
                  "Companies can respond publicly",
                  "No paywall to share an experience",
                  "No manipulation or visibility"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium text-foreground/80 group">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Community Content (Bottom - Over Green Table) */}
          <div className="relative z-10 mt-auto pb-24 text-white">
            <div className="container text-center space-y-6">
              <h2 className="text-2xl md:text-4xl font-bold max-w-4xl mx-auto leading-tight drop-shadow-md">
                Your experience doesn't end with you.
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
                When you share it, someone else makes a <span className="text-[#A8C5A4] font-bold underline decoration-2 underline-offset-4">better decision</span>.
              </p>
              
              <div className="pt-8 pb-4">
                <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto shadow-2xl text-foreground">
                  <p className="text-lg mb-6 font-medium text-center text-muted-foreground">Before you trust a company, see what others learned the hard way.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-[#2C4A3B] hover:bg-[#1a3c28] text-white font-bold h-14 px-8 rounded-md shadow-lg w-full sm:w-auto">
                      <Search className="h-5 w-5 mr-2" />
                      Search a company
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-input hover:bg-accent hover:text-accent-foreground font-bold h-14 px-8 rounded-md w-full sm:w-auto">
                      <PenLine className="h-5 w-5 mr-2" />
                      Share an experience
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
