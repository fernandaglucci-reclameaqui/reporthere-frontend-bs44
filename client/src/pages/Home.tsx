import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { Search, PenLine, Store, MessageSquareWarning, MessageSquareQuote, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import EditableText from "@/components/EditableText";
import EditableImage from "@/components/EditableImage";
import companiesData from "../data/companies.json";

export default function Home() {
  const [_, setLocation] = useLocation();

  const handleSearch = () => {
    setLocation('/search');
  };
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage 
            id="home_hero_image"
            defaultSrc="/images/hero-v2.jpg" 
            alt="Woman walking in city" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
        </div>

        <div className="container relative z-10 pt-10 pb-12">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              <EditableText 
                id="home_hero_title" 
                defaultText="Check first. Speak up if something went wrong." 
                as="span"
              />
            </h1>
            
            <EditableText 
              id="home_hero_subtitle"
              defaultText="Read real experiences before you buy — or share yours to help the next person choose better."
              className="text-xl md:text-2xl text-foreground/90 mb-4 font-medium drop-shadow-sm"
              as="h2"
            />
            <p className="text-sm text-muted-foreground/80 mb-8">
              Every experience helps build a clearer picture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleSearch} size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 gap-2">
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
      <section className="py-12 bg-[#F9F7F2]">
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
          <div className="w-full h-1 bg-[#2C4A3B]"></div>

          {/* Mission Statement - Perfectly Centered */}
          <div className="text-center py-6">
            <p className="text-lg md:text-xl text-foreground/80 font-medium max-w-3xl mx-auto">
              This is how better decisions — and better businesses — are built.
            </p>
          </div>

          {/* Divider 2 - Green, Thick, No Gap */}
          <div className="w-full h-1 bg-[#2C4A3B]"></div>
        </div>
      </section>

      {/* What You Can Do Here Section - Moved UP */}
      <section className="pt-6 pb-6 bg-background">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">What You Can Do Here</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center space-y-4 group relative">
              <div className="h-14 w-14 flex items-center justify-center mb-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <EditableImage 
                  id="home_icon_complaint"
                  defaultSrc="/images/icon-file-complaint.png" 
                  alt="File a Complaint" 
                  className="w-full h-full object-contain drop-shadow-md" 
                />
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
                <EditableImage 
                  id="home_icon_browse"
                  defaultSrc="/images/icon-browse-3d.png" 
                  alt="Browse Complaints" 
                  className="w-full h-full object-contain drop-shadow-md" 
                />
              </div>
              <h3 className="text-lg font-bold text-foreground">Browse Complaints</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                Research companies before you buy. See how they treat their customers when things go wrong.
              </p>
              <Button onClick={handleSearch} variant="link" className="text-primary font-bold hover:text-primary/80 p-0 h-auto text-sm">
                Search companies &rarr;
              </Button>
              {/* Vertical Divider (Desktop only) */}
              <div className="hidden md:block absolute right-[-1rem] top-6 bottom-6 w-[1px] bg-border/60"></div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center space-y-4 group">
              <div className="h-14 w-14 flex items-center justify-center mb-1 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <EditableImage 
                  id="home_icon_business"
                  defaultSrc="/images/icon-business.png" 
                  alt="For Businesses" 
                  className="w-full h-full object-contain drop-shadow-md" 
                />
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

      {/* Most Searched Companies Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Most Searched Companies</h2>
            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Updates
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6">What people are checking right now.</p>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50/80 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Company</div>
              <div className="col-span-4 text-center">Category</div>
              <div className="col-span-2 text-right">Rank</div>
            </div>

            {companiesData.map((company) => (
              <Link key={company.id} href={`/company/${company.id}`}>
                <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group cursor-pointer">
                  <div className="col-span-8 md:col-span-6 flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-white border border-gray-100 flex items-center justify-center p-1 overflow-hidden">
                      {/* Fallback to initials if logo fails (simulated here by checking if logo string is empty, though in real app we'd handle onError) */}
                      {company.logo ? (
                        <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-xs font-bold text-gray-400">{company.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">{company.name}</span>
                  </div>
                  <div className="col-span-4 text-center text-sm text-gray-500 hidden md:block">{company.category}</div>
                  <div className="col-span-4 md:col-span-2 text-right flex items-center justify-end gap-2">
                    <span className="font-bold text-green-600">#{company.rank}</span>
                    {company.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {company.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
                    {company.trend === 'stable' && <Minus className="h-3 w-3 text-gray-400" />}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sentiment Analysis {/* Transparency Section */}
      <section className="relative h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/city-conversation.png" 
            alt="Couple talking in city" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">This is about<br />transparency.</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              We believe that when companies know people are watching, they do better. And when consumers have the full picture, they choose better.
            </p>
            <Button variant="outline" className="rounded-full px-8 border-gray-400 text-gray-700 hover:bg-gray-50">
              Read our mission
            </Button>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="bg-[#1B3B36] rounded-2xl p-8 text-white max-w-md w-full shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-semibold text-lg">Join the Community</span>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Thousands of people helping each other make smarter decisions every day.
              </p>
              <Button className="w-full bg-white text-[#1B3B36] hover:bg-gray-100 font-semibold rounded-lg h-12">
                Sign up free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sentiment Section */}
      <section className="py-20 bg-[#F9F7F2]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Did You Feel?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            After every interaction, we ask one simple question: How did you feel?
            <br />
            Your answer helps others understand what to expect.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {/* Sentiment 1: Very Satisfied */}
            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-2">
                <img src="/images/very_satisfied.svg" alt="You Nailed It!" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-foreground text-lg mb-0.5">You Nailed It!</h3>
                <p className="text-sm text-muted-foreground">Positive experience</p>
              </div>
            </div>

            {/* Sentiment 2: Okay */}
            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-2">
                <img src="/images/okay.svg" alt="It's Meh..." className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-foreground text-lg mb-0.5">It's Meh...</h3>
                <p className="text-sm text-muted-foreground">Neutral / okay</p>
              </div>
            </div>

            {/* Sentiment 3: Could Be Better */}
            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-2">
                <img src="/images/could_be_better.svg" alt="Uh Oh..." className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-foreground text-lg mb-0.5">Uh Oh...</h3>
                <p className="text-sm text-muted-foreground">Could be better</p>
              </div>
            </div>

            {/* Sentiment 4: Disappointing */}
            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-2">
                <img src="/images/disappointing.svg" alt="Pretty Disappointing" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-foreground text-lg mb-0.5">Pretty Disappointing</h3>
                <p className="text-sm text-muted-foreground">Negative experience</p>
              </div>
            </div>

            {/* Sentiment 5: No Response */}
            <div className="flex flex-col items-center space-y-3 group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-white border border-border shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 overflow-hidden p-2">
                <img src="/images/no_response.svg" alt="Feeling Ignored" className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-foreground text-lg mb-0.5">Feeling Ignored</h3>
                <p className="text-sm text-muted-foreground">No response / unresolved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B3B36] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-400 mb-2">* 100% free for consumers. Free for businesses on the basic package.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center md:text-left">
            <div>
              <h4 className="font-bold text-white mb-6">About</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Consumers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Businesses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Support</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Legal Disclaimer</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
               {/* Placeholder for social icons or additional links if needed */}
            </div>
          </div>
          
          <div className="text-center mt-16 pt-8 border-t border-white/10">
            <div className="inline-block px-3 py-1 border border-white/20 rounded text-xs text-gray-400 mb-4">BETA</div>
            <p className="text-xs text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              ReportHere is currently in beta. We're actively improving the platform and welcome your feedback.
              <br />
              ReportHere is an independent platform and is not affiliated with, endorsed by, or connected to any similar complaint or reputation management platforms.
            </p>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} ReportHere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
