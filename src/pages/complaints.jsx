
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Complaint } from "@/api/entities";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileText, Search, AlertCircle, CheckCircle, Clock, Building2 } from "lucide-react";

const ComplaintSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex gap-2 mt-2">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Complaints() {
  const location = useLocation();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    sortBy: '-created_at'
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const companyId = urlParams.get('company_id');
    
    setLoading(true);
    setError(null);
    
    const queryFilter = { status: "published" }; // Only show published complaints
    if (companyId) queryFilter.company_id = companyId;
    if (filters.status !== 'all' && filters.status !== 'published') queryFilter.status = filters.status;
    if (filters.category !== 'all') queryFilter.category = filters.category;
    
    Complaint.filter(queryFilter, filters.sortBy)
      .then(data => {
        let filteredData = data;
        if (filters.search) {
          filteredData = data.filter(c => 
            c.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            c.description.toLowerCase().includes(filters.search.toLowerCase()) ||
            c.company_name.toLowerCase().includes(filters.search.toLowerCase())
          );
        }
        setComplaints(filteredData);
      })
      .catch(err => {
        console.error("Error loading complaints:", err);
        setError("Could not load complaints. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [location.search, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>;
      case 'responded':
        return <Badge className="bg-blue-100 text-blue-800"><FileText className="w-3 h-3 mr-1" />Responded</Badge>;
      case 'published':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Open</Badge>;
      case 'submitted':
        return <Badge className="bg-gray-100 text-gray-800"><Clock className="w-3 h-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge variant="secondary" className="capitalize">{status.replace(/_/g, ' ')}</Badge>;
    }
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      customer_service: "bg-blue-100 text-blue-800",
      product_quality: "bg-red-100 text-red-800", 
      billing_dispute: "bg-yellow-100 text-yellow-800",
      delivery_shipping: "bg-green-100 text-green-800",
      refund_return: "bg-purple-100 text-purple-800",
      warranty_repair: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800"
    };
    return (
      <Badge className={categoryColors[category] || categoryColors.other}>
        {category.replace(/_/g, ' ')}
      </Badge>
    );
  };

  const categories = ["customer_service", "product_quality", "billing_dispute", "delivery_shipping", "refund_return", "warranty_repair", "other"];
  const statuses = ["published", "responded", "resolved"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">All Complaints</h1>
          <p className="text-gray-600 text-lg mt-2">Browse all public consumer complaints.</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6 flex flex-wrap gap-4 items-center">
            <div className="relative flex-grow min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search complaints..." 
                className="pl-10"
                value={filters.search}
                onChange={e => handleFilterChange('search', e.target.value)}
              />
            </div>
            <Select value={filters.status} onValueChange={value => handleFilterChange('status', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(s => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s === 'published' ? 'Open' : s.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.category} onValueChange={value => handleFilterChange('category', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c} value={c} className="capitalize">
                    {c.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.sortBy} onValueChange={value => handleFilterChange('sortBy', value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-created_at">Newest First</SelectItem>
                <SelectItem value="created_at">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        {loading ? (
          <div className="space-y-4">
            <ComplaintSkeleton />
            <ComplaintSkeleton />
            <ComplaintSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <AlertCircle className="w-24 h-24 text-red-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">An Error Occurred</h3>
            <p className="text-gray-600 text-lg mb-8">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
              Try Again
            </Button>
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No complaints found</h3>
            <p className="text-gray-600 text-lg mb-8">
              Try adjusting your filters or be the first to file a complaint.
            </p>
            <Link to={createPageUrl("FileComplaint")}>
              <Button className="bg-green-600 hover:bg-green-700">
                File a Complaint
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map(complaint => (
              <Link key={complaint.id} to={createPageUrl(`c/${complaint.company_slug || complaint.company_id}`)}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="mb-2 text-xl">{complaint.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium text-green-600">{complaint.company_name}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getCategoryBadge(complaint.category)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{complaint.description}</p>
                    <div className="flex justify-between items-center">
                      {getStatusBadge(complaint.status)}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(complaint.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Load More (if needed) */}
        {!loading && complaints.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg">
              Showing {complaints.length} complaints
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
