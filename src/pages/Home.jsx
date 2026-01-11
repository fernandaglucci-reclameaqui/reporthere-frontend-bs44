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
  Shield,
  Store,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  console.log("Home component rendering...");
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
      {/* Hero Section - Street Scene */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {/* Background Image with Fade */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-street-scene.jpg" 
            alt="Busy city street with people walking" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay - White fade from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fffbf5] via-[#fffbf5]/90 to-transparent lg:via-[#fffbf5]/60"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
          <div className="max-w-2xl pt-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a3b28] leading-[1.1] mb-6 tracking-tight">
              Check first. <br />
              <span className="text-[#4ade80]">Speak up</span> if <br />
              something went <br />
              wrong.
            </h1>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed max-w-lg font-medium">
              Read real experiences before you buy — or share yours to help the next person choose better.
              <br />
              <span className="text-sm mt-3 block text-gray-500">Every experience helps build a clearer picture.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl("companies")}>
                <Button size="lg" className="bg-[#4ade80] text-[#1a3b28] hover:bg-[#4ade80]/90 rounded-full px-8 h-14 text-lg font-bold w-full sm:w-auto shadow-lg transition-all hover:scale-105">
                  <Search className="mr-2 h-5 w-5" /> Search a company
                </Button>
              </Link>
              <Link to={createPageUrl("filecomplaint")}>
                <Button size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm border-[#1a3b28]/20 text-[#1a3b28] hover:bg-white rounded-full px-8 h-14 text-lg font-bold w-full sm:w-auto transition-all hover:scale-105">
                  <Share2 className="mr-2 h-5 w-5" /> Share an experience
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section - Beige Background */}
      <section className="bg-[#fffbf5] py-16 border-b border-[#e5e7eb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#7c8e83] rounded-full flex items-center justify-center text-white mb-4 shadow-sm">
                <Store className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-[#1a3b28] text-lg mb-2">Before you buy</h3>
              <p className="text-sm text-gray-600 max-w-xs">
                See what really happened to others — not ads, not promises.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative">
              {/* Connector Lines (Desktop only) */}
              <div className="hidden md:block absolute top-6 -left-1/2 w-full h-[1px] bg-gray-300 -z-10"></div>
              
              <div className="w-12 h-12 bg-[#d97706] rounded-full flex items-center justify-center text-white mb-4 shadow-sm">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-[#1a3b28] text-lg mb-2">If something went wrong</h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Share your experience so others don't repeat the same mistakes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative">
              {/* Connector Lines (Desktop only) */}
              <div className="hidden md:block absolute top-6 -left-1/2 w-full h-[1px] bg-gray-300 -z-10"></div>

              <div className="w-12 h-12 bg-[#7c8e83] rounded-full flex items-center justify-center text-white mb-4 shadow-sm">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-[#1a3b28] text-lg mb-2">When companies respond</h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Problems can be clarified, fixed, or publicly addressed.
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 italic font-medium">
              This is how better decisions — and better businesses — are built.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Do Here */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1a3b28]">What You Can Do Here</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 transform transition-transform group-hover:scale-110">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3b28] mb-3">File a Complaint</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed px-4">
                Share your story openly. Help others avoid the same issues and push for better service.
              </p>
              <Link to={createPageUrl("filecomplaint")} className="text-[#1a3b28] font-bold text-sm hover:text-[#4ade80] transition-colors">
                Start a report →
              </Link>
            </div>

            {/* Card 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 transform transition-transform group-hover:scale-110">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3b28] mb-3">Browse Complaints</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed px-4">
                Research companies before you buy. See how they treat their customers when things go wrong.
              </p>
              <Link to={createPageUrl("companies")} className="text-[#1a3b28] font-bold text-sm hover:text-[#4ade80] transition-colors">
                Search companies →
              </Link>
            </div>

            {/* Card 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 transform transition-transform group-hover:scale-110">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3b28] mb-3">For Businesses</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed px-4">
                Claim your profile, respond to customers, and build trust by showing you care.
              </p>
              <Link to={createPageUrl("for-businesses")} className="text-[#1a3b28] font-bold text-sm hover:text-[#4ade80] transition-colors">
                Business login →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Most Searched Companies - List View */}
      <section className="py-16 bg-[#fffbf5]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1a3b28]">Most Searched Companies</h2>
              <p className="text-sm text-gray-500 mt-1">What people are checking right now</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live Updates
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { name: "Amazon", category: "Online Retail", rank: 1, icon: "A" },
              { name: "Maelys Cosmetics", category: "Beauty & Cosmetics", rank: 2, icon: "M" },
              { name: "Delta Airlines", category: "Airlines", rank: 3, icon: "D" },
              { name: "Target", category: "Retail", rank: 4, icon: "T" },
              { name: "PayPal", category: "Financial Services", rank: 5, icon: "P" }
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-between p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 group-hover:bg-[#1a3b28] group-hover:text-white transition-colors">
                    {company.icon}
                  </div>
                  <span className="font-bold text-[#1a3b28]">{company.name}</span>
                </div>
                <span className="text-sm text-gray-500 hidden md:block">{company.category}</span>
                <span className="text-xs font-bold text-[#4ade80]">#{company.rank}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sentiment Section - Moved to Bottom */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1a3b28] mb-4">How Did You Feel?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              After every interaction, we ask one simple question: How did you feel?
              <br />
              Your answer helps others understand what to expect.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {[
              { icon: "/images/very_satisfied.svg", label: "You Nailed It!", sub: "Positive experience" },
              { icon: "/images/okay.svg", label: "It's Meh...", sub: "Neutral / okay" },
              { icon: "/images/could_be_better.svg", label: "Uh Oh...", sub: "Could be better" },
              { icon: "/images/disappointing.svg", label: "Pretty Disappointing", sub: "Negative experience" },
              { icon: "/images/no_response.svg", label: "Feeling Ignored", sub: "No response / unresolved" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="w-20 h-20 mb-4 rounded-full bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-gray-100 border border-gray-100">
                  <img src={item.icon} alt={item.label} className="w-12 h-12" />
                </div>
                <h3 className="font-bold text-[#1a3b28] mb-1 text-sm">{item.label}</h3>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Transparency Section */}
      <footer className="bg-[#1a3b28] text-white pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                This is about <br />
                transparency.
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-md">
                We believe that when companies know people are watching, they do better. 
                And when consumers have the full picture, they choose better.
              </p>
              <Link to={createPageUrl("about")}>
                <Button variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-[#1a3b28] px-8">
                  Read our mission
                </Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/couple-talking.jpg" 
                alt="Couple talking at a table" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="border-t border-white/10 pt-10">
            <div className="grid md:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-bold mb-4">About</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to={createPageUrl("about")} className="hover:text-white">About Us</Link></li>
                  <li><Link to={createPageUrl("blog")} className="hover:text-white">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">For Users</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to={createPageUrl("for-consumers")} className="hover:text-white">For Consumers</Link></li>
                  <li><Link to={createPageUrl("filecomplaint")} className="hover:text-white">File a Complaint</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to={createPageUrl("faq")} className="hover:text-white">FAQ</Link></li>
                  <li><Link to={createPageUrl("contact")} className="hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to={createPageUrl("terms")} className="hover:text-white">Terms of Service</Link></li>
                  <li><Link to={createPageUrl("privacy")} className="hover:text-white">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 text-center text-xs text-gray-500">
              <p className="mb-2">ReportHere is currently in beta. We're actively improving the platform and welcome your feedback.</p>
              <p>&copy; 2026 ReportHere. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
