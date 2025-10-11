
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Company } from "@/api/entities";
import { Complaint } from "@/api/entities";
import { 
  Search, 
  Building2, 
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  Filter,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true);

  const filterAndSortCompanies = useCallback(() => {
    let filtered = companies;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (company.description && company.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply industry filter
    if (industryFilter !== "all") {
      filtered = filtered.filter(company => company.industry === industryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "complaints":
          return b.total_complaints - a.total_complaints;
        case "name":
          return a.name.localeCompare(b.name);
        case "response_time":
          return (a.response_time_hours || 999) - (b.response_time_hours || 999);
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  }, [companies, searchQuery, industryFilter, sortBy]);

  useEffect(() => {
    loadCompanies();
    // Check for search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    filterAndSortCompanies();
  }, [filterAndSortCompanies]);

  const loadCompanies = async () => {
    try {
      const allCompanies = await Company.list();
      
      // Calculate metrics for each company (simplified for now)
      const companiesWithMetrics = await Promise.all(
        allCompanies.map(async (company) => {
          try {
            const complaints = await Complaint.filter({ company_id: company.id });
            const resolvedComplaints = complaints.filter(c => c.status === 'resolved');
            const respondedComplaints = complaints.filter(c => c.status === 'responded' || c.status === 'resolved');
            
            // Calculate response time (mock calculation)
            const avgResponseTime = respondedComplaints.length > 0 ? 
              Math.round(Math.random() * 48 + 6) : null; // 6-54 hours
            
            const resolutionRate = complaints.length > 0 ? 
              Math.round((resolvedComplaints.length / complaints.length) * 100) : 0;
            
            // Calculate rating based on resolution rate and response time
            let rating = 0;
            if (complaints.length > 0) {
              rating = Math.min(5, Math.max(1, 
                (resolutionRate / 20) + (avgResponseTime ? Math.max(0, (72 - avgResponseTime) / 24) : 0)
              ));
            }

            return {
              ...company,
              total_complaints: complaints.length,
              response_time_hours: avgResponseTime,
              resolution_rate: resolutionRate,
              rating: Math.round(rating * 10) / 10
            };
          } catch (error) {
            // If there's an error fetching complaints for a company, return the company with default values
            return {
              ...company,
              total_complaints: 0,
              response_time_hours: null,
              resolution_rate: 0,
              rating: 0
            };
          }
        })
      );

      setCompanies(companiesWithMetrics);
    } catch (error) {
      console.error("Error loading companies:", error);
    }
    setLoading(false);
  };

  const getIndustries = () => {
    const industries = [...new Set(companies.map(c => c.industry).filter(Boolean))];
    return industries.sort();
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    if (rating >= 2) return "text-orange-600";
    return "text-red-600";
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-current text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-current text-yellow-400 opacity-50" />);
    }
    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Companies</h1>
              <p className="text-gray-600 text-lg">
                Browse companies and see their complaint resolution performance
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-3 max-w-lg w-full lg:w-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 py-3 text-lg border-2 border-gray-200 focus:border-green-500 focus:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-700 text-lg">Filters:</span>
          </div>
          
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {getIndustries().map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="complaints">Most Complaints</SelectItem>
              <SelectItem value="response_time">Fastest Response</SelectItem>
              <SelectItem value="name">Company Name</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto text-lg font-medium text-gray-600">
            {filteredCompanies.length} companies found
          </div>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No companies found</h3>
            <p className="text-gray-600 text-lg mb-8">
              {searchQuery ? "Try adjusting your search terms or filters." : "No companies have been added yet."}
            </p>
            <Link to={createPageUrl("FileComplaint")}>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                File a Complaint to Add a Company
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.map((company) => (
              <Link
                key={company.id}
                to={createPageUrl(`CompanyProfile?id=${company.id}`)}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-2xl">
                          {company.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 line-clamp-1 mb-1">
                            {company.name}
                          </h3>
                          {company.industry && (
                            <Badge variant="outline" className="text-sm">
                              {company.industry.replace(/_/g, ' ')}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {company.verified && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Statistics Row */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{company.total_complaints}</div>
                        <div className="text-sm text-gray-500">Reviews</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {company.rating > 0 ? company.rating.toFixed(1) : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">Avg Rating</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">12.4K</div>
                        <div className="text-sm text-gray-500">Visitors</div>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    {company.rating > 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center gap-1">
                          {getRatingStars(company.rating)}
                        </div>
                        <span className={`font-bold text-lg ${getRatingColor(company.rating)}`}>
                          {company.rating.toFixed(1)}
                        </span>
                      </div>
                    )}

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-bold text-gray-900">
                            {company.response_time_hours ? `${company.response_time_hours}h` : 'N/A'}
                          </p>
                          <p className="text-gray-600">Response-rate</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-bold text-gray-900">
                            {company.resolution_rate}%
                          </p>
                          <p className="text-gray-600">Response-rate</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {company.description && (
                      <p className="text-gray-600 line-clamp-2 text-sm">
                        {company.description}
                      </p>
                    )}

                    {/* Location */}
                    {company.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{company.address}</span>
                      </div>
                    )}

                    {/* View Button */}
                    <div className="pt-4 border-t">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
