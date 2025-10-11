
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Company } from "@/api/entities";
import { CompanyTrustScore } from "@/api/entities";
import TrustScoreDisplay from "@/components/trust/TrustScoreDisplay";
import { companyProfileUrl } from "../components/utils/links";
import { 
  Search, 
  Building2, 
  Star,
  Filter,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CompanySkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded-lg mt-4 border-t pt-4"></div>
    </CardContent>
  </Card>
);

export default function Companies() {
  const location = useLocation();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true);

  // Load all companies once on mount
  useEffect(() => {
    loadCompanies();
  }, []);

  // Sync filters from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const q = urlParams.get('q') || '';
    const category = urlParams.get('category') || 'all';
    setSearchQuery(q);
    setIndustryFilter(category);
  }, [location.search]);

  const filterAndSortCompanies = useCallback(() => {
    let filtered = companies;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          return (b.trustScore?.score || 0) - (a.trustScore?.score || 0);
        case "complaints":
          return (b.total_complaints || 0) - (a.total_complaints || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  }, [companies, searchQuery, industryFilter, sortBy]);

  useEffect(() => {
    filterAndSortCompanies();
  }, [filterAndSortCompanies]);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const [allCompanies, trustScores] = await Promise.all([
          Company.list("-total_complaints", 1000),
          CompanyTrustScore.list(null, 1000)
      ]);
      const scoresMap = new Map(trustScores.map(s => [s.company_id, s]));

      const companiesWithScores = allCompanies.map(c => ({
        ...c,
        trustScore: scoresMap.get(c.id) || null
      }));

      setCompanies(companiesWithScores);
    } catch (error) {
      console.error("Error loading companies:", error);
    }
    setLoading(false);
  };

  const getIndustries = () => {
    const industries = [...new Set(companies.map(c => c.industry).filter(Boolean))];
    return industries.sort();
  };
  
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    const url = new URL(window.location);
    url.searchParams.set('q', newQuery);
    window.history.pushState({}, '', url);
  }

  const handleIndustryChange = (value) => {
    setIndustryFilter(value);
    const url = new URL(window.location);
    url.searchParams.set('category', value);
    window.history.pushState({}, '', url);
  }

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
                  onChange={handleSearchChange}
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
          
          <Select value={industryFilter} onValueChange={handleIndustryChange}>
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
            {Array(6).fill(0).map((_, i) => <CompanySkeleton key={i} />)}
          </div>
        ) : filteredCompanies.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No companies found</h3>
            <p className="text-gray-600 text-lg mb-8">
              {searchQuery ? "Try adjusting your search terms or filters." : "No companies have been added yet."}
            </p>
            <Link to={createPageUrl("file-complaint")}>
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
                to={companyProfileUrl(company)}
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
                  
                  <CardContent className="space-y-4">
                     {company.trustScore && (
                        <TrustScoreDisplay score={company.trustScore.score} />
                      )}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-bold text-gray-900">
                            {company.total_complaints || 0}
                          </p>
                          <p className="text-gray-600">Total Reviews</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Clock className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-bold text-gray-900">
                            {company.resolution_rate || 0}%
                          </p>
                          <p className="text-gray-600">Resolved</p>
                        </div>
                      </div>
                    </div>
                     {company.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 pt-2 border-t">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{company.address}</span>
                      </div>
                    )}
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
