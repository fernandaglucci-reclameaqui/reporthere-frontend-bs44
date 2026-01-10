import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils/index";
import { Complaint } from "@/api/entities";
import { User } from "@/api/entities";
import { 
  Search,
  ArrowRight,
  MessageSquare,
  Share2,
  Users,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [complaints, currentUser] = await Promise.all([
          Complaint.filter({ status: "published" }, "-published_date", 6),
          User.me().catch(() => null),
        ]);
        setRecentComplaints(complaints);
        setUser(currentUser);
      } catch (error) {
        console.error("Error loading data:", error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Hero Section */}
      <section className="relative bg-hug-gradient pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl pr-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight mb-6">
                Check first. <br />
                <span className="text-primary">Speak up</span> if something went wrong.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Read real experiences before you buy — or share yours to help the next person choose better.
                <br />
                <span className="text-sm mt-2 block opacity-80">Every experience helps build a clearer picture.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl("companies")}>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 h-14 text-lg font-medium w-full sm:w-auto shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    <Search className="mr-2 h-5 w-5" /> Search a company
                  </Button>
                </Link>
                <Link to={createPageUrl("filecomplaint")}>
                  <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm border-primary/20 text-foreground hover:bg-white hover:text-primary rounded-full px-8 h-14 text-lg font-medium w-full sm:w-auto transition-all hover:scale-105">
                    <Share2 className="mr-2 h-5 w-5" /> Share an experience
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block h-[600px]">
              {/* Hero Image - Woman Walking */}
              <div className="absolute top-0 right-0 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="/images/hero-woman-walking.jpg" 
                  alt="Woman walking confidently" 
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Card 1 - Trust */}
              <div className="absolute top-12 -left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Verified Reviews</p>
                    <p className="text-xs text-gray-500">Real people, real stories</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 - Community */}
              <div className="absolute bottom-24 -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Join 50k+ others</p>
                    <p className="text-xs text-gray-500">Making better decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sentiment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Did You Feel?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              After every interaction, we ask one simple question: How did you feel?
              <br />
              Your answer helps others understand what to expect.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "/images/very_satisfied.svg", label: "You Nailed It!", sub: "Positive experience", color: "text-green-600" },
              { icon: "/images/okay.svg", label: "It's Meh...", sub: "Neutral / okay", color: "text-gray-600" },
              { icon: "/images/could_be_better.svg", label: "Uh Oh...", sub: "Could be better", color: "text-yellow-600" },
              { icon: "/images/disappointing.svg", label: "Pretty Disappointing", sub: "Negative experience", color: "text-orange-600" },
              { icon: "/images/no_response.svg", label: "Feeling Ignored", sub: "No response / unresolved", color: "text-red-600" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-20 h-20 mb-4 rounded-full bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-gray-100">
                  <img src={item.icon} alt={item.label} className="w-12 h-12" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Transparency Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/couple-talking-trust.jpg" 
            alt="Couple talking at a table" 
            className="w-full h-full object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              This is about <br />
              transparency.
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
              We believe that when companies know people are watching, they do better. 
              And when consumers have the full picture, they choose better.
            </p>
            <Link to={createPageUrl("about")}>
              <Button variant="outline" className="rounded-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8">
                Read our mission
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative py-32 bg-cover bg-center" style={{ backgroundImage: 'url("/images/bottom-community-photo.jpg")' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end items-center text-center">
          
          {/* Community Card - Centered above text */}
          <div className="bg-[#1a3b28] text-white p-8 rounded-2xl max-w-md w-full shadow-2xl mb-12 transform transition-transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-4 text-green-300">
                <Users className="h-5 w-5" />
                <span className="font-bold tracking-wide uppercase text-xs">Join the Community</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Thousands of people helping each other make smarter decisions every day.</h3>
              <Link to={createPageUrl("signup")} className="w-full mt-6">
                <Button className="w-full bg-white text-[#1a3b28] hover:bg-gray-100 font-bold rounded-full">
                  Sign up free
                </Button>
              </Link>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your experience doesn't end with you.
          </h2>
          <p className="text-xl text-white/90 font-medium">
            When you share it, someone else makes a better decision.
          </p>
        </div>
      </section>

      {/* Action Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">What You Can Do Here</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">File a Complaint</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Share your story openly. Help others avoid the same issues and push for better service.
              </p>
              <Link to={createPageUrl("filecomplaint")} className="text-primary font-bold hover:underline flex items-center justify-center gap-1">
                Start a report <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Browse Complaints</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Research companies before you buy. See how they treat their customers when things go wrong.
              </p>
              <Link to={createPageUrl("companies")} className="text-primary font-bold hover:underline flex items-center justify-center gap-1">
                Search companies <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">For Businesses</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Claim your profile, respond to customers, and build trust by showing you care.
              </p>
              <Link to={createPageUrl("for-businesses")} className="text-primary font-bold hover:underline flex items-center justify-center gap-1">
                Business login <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Most Searched Companies (Existing Logic) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Most Searched Companies</h2>
          {/* This part can be populated with real data later */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Placeholder for company logos/names */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-24 flex items-center justify-center">
                <span className="text-gray-300 font-bold">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
