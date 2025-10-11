
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Company } from "@/api/entities";
import { 
  Building2, 
  Search, 
  MapPin,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompanyPicker() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCompanies = async () => {
    try {
      const allCompanies = await Company.list();
      setCompanies(allCompanies);
    } catch (error) {
      console.error("Error loading companies:", error);
    }
    setLoading(false);
  };

  const filterCompanies = useCallback(() => {
    if (!searchQuery.trim()) {
      setFilteredCompanies(companies.slice(0, 20)); // Show top 20 by default
      return;
    }

    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (company.description && company.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (company.address && company.address.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setFilteredCompanies(filtered.slice(0, 20));
  }, [searchQuery, companies]);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [filterCompanies]);

  const handleSelectCompany = (companyId) => {
    navigate(createPageUrl(`ClaimWizard?company_id=${companyId}`));
  };

  const formatAddress = (address) => {
    if (!address) return null;
    // Extract city/state from address (simple approach)
    const parts = address.split(',');
    if (parts.length >= 2) {
      return parts.slice(-2).join(',').trim();
    }
    return address;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Find Your Business</h2>
        <p className="text-gray-600">
          Search for your company to claim your profile and start responding to complaints.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search by company name, location, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 py-3 text-lg"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading companies...</p>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchQuery ? "No companies found" : "No companies available"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery 
              ? "Try adjusting your search terms or check the spelling." 
              : "Companies will appear here once they've been added to our system."
            }
          </p>
          <Button 
            onClick={() => navigate(createPageUrl("FileComplaint"))}
            variant="outline"
          >
            File a complaint to add a company
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Found {filteredCompanies.length} compan{filteredCompanies.length === 1 ? 'y' : 'ies'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          
          <div className="grid gap-4">
            {filteredCompanies.map((company) => (
              <Card 
                key={company.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectCompany(company.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {company.logo_url ? (
                          <img 
                            src={company.logo_url} 
                            alt={company.name} 
                            className="w-8 h-8 object-contain" 
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {company.name}
                          </h3>
                          {company.verified_status === 'verified' && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {company.industry && (
                            <span className="capitalize">
                              {company.industry.replace(/_/g, ' ')}
                            </span>
                          )}
                          {formatAddress(company.address) && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {formatAddress(company.address)}
                            </div>
                          )}
                          {company.total_complaints > 0 && (
                            <span>
                              {company.total_complaints} complaint{company.total_complaints !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        
                        {company.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {company.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="ml-4 bg-green-600 hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCompany(company.id);
                      }}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
