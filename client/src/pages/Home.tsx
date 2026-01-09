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
            
            {/* Divider 1 - Green, Thick, Balanced */}
            <div className="w-full h-1 bg-[#2C4A3B] mb-1.5"></div>

            {/* Mission Statement */}
            <div className="text-center mb-1.5">
              <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-3xl mx-auto">
                This is how better decisions — and better businesses — are built.
              </p>
            </div>

            {/* Divider 2 - Green, Thick, No Gap */}
            <div className="w-full h-1 bg-[#2C4A3B]"></div>
          </div>
        </section>

        {/* What You Can Do Here Section - Moved UP */}
        <section className="py-6 bg-background">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">What You Can Do Here</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="flex flex-col items-center space-y-4 group relative">
                <div className="h-14 w-14 flex items-center justify-center mb-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/icon-file-complaint.png" alt="File a Complaint" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <h3 className="text-lg font-bold text-foreground">File a Complaint</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                  Share your story openly. Help others avoid the same issues and push for better service.
                </p>
                <Button variant="link" className="text-primary font-bold hover:text-primary/80 p-0 h-auto text-sm">
                  Start a report &rarr;
                </Button>
                {/* Vertical Divider (Desktop only) */}
                <div className="hidden md:block absolute right-[-1rem] top-6 bottom-6 w-[1px] bg-border/60"></div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col items-center space-y-4 group relative">
                <div className="h-14 w-14 flex items-center justify-center mb-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/icon-browse.jpg" alt="Browse Complaints" className="w-full h-full object-contain drop-shadow-md rounded-full" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Browse Complaints</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                  Research companies before you buy. See how they treat their customers when things go wrong.
                </p>
                <Button variant="link" className="text-primary font-bold hover:text-primary/80 p-0 h-auto text-sm">
                  Search companies &rarr;
                </Button>
                {/* Vertical Divider (Desktop only) */}
                <div className="hidden md:block absolute right-[-1rem] top-6 bottom-6 w-[1px] bg-border/60"></div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col items-center space-y-4 group">
                <div className="h-14 w-14 flex items-center justify-center mb-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <img src="/images/icon-business.png" alt="For Businesses" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <h3 className="text-lg font-bold text-foreground">For Businesses</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                  Claim your profile, respond to customers, and build trust by showing you care.
                </p>
                <Button variant="link" className="text-primary font-bold hover:text-primary/80 p-0 h-auto text-sm">
                  Business login &rarr;
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Divider between sections */}
        <div className="container">
          <div className="w-full h-1 bg-[#2C4A3B] opacity-20"></div>
        </div>

        {/* Most Searched Companies - Base Background (Reset) & No Top Padding */}
        <section className="pb-6 pt-6 bg-background">
          <div className="container">
            <div className="mb-4 flex items-end justify-between">
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
                { rank: 1, name: "Amazon", category: "Online Retail", logo: "/images/amazon-smile-logo.png", logoClass: "object-contain p-1" },
                { rank: 2, name: "Maelys Cosmetics", category: "Beauty & Cosmetics", logo: "/images/maelys-logo.png", logoClass: "object-contain p-1" },
                { rank: 3, name: "Delta Airlines", category: "Airlines", logo: "/images/delta-widget.webp", logoClass: "object-contain p-2" },
                { rank: 4, name: "Target", category: "Retail", logo: "/images/target-logo.png", logoClass: "object-contain p-1" },
                { rank: 5, name: "PayPal", category: "Financial Services", logo: "/images/paypal-logo.png", logoClass: "object-contain p-0.5" },
              ].map((company, i) => (
                <div key={i} className="grid grid-cols-12 items-center p-3 border-b border-border/20 last:border-0 hover:bg-primary/5 transition-colors group cursor-pointer">
                  {/* Logo and Name (Left Side - Spans 5 cols) */}
                  <div className="col-span-8 md:col-span-5 flex items-center gap-3">
                    <div className="h-10 w-20 rounded-lg overflow-hidden border border-border/20 shadow-sm bg-white flex items-center justify-center shrink-0">
                      <img src={company.logo} alt={company.name} className={`w-full h-full ${company.logoClass}`} onError={(e) => {e.currentTarget.src = "/images/amazon-full-logo.png"}} />
                    </div>
                    <div className="font-bold text-base text-foreground group-hover:text-primary transition-colors truncate">{company.name}</div>
                  </div>
                  
                  {/* Category (Middle - Spans 5 cols - Left Aligned) */}
                  <div className="hidden md:flex col-span-5 text-muted-foreground text-xs font-medium justify-start pl-4">
                    {company.category}
                  </div>
                  
                  {/* Rank Number (Right Side - Spans 2 cols - Right Aligned) */}
                  <div className="col-span-4 md:col-span-2 flex justify-end">
                    <div className="h-6 w-6 rounded-full bg-green-50 text-green-700 text-xs font-bold flex items-center justify-center border border-green-100">
                      #{company.rank}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sentiment Analysis Section */}
        <section className="py-6 bg-background">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">How Did You Feel?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base">
              After every interaction, we ask one simple question: How did you feel?
              <br />
              Your answer helps others understand what to expect.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {/* Sentiment 1: Very Satisfied */}
              <div className="flex flex-col items-center space-y-3 group cursor-pointer">
                <div className="h-20 w-20 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-4">
                  <img src="/images/very_satisfied.svg" alt="You Nailed It!" className="w-full h-full object-contain" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-foreground text-base mb-0.5">You Nailed It!</h3>
                  <p className="text-xs text-muted-foreground">Positive experience</p>
                </div>
              </div>

              {/* Sentiment 2: Okay */}
              <div className="flex flex-col items-center space-y-3 group cursor-pointer">
                <div className="h-20 w-20 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-4">
                  <img src="/images/okay.svg" alt="It's Meh..." className="w-full h-full object-contain" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-foreground text-base mb-0.5">It's Meh...</h3>
                  <p className="text-xs text-muted-foreground">Neutral / okay</p>
                </div>
              </div>

              {/* Sentiment 3: Could Be Better */}
              <div className="flex flex-col items-center space-y-3 group cursor-pointer">
                <div className="h-20 w-20 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-4">
                  <img src="/images/could_be_better.svg" alt="Uh Oh..." className="w-full h-full object-contain" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-foreground text-base mb-0.5">Uh Oh...</h3>
                  <p className="text-xs text-muted-foreground">Could be better</p>
                </div>
              </div>

              {/* Sentiment 4: Disappointing */}
              <div className="flex flex-col items-center space-y-3 group cursor-pointer">
                <div className="h-20 w-20 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-4">
                  <img src="/images/disappointing.svg" alt="Pretty Disappointing" className="w-full h-full object-contain" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-foreground text-base mb-0.5">Pretty Disappointing</h3>
                  <p className="text-xs text-muted-foreground">Negative experience</p>
                </div>
              </div>

              {/* Sentiment 5: No Response */}
              <div className="flex flex-col items-center space-y-3 group cursor-pointer">
                <div className="h-20 w-20 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-4">
                  <img src="/images/no_response.svg" alt="Feeling Ignored" className="w-full h-full object-contain" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-foreground text-base mb-0.5">Feeling Ignored</h3>
                  <p className="text-xs text-muted-foreground">No response / unresolved</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust/Community Section - Full Width Image with Green Table */}
        <section className="relative w-full overflow-hidden">
          {/* Container for the image and overlays */}
          <div className="relative w-full">
            {/* Full width image */}
            <img 
              src="/images/couple-green-table.png" 
              alt="Couple looking at laptop on green table" 
              className="w-full h-auto object-cover block"
            />
            
            {/* Overlay for Trust Text (Top Left) - Faded background for readability */}
            <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-gradient-to-r from-background/90 via-background/60 to-transparent flex flex-col justify-center px-8 md:px-16 lg:px-24">
              <div className="max-w-md space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  This is about transparency.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe that when companies know people are watching, they do better. And when consumers have the full picture, they choose better.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/90 hover:text-white font-bold rounded-full px-8 h-12 transition-all">
                    Read our mission
                  </Button>
                </div>
              </div>
            </div>

            {/* Overlay for Community Text (Bottom Right - On the Green Table) */}
            <div className="absolute bottom-[10%] right-[5%] md:right-[10%] max-w-sm text-right">
              <div className="bg-[#2C4A3B]/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-end gap-2">
                  <Users className="h-5 w-5 text-green-300" />
                  Join the Community
                </h3>
                <p className="text-green-100 text-sm mb-4">
                  Thousands of people helping each other make smarter decisions every day.
                </p>
                <Button size="sm" className="bg-white text-[#2C4A3B] hover:bg-green-50 font-bold w-full">
                  Sign up free
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2C4A3B] text-white py-12 border-t border-white/10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-8 w-8 text-green-300" />
                <span className="text-xl font-bold tracking-tight">ReportHere</span>
              </div>
              <p className="text-green-100/80 text-sm leading-relaxed">
                Building trust through transparency. Join thousands of consumers making better decisions every day.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-green-300">Company</h4>
              <ul className="space-y-2 text-sm text-green-100/80">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-green-300">Resources</h4>
              <ul className="space-y-2 text-sm text-green-100/80">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-green-300">Stay Updated</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                <Button className="bg-green-500 hover:bg-green-400 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-green-100/60">
            <p>&copy; 2025 ReportHere. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
