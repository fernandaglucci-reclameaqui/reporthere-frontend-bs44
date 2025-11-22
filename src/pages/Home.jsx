
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { companyProfileUrl } from "../components/utils/links";
import { Complaint } from "@/api/entities";
import { User } from "@/api/entities";
import { 
  ArrowRight,
  MessageSquare,
  BookOpen,
  Handshake,
  Heart,
  Users,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Hero from "../components/home/Hero";
import StatusChip from "@/components/ui/StatusChip";

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

  const getCategoryColor = (category) => {
    const colors = {
      customer_service: "bg-blue-100 text-blue-800",
      product_quality: "bg-red-100 text-red-800", 
      billing_dispute: "bg-yellow-100 text-yellow-800",
      delivery_shipping: "bg-green-100 text-green-800",
      refund_return: "bg-purple-100 text-purple-800",
      warranty_repair: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* Why ReportHere Exists */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why ReportHere Exists
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Everyone deserves to feel heard.<br />
              Everyone deserves clear information before buying or hiring.<br />
              And every business deserves a fair chance to respond and improve.
            </p>
            <p className="mt-6">
              ReportHere was created for real people — like you, your family, your neighbor — who just want honesty, kindness, and simple clarity.
            </p>
            <div className="mt-8 space-y-2 text-emerald-700 font-medium">
              <p>Here, your experience matters.</p>
              <p>Here, your story helps someone else.</p>
              <p>Here, we believe most problems can be solved with respect and conversation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tell Us What Happened</h3>
              <p className="text-gray-600">
                No perfect words needed. Just explain it in your own way.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Story Is Saved</h3>
              <p className="text-gray-600">
                The business is notified and can view your report inside their dashboard.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Follow the Responses</h3>
              <p className="text-gray-600">
                Businesses can claim their page and reply with care.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Link to={createPageUrl("FileComplaint")}>
              <Button size="lg" className="bg-gradient-to-b from-green-500 to-green-700 px-8 py-4 text-lg font-semibold text-white rounded-full hover:from-green-600 hover:to-green-800 hover:shadow-lg">
                File a Complaint
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What You Can Do Here */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What You Can Do Here
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <img src="/icon-heart-handdrawn.png" alt="Heart icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Story</h3>
              <p className="text-gray-600 mb-6">
                Your voice helps others make better choices tomorrow.
              </p>
              <Link to={createPageUrl("FileComplaint")}>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 rounded-full">
                  File a Complaint
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <img src="/icon-book-handdrawn.png" alt="Book icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Read Other People's Stories</h3>
              <p className="text-gray-600 mb-6">
                Real stories from real people — everyday experiences that matter.
              </p>
              <Link to={createPageUrl("complaints")}>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 rounded-full">
                  Browse Complaints
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <img src="/icon-shield-handdrawn.png" alt="Shield icon" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Watch Problems Get Solved</h3>
              <p className="text-gray-600 mb-6">
                When businesses respond with kindness, everyone wins.
              </p>
              <Link to={createPageUrl("ClaimProfile")}>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 rounded-full">
                  For Businesses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Reputation Works Here */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            How Reputation Works Here
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            We keep it simple — the way everyone understands:
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="text-6xl mb-4">🙂</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Happy face</h3>
              <p className="text-gray-600">
                People had a good experience and felt respected.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="text-6xl mb-4">😐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Neutral face</h3>
              <p className="text-gray-600">
                It was okay, but could be better.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
              <div className="text-6xl mb-4">☹️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sad face</h3>
              <p className="text-gray-600">
                Something went wrong and needs attention.
              </p>
            </div>
          </div>
          <p className="text-center text-lg text-gray-700 mt-8">
            When a business has mostly happy faces, everyone knows it's loved — that's reputation that feels human.
          </p>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Stories</h2>
              <p className="text-gray-600 text-lg">Real experiences from real people</p>
            </div>
            <Link to={createPageUrl("complaints")}>
              <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 rounded-full">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : recentComplaints.length > 0 ? (
              recentComplaints.map((complaint) => (
                <Link key={complaint.id} to={createPageUrl(`ComplaintDetail?id=${complaint.id}`)}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {complaint.title}
                          </h3>
                          <p className="text-sm text-green-600 font-medium">
                            {complaint.company_name}
                          </p>
                        </div>
                        <Badge className={`${getCategoryColor(complaint.category)} capitalize px-2.5 py-1 text-xs`}>
                          {complaint.category.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {complaint.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <StatusChip status={complaint.status.toUpperCase()} />
                        <span className="text-xs text-gray-500">
                          {new Date(complaint.published_date || complaint.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-4">No stories yet — you can be the first to help our community.</p>
                <Link to={createPageUrl("FileComplaint")}>
                  <Button className="bg-gradient-to-b from-green-500 to-green-700 text-white rounded-full">
                    Share Your Story
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* For Businesses CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Own a business?
          </h2>
          <p className="text-emerald-50 mb-4 text-lg max-w-2xl mx-auto leading-relaxed">
            We're here for you too.
          </p>
          <p className="text-emerald-100 mb-8 text-base max-w-2xl mx-auto leading-relaxed">
            Claim your page to see what people are sharing, reply with care, and show your commitment to good service. This is not about blame — it's about conversation, trust, and building a reputation that feels human.
          </p>
          <Link to={createPageUrl("ClaimProfile")}>
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
              Claim Your Page
            </Button>
          </Link>
        </div>
      </section>

      {/* Footnote */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">
            * 100% free for consumers. Free for businesses on the basic package.
          </p>
        </div>
      </section>
    </div>
  );
}
