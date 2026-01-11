import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Search, Star, Shield, AlertCircle } from 'lucide-react';
import companies, { Company } from '../data/companies';

const SearchResults = () => {
  const [location, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);

  // Parse query parameter from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q') || '';
    setQuery(q);
    
    if (q) {
      const filtered = companies.filter(company => 
        company.name.toLowerCase().includes(q.toLowerCase()) ||
        company.category.toLowerCase().includes(q.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The form submission will update the URL, triggering the useEffect
    setLocation(`/search?q=${encodeURIComponent(query)}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo-official.png" alt="ReportHere" className="h-8 w-auto" />
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a company or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </form>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="text-gray-600 hover:text-green-700 font-medium">Log In</button>
            </Link>
            <Link href="/signup">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 mb-8">
            Found {results.length} {results.length === 1 ? 'company' : 'companies'} matching your search
          </p>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((company: Company) => (
                <div key={company.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-2 border border-gray-100">
                        <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-500">{company.category}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{company.complaints} complaints</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Shield className="w-4 h-4" />
                            <span>{company.answered} answered</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(company.score)}`}>
                        <Star className="w-4 h-4 fill-current" />
                        {company.score}/10
                      </div>
                      <div className="mt-2">
                        <Link href={`/file-complaint?company=${encodeURIComponent(company.name)}`}>
                          <button className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline">
                            File a Complaint
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any companies matching "{query}". Try checking the spelling or searching for a category.
              </p>
              <Link href="/">
                <button className="text-green-600 font-medium hover:underline">
                  Return to Homepage
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
