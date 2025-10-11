
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { companyProfileUrl } from "../components/utils/links";
import { Complaint } from "@/api/entities";
import { User } from "@/api/entities";
import { 
  ArrowRight,
  CheckCircle,
  BookOpen,
  Handshake,
  MessageSquareText,
  Clock, // Added for pending status
  FileText // Added for responded status
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
      {/* New Hero Section */}
      <Hero />
      
      {/* Stats */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3M+</div>
              <div className="text-gray-600">Trusted Consumers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">200K+</div>
              <div className="text-gray-600">Reviewed Companies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100K+</div>
              <div className="text-gray-600">Resolved Complaints</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquareText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">File a Complaint</h3>
              <p className="text-gray-600 mb-4">
                Share your experience to help others identify trustworthy businesses.
              </p>
              <Link to={createPageUrl("FileComplaint")}>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Read Reviews</h3>
              <p className="text-gray-600 mb-4">
                Browse company profiles and read reviews from real customers.
              </p>
              <Link to={createPageUrl("companies")}>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Browse Companies
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Resolutions</h3>
              <p className="text-gray-600 mb-4">
                Work with businesses to resolve your complaints efficiently.
              </p>
              <Link to={createPageUrl("ClaimProfile")}>
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  For Businesses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Complaints Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Complaints</h2>
              <p className="text-gray-600 text-lg">See what issues consumers are facing</p>
            </div>
            <Link to={createPageUrl("complaints")}>
              <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                View all <ArrowRight className="w-4 h-4 ml-2" />
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
                <Link key={complaint.id} to={createPageUrl(`c/${complaint.company_slug || complaint.company_id}`)}>
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
                          {new Date(complaint.published_date || complaint.created_date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No recent complaints found.</div>
            )}
          </div>
        </div>
      </section>

      {/* Business CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Are you a business?
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Claim your profile to respond to complaints and build customer trust.
          </p>
          <Link to={createPageUrl("ClaimProfile")}>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
              Claim Your Profile
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
