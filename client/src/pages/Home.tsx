import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";
import { Search, PenLine, Store, MessageSquareWarning, MessageSquareQuote, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import EditableText from "@/components/EditableText";
import EditableImage from "@/components/EditableImage";
import SectionWrapper from "@/components/SectionWrapper";
import companiesData from "../data/companies.json";

export default function Home() {
  const [_, setLocation] = useLocation();
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "hero",
    "value-props",
    "what-you-can-do",
    "most-searched",
    "sentiment"
  ]);

  const handleSearch = () => {
    setLocation('/search');
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      setSectionOrder(newOrder);
    }
  };

  const renderSection = (sectionId: string, index: number) => {
    const commonProps = {
      id: sectionId,
      index,
      totalSections: sectionOrder.length,
      onMoveUp: (idx: number) => moveSection(idx, 'up'),
      onMoveDown: (idx: number) => moveSection(idx, 'down'),
    };

    switch (sectionId) {
      case "hero":
        return (
          <SectionWrapper key={sectionId} {...commonProps}>
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
          </SectionWrapper>
        );

      case "value-props":
        return (
          <SectionWrapper key={sectionId} {...commonProps}>
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
          </SectionWrapper>
        );

      case "what-you-can-do":
        return (
          <SectionWrapper key={sectionId} {...commonProps}>
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
          </SectionWrapper>
        );

      case "most-searched":
        return (
          <SectionWrapper key={sectionId} {...commonProps}>
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
                              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                            ) : (
                              <div className="text-xs font-bold text-gray-400">{company.name.substring(0, 2)}</div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{company.name}</h3>
                            <div className="flex items-center gap-1 md:hidden mt-1">
                              <span className="text-xs text-muted-foreground">{company.category}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="hidden md:block col-span-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {company.category}
                          </span>
                        </div>
                        
                        <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-3">
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-foreground">#{company.rank}</span>
                            {company.trend === 'up' && <span className="text-[10px] text-green-600 flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" /> +{Math.floor(Math.random() * 5) + 1}</span>}
                            {company.trend === 'down' && <span className="text-[10px] text-red-600 flex items-center"><TrendingDown className="h-3 w-3 mr-0.5" /> -{Math.floor(Math.random() * 3) + 1}</span>}
                            {company.trend === 'stable' && <span className="text-[10px] text-gray-500 flex items-center"><Minus className="h-3 w-3 mr-0.5" /> 0</span>}
                          </div>
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${
                            company.rank <= 3 ? 'bg-green-600 ring-2 ring-green-100' : 'bg-gray-400'
                          }`}>
                            {company.rank}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="text-xs text-muted-foreground hover:text-foreground">
                    View Top 100 Companies
                  </Button>
                </div>
              </div>
            </section>
          </SectionWrapper>
        );

      case "sentiment":
        return (
          <SectionWrapper key={sectionId} {...commonProps}>
            <section className="py-6 bg-background border-t border-border/40">
              <div className="container text-center">
                <h2 className="text-xl font-bold mb-6 text-foreground">How did you feel?</h2>
                <div className="flex justify-center gap-4 md:gap-8 overflow-x-auto pb-4 md:pb-0 px-4">
                  {[
                    { icon: "/images/sentiment-very-satisfied.svg", label: "Very satisfied", color: "text-green-600" },
                    { icon: "/images/sentiment-okay.svg", label: "Okay", color: "text-blue-600" },
                    { icon: "/images/sentiment-could-be-better.svg", label: "Could be better", color: "text-yellow-600" },
                    { icon: "/images/sentiment-disappointing.svg", label: "Disappointing", color: "text-orange-600" },
                    { icon: "/images/sentiment-no-response.svg", label: "No response", color: "text-red-600" }
                  ].map((sentiment, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 min-w-[80px] group cursor-pointer">
                      <div className="w-16 h-16 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm">
                        <img src={sentiment.icon} alt={sentiment.label} className="w-full h-full object-contain" />
                      </div>
                      <span className={`text-xs font-medium ${sentiment.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                        {sentiment.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </SectionWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {sectionOrder.map((sectionId, index) => renderSection(sectionId, index))}
    </>
  );
}
